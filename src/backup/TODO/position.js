'use strict';

/**
 * @file    对地理定位接口进行封装
 * */

import merge from './util/merge.js';

/**
 * @summary     获取定位信息
 * @function    position
 * @param       {Object}    [options={}]                        定位接口的参数
 * @param       {Boolean}   [options.enableHighAccuracy=false]  是否浏览器获取高精度的位置
 * @param       {Number}    [options.timeout=2000]              超时时间，单位毫秒
 * @param       {Number}    [options.maximumAge=5000]           最长有效期
 * @return      {Promise}
 * */
let position = function(options={}){
	let result
		;

	if( 'geolocation' in navigator ){
		result = new Promise(function(resolve, reject){
			let opts = merge(options, position._CONFIG);
			
			navigator.geoposition.getCurrentPosition(resolve, reject, opts);
		});
	}
	else{
		result = Promise.reject( new Error('您的浏览器不支持地理定位功能') );
	}

	return result;
};

position._CONFIG = {
	// 指示浏览器获取高精度的位置，默认为 false
	enableHighAccuracy: true
	// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
	, timeout: 2000
	// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置
	, maximumAge: 5000
};

/**
 * @exports position
 * */
export default position;