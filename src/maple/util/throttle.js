'use strict';

/**
 * @file    节流函数
 *          保证一个函数在固定的时间内只执行一次
 * */

/**
 * @summary     节流函数
 * @function    throttle
 * @memberOf    maple.util
 * @param       {Function}  func
 * @param       {Number}    wait
 * @param       {Function}  [cancelCB]  当前操作无法执行时的回调函数
 * @param       {Boolean}   [leading]   当值为 true 时函数在每个等待时延的开始被调用，否则函数在每个等待时延的结束被调用
 * @return      {Function}
 * @desc        在间隔时间中再次调用结果函数，将在间隔时间结束后立即执行
 * */
let throttle = function(func, wait, cancelCB, leading){
	let timeout = null
		, lastTrigger = false
		, lastTriggerOpts = null
		, result = function(){
			let that = this || null
				, argv = [].slice.call( arguments )
				;

			if( !timeout ){
				func.apply(that, argv || []);

				timeout = setTimeout(function(){
					clearTimeout( timeout );
					timeout = null;

					if( lastTrigger ){  // 在间隔时间中调用了该事件，执行最后一次
						result.call(lastTriggerOpts.that, lastTriggerOpts.argv);

						lastTrigger = false;
	                    lastTriggerOpts = null;
					}
				}, wait);
			}
			else{   // 在间隔时间中
				if( leading ){
					lastTrigger = true;

					lastTriggerOpts = {
						that
						, argv
					}
				}
			}
		}
		;

	if( typeof cancelCB === 'boolean' ){
		leading = cancelCB;

		cancelCB = null;
	}

	/**
	 * 取消计时器
	 * */
	result.cancel = function(){
		if( timeout ){
			clearTimeout( timeout );
			timeout = null;
		}

		lastTrigger = false;
		lastTriggerOpts = null;

		cancelCB && cancelCB();
	};

	/**
	 * 取消定时器，立即执行
	 * @param   {Object}    [context=null]  执行函数时的 this 指向
	 * @param   {Array}     [argv=[]]       执行函数时的传入参数
	 * */
	result.immediate = function(context=null, argv=[]){
		result.cancel();

		lastTrigger = false;
		lastTriggerOpts = null;

		result.call(context, argv);
	};

	return result;
};

export default throttle;