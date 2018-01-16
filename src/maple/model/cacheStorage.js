'use strict';

import Model from './model.js';
import merge from '../util/merge.js';

/**
 * 默认配置
 * @const
 * */
const CACHE_STORAGE_MODEL_CONFIG = {
		cacheName: 'storage'
	}
	;

/**
 * @class
 * @extends Model
 * @classdesc   对浏览器源生 CacheStorage 接口进行封装，统一调用接口，主要提供给 Service Worker 调用，普通页面使用场景有限，在 Model.factory 工厂方法注册为 cacheStorage，别名 cs，将可以使用工厂方法生成
 * @example
let cacheStorageModel = new CacheStorageModel()
	, storage = Model.factory('cacheStorage')
	, cs = Model.factory('cs')
	;
 * */
class CacheStorageModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * @param   {String}    [config.cacheName]
	 * */
	constructor(config={}){
		super( config );

		this._config = merge(config, CacheStorageModel._CONFIG);

		if( 'caches' in self ){ // 判断
			this._store = Promise.resolve( self.caches );
		}
		else{
			this._store = Promise.reject( new Error('此浏览器不支持 Service Worker') );
		}
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认配置
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return CACHE_STORAGE_MODEL_CONFIG;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary 将 url 字符串转换为 Request 对象
	 * @private
	 * @param   {String|Request}    url
	 * @return  {Request}
	 * */
	_tranToRequest(url){
		
		if( typeof url === 'object' && url instanceof Request ){}
		else{
			url = new Request( url );
		}

		return url
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary 设置缓存
	 * @param   {String|Request}    topic
	 * @param   {Response}          response
	 * @return  {Promise}           返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	setData(topic, response){
		return this._store.then((caches)=>{
			return caches.open( this._config.cacheName );
		}).then(function(cache){
			console.log('缓存 '+ (typeof topic === 'string' ? topic : topic.url));
			return cache.add(topic, response);
		}).then(function(){
			return true;
		});
	}
	/**
	 * @summary 获取缓存
	 * @param   {String|Request}    topic
	 * @return  {Promise}           返回一个 Promise 对象，在 resolve 时传回查询到的缓存，reject 时传回 Error
	 * */
	getData(topic){
		topic = this._tranToRequest( topic );

		return this._store.then((caches)=>{
			return caches.open( this._config.cacheName );
		}).then((cache)=>{
			return cache.match( topic );
		}).then(function(response){
			let result
				;

			if( response ){
				result = response;
			}
			else{
				result = Promise.reject( new Error('不存在缓存 '+ topic.url) );
			}

			return result;
		});
	}
	/**
	 * @summary 将缓存删除
	 * @param   {String|Request}    topic
	 * @param   {Object}            [options={}]    cache.delete 的可选参数
	 * @return  {Promise}           返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	removeData(topic, options={}){
		topic = this._tranToRequest( topic );

		return this._store.then((caches)=>{
			return caches.open( this._config.cacheName );
		}).then(function(cache){
			return cache.delete(topic, options);
		}).then(function(){
			return true;
		});
	}
	/**
	 * @summary 清空缓存
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	clearData(){
		this._store.then((caches)=>{
			return caches.delete( this._config.cacheName );
		}).then(function(){
			return true;
		});
	}

	/**
	 * @summary 基于 addAll 方法的封装
	 * @param   {Request[]} cacheArray
	 * */
	addAll(cacheArray){
		return this._store.then((caches)=>{
			return caches.open( this._config.cacheName );
		}).then(function(cache){
			return cache.addAll( cacheArray );
		}).then(function(){
			return true;
		});
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('cacheStorage', CacheStorageModel);
/**
 * 注册别名
 * */
Model.registerAlias('cacheStorage', 'cs');

export default CacheStorageModel;