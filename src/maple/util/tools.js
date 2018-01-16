'use strict';

/**
 * @namespace   maple.util.tools
 * */

/**
 * @summary     将数字转成字符串在前面补 0
 * @function    fillZero
 * @memberOf    maple.util.tools
 * @param       {Number|String} str
 * @param       {Number}        len
 * @return      {String}
 * */
let fillZero = function(str, len){
	let i
		;

	str += '';

	if( len > str.length ){
		for(i = str.length; i < len; i++){
			str = '0'+ str;
		}
	}

	return str;
};

export default {
	fillZero
};