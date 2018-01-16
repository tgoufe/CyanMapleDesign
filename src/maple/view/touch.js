'use strict';

/**
 * @file    全局事件 pointer
 *          使用捕捉方式
 *          存在 point 事件时使用 pointer 事件
 *          否则存在 touch 事件时使用 touch 事件替代
 *          否则使用 mouse 事件替代
 * */

import {listener}   from '../listener.js';

// const pointerEventType = [
// 		'over'
// 		, 'enter'
// 		, 'down'
// 		, 'move'
// 		, 'up'
// 		, 'cancel'
// 		, 'out'
// 		, 'leave'
// 	]
// 	, touchEventType = [
// 		'start'
// 		, 'end'
// 		, 'move'
// 		, 'cancel'
// 	]
// 	, mouseEventType = [
// 		'click'
// 		, 'up'
// 		, 'down'
// 		, 'move'
// 		, 'enter'
// 		, 'leave'
// 		, 'out'
// 		, 'over'
// 	]
// 	;

let start
	, move
	, end

	// todo 用途？
	, over
	, out
	, enter
	, leave
	;

if( 'PointerEvent' in window ){
	start   = listener('pointerdown');
	move    = listener('pointermove');
	end     = listener('pointerup');

	// todo 用途？
	over    = listener('pointerover');
	out     = listener('pointerout');
	enter   = listener('pointerenter');
	leave   = listener('pointerleave');
}
else if( 'TouchEvent' in window ){
	start   = listener('touchstart');
	move    = listener('touchmove');
	end     = listener('touchend');
}
else{
	start   = listener('mousedown');
	move    = listener({
		type: 'mousemove'
	});
	end     = listener('mouseup');

	// todo 用途？
	over    = listener('mouseover');
	out     = listener('mouseout');
	enter   = listener('mouseenter');
	leave   = listener('mouseleave');
}
