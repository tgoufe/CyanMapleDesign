'use strict';

/**
 * @file    view    视图功能聚合
 * */

/**
 * @namespace   maple.view
 * */

import resize       from './resize.js';
import scroll       from './scroll.js';
import deviceMotion from './deviceMotion.js';
import message      from './message.js';

// todo ? 实现页面回退刷新
// import pageShow     from './pageShow.js';

/**
 * 统计将用的的事件
 * */
import beforeunload from './beforeunload.js';
import unload       from './unload.js';

let needRefreshOn = false

	/**
	 * @summary     设置页面回退时刷新该页面
	 * @function
	 * @memberOf    maple.view
	 * @desc        当 Chrome 由当前页面跳转到下一页面后，浏览回退到当前页面时，页面不会刷新，调用此函数以达成刷新页面的效果
	 * */
	, needRefresh = ()=>{
		if( needRefreshOn ){
			return ;
		}

		window.onunload = ()=>{};
		// window.onpagehide = ()=>{
		// 	window.onpageshow = ()=>{
		// 		location.reload();
		// 	}
		// };

		needRefreshOn = true;
	}
	/**
	 * @summary     获取节点的方位、大小信息
	 * @function
	 * @memberOf    maple.view
	 * @param       {Element}       target
	 * @param       {String}        [key]
	 * @return      {Object|Number}
	 * */
	, offset = (target, key)=>{
		let rs = null
			;

		if( 'getBoundingClientRect' in target ){
			rs = target.getBoundingClientRect();

			if( key ){
				rs = rs[key];
			}
		}

		return rs;
	}

	/**
	 * @summary     向其它窗口 或 Web Worker 发送消息
	 * @function
	 * @memberOf    maple.view
	 * @param       {Window|Worker} targetWindow
	 * @param       {*}             message
	 * @param       {String}        [targetOrigin='*']  * 表示无限制，也可以是一个 url
	 * @param       {*}             [transfer]
	 * */
	, postMessage = (targetWindow, message, targetOrigin='*', transfer)=>{
		targetWindow.postMessage(message, targetOrigin, transfer);
	}
	;

/**
 * @exports view
 * */
export default {
	resize
	, scroll
	, deviceMotion
	, message

	// , pageShow

	, beforeunload
	, unload

	, offset
	, needRefresh
	, postMessage
};