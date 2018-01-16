'use strict';

/**
 * @file    将 2 个对象合并成一个新的对象
 * */

/**
 * @summary     将 2 个对象合并成一个新的对象
 * @function    merge
 * @memberOf    maple.util
 * @param       {Object}    target
 * @param       {Object}    defaults
 * @return      {object}
 * */
let merge = function(target, defaults){
	let temp = Object.keys( defaults ).reduce((all, d)=>{

		if( d in target ){
			all[d] = target[d];
		}
		else{
			all[d] = defaults[d];
		}

		return all;
	}, {});

	return Object.keys( target ).reduce((all, d)=>{
		if( !(d in all) ){
			all[d] = target[d];
		}

		return all;
	}, temp);
};

export default merge;