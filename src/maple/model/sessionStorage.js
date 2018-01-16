'use strict';

import Model from './model.js';

/**
 * @class
 * @classdesc   对 sessionStorage 进行封装，统一调用接口，在 Model.factory 工厂方法注册为 sessionStorage，别名 ss，将可以使用工厂方法生成
 * @extends     Model
 * @example
<pre>
let sessionStorageModel = new SessionStorageModel()
	, storage = Model.factory('sessionStorage')
	, ss = Model.factory('ss')
	;
 </pre>
 * */
class SessionStorageModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * */
	constructor(config={}){
		super( config );

		if( 'sessionStorage' in self ){
			this._enabled = true;
			this._storeSync = self.sessionStorage;
			this._store = Promise.resolve( self.sessionStorage );
		}
		else{
			this._enabled = false;
			this._storeSync = null;
			this._store = Promise.reject( new Error('此浏览器不支持 sessionStorage') );
		}
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary 设置数据
	 * @param   {String|Object} topic
	 * @param   {*}             value
	 * @return  {Promise}       返回一个 Promise 对象，在 resolve 时传回 true
	 * @desc    保持值得时候，同时会保持在内存中
	 * */
	setData(topic, value){
		let result
			;

		if( typeof topic === 'object' ){
			result = this._setByObject( topic );
		}
		else{
			result = super.setData(topic, value).then(()=>{
				return this._store.then((store)=>{
					store.setItem(topic, this._stringify(value));

					return true;
				});
			});
		}

		return result;
	}
	/**
	 * @summary 获取数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，若存在 topic 的值，在 resolve 时传回查询出来的 value，否则在 reject 时传回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 sessionStorage 中取值并将其存入内存中，当 topic 的类型为数组的时候，resolve 传入的结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
	 * */
	getData(topic){
		let argc = arguments.length
			, result
			;

		if( Array.isArray(topic) ){
			result = this._getByArray( topic );
		}
		else if( argc > 1 ){
			result = this._getByArray( [].slice.call(arguments) );
		}
		else{
			result = super.getData( topic ).catch(()=>{
				return this._store.then((store)=>{
					let value = store.getItem( topic )
						;

					if( value === null ){
						value = Promise.reject( null );
					}
					else{
						try{
							value = JSON.parse( value );
						}
						catch(e){}

						// 在内存中保留该值
						super.setData(topic, value);
					}

					return value;
				});
			});
		}

		return result;
	}
	/**
	 * @summary 以同步的方式获取 sessionStorage 中的数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Object|String}             若存在 topic 的值，返回查询出来的 value，否则返回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 sessionStorage 中取值并将其存入内存中，当 topic 的类型为数组的时候，返回结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
	 * */
	getDataSync(topic){
		let argc = arguments.length
			, keyList
			, result
			;

		if( this._enabled ){

			if( !Array.isArray(topic) ){
				keyList = [topic];
			}
			else if( argc > 1 ){
				keyList = [].slice.call( arguments );
			}
			else{
				keyList = topic;
			}

			result = keyList.reduce((all, d)=>{
				if( d in this._value ){
					all[d] = this._value[d];
				}
				else{
					all[d] = this._storeSync.getItem( d );

					try{
						all[d] = JSON.parse( all[d] );
					}
					catch(e){}

					super.setData(d, all[d]);
				}
			}, {});

			if( !Array.isArray(topic) ){
				result = result[topic];
			}
		}
		else{
			result = null;
		}

		return result;
	}
	/**
	 * @summary 将数据从缓存中删除
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	removeData(topic){
		let argc = arguments.length
			, result
			;

		if( result ){
			result = this._removeByArray( topic );
		}
		else if( argc > 1 ){
			result = this._removeByArray( [].slice.call(arguments) );
		}
		else{
			result = super.removeData( topic ).then(()=>{
				return this._store.then((store)=>{
					store.removeItem(topic);

					return true;
				});
			});
		}

		return result;
	}
	/**
	 * @summary 清空数据
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	clearData(){
		return super.clearData().then(()=>{
			return this._store.then((store)=>{
				store.clear();

				return true;
			});
		});
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('sessionStorage', SessionStorageModel);

/**
 * 注册别名
 * */
Model.registerAlias('sessionStorage', 'ss');

export default SessionStorageModel;