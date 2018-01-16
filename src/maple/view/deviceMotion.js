'use strict';

/**
 * @file    陀螺仪事件
 * */

import {listener}   from '../listener.js';

/**
 * @memberOf    maple.view
 * @type        {Listener}
 * */
let deviceMotion = null
	, type = ''
	;

if( 'DeviceMotionEvent' in window ){    // 获取陀螺仪加速度
	type = 'devicemotion';
}
// else if( 'DeviceOrientationEvent' in window ){  // 获取旋转信息
// 	eventType = 'deviceorientation';
// }

if( type ){
	deviceMotion = listener(type, {
		useDebounce: true
	}); 
}

export default deviceMotion;