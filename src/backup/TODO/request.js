'use strict';

/**
 * @file    单独抽象的 ajax 请求接口
 *          目前数据请求依赖于 jQuery.ajax 方法
 *          该接口并不会被暴露为框架接口，仅作为二次开发时覆盖用
 *          框架发送 ajax 仍然应使用 ServiceModel 的实例来进行发送
 * @todo    替换为自开发请求类库
 * */

import $    from 'jquery';

/**
 * 发送请求方法
 * @param   {String}    topic
 * @param   {Object}    options
 * @return  {Promise}
 * */
let request = (topic, options)=>{
	try{
		return $.ajax(topic, options).then((res)=>{
			return res;
		}, (msg)=>{
			return Promise.reject( msg );
		});
	}
	catch(e){
		console.log( e.message );
		return Promise.reject( e );
	}
};

export default request;