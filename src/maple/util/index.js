'use strict';

/**
 * @file    工具函数聚合页面
 * */

/**
 * @namespace   maple.util
 * */

// 操作类
import debounce     from './debounce.js';
import throttle     from './throttle.js';
import lockup       from './lockup.js';

// 数据处理类
import merge        from './merge.js';
import classify     from './classify.js';

// 时间格式处理
import dateFormat   from './dateFormat.js';

import HandlerQueue from './handlerQueue.js';

// 验证
// import validate     from './validate.js';

// 工具函数
import tools        from './tools.js';

export default {
	debounce
	, throttle
	, lockup

	, merge
	, classify

	, dateFormat

	, HandlerQueue

	// , validate
	, tools
};