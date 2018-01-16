'use strict';

import Model from './model.js';
import merge from '../util/merge.js';

/**
 * 默认配置
 * @const
 * */
const INDEXED_DB_CONFIG = {
		dbName: 'storage'
		, tableName: 'storage'
		, dbVersion: 1
		, keyPath: 'topic'
		, index: [{
			name: 'topic'
			, keyPath: 'topic'
			, unique: true
		}, {
			name: 'value'
			, keyPath: 'value'
			, unique: false
		}]
	}
	;

/**
 * @class
 * @classdesc   对 IndexedDB 进行封装，统一调用接口，在 Model.factory 工厂方法注册为 indexedDB，别名 idb，将可以使用工厂方法生成
 * @extends     Model
 * @example
<pre>
let indexedDBModel = new IndexedDBModel()
	, storage = Model.factory('indexedDB')
	, idb = Model.factory('idb')
	;
</pre>
 * */
class IndexedDBModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * @param   {String}    [config.dbName]
	 * @param   {String}    [config.tableName]
	 * @param   {Number}    [config.dbVersion]
	 * @param   {String}    [config.keyPath]
	 * @param   {Object[]}  [config.index]
	 * @param   {String}    config.index[].name
	 * @param   {String}    [config.index[].keyPath]    未设置时默认使用 name
	 * @param   {Boolean}   [config.index[].unique=false]   默认值 false
	 * */
	constructor(config={}){
		super( config );

		this._config = merge(config, IndexedDBModel._CONFIG);

		// this._store 为 Promise 类型，会在 resolve 中传入 db 实例，因为要保证数据库打开成功才可以操作
		this._store = new Promise((resolve, reject)=>{
			let indexedDB
				, dbOpenRequest
				;

			indexedDB = self.indexedDB || self.mozIndexedDB || self.webbkitIndexedDB || self.msIndexedDB || null;

			if( indexedDB ){
				dbOpenRequest = indexedDB.open(this._config.dbName, this._config.dbVersion);

				/**
				 * DB 版本设置或升级时回调
				 * createObjectStore deleteObjectStore 只能在 onupgradeneeded 事件中使用
				 * */
				dbOpenRequest.onupgradeneeded = (e)=>{
					let db = e.target.result
						, store
						;

					// 创建表
					if( !db.objectStoreNames.contains(this._config.tableName) ){

						// 创建存储对象
						store = db.createObjectStore(this._config.tableName, {
							keyPath: this._config.keyPath
						});

						this._config.index.forEach((d)=>{
							store.createIndex(d.name, d.keyPath || d.name, {
								unique: d.unique || false
							});
						});
					}
				};
				dbOpenRequest.onsuccess = function(e){
					resolve( e.target.result );
				};
				dbOpenRequest.onerror = function(e){
					console.log( e );
					reject( e );
				};
			}
			else{
				reject( new Error('此数据库不支持 IndexedDB') );
			}
		});
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认配置
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return INDEXED_DB_CONFIG;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary 查询
	 * @private
	 * @param   {String}    topic
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回查询出来的 value
	 * */
	_select(topic){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				let objectStore = db.transaction([this._config.tableName], 'readwrite').objectStore( this._config.tableName )
					, objectStoreRequest = objectStore.get( topic )
					;

				objectStoreRequest.onsuccess = function(e){
					resolve( e.target.result );
				};
				objectStoreRequest.onerror = function(e){
					console.log( e );
					reject( e );
				};
			});
		});
	}
	/**
	 * @summary 新建或更新
	 * @private
	 * @param   {String}    topic
	 * @param   {String}    value
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * @desc    add 接口要求数据库中不能已经有相同键的对象存在，因此统一使用 put 接口
	 * */
	_put(topic, value){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				let objectStore = db.transaction([this._config.tableName], 'readwrite').objectStore( this._config.tableName )
					, objectStoreRequest = objectStore.put({
						topic: topic
						, value: value
					})
					;

				objectStoreRequest.onsuccess = function(e){
					resolve( !!e.target.result );
				};
				objectStoreRequest.onerror = function(e){
					console.log( e );
					reject( e );
				};
			});
		});
	}
	/**
	 * @summary 删除
	 * @private
	 * @param   {String}    topic
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	_delete(topic){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				let objectStore = db.transaction([this._config.tableName], 'readwrite').objectStore( this._config.tableName )
					, objectStoreRequest = objectStore.delete( topic )
					;

				objectStoreRequest.onsuccess = function(e){
					resolve( true );
				};
				objectStoreRequest.onerror = function(e){
					console.log( e );
					reject( e );
				};
			});
		});
	}
	/**
	 * @summary 清空
	 * @private
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	_clear(){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				let objectStore = db.transaction([this._config.tableName], 'readwrite').objectStore( this._config.tableName )
					, objectStoreRequest = objectStore.clear()
					;

				objectStoreRequest.onsuccess = function(e){
					resolve( true );
				};
				objectStoreRequest.onerror = function(e){
					console.log( e );
					reject( e );
				}
			});
		});
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
				return this._put(topic, value);
			});
		}

		return result;
	}
	/**
	 * @summary 获取数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，若存在 topic 的值，在 resolve 时传回查询出来的 value，否则在 reject 时传回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 indexedDB 中取值并将其存入内存中，当 topic 的类型为数组的时候，resolve 传入的结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
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
				return this._select( topic ).then((rs)=>{
					let value
						;

					if( rs ){
						value = rs.value;

						if( typeof value === 'string' ){ // 若为字符串类型的数据，尝试进行解析
							try{
								value = JSON.parse( value );
							}
							catch(e){}
						}

						// 在内存中保留该值
						super.setData(topic, value);
					}
					else{
						value = Promise.reject( null );
					}

					return value;
				});
			});
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
				return this._delete( topic );
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
			return this._clear();
		});
	}
	/**
	 * @summary 获取通过 range 获取数据
	 * @param   {Number}            [min]
	 * @param   {Number|Boolean}    [max]
	 * @param   {Boolean}           [eqMin=true]
	 * @param   {Boolean}           [eqMax=true]
	 * @return  {Promise}           返回一个 Promise 对象，在 resolve 时传回 cursor 列表
	 * @todo    区间取值功能
	 * */
	getDataByRange(min, max, eqMin=true, eqMax=true){
		let argc = arguments.length
			;

		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				let objectStore = db.transaction([this._config.tableName], 'readwrite').objectStore( this._config.tableName )
					// , keyRangeValue = IDBKeyRange.bound(min, max, eqMin, eqMax)
					// , objectStoreRequest = objectStore.openCursor( keyRangeValue )
					, objectStoreRequest = objectStore.openCursor()
					, cursorList = []
					;

				// switch( argc ){
				// 	case 1:
				// 		keyRangeValue = IDBKeyRange.bound( min );
				// 		break;
				// 	case 2:
				// 		if( typeof max === 'boolean' ){
				// 			keyRangeValue = IDBKeyRange.lowerBound(min, max);
				// 		}
				// 		else{
				// 			keyRangeValue = IDBKeyRange.bound(min, max);
				// 		}
				// 		break;
				// 	case 3:
				// 		keyRangeValue = IDBKeyRange.bound()
				// 		break;
				// 	case 4:
				// 		break;
				// 	default:
				// 		break;
				// }

				objectStoreRequest.onsuccess = function(e){
					let cursor = e.target.result
					;

					if( cursor ){
						cursorList.push( cursor.value );

						cursor.continue();
					}
					else{
						resolve( cursorList );
					}
				};
				objectStoreRequest.onerror = function(e){
					console.log( e );
					reject( e );
				};
			});
		});
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('indexedDB', IndexedDBModel);
/**
 * 注册别名
 * */
Model.registerAlias('indexedDB', 'idb');

export default IndexedDBModel;