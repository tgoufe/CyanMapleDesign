'use strict';

/**
 * @file    锁定函数
 *          当函数运行时，其它操作将无法运行函数，直到将锁解除
 * */

/**
 * @summary     锁定操作函数
 * @function    lockup
 * @memberOf    maple.util
 * @param       {Function}  func
 * @return      {Function}
 * */
let lockup = function(func){
	let result = function(){

			if( result._enable ){
				result._enable = false;

				return func.apply(null, arguments);
			}
		}
		;

	result._enable = true;

	result.clear = function(){
		result._enable = true;
	};

	return result;
};

export default lockup;