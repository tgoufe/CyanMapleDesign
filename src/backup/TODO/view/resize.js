'use strict';

/**
 * @file    全局事件 resize
 *          使用捕捉方式
 * */

import {listener}   from '../listener.js';

/**
 * @memberOf    maple.view
 * @type        {Listener}
 * */
let resize = listener('resize', {
		useDebounce: true
	})
	;

export default resize;