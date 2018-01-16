'use strict';

/**
 * @file    全局事件 scroll
 *          使用捕捉方式
 * */

import {listener}   from '../listener.js';

/**
 * @memberOf    maple.view
 * @type        {Listener}
 * */
let scroll = listener('scroll', {
		useDebounce: true
	})
	;
let scrollTarget
	, body = document.body
	, doc = document.documentElement
	, tempTop = body.scrollTop
	;

/**
 * @summary     禁止页面滚动
 * @method
 * @memberOf    scroll
 * @param       {Boolean}   disabled
 * */
scroll.disabled = function(disabled){
	if( disabled ){
		this._overflowState = window.getComputedStyle( body ).overflow || 'visible';

		body.style.overflow = 'hidden';
	}
	else{
		body.style.overflow = this._overflowState || 'visible';
	}
};

/**
 * 测试获取滚动条信息的对象为 document.body 还是 document.documentElement
 * */

body.scrollTop = tempTop +1;

if( body.scrollTop === tempTop +1 ){    // document.body 可用
	scrollTarget = body;

	body.scrollTop = tempTop;
}
else{
	scrollTarget = doc;
}

/**
 * @summary     设置或读取当前页面滚动条位置
 * @method
 * @memberOf    scroll
 * @param       {String}        offset  获取方位基准，取值为 'top','bottom','left','right' 中一个
 * @param       {String|Number} [value] 设置滚动条的位置
 * @return      {Object|Null}
 * */
scroll.scrollBar = function(offset, value){
	let argc = arguments.length
		, curr = 0
		, total = 1
		, view = 1
		, regexp = /^(\d+(?:\.\d+)?)(%|view)?$/
		, temp
		;

	if( argc === 1 ){   // 读操作

		switch( arguments[0] ){
			case 'top':
				total = scrollTarget.scrollHeight;
				curr = scrollTarget.scrollTop;
				view = doc.clientHeight;
				break;
			case 'bottom':
				total = scrollTarget.scrollHeight;
				view = doc.clientHeight;
				curr = total - scrollTarget.scrollTop - view;
				break;
			case 'left':
				total = scrollTarget.scrollWidth;
				curr = scrollTarget.scrollLeft;
				view = doc.clientWidth;
				break;
			case 'right':
				total = scrollTarget.scrollWidth;
				view = doc.clientWidth;
				curr = total - scrollTarget.scrollLeft - view;
				break;
			default:
				break;
		}

		return {
			px: curr
			, percent: Math.floor(curr / total * 100)
			, view: parseFloat((curr / view).toFixed(1))
		};
	}
	else{   // 写 操作
		temp = regexp.exec( value );

		if( temp ){
			switch( offset ){
				case 'top':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = curr * scrollTarget.scrollHeight / 100;
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = curr * doc.clientHeight;
					}

					scrollTarget.scrollTop = curr;
					break;
				case 'bottom':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = Math.max(scrollTarget.scrollHeight * (1 - curr / 100), 0);
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = Math.max(scrollTarget.scrollHeight - curr * doc.clientHeight, 0);
					}
					else{
						curr = Math.max(scrollTarget.scrollHeight - curr, 0);
					}

					scrollTarget.scrollTop = curr;
					break;
				case 'left':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = curr * scrollTarget.scrollWidth / 100;
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = curr * doc.clientWidth;
					}

					scrollTarget.scrollLeft = curr;
					break;
				case 'right':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = Math.max(scrollTarget.scrollWidth * (1 - curr / 100), 0);
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = Math.max(scrollTarget.scrollWidth - curr * doc.clientWidth, 0);
					}
					else{
						curr = Math.max(scrollTarget.scrollWidth - curr, 0);
					}

					scrollTarget.scrollLeft = curr;
					break;
				default:
					break;
			}
		}
		else{
			console.log('scrollBar 参数设置错误');
		}
	}
};

export default scroll