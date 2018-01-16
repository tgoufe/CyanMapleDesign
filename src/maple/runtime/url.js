'use strict';

/**
 * @file    获取当前页面路径参数，并提供页面跳转方法
 *          整合 location 和 history 功能
 * */

// const PARAMS_FILTER = [
// 		'10000skip' // 微信下 10000skip
// 	]
// 	;

import CONFIG       from '../config.js';
import {listener}   from '../listener.js';

const INDEX = ['source'
		, 'protocol'
		, 'origin'
		, 'host'
		, 'port'
		, 'path'
		, 'relative'
		, 'file'
		, 'dir'
		, 'segments'
		, 'params'
		, 'query'
		, 'hash'
		, 'from'
	]
	;

/**
 * @class
 * @classdesc   url 解析
 * */
class Url{
	/**
	 * @constructor
	 * @param   {String}    [url]
	 * */
	constructor(url){
		let a = document.createElement('a', CONFIG.ceKey)
			;

		a.href = url || location.href;

		this.source     = a.href;
		this.protocol   = a.protocol.replace(':', '');
		this.origin     = a.origin;
		this.host       = a.hostname;
		this.port       = a.port;
		this.path       = a.pathname.replace(/^([^\/])/, '$1');
		// 相对路径
		this.relative   = (a.href.match(/tps?:\/\/[^\/]+(.*)/) || ['', ''])[1];
		// 当前页面文件名
		this.file       = (a.pathname.match(/\/([^\/?#]+)$/i) || ['', ''])[1];
		// 当前页面目录
		this.dir        = this.path.replace(this.file, '');
		// todo ?
		this.segments   = a.pathname.replace(/^\//, '').split('/');
		// 参数对象
		this.params     = this.parseSearch( a.search );
		// hash
		this.hash       = a.hash.slice(1);
		// 页面来源
		this.from       = document.referrer;

		a = null;   // 释放内存
	}

	// ---------- 静态属性 ----------
	static get _INDEX(){
		return INDEX;
	}

	// ---------- 公有属性 ----------
	get query(){    // 当前页面参数拼接字符串
		let query = Object.keys( this.params ).reduce((all, d)=>{
				all.push( encodeURIComponent(d) +'='+ encodeURIComponent(this.params[d]) );

				return all;
			}, [])
			;

		return query.length ? '?'+ query.join('&') : '';
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary     解析 url 的 search 部分
	 * @param       {String}    [search='']
	 * @return      {Object}
	 * */
	parseSearch(search=''){
		if( search && /^\?/.test(search) ){
			search = search.slice(1);
		}

		return search ? search.split('&').reduce((all, d)=>{
			let temp
				, key, value
				;

			if( d ){
				temp = d.split('=');
				key = decodeURIComponent( temp[0] );
				value = decodeURIComponent( temp[1] || '' );

				// 解码
				// all[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1] || '').replace(/\?10000skip(=true)?/, '');  // 删除微信下的?10000skip todo ?

				try{    // 对数据类型进行转换
					value = JSON.parse( value );
				}
				catch(e){}

				all[key] = value;
			}

			return all;
		}, {}) : {};
	}

	/**
	 * @summary     将现有参数组合成一个 url
	 * @return      {String}
	 * */
	pack(){
		return this.protocol +'://'+
			this.host +
			(!this.port || this.port === '80' ? '' : ':'+ this.port) +
			this.path +
			this.query +
			(this.hash ? '#'+ this.hash : '');
	}
	/**
	 * @summary     替换当前的 params
	 * @param       {Object|String[]|...String} params
	 * @return      {Url}                       this
	 * @desc        当为多个 string 时，为删除当前 url 上参数，当为 object 时为设置当前 url 上参数
	 * */
	changeParams(params){
		let argv
			;

		if( typeof params === 'string' ){
			argv = [].slice.call( arguments );
		}
		else{
			argv = params;
		}

		if( Array.isArray( argv ) ){
			argv.forEach((d)=>{
				if( typeof d === 'string' ){
					delete this.params[d];
				}
			});
		}
		else if( typeof argv === 'object' ){
			Object.keys( argv ).forEach((d)=>{
				this.params[d] = params[d];
			});
		}

		return this;
	}
	/**
	 * @summary 将当前 url 实例的属性替换为目标 url 实例的属性
	 * @param   {Url}   url
	 * @return  {Url}   this
	 * */
	changeTo(url){
		let source = this.source
			;

		Url._INDEX.filter( k => k !== 'query' ).forEach((k)=>{
			this[k] = url[k];
		});

		this.from = source;

		return this;
	}

	/**
	 * @summary toString 方法
	 * @return  {String}
	 * */
	toString(){
		return JSON.stringify( Url._INDEX.reduce((rs, k)=>{
			rs[k] = this[k];

			return rs;
		}, {}) );
	}
	/**
	 * @summary toJSON 方法
	 * @return  {Object}
	 * @desc    JSON.stringify 序列号 Model 及子类的实例对象时调用
	 * */
	toJSON(){
		return Url._INDEX.reduce((rs, k)=>{
			rs[k] = this[k];

			return rs;
		}, {});
	}
}

let url = new Url()
	;

/**
 * @summary     Url 类对象
 * @type        {Url}
 * @memberOf    url
 * */
url.Url = Url;
/**
 * @summary     对 url 进行解析
 * @method
 * @memberOf    url
 * @param       {String|Url}    url
 * @return      {Url}           若出入的 url 参数是一个 Url 对象，则不做处理直接返回
 * */
url.parseUrl = (url)=>{
	if( url instanceof Url ){
		return url;
	}
	else if( typeof url === 'string' ){
		return new Url( url );
	}
	else{
		return new Url();
	}
};
/**
 * @summary     对没有协议头（以 // 开头）的路径加上协议头
 * @method
 * @memberOf    url
 * @param       {String}    url
 * @return      {String}
 * */
url.addProtocol = (url)=>{
	return /^\/\//.test( url ) ? this.protocol + url : url;
};

/**
 * @summary     刷新当前页面
 * @method
 * @memberOf    url
 * */
url.reload = ()=>{
	location.reload();
};
/**
 * @summary     页面后退
 * @method
 * @memberOf    url
 * @return      {Url}   this
 * */
url.back = ()=>{
	history.back();

	return this;
};

/**
 * @summary     设置页面 hash
 * @method
 * @memberOf    url
 * @param       {String}    hash
 * @return      {Url}       this
 * */
url.setHash = function(hash){
	this.hash = hash;
	location.hash = hash;

	return this;
};

// ---------- url 上的参数操作 ----------
/**
 * @summary     调整参数并指向调整后的路径，当前 url 添加到历史记录
 * @method
 * @memberOf    url
 * @param       {Object|String[]|...String} params
 * @param       {*|Object}                  [pushState]
 * @return      {Url}                       this
 * @desc        只有两种情况下 pushState 才有效：
 *              1.当 params 是 Object 类型时
 *              2.当不满足 1 条件时，参数中的最后一个为 Object 类型时，视为 pushState
 * */
url.pushParams = function(params, pushState){
	let argc = arguments.length
		, argv = arguments
		, state = null
		;

	if( argc > 1 ){
		if( typeof params === 'object' ){
			state = argv[1];
		}
		else if( typeof argv[argc -1] === 'object' ){
			state = argv[argc -1];
			argv = [].slice.call(argv, 0, -1);
		}
	}

	this.changeParams(...argv);

	// 将当前浏览器上 url 换为替换后组装出来的链接，当期 url 进入
	history.pushState(state, '', this.pack());

	return this;
};
/**
 * @summary     替换当前 url 上的参数
 * @method
 * @memberOf    url
 * @param       {Object|String[]|...String} params
 * @param       {*|Object}                  [replaceState]
 * @return      {Url}                       this
 * @desc        执行效果
 * */
url.replaceParams = function(params, replaceState){
	let argc = arguments.length
		, argv = arguments
		, state = null
		;

	if( argc > 1 ){
		if( typeof params === 'object' ){
			state = argv[1];
		}
		else if( typeof argv[argc -1] === 'object' ){
			state = argv[argc -1];
			argv = [].slice.call(argv, 0, -1);
		}
	}

	this.changeParams(...argv);

	// 将当前浏览器上 url 换为替换后组装出来的链接
	history.replaceState(state, '', this.pack());

	return this;
};

// ---------- 修改 url 历史记录 ----------
/**
 * @summary     将 url 指向目标路径，当前 url 添加到历史记录
 * @method
 * @memberOf    url
 * @param       {String}    href
 * @param       {Object}    [state=null]
 * @return      {Url}       this
 * */
url.pushHistory = function(href, state=null){
	history.pushState(state, '', href);

	this.changeTo( this.parseUrl(href) );

	return this;
};
/**
 * @summary     替换当前 url 为目标路径
 * @method
 * @memberOf    url
 * @param       {String}    href
 * @param       {Object}    [state=null]
 * @return      {Url}       this
 * */
url.replaceHistory = function(href, state=null){
	history.replaceState(state, '', href);

	this.changeTo( this.parseUrl(href) );

	return this;
};

// ---------- 页面跳转操作 ----------
/**
 * @summary     跳转到目标页面，当前 url 添加到历史记录
 * @method
 * @memberOf    url
 * @param       {String}    href
 * */
url.changePage = function(href){
	location.assign( href );
};
/**
 * @summary     替换当前 url 为目标路径，页面刷新
 * */
url.replacePage = function(href){
	location.replace( href );
};

// ---------- 相关事件处理 ----------
/**
 * @summary     监听 hashChange 事件
 * @type        {Listener}
 * @memberOf    url
 * */
url.hashChange = listener('hashchange', (e, newUrl)=>{
	let temp
		;

	if( e.newUrl ){
		temp = url.parseUrl( e.newUrl );
	}
	else if( newUrl ){
		temp = url.parseUrl( newUrl );
	}

	if( temp ){
		// 替换当前 url 对象属性
		url.changeTo( temp );
	}
});
/**
 * @summary     监听 popstate 事件
 * @type        {Listener}
 * @memberOf    url
 * */
url.popState = listener('popstate', (e, newUrl)=>{
	let temp
		, state = e.state
		;

	if( newUrl ){
		temp = url.parseUrl( newUrl );
	}
	else{
		temp = url.parseUrl( location.href );
	}

	// 替换当前 url 对象属性
	url.changeTo( temp );

	// todo state 做什么？
	if( typeof state === 'string' ){
		try{
			state = JSON.parse( state );
		}
		catch(e){}
	}
});

/**
 * @exports     url
 * @type        {Object}
 * @memberOf    maple
 * */
export default url;