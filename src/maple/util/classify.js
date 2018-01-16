'use strict';

/**
 * @file    将对象数组转为一个以期望键值为索引， 值为包含该键值的对象组成的数组
 * */

/**
 * @summary     将对象数组转为一个以期望键值为索引， 值为包含该键值的对象组成的数组
 * @function    classify
 * @memberOf    maple.util
 * @param       {Object[]}  target
 * @param       {String}    key
 * @return      {Object}
 * @desc        如果对象不包含 key，则该对象不会出现在返回值中
 * */
let classify = function(target, key){
	return target.reduce((all, d)=>{
		if( d[key] ){

			if(!(d[key] in all) ){
				all[d[key]] = [];
			}

			all[d[key]].push( d );
		}

		return all;
	}, {});
};

export default classify;