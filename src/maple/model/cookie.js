'use strict';

import Model        from './model.js';
import dateFormat   from '../util/dateFormat.js';

/**
 * 默认 cookie 设置参数
 * @const
 * */
const COOKIE_DEFAULT = {
		path: '/'
		, domain: ''
		, expires: ''
		, secure: ''
	}
	;

/**
 * @class
 * @classdesc   对 cookie 的使用进行封装，统一调用接口，在 Model.factory 工厂方法注册为 cookie，别名 c，将可以使用工厂方法生成
 * @extends     Model
 * @example
</pre>
let cookieModel = new CookieModel()
	, cookie = Model.factory('cookie')
    , c = Model.factory('c')
	;

console.log( cookie === c );    // 因为将对象实例进行了缓存，所以结果为 true

cookie.set('memberId', 1, '30d');   // 将 memberId 放入 cookie 中，过期时间 30 天
</pre>
 * */
class CookieModel extends Model{
	/**
	 * @constructor
	 * */
	constructor(){
		super();

		if( navigator.cookieEnabled ){
			this._enabled = true;
			this._store = Promise.resolve( true );
		}
		else{
			this._enabled = false;
			this._store = Promise.reject( new Error('此浏览器不支持 Cookie') );
		}
	}

	// ---------- 静态方法 ----------
	/**
	 * @summary 转换时间数据格式
	 * @static
	 * @param   {Date|Number|String}    date 为 Number 类型时默认单位为天
	 * @return  {String}                返回一个 UTC 格式的时间字符串
	 * */
	static _transDate(date){
		if( date instanceof Date ){}
		else{
			date = dateFormat.formatTimeStr( date );

			date = date === 0 ? '' : new Date( Date.now() + date );
		}

		return date && date.toUTCString();
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认 cookie 设置参数
	 * @static
	 * @const
	 * */
	static get _DEFAULT(){
		return COOKIE_DEFAULT;
	}
	/**
	 * @summary 设置默认参数的 domain 值
	 * @static
	 * @param   {String}    domain
	 * */
	static setDomain(domain){
		COOKIE_DEFAULT.domain = domain;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary     设置 cookie
	 * @protected
	 * @param       {String}                topic
	 * @param       {*}                     value
	 * @param       {Object|Number|String}  [options]           相关配置
	 * @param       {String}                [options.path]
	 * @param       {String}                [options.domain]
	 * @param       {Date|Number|String}    [options.expires]
	 * @param       {String}                [options.secure]
	 * @return      {Boolean}               在设置完成后返回 true
	 * @desc        因为设置 cookie 和删除 cookie 使用是相同的代码，只是传入的过期时间不同，所以提出一个共通方法
	 * */
	_setCookie(topic, value, options){
		if( typeof options !== 'object' ){
			options = {
				expires: options
			};
		}

		if( options.expires ){
			options.expires = CookieModel._transDate( options.expires );
		}

		document.cookie = encodeURIComponent( topic ) +'='+
			encodeURIComponent( this._stringify(value) ) +
			Object.keys( CookieModel._DEFAULT ).reduce((a, d)=>{    // 整理配置
				let t = options[d] || CookieModel._DEFAULT[d]
					;

				if( t ){
					a += '; '+ d +'='+ t;
				}

				return a;
			}, '');

		return true;
	}
	/**
	 * @summary     设置 cookie
	 * @protected
	 * @param       {String|String[]}   topic
	 * @return      {Object|String}
	 * */
	_getCookie(topic){
		let cookies = document.cookie
			, i = 0, l
			, value = ''
			, t
			;

		if( cookies ){
			cookies = cookies.split('; ');
		}
		else{
			cookies = [];
		}

		/**
		 * todo 调整机制
		 *
		 * 现在每次取值，都会将 cookie 进行一次解析
		 * 期望改为只解析一次
		 * */
		for(l = cookies.length; i < l; i++ ){
			t = cookies[i].split('=');

			if( topic === decodeURIComponent(t[0]) ){
				value = decodeURIComponent( t[1] );
				break;
			}
		}

		if( value ){
			try{
				value = JSON.parse( value );
			}
			catch(e){}

			// 在内存中保留该值
			super.setData(topic, value);
		}
		else{
			value = Promise.reject( null );
		}

		return value;
	}
	/**
	 * @summary     当 setData 传入一个 json 时内部调用函数
	 * @override
	 * @protected
	 * @param       {Object}    topic
	 * @param       {Object}    [options]
	 * @return      {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * @desc        因为设置 cookie 时有相关配置，故重写覆盖父类的 _setByObject 方法
	 * */
	_setByObject(topic, options){
		return Promise.all( Object.keys(topic).map((d)=>{
			return this.setData(d, topic[d], options);
		}) ).then((data)=>{
			return !!data;
		});
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary     设置数据
	 * @override
	 * @param       {String|Object}             topic
	 * @param       {*}                         value               当 topic 为 object 类型时，被视为 options
	 * @param       {Object|Number|String}      [options]           相关配置
	 * @param       {String}                    [options.path]
	 * @param       {String}                    [options.domain]
	 * @param       {Date|Number|String}        [options.expires]
	 * @param       {String}                    [options.secure]
	 * @return      {Promise}                   返回一个 Promise 对象，在 resolve 时传回 true
	 * @desc        保存值得时候，同时会保持在内存中，当 topic 类型为 object 时，value 会视为 options
	 * */
	setData(topic, value, options){
		let result
			;

		if( typeof topic === 'object' ){
			options = value;

			result = this._setByObject(topic, options);
		}
		else{
			result = super.setData(topic, value).then(()=>{
				return this._store;
			}).then(()=>{
				return this._setCookie(topic, value, options);
			});
		}
		
		return result;
	}
	/**
	 * @summary 获取数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，若存在 topic 的值，在 resolve 时传回查询出来的 value，否则在 reject 时传回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 cookie 中取值并将其存入内存中，当 topic 的类型为数组的时候，resolve 传入的结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
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
			result = super.getData( topic ).catch(()=>{  // 内存中不存在该值
				return this._store.then(()=>{
					return this._getCookie( topic );
				});
			});
		}

		return result
	}
	/**
	 * @summary 以同步的方式获取 cookie 中的数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Object|String}             若存在 topic 的值，返回查询出来的 value，否则返回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 cookie 中取值并将其存入内存中，当 topic 的类型为数组的时候，返回结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
	 * */
	getDataSync(topic){
		let argc = arguments.length
			, keyList
			, result
			;

		// 判断当前环境是否支持 cookie
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
					all[d] = this._getCookie( d ) || null;

					// 尝试解析
					try{
						all[d] = JSON.parse( all[d] );
					}
					catch(e){}

					super.setData(d, all[d]);
				}

				return all;
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
	 * @desc    调用 _setCookie 方法，过期时间为负值
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
				return this._setCookie(topic, '', -1);
			});
		}
		return result;
	}
	/**
	 * @summary 清空数据
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * @desc    只调用了父类的 clearData 方法，清楚了内存中的数据，对 cookie 实际没做任何处理
	 * */
	clearData(){
		return super.clearData();
	}
	/**
	 * @summary 获取 cookie 长度
	 * @return  {Number}
	 * */
	getCookieLength(){
		return this._enabled ? document.cookie.length : 0;
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('cookie', CookieModel);
/**
 * 注册别名
 * */
Model.registerAlias('cookie', 'c');

export default CookieModel;