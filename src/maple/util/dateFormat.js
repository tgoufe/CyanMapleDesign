'use strict';

/**
 * @file    时间格式处理函数
 * */

import tools from './tools.js';

/**
 * @summary     时间格式处理函数
 * @function    dateFormat
 * @memberOf    maple.util
 * @param       {Date}      [date=new Date()]
 * @param       {String}    [format='YYYY-MM-DD']
 * @return      {String}
 * */
let dateFormat = function(date=new Date(), format='YYYY-MM-DD'){
	return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/, function(str){
		return str in dateFormat._dateStrReplace ? dateFormat[str]( date ) : '';
	});
};

/**
 * 时间格式字符串替换函数集合
 * */
dateFormat._dateStrReplace = {
	/**
	 * @summary 替换 YYYY
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	YYYY(date){
		return date.getFullYear() +'';
	}
	/**
	 * @summary 替换 YY
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, YY(date){
		return (date.getFullYear() +'').slice(2);
	}
	/**
	 * @summary 替换 MM
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, MM(date){
		return tools.fillZero(date.getMonth() +1, 2);
	}
	/**
	 * @summary 替换 DD
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, DD(date){
		return tools.fillZero(date.getDate(), 2);
	}
	/**
	 * @summary 替换 hh
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, hh(date){
		return tools.fillZero(date.getHours(), 2);
	}
	/**
	 * @summary 替换 mm
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, mm(date){
		return tools.fillZero(date.getMinutes(), 2);
	}
	/**
	 * @summary 替换 ss
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, ss(date){
		return tools.fillZero(date.getSeconds(), 2);
	}
	/**
	 * @summary 替换 www
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, www(date){
		return dateFormat._WEEK_EN[date.getDay()].slice(0, 3);
	}
	/**
	 * @summary 替换 week
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, week(date){
		return dateFormat._WEEK_EN[date.getDay()];
	}
	/**
	 * @summary 替换星期
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, '星期': function(date){
		return '星期'+ dateFormat._WEEK_CN[date.getDay()];
	}
	/**
	 * @summary 替换周
	 * @param   {Date}      date
	 * @return  {String}
	 * */
	, '周': function(date){
		return '周'+ dateFormat._WEEK_CN[date.getDay()];
	}
};

/**
 * @summary 将字符串或数字转成毫秒数
 * @param   {Number|String} str
 * @param   {String}        [unit='d']
 * @return  {Number}
 * */
dateFormat.formatTimeStr = function(str, unit='d'){
	let result = 0
		, temp
		;

	if( typeof str === 'number' ){
		if( unit && unit in dateFormat._SHORT_TIME_NUM ){
			result = str * dateFormat._SHORT_TIME_NUM[unit];
		}
		else{
			result = str;
		}
	}
	else if( typeof str === 'string' && (temp = dateFormat._SHORT_TIME_EXPR.exec(str)) ){
		result = Number( temp[1] ) * (dateFormat._SHORT_TIME_NUM[temp[2]] || 1);
	}
	
	return result;
};
/**
 * 英文一周名称
 * */
dateFormat._WEEK_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
/**
 * 中文一周名称
 * */
dateFormat._WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'];

/**
 * 简短时间设置格式
 * @const
 * @static
 * */
dateFormat._SHORT_TIME_EXPR = /^(-?\d+)(s|m|h|d|y)?$/i;
/**
 * 时间单位对应的毫秒数
 * @const
 * @static
 * */
dateFormat._SHORT_TIME_NUM = {
	s: 1e3
	, m: 6e4
	, h: 36e5
	, d: 864e5
	, y: 31536e6
};

export default dateFormat;