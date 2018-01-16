'use strict';

/**
 * @file    postMessage 事件
 * */

import {listener} from "../listener.js";

/**
 * @memberOf    maple.view
 * @type        {Listener}
 * */
let message = listener('message')
	;

export default message;