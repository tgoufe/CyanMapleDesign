'use strict';

import Model        from './model.js';
import merge        from '../util/merge.js';
import {listener}   from '../listener.js';

/**
 * 默认参数
 * @const
 * */
const LOCAL_STORAGE_MODEL_CONFIG = {
		listen: true
	}
	;

/**
 * @class
 * @classdesc   对 localStorage 进行封装，统一调用接口，在 Model.factory 工厂方法注册为 localStorage，别名 ls，将可以使用工厂方法生成
 * @extends     Model
 * @example
 *
<pre>
let localStorageModel = new LocalStorageModel()
	, storage = Model.factory('localStorage')
	, ls = Model.factory('ls')
	;

storage.getData('fittingShow/index/first').then((value)=>{
	console.log('获取到 ', value);
});
</pre>
 * */
class LocalStorageModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * @param   {Boolean}   [config.listen] 是否开启监听事件
	 * */
	constructor(config={}){
		super( config );

		this._config = merge(config, LocalStorageModel._CONFIG);

		if( 'localStorage' in self ){
			this._enabled = true;
			this._storeSync = self.localStorage;
			this._store = Promise.resolve( self.localStorage );

			if( this._config.listen ){
				LocalStorageModel.listenOn();

				// todo 保留事件
				LocalStorageModel._GLOBAL_LISTENER.add((e)=>{
					let topic = e.key
						, newVal = e.newValue
						;

					try{
						newVal = JSON.parse( newVal );
					}
					catch(e){}

					this.setData(topic, newVal);
				});
			}
		}
		else{
			this._enabled = false;
			this._storeSync = null;
			this._store = Promise.reject( new Error('此浏览器不支持 localStorage') );
		}
	}

	// ---------- 静态方法 ----------
	/**
	 * @summary 全局 storage 事件监听
	 * @static
	 * @desc    只执行一次，执行后将 LocalStorageModel._listenOn 设为 true，该监听事件只能由其他页面修改 localStorage 的数据时触发
	 * */
	static listenOn(){
		
		if( LocalStorageModel._listenOn ){
			return;
		}
		
		LocalStorageModel._GLOBAL_LISTENER = listener('storage');
		LocalStorageModel._listenOn = true;
	}
	/**
	 * @summary 全局 storage 事件解除监听
	 * @static
	 * @desc    执行后将 LocalStorageModel._listenOn 设为 false
	 * */
	static listenOff(){
		if( LocalStorageModel._listenOn && LocalStorageModel._GLOBAL_LISTENER ){
			LocalStorageModel._GLOBAL_LISTENER.off();

			LocalStorageModel._GLOBAL_LISTENER = null;

			LocalStorageModel._listenOn = false;
		}
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认参数
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return LOCAL_STORAGE_MODEL_CONFIG;
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary 设置数据
	 * @param   {String|Object} topic
	 * @param   {*}             value   当 topic 为 object 类型时被忽略
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
	 * @desc    获取数据时会优先从内存中取值，若没有则从 localStorage 中取值并将其存入内存中，当 topic 的类型为数组的时候，resolve 传入的结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
	 * */
	getData(topic){
		let argc = arguments.length
			, result
			;

		if( Array.isArray(topic) ){
			result = this._getByArray( topic );
		}
		else if( argc.length > 1 ){
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
	 * @summary 以同步的方式获取 localStorage 中的数据
	 * @param   {String|String[]|...String}   topic
	 * @return  {Object|String}     若存在 topic 的值，返回查询出来的 value，否则返回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 localStorage 中取值并将其存入内存中，当 topic 的类型为数组的时候，返回结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
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

		if( Array.isArray(topic) ){
			result = this._removeByArray( topic );
		}
		else if( argc > 1 ){
			result = this._removeByArray( [].slice.call(arguments) );
		}
		else{
			result = super.removeData( topic ).then(()=>{
				return this._store.then((store)=>{
					store.removeItem( topic );

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
 * 全局 storage 监听事件是否开启
 * @static
 * */
LocalStorageModel._listenOn = true;
/**
 * 全局 storage 事件监听
 * @static
 * */
LocalStorageModel._GLOBAL_LISTENER = listener('storage');

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('localStorage', LocalStorageModel);
/**
 * 注册别名
 * */
Model.registerAlias('localStorage', 'ls');

export default LocalStorageModel;