/**
 * Created by chenqifeng on 2016/8/26.
 */

let cache = {};

export let isTimeStr = (str = '') => /^\d+(s|m|h|d|y)?$/.test(str);

export let formatTimeStr = (str = '') =>{
    if (!isTimeStr(str)) {
        return 0;
    }
    let num = Number(str.match(/\d+/)[0]);
    if (/s$/.test(str)) {
        return num * 1000;
    } else if (/m$/.test(str)) {
        return num * 60 * 1000;
    } else if (/h$/.test(str)) {
        return num * 60 * 60 * 1000;
    } else if (/d$/.test(str)) {
        return num * 24 * 60 * 60 * 1000;
    }else if (/y$/.test(str)) {
        return num * 365 * 24 * 60 * 60 * 1000;
    } else {
        return num;
    }
};

export let formatDateByStr = (date = new Date(),format = 'YYYY-MM-DD') =>{
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
    return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a) {
        switch (a) {
            case "YYYY": return date.getFullYear();
            case "YY": return (date.getFullYear()+"").slice(2);
            case "MM": return (date.getMonth() + 1 < 10) ? "0"+ (date.getMonth() + 1) : date.getMonth() + 1;
            case "DD": return (date.getDate() < 10) ? "0"+ date.getDate() : date.getDate();
            case "hh": return (date.getHours() < 10) ? "0"+ date.getHours() : date.getHours();
            case "mm": return (date.getMinutes() < 10) ? "0"+ date.getMinutes() : date.getMinutes();
            case "ss": return (date.getSeconds() < 10) ? "0"+ date.getSeconds() : date.getSeconds();
            case "星期": return "星期" + week[date.getDay() + 7];
            case "周": return "周" +  week[date.getDay() + 7];
            case "week": return week[date.getDay()];
            case "www": return week[date.getDay()].slice(0,3);
        }
    });
}

export let parseURL = (url = location.href) => {
    let a = document.createElement('a');
    a.href = url;
    return {
        source: url || location.href,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            let ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                s;
            for (let i = 0; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
};

/**
 * options:{
 * 	key:"",
 *  runNow:true, 是否立即执行
 *  time:1000, 每一秒执行一次
 *  fn:function(){} //每一秒执行的函数
 * }
 */
export let everyTime = options => {
    if (!(options.key in cache)) {
        if (options.runNow) {
            options.fn();
        }
        let fn = function loop() {
            cache[options.key] = setTimeout(loop, options.time);
            options.fn();
        };
        cache[options.key] = setTimeout(fn, options.time);
    }
};

export let stopTime = key => {
    window.clearTimeout(cache[options.key]);
    delete cache[options.key];
};

export let stopAllTime = key => {
    for (let i in cache) {
        if (cache.hasOwnProperty(i)) {
            window.clearTimeout(cache[i]);
        }
    }
    cache = {}
};

export let isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

export let calculationTimeByMiniSeconds = (millisecond, notZerofill) => {
    //共多少豪秒
    millisecond = Math.round(millisecond/100)

    let minisecond = millisecond % 10;


    //共多少秒
    let timeDistanceSec = Math.round((millisecond - minisecond)/10);
    //秒
    let seconds = timeDistanceSec % 60;
    //所有的分
    let timeDistanceMin = Math.round((timeDistanceSec - seconds) / 60);
    //真正的分
    let minutes = timeDistanceMin % 60;
    //所有的小时
    let timeDistanceHour = Math.round((timeDistanceMin - minutes) / 60);
    //真正的小时
    let hours = timeDistanceHour % 24;
    //真正的天
    let days = Math.round((timeDistanceHour - hours) /24);
    //如果为一位，填零
    if (days < 10 && !notZerofill) {
        days = "0" + days;
    }
    if (minutes < 10 && !notZerofill) {
        minutes = "0" + minutes;
    }
    if (hours < 10 && !notZerofill) {
        hours = "0" + hours;
    }
    if(seconds < 10 && !notZerofill) {
        seconds = "0" + seconds;
    }
    return {
        "minisecond":minisecond,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "days":days
    };
};
//
// /**
//  * @method  sortBy
//  * @param   array   {Array}
//  * @param   condition   {Array|Function}
//  * @desc    对 json 数组多条件排序，只针对所有条件为同一级别，若 json 对象不存在该属性则默认值为 0
//  * @example
//  * var a = [{a:1,b:2,c:3,d:2}
//     , {a:2,b:1,c:3}
//     , {a:0, b:1,c:1}
//     , {a:1,b:1,c:3,d:1}
//     , {a:1, b:1,c: 1}
//     ]
//     sortBy(a, ['a', 'c'])
//  * */
// export let sortBy = (array, condition) => {
//
//     if( Array.isArray( array ) ){
//         if( condition ){
//             if( typeof condition === 'function' ){
//                 array.sort( condition );
//             }
//             else if( Array.isArray( condition ) ){
//                 array.sort((a, b) => {
//                     let t = condition[0]
//                         , i = 1
//                         , l = condition.length
//                         , rs = a[t] - b[t]
//                         ;
//
//                     if( rs === 0 ){
//                         for(; i < l; i++ ){
//                             t = condition[i];
//                             rs = (a[t] || 0) - (b[t] || 0);
//
//                             if( rs !== 0 ){
//                                 break;
//                             }
//                         }
//                     }
//
//                     return rs;
//                 });
//             }
//         }
//     }
//     return array;
// };