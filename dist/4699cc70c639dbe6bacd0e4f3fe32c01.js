// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped, ModuleConfig) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(ModuleConfig);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chenqifeng on 2016/8/26.
 */

function Maple(selector, options) {
  return new Maple.prototype.init(selector, options);
}
Maple.prototype.init = function (selector, options) {};
Maple.prototype.init.prototype = Maple.prototype;

exports.default = Maple;
},{}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chenqifeng on 2016/8/26.
 */

let cache = {};

let isTimeStr = exports.isTimeStr = (str = '') => /^\d+(s|m|h|d|y)?$/.test(str);

let formatTimeStr = exports.formatTimeStr = (str = '') => {
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
  } else if (/y$/.test(str)) {
    return num * 365 * 24 * 60 * 60 * 1000;
  } else {
    return num;
  }
};

let formatDateByStr = exports.formatDateByStr = (date = new Date(), format = 'YYYY-MM-DD') => {
  var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
  return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function (a) {
    switch (a) {
      case "YYYY":
        return date.getFullYear();
      case "YY":
        return (date.getFullYear() + "").slice(2);
      case "MM":
        return date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      case "DD":
        return date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      case "hh":
        return date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      case "mm":
        return date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      case "ss":
        return date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      case "星期":
        return "星期" + week[date.getDay() + 7];
      case "周":
        return "周" + week[date.getDay() + 7];
      case "week":
        return week[date.getDay()];
      case "www":
        return week[date.getDay()].slice(0, 3);
    }
  });
};

let parseURL = exports.parseURL = (url = location.href) => {
  let a = document.createElement('a');
  a.href = url;
  return {
    source: url || location.href,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: function () {
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
    }(),
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
let everyTime = exports.everyTime = options => {
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

let stopTime = exports.stopTime = key => {
  window.clearTimeout(cache[options.key]);
  delete cache[options.key];
};

let stopAllTime = exports.stopAllTime = key => {
  for (let i in cache) {
    if (cache.hasOwnProperty(i)) {
      window.clearTimeout(cache[i]);
    }
  }
  cache = {};
};

let isObject = exports.isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

let calculationTimeByMiniSeconds = exports.calculationTimeByMiniSeconds = (millisecond, notZerofill) => {
  //共多少豪秒
  millisecond = Math.round(millisecond / 100);

  let minisecond = millisecond % 10;

  //共多少秒
  let timeDistanceSec = Math.round((millisecond - minisecond) / 10);
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
  let days = Math.round((timeDistanceHour - hours) / 24);
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
  if (seconds < 10 && !notZerofill) {
    seconds = "0" + seconds;
  }
  return {
    "minisecond": minisecond,
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds,
    "days": days
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
},{}],19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookie = undefined;

var _util = require("../util");

const pluses = /\+/g;

function encode(s) {
  return config.raw ? s : encodeURIComponent(s);
}

function decode(s) {
  return config.raw ? s : decodeURIComponent(s);
}

function stringifyCookieValue(value) {
  return encode(config.json ? JSON.stringify(value) : String(value));
}

function parseCookieValue(s) {
  if (s.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  try {
    // Replace server-side written pluses with spaces.
    // If we can't decode the cookie, ignore it, it's unusable.
    // If we can't parse the cookie, ignore it, it's unusable.
    s = decodeURIComponent(s.replace(pluses, ' '));
    return config.json ? JSON.parse(s) : s;
  } catch (e) {}
}

function read(s, converter) {
  let value = config.raw ? s : parseCookieValue(s);
  return $.isFunction(converter) ? converter(value) : value;
}

let config = $.cookie = function (key, value, options) {

  // Write

  if (value !== undefined && !$.isFunction(value)) {
    options = $.extend({}, config.defaults, options);

    if (typeof options.expires === 'number') {
      let days = options.expires,
          t = options.expires = new Date();
      t.setTime(+t + days * 864e+5);
    }
    return document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
    options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
  }

  // Read

  let result = key ? undefined : {};

  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all. Also prevents odd result when
  // calling $.cookie().
  let cookies = document.cookie ? document.cookie.split('; ') : [];

  for (let i = 0, l = cookies.length; i < l; i++) {

    let parts = cookies[i].split('=');
    let name = decode(parts.shift());
    let cookie = parts.join('=');

    if (key && key === name) {
      // If second argument (value) is a function it's a converter...
      result = read(cookie, value);
      //break;
    }

    // Prevent storing a cookie that we couldn't decode.
    if (!key && (cookie = read(cookie)) !== undefined) {
      result[name] = cookie;
    }
  }
  return result;
};

config.defaults = {};

$.removeCookie = function (key, options) {
  if ($.cookie(key) === undefined) {
    return false;
  }

  // Must not alter options, thus extending a fresh object...
  $.cookie(key, '', $.extend({}, options, { expires: -1 }));
  return !$.cookie(key);
};
/*---------- copy jquery.cookie end----------------*/

const cookie = function () {
  if (arguments[2] && (0, _util.isObject)(arguments[2])) {
    if ((0, _util.isTimeStr)(arguments[2]['expires'])) {
      arguments[2]['expires'] = new Date(new Date().getTime() + (0, _util.formatTimeStr)(arguments[2]['expires']));
    }
  }
  return $.cookie.apply(this, arguments);
};
cookie.remove = function () {
  return $.removeCookie.apply(this, arguments);
};

exports.cookie = cookie;
},{"../util":8}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chenqifeng on 2016/8/26.
 */

let sessionStorage = exports.sessionStorage = window.sessionStorage && window.sessionStorage.setItem && typeof window.sessionStorage.setItem === 'function';

let localStorage = exports.localStorage = window.localStorage && window.localStorage.setItem && typeof window.localStorage.setItem === 'function';

let replaceState = exports.replaceState = typeof history.replaceState === 'function';

let pushState = exports.pushState = typeof history.pushState === 'function';
},{}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionData = undefined;

var _support = require("../support");

var _util = require("../util");

let sessionKey = 'tg_session_cache',
    cache = _support.sessionStorage ? sessionStorage : false,
    data = _support.sessionStorage ? JSON.parse(cache.getItem(sessionKey) || JSON.stringify({})) : {},
    sessionData = function () {
  let length = arguments.length;
  if (!length) {
    return data;
  } else if (length === 1) {
    if ((0, _util.isObject)(arguments[0])) {
      data = $.extend({}, data, arguments[0]);
      cache && cache.setItem(sessionKey, JSON.stringify(data));
    } else {
      return data[arguments[0]];
    }
  } else if (length === 2) {
    data[arguments[0]] = arguments[1];
    cache && cache.setItem(sessionKey, JSON.stringify(data));
  }
};
sessionData.remove = function (key) {
  let length = arguments.length;
  if (!length) {
    this.removeAll();
  } else {
    for (let i = 0; i < length; i++) {
      data[arguments[i]] = undefined;
      delete data[arguments[i]];
    }
    cache && cache.setItem(sessionKey, JSON.stringify(data));
  }
};
sessionData.removeAll = function () {
  data = {};
  cache && cache.setItem(sessionKey, JSON.stringify(data));
};

exports.sessionData = sessionData;
},{"../support":9,"../util":8}],20:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localData = undefined;

var _support = require("../support");

var _util = require("../util");

let sessionKey = 'tg_local_cache',
    cache = _support.localStorage ? localStorage : false,
    data = _support.localStorage ? JSON.parse(cache.getItem(sessionKey) || JSON.stringify({})) : {},
    formatData = function () {
  let d = {},
      t = new Date().getTime();
  for (let i in data) {
    if (t - data[i].t < data[i].time || !data[i].time) {
      d[i] = data[i].value;
    }
  }
  return d;
},
    localData = function () {
  let length = arguments.length,
      d = {},
      t = new Date().getTime();
  if (!length) {
    return formatData();
  } else if (length === 1) {
    if ((0, _util.isObject)(arguments[0])) {
      for (let i in arguments[0]) {
        d[i] = { value: arguments[0][i], time: 0, t: t };
      }
      data = Object.assign({}, data, d);
      cache && cache.setItem(sessionKey, JSON.stringify(data));
    } else {
      return formatData()[arguments[0]];
    }
  } else if (length === 2) {
    if ((0, _util.isObject)(arguments[0]) && (0, _util.isTimeStr)(arguments[1])) {
      for (let i in arguments[0]) {
        d[i] = { value: arguments[0][i], time: (0, _util.formatTimeStr)(arguments[1]), t: t };
      }
      data = Object.assign({}, data, d);
    } else {
      data[arguments[0]] = { value: arguments[1], time: 0, t: t };
    }
    cache && cache.setItem(sessionKey, JSON.stringify(data));
  } else if (length === 3) {
    d[arguments[0]] = { value: arguments[1], time: (0, _util.formatTimeStr)(arguments[2]), t: t };
    data = Object.assign({}, data, d);
    cache && cache.setItem(sessionKey, JSON.stringify(data));
  }
};

localData.remove = function (key) {
  let length = arguments.length;
  if (!length) {
    this.removeAll();
  } else {
    for (let i = 0; i < length; i++) {
      data[arguments[i]] = undefined;
      delete data[arguments[i]];
    }
    cache && cache.setItem(sessionKey, JSON.stringify(data));
  }
};
localData.removeAll = function () {
  data = {};
  cache && cache.setItem(sessionKey, JSON.stringify(data));
};

exports.localData = localData;
},{"../support":9,"../util":8}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Url(url) {
  return new Url.prototype.init(url);
}

Url.prototype.init = function (url) {
  var a = document.createElement('a');
  a.href = url || location.href;
  this.source = url || location.href;
  this.protocol = a.protocol.replace(':', '');
  this.host = a.hostname;
  this.port = a.port;
  this.query = a.search;
  this.params = function () {
    var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        i = 0,
        s;
    for (; i < len; i++) {
      if (!seg[i]) {
        continue;
      }
      s = seg[i].split('=');
      ret[s[0]] = s[1];
      //删除微信下的?10000skip
      if (ret[s[0]] && typeof ret[s[0]] === 'string') {
        ret[s[0]] = ret[s[0]].replace(/\?10000skip(=true)?/, '');
      }
    }
    return ret;
  }();
  this.file = (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
  this.hash = a.hash.replace('#', '');
  this.path = a.pathname.replace(/^([^\/])/, '/$1');
  this.relative = (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1];
  this.segments = a.pathname.replace(/^\//, '').split('/');
  this.isUrl = function (url) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
    return !!regular.test(url);
  }(this.source);
  return this;
};
Url.prototype.init.prototype = Url.prototype;
Url.prototype.replace = function () {
  var key,
      argc = arguments[0],
      i,
      l,
      t,
      search = [];

  switch (typeof argc) {
    case 'string':
      for (i = 0, l = arguments.length; i < l; i++) {
        t = arguments[i];

        if (typeof t === 'string') {
          delete this.params[t];
        }
      }
      break;
    case 'object':
      for (key in argc) if (argc.hasOwnProperty(key)) {
        this.params[key] = argc[key];
      }
      break;
    default:
      break;
  }

  for (key in this.params) if (this.params.hasOwnProperty(key)) {
    search.push(key + '=' + this.params[key]);
  }

  this.query = search.length ? '?' + search.join('&') : '';

  history.replaceState(null, '', this.pack());

  return this;
};
Url.prototype.push = function () {
  var key,
      argc = arguments[0],
      i,
      l,
      t,
      search = [];

  switch (typeof argc) {
    case 'string':
      for (i = 0, l = arguments.length; i < l; i++) {
        t = arguments[i];

        if (typeof t === 'string') {
          delete this.params[t];
        }
      }
      break;
    case 'object':
      for (key in argc) if (argc.hasOwnProperty(key)) {
        this.params[key] = argc[key];
      }
      break;
    default:
      break;
  }

  for (key in this.params) if (this.params.hasOwnProperty(key)) {
    search.push(key + '=' + this.params[key]);
  }

  this.query = search.length ? '?' + search.join('&') : '';

  location.href = this.pack();
};
Url.prototype.pack = function () {
  return this.protocol + '://' + this.host + (!this.port || this.port === '80' ? '' : ':' + this.port) + this.path + this.query + (this.hash ? '#' + this.hash : '');
};
Url.prototype.init.call(Url);

exports.default = Url;
},{}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, data) {
  var styleString = '';
  styleString += 'font-size:13px;';
  styleString += 'font-family:"microsoft yahei";';
  styleString += 'color:#125ce8;';
  var line = '------------------';
  if (arguments.length !== 1) {
    console.log('%c' + line + text.toString() + line + '', styleString);
    for (var i = 1; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
    console.log('%c' + line + text.toString() + line + '\n\n\n', styleString);
  } else {
    console.log('%c' + line + line + '', styleString);
    console.log(text);
    console.log('%c' + line + line + '\n\n\n', styleString);
  }
};
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options = {}) {
  // function success(arr){
  //     alert(11)
  //     if(typeof options.success=='function'){
  //         options.success(arr.length==1?arr[0]:arr)
  //     }
  // }

  var arr = [],
      result;
  if (typeof options.url == 'string') {
    arr.push(options.url);
  } else if (Array.isArray(options.url) && options.url.every(item => typeof item === 'string')) {
    arr = options.url;
  } else {
    return;
  }

  switch (options.type) {
    case 'image':
    case 'img':
      result = Promise.all(arr.map(loadImg));
      break;
    case 'iframe':
      result = Promise.all(arr.map(loadIframe));
      break;
    default:
      break;
  }

  result.then(function (rs) {
    var succ = rs.filter(d => d !== null),
        fail = rs.filter(d => d === null);
    options.success && options.success(rs.length > 1 ? rs : rs[0]);
    // options.error && options.error(  )
  }, function () {});
  // if(options.type=='image'||options.type=='img'){
  //
  // }
  // else if(options.type=='iframe'){
  //
  //     var iframeArr=[]
  //
  //     arr.forEach(function(item,index,array){
  //         var iframe = document.createElement("iframe");
  //         iframe.src = item;
  //         if (iframe.attachEvent) {
  //             iframe.attachEvent("onload", function() {
  //                 iframeArray.push(iframe)
  //                 if(iframe.Array.length=arr.length){
  //                     success(iframe)
  //                 }
  //             });
  //         } else {
  //             iframe.onload = function() {
  //                 iframeArray.push(iframe)
  //                 if(iframe.Array.length=arr.length){
  //                     success(iframe)
  //                 }
  //             };
  //         }
  //     })
  // }
};

if (!('Promise' in window)) {
  window.Promise = function (exec) {
    var defer = $.Deferred();

    exec(defer.resolve, defer.reject);

    return defer.promise();
  };

  window.Promise.all = function (arr) {
    var i = 0,
        j = arr.length,
        defer = $.Deferred(),
        rs = new Array(j);

    arr.map((d, index) => {
      d.then(function (obj) {
        i++;

        rs[index] = obj;

        if (i === j) {
          defer.resolve(rs);
        }
      });
    });

    return defer.promise();
  };
}

function loadIframe(src) {
  return new Promise(function (resolve, reject) {
    let dom = document.createElement('iframe');
    dom.onload = function () {
      // var obj = {};
      // obj[src] = this;
      //
      // console.log(src, ' 加载成功');
      resolve(this);
    };
    dom.onerror = function () {
      // var obj = {};
      // obj[src] = null;
      // console.log(src, ' 加载失败', arguments);
      resolve(null);
    };
    dom.style.display = 'none';
    dom.src = src;
    document.body.appendChild(dom);
  });
}

function loadImg(src) {
  return new Promise(function (resolve, reject) {
    let dom = document.createElement('img');
    dom.onload = function () {
      // var obj = {};
      // obj[src] = this;
      //
      // console.log(src, ' 加载成功');
      resolve(this);
    };
    dom.onerror = function () {
      // var obj = {};
      // obj[src] = null;
      // console.log(src, ' 加载失败', arguments);
      resolve(null);
    };
    dom.src = src;
  });
}
},{}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var argv = arguments.length,
      body = document.body,
      doc = document.documentElement,
      curr = 0,
      total = 1,
      view = 1,
      regexp = /^(\d+(?:\.\d+)?)(%|view)?$/,
      temp;

  if (argv === 1) {
    // 读操作
    body = document.body;
    doc = document.documentElement;

    switch (arguments[0]) {
      case 'top':
        total = body.scrollHeight;
        curr = body.scrollTop;
        view = doc.clientHeight;
        break;
      case 'bottom':
        total = body.scrollHeight;
        view = doc.clientHeight;
        curr = total - body.scrollTop - view;
        break;
      case 'left':
        total = body.scrollWidth;
        curr = body.scrollLeft;
        view = doc.clientWidth;
        break;
      case 'right':
        total = body.scrollWidth;
        view = doc.clientWidth;
        curr = total - body.scrollLeft - view;
        break;
      default:
        break;
    }

    return {
      px: curr,
      percent: Math.floor(curr / total * 100),
      view: parseFloat((curr / view).toFixed(1))
    };
  } else {
    // 写操作
    temp = regexp.exec(arguments[1]);

    if (temp) {
      switch (arguments[0]) {
        case 'top':
          curr = parseFloat(temp[1]);

          if (temp[2] === '%') {
            // 百分比
            curr = curr * body.scrollHeight / 100;
          } else if (temp[2] === 'view') {
            // 屏数
            curr = curr * doc.clientHeight;
          }

          body.scrollTop = curr;
          break;
        case 'bottom':
          curr = parseFloat(temp[1]);

          if (temp[2] === '%') {
            // 百分比
            curr = Math.max(body.scrollHeight * (1 - curr / 100), 0);
          } else if (temp[2] === 'view') {
            // 屏数
            curr = Math.max(body.scrollHeight - curr * doc.clientHeight, 0);
          }

          body.scrollTop = curr;
          break;
        case 'left':
          curr = parseFloat(temp[1]);

          if (temp[2] === '%') {
            // 百分比
            curr = curr * body.scrollWidth / 100;
          } else if (temp[2] === 'view') {
            // 屏数
            curr = curr * doc.clientWidth;
          }

          body.scrollLeft = curr;
          break;
        case 'right':
          curr = parseFloat(temp[1]);

          if (temp[2] === '%') {
            // 百分比
            curr = Math.max(body.scrollWidth * (1 - curr / 100), 0);
          } else if (temp[2] === 'view') {
            // 屏数
            curr = Math.max(body.scrollWidth - curr * doc.clientWidth, 0);
          }

          body.scrollLeft = curr;
          break;
        default:
          break;
      }

      switch (temp[2]) {}

      if (temp[2] === '%') {
        // 百分比
        total = body.scrollHeight / 100;
      } else if (temp[2] === 'view') {
        // 屏数
        total = doc.clientHeight;
      } else {
        total = 1;
      }

      body[curr] = parseFloat(temp[1]) * total;
    } else {
      (0, _log2.default)('scrollBar 参数设置错误');
    }
  }
};

var _log = require("./log");

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./log":11}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alias = {
  androidchrome: 'androidChrome',
  guge: 'chrome',
  webview: 'webView',
  minimalui: 'minimalUi',
  statusbar: 'statusBar',
  pixelratio: 'pixelRatio',
  wechat: 'weixin',
  wx: 'weixin'
};

var device = function () {
  var l = arguments.length,
      i = 0,
      t,
      result = true;

  if (l === 0) {
    result = false;
  } else {
    for (; i < l; i++) {
      t = arguments[i];

      if (t in device && device.hasOwnProperty(t)) {
        result = result && device[t];
      } else {
        t = t.toLowerCase();

        if (t in alias) {
          result = result && device[alias[t]];
        } else {
          result = result && false;
        }
      }

      if (!result) {
        break;
      }
    }
  }

  return result;
};
var ua = navigator.userAgent;

var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

// Chrome
device.chrome = ua.toLowerCase().indexOf('chrome') >= 0;

// Android
if (android) {
  device.os = 'android';
  device.osVersion = android[2];
  device.android = true;
  device.androidChrome = device.android && device.chrome;
}
if (ipad || iphone || ipod) {
  device.os = 'ios';
  device.ios = true;
}
// iOS
if (iphone && !ipod) {
  device.osVersion = iphone[2].replace(/_/g, '.');
  device.iphone = true;
}
if (ipad) {
  device.osVersion = ipad[2].replace(/_/g, '.');
  device.ipad = true;
}
if (ipod) {
  device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  device.iphone = true;
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
  if (device.osVersion.split('.')[0] === '10') {
    device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
  }
}

// Webview
device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

// Minimal UI
if (device.os && device.os === 'ios') {
  var osVersionArr = device.osVersion.split('.');
  device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
}

// Check for status bar and fullscreen app mode
var windowWidth = $(window).width();
var windowHeight = $(window).height();

device.statusBar = device.webView && windowWidth * windowHeight === screen.width * screen.height;

// Classes
var classNames = [];

// Pixel Ratio
device.pixelRatio = window.devicePixelRatio || 1;
classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
if (device.pixelRatio >= 2) {
  classNames.push('retina');
}

// OS classes
if (device.os) {
  classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
  if (device.os === 'ios') {
    var major = parseInt(device.osVersion.split('.')[0], 10);
    for (var i = major - 1; i >= 6; i--) {
      classNames.push('ios-gt-' + i);
    }
  }
}
// Status bar classes
if (device.statusBar) {
  classNames.push('with-statusbar-overlay');
} else {
  $('html').removeClass('with-statusbar-overlay');
}

// Add html classes
if (classNames.length > 0) $('html').addClass(classNames.join(' '));

// keng..
device.weixin = /MicroMessenger/i.test(ua);

// UC �����
device.uc = ua.indexOf('UCBrowser') > -1;

exports.default = device;
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cmuiStyle;
var cssRules;
var cssRulesLen;
$(function () {
  cmuiStyle = document.createElement('style');
  document.head.appendChild(cmuiStyle);
  cssRules = _.get(cmuiStyle, 'sheet.cssRules');
  cssRulesLen = cssRules.length;
});
function setStyle() {}
function style() {
  if (arguments.length) {
    let argStringList = _.filter(arguments, _.isString);
    let selector = _.get(argStringList, 0);
    let name = _.camelCase(_.get(argStringList, 1)) || undefined;
    let value = _.get(argStringList, 2);
    value = _.find(arguments, _.isPlainObject) || value;
    if (selector && name && value) {
      //设置样式
      if (_.isString(value)) {
        let matchRule = _.findLast(cssRules, item => _.get(item, 'selectorText') == selector);
        if (matchRule) {
          matchRule.style[name] = value;
        } else {
          cmuiStyle.sheet.insertRule(selector + '{}', cssRulesLen);
          cmuiStyle.sheet.cssRules[cssRulesLen++].style[name] = value;
        }
      }
    } else if (selector && name) {
      if (value === undefined) {
        //读取样式
        return _.chain(cssRules).findLast(item => _.get(item, 'selectorText') == selector).get('style[' + name + ']').value();
      } else {
        //删除选择器下的具体样式
        _.chain(cssRules).findLast(item => _.get(item, 'selectorText') == selector).get('style').value().removeProperty(name);
      }
    } else if (selector && _.isPlainObject(value)) {
      _.forEach(value, (value, key) => {
        style(selector, key, value);
      });
    } else if (selector) {
      //读取样式
      if (name === '' || value === '') {} else {
        let tempStyle = _.chain(cssRules).findLast(item => _.get(item, 'selectorText') == selector).get('style');
        let arr = tempStyle.filter(item => item).value();
        return tempStyle.pick(arr).value();
      }
    }
  }
  return cmuiStyle;
}
exports.default = style;
//body background red
//selector styleObj
//selector
},{}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = new Vue();
},{}],48:[function(require,module,exports) {
var Vue // late bind
var version
var map = (window.__VUE_HOT_MAP__ = Object.create(null))
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cahced together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }
      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)
      instance.$forceUpdate()
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

},{}],47:[function(require,module,exports) {
var global = (1,eval)("this");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'symbol' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object';
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function no(a, b, c) {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check
var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned;
}

function cloneVNodes(vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if ("development" !== 'production' &&
  // skip validation for weex recycle-list child component props
  !(false && isObject(value) && '@binding' in value)) {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value === "undefined" ? "undefined" : _typeof(value);
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }
  /* istanbul ignore next */
  return false;
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val)) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if ("development" !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }observerState.shouldConvert = true;
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if ("development" !== 'production') {
      if (methods[key] == null) {
        warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, keyOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if ("development" !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    ret._isVList = true;
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInAlias, eventKeyName) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1;
    } else {
      return keyCodes !== eventKeyCode;
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    return resolveSlots(children, parent);
  };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  };
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) {
      applyNS(vnode, ns);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if ("development" !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || slot[0] && slot[0].elm) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ("development" !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue$3(options) {
  if ("development" !== 'production' && !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this, function (name) {
        return matches(val, name);
      });
    },
    exclude: function exclude(val) {
      pruneCache(this, function (name) {
        return !matches(val, name);
      });
    }
  },

  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
      // not included
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
        var blocker = function blocker(e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

// add a raw attr (use this in preTransforms)


// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);
  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def === "undefined" ? "undefined" : _typeof(def)) === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
  if ("development" !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
  }
}, 0);

/*  */

exports.default = Vue$3;
},{}],1:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vm = require('../../vm.js');

  var _vm2 = _interopRequireDefault(_vm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = {
    methods: {
      changeNumber: function changeNumber(num) {
        this.start = +this.start + num;
        if (this.max || this.max === 0) {
          this.start = this.start >= this.max ? this.max : this.start;
        }
        if (this.min || this.min === 0) {
          this.start = this.start <= this.min ? this.min : this.start;
        }
        _vm2.default.$emit('numChange', this, this.start);
        if (this.start === this.max) {
          _vm2.default.$emit('numMax', this, this.start);
        }
        if (this.start === this.min) {
          _vm2.default.$emit('numMin', this, this.start);
        }
      }
    },
    props: {
      reverse: { type: Boolean },
      radius: { type: Boolean },
      max: { type: Number },
      min: { type: Number },
      start: { type: Number, default: 0 },
      readonly: { type: Boolean, default: false },
      target: { type: Object }
    },
    computed: {
      canMax: function canMax() {
        if (this.max || this.max === 0) {
          return this.start < this.max;
        } else {
          return true;
        }
      },
      canMin: function canMin() {
        if (this.min || this.min === 0) {
          return this.start > this.min;
        } else {
          return true;
        }
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-number form" }, [_c('div', { staticClass: "inputGroup", class: { 'inputGroup-reverse': _vm.reverse, 'inputGroup-radius': _vm.radius } }, [_c('div', { staticClass: "input_addon", class: { 'disabled': !_vm.canMin }, on: { "click": function click($event) {
        _vm.changeNumber(-1);
      } } }, [_vm._v("-")]), _vm._v(" "), _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.start, expression: "start" }], attrs: { "type": "number", "readonly": _vm.readonly }, domProps: { "value": _vm.start }, on: { "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.start = $event.target.value;
      } } }), _vm._v(" "), _c('div', { staticClass: "input_addon", class: { 'disabled': !_vm.canMax }, on: { "click": function click($event) {
        _vm.changeNumber(1);
      } } }, [_vm._v("+")])])]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-ad391836", __vue__options__);
    } else {
      hotAPI.reload("data-v-ad391836", __vue__options__);
    }
  })();
}
},{"../../vm.js":16,"vue-hot-reload-api":48,"vue":47}],49:[function(require,module,exports) {
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],42:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ImagePreView() {
  var _ref;

  var id = _.uniqueId('preView_');
  var tpl = "\n        <transition name=\"fade\" id=\"" + id + "\">\n\t\t    <div class=\"fixed-full flex-container cmui-image-preView\" v-if=\"show\" @click=\"preViewListClick($event)\">\n\t\t        <cmui-slider :items=\"preViewList_temp\" :auto=\"0\" :loop=\"preViewList_temp.length>1\">\n\t\t            <cmui-slider-item v-for=\"item in preViewList_temp\" >\n\t\t                <img :src=\"item\" alt=\"\">\n\t\t            </cmui-slider-item>\n\t\t        </cmui-slider>\n\t\t    </div>\n\t    </transition>\n\t";
  $('body').append(tpl);
  var vm = new Vue({
    el: '#' + id,
    data: {
      preViewList_temp: (_ref = []).concat.apply(_ref, arguments),
      show: false
    },
    methods: {
      preViewListClick: function preViewListClick(event) {
        event.stopPropagation();
        if (!_.includes(_.get(event, 'target.classList'), 'swiper-pagination-bullet')) {
          this.$children[0].$destroy();
          vm.show = false;
          vm.$nextTick(function () {
            $(this.$el).remove();
          });
        }
      }
    },
    mounted: function mounted() {
      _.defer(function () {
        vm.show = true;
      });
    }
  });
}
exports.default = ImagePreView;
},{}],5:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 10, stdin */\n.cmui-image-preView {\n  z-index: 9;\n  background-color: rgba(0, 0, 0, 0.7); }\n  /* line 13, stdin */\n  .cmui-image-preView .swiper-slide {\n    width: 100% !important;\n    text-align: center; }\n  /* line 17, stdin */\n  .cmui-image-preView .swiper-pagination-bullet {\n    background: rgba(253, 250, 250, 0.5);\n    opacity: 1; }\n  /* line 21, stdin */\n  .cmui-image-preView .swiper-pagination-bullet-active {\n    background: #007aff; }");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _imagePreView = require('./imagePreView');

  var _imagePreView2 = _interopRequireDefault(_imagePreView);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var lazyLoadList = [];
  var windowHeight = window.screen.availHeight;
  var windowWidth = window.screen.availWidth;
  var checkLazyLoadImage = _.debounce(function () {
    for (var i = 0; i < lazyLoadList.length; i++) {
      var dom = lazyLoadList[i].dom;
      var pos = dom.getBoundingClientRect();
      var canViewV = _.inRange(pos.top > 0 ? pos.top : pos.top + pos.height, windowHeight);
      var canViewH = _.inRange(pos.left, windowWidth);
      if (canViewV && canViewH) {
        dom.src = lazyLoadList[i].imageUrl;
        lazyLoadList.splice(i--, 1);
      }
      if (pos.top > windowHeight) {
        break;
      }
    }
  }, 500);
  $(function () {
    $(window).on('scroll', checkLazyLoadImage);
    $(window).on('resize', function () {
      windowHeight = window.screen.availHeight;
      windowWidth = window.screen.availWidth;
    });
  });
  var base64_1x1 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
  exports.default = {
    props: {
      src: { type: String, default: base64_1x1 },
      lazyLoad: { type: Boolean, default: false },
      lazySrc: { type: String, default: base64_1x1 },
      errorSrc: { type: String, default: base64_1x1 },
      preView: { type: Boolean, default: false },
      preViewList: { type: Array, default: [] }
    },
    computed: {
      realSrc: function realSrc() {
        return this.lazyLoad ? this.lazySrc : this.src;
      }
    },
    methods: {
      imgClick: function imgClick() {
        if (this.preView) {
          (0, _imagePreView2.default)(this.preViewList.length ? this.preViewList : this.src);
        }
      },
      srcError: function srcError() {
        this[this.lazyLoad ? 'lazySrc' : 'src'] = this.errorSrc;
      }
    },
    mounted: function mounted() {
      if (this.lazyLoad) {
        var dom = this.$el;
        var imageUrl = this.src;
        var DOMRect = dom.getBoundingClientRect();
        var top = DOMRect.top;
        var left = DOMRect.left;
        var index = _.findLastIndex(lazyLoadList, function (item) {
          return item.top < top;
        });
        lazyLoadList.splice(index + 1, 0, {
          dom: dom,
          imageUrl: imageUrl,
          top: top,
          left: left
        });
      }
      checkLazyLoadImage();
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('img', { staticClass: "cmui-img", attrs: { "src": _vm.realSrc, "alt": "" }, on: { "click": function click($event) {
        _vm.imgClick();
      }, "error": function error($event) {
        _vm.srcError();
      } } });
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-78e0dd0d", __vue__options__);
    } else {
      hotAPI.reload("data-v-78e0dd0d", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"./imagePreView":42,"vue-hot-reload-api":48,"vue":47}],2:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vm = require('../../vm.js');

  var _vm2 = _interopRequireDefault(_vm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = {
    props: {
      type: { type: String, default: 'text' },
      reset: { type: Boolean, default: true },
      reverse: { type: Boolean, default: false },
      placeholder: String,
      radius: { type: Boolean, default: true },
      target: { type: Object },
      value: { type: String, default: '' },
      name: { type: String, default: 'name' }
    },
    methods: {
      keyup: function keyup(e) {
        _vm2.default.$emit('cmui-input-change', this, this.value);
      },
      resetInput: function resetInput() {
        this.value = '';
        this.$el.getElementsByTagName('input')[0].focus();
      }
    },
    watch: {
      value: function value() {
        _vm2.default.$emit('cmui-input-change', this, this.value);
      }
    },

    mounted: function mounted() {
      if (this.reset) {
        this.$el.getElementsByTagName('input')[0].style.paddingRight = '40px';
      }
      if (this.type === 'search') {
        this.$el.getElementsByTagName('input')[0].style.paddingLeft = '40px';
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "pos-r cmui-input form" }, [_vm.type == 'search' ? _c('div', { staticClass: "input-search", style: { display: _vm.type == 'search' ? 'block' : 'none' } }) : _vm._e(), _vm._v(" "), _vm.type === 'search' ? _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.value, expression: "value" }], class: { 'form-radius': _vm.radius, 'input-reverse': _vm.reverse }, attrs: { "type": "search", "name": _vm.name, "placeholder": _vm.placeholder }, domProps: { "value": _vm.value }, on: { "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.value = $event.target.value;
      } } }) : _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.value, expression: "value" }], class: { 'form-radius': _vm.radius, 'input-reverse': _vm.reverse }, attrs: { "type": "text", "name": _vm.name, "placeholder": _vm.placeholder }, domProps: { "value": _vm.value }, on: { "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.value = $event.target.value;
      } } }), _vm._v(" "), _vm.reset == true ? _c('div', { staticClass: "input-reset", style: { display: _vm.value.length ? 'block' : 'none' }, on: { "click": function click($event) {
        _vm.resetInput();
      } } }) : _vm._e()]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-995e4e4a", __vue__options__);
    } else {
      hotAPI.reload("data-v-995e4e4a", __vue__options__);
    }
  })();
}
},{"../../vm.js":16,"vue-hot-reload-api":48,"vue":47}],45:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var time = Date.now || function () {
  return +new Date();
};

var running = {};
var counter = 1;
var desiredFrames = 60;
var millisecondsPerSecond = 1000;

exports.default = {

  // A requestAnimationFrame wrapper / polyfill.
  requestAnimationFrame: function () {
    var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    return function (callback, root) {
      requestFrame(callback, root);
    };
  }(),

  // Stops the given animation.
  stop: function stop(id) {
    var cleared = running[id] != null;
    if (cleared) {
      running[id] = null;
    }
    return cleared;
  },


  // Whether the given animation is still running.
  isRunning: function isRunning(id) {
    return running[id] != null;
  },


  // Start the animation.
  start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
    var _this = this;
    var start = time();
    var lastFrame = start;
    var percent = 0;
    var dropCounter = 0;
    var id = counter++;

    if (!root) {
      root = document.body;
    }

    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
      var newRunning = {};
      for (var usedId in running) {
        newRunning[usedId] = true;
      }
      running = newRunning;
    }

    // This is the internal step method which is called every few milliseconds
    var step = function step(virtual) {
      // Normalize virtual value
      var render = virtual !== true;
      // Get current time
      var now = time();

      // Verification is executed before next animation step
      if (!running[id] || verifyCallback && !verifyCallback(id)) {
        running[id] = null;
        completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
        return;
      }

      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state variables up-to-date with progress in time.
      if (render) {
        var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true);
          dropCounter++;
        }
      }

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration;
        if (percent > 1) {
          percent = 1;
        }
      }

      // Execute step callback, then...
      var value = easingMethod ? easingMethod(percent) : percent;
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null;
        completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
      } else if (render) {
        lastFrame = now;
        _this.requestAnimationFrame(step, root);
      }
    };

    // Mark as running
    running[id] = true;
    // Init first step
    _this.requestAnimationFrame(step, root);
    // Return unique animation ID
    return id;
  }
};
},{}],46:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElement = getElement;
exports.getComputedStyle = getComputedStyle;
exports.easeOutCubic = easeOutCubic;
exports.easeInOutCubic = easeInOutCubic;
function getElement(expr) {
  return typeof expr === 'string' ? document.querySelector(expr) : expr;
}

function getComputedStyle(el, key) {
  var computedStyle = window.getComputedStyle(el);
  return computedStyle[key] || '';
}

// Easing Equations (c) 2003 Robert Penner, all rights reserved.
// Open source under the BSD License.
function easeOutCubic(pos) {
  return Math.pow(pos - 1, 3) + 1;
}

function easeInOutCubic(pos) {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3);
  }
  return 0.5 * (Math.pow(pos - 2, 3) + 2);
}
},{}],40:[function(require,module,exports) {
"use strict";

var _animate = require("./animate");

var _animate2 = _interopRequireDefault(_animate);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Anima Scroller
 * Based Zynga Scroller (http://github.com/zynga/scroller)
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 */
var TEMPLATE = "\n<div class=\"scroller-component\" data-role=\"component\">\n  <div class=\"scroller-mask\" data-role=\"mask\"></div>\n  <div class=\"scroller-indicator\" data-role=\"indicator\"></div>\n  <div class=\"scroller-content\" data-role=\"content\"></div>\n</div>\n";

var Scroller = function Scroller(container, options) {
  var self = this;

  options = options || {};

  self.options = {
    itemClass: 'scroller-item',
    onSelect: function onSelect() {},

    defaultValue: 0,
    data: []
  };

  for (var key in options) {
    if (options[key] !== undefined) {
      self.options[key] = options[key];
    }
  }

  self.__container = (0, _util.getElement)(container);

  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = options.template || TEMPLATE;

  var component = self.__component = tempContainer.querySelector('[data-role=component]');
  var content = self.__content = component.querySelector('[data-role=content]');
  var indicator = component.querySelector('[data-role=indicator]');

  var data = self.options.data;
  var html = '';
  if (data.length && data[0].constructor === Object) {
    data.forEach(function (row) {
      html += '<div class="' + self.options.itemClass + '" data-value="' + row.value + '">' + row.name + '</div>';
    });
  } else {
    data.forEach(function (val) {
      html += '<div class="' + self.options.itemClass + '" data-value="' + val + '">' + val + '</div>';
    });
  }
  content.innerHTML = html;
  self.__container.appendChild(component);

  self.__itemHeight = parseInt((0, _util.getComputedStyle)(indicator, 'height'), 10);

  self.__callback = options.callback || function (top) {
    content.style.webkitTransform = 'translate3d(0, ' + -top + 'px, 0)';
  };

  var rect = component.getBoundingClientRect();

  self.__clientTop = rect.top + component.clientTop || 0;

  self.__setDimensions(component.clientHeight, content.offsetHeight);

  if (component.clientHeight === 0) {
    self.__setDimensions(parseInt((0, _util.getComputedStyle)(component, 'height'), 10), 204);
  }
  self.select(self.options.defaultValue, false);

  component.addEventListener('touchstart', function (e) {
    if (e.target.tagName.match(/input|textarea|select/i)) {
      return;
    }
    e.preventDefault();
    self.__doTouchStart(e.touches, e.timeStamp);
  }, false);

  component.addEventListener('touchmove', function (e) {
    self.__doTouchMove(e.touches, e.timeStamp);
  }, false);

  component.addEventListener('touchend', function (e) {
    self.__doTouchEnd(e.timeStamp);
  }, false);
};

var members = {
  value: null,
  __prevValue: null,
  __isSingleTouch: false,
  __isTracking: false,
  __didDecelerationComplete: false,
  __isGesturing: false,
  __isDragging: false,
  __isDecelerating: false,
  __isAnimating: false,
  __clientTop: 0,
  __clientHeight: 0,
  __contentHeight: 0,
  __itemHeight: 0,
  __scrollTop: 0,
  __minScrollTop: 0,
  __maxScrollTop: 0,
  __scheduledTop: 0,
  __lastTouchTop: null,
  __lastTouchMove: null,
  __positions: null,
  __minDecelerationScrollTop: null,
  __maxDecelerationScrollTop: null,
  __decelerationVelocityY: null,

  __setDimensions: function __setDimensions(clientHeight, contentHeight) {
    var self = this;

    self.__clientHeight = clientHeight;
    self.__contentHeight = contentHeight;

    var totalItemCount = self.options.data.length;
    var clientItemCount = Math.round(self.__clientHeight / self.__itemHeight);

    self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2);
    self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - 0.1;
  },
  selectByIndex: function selectByIndex(index, animate) {
    var self = this;
    if (index < 0 || index > self.__content.childElementCount - 1) {
      return;
    }
    self.__scrollTop = self.__minScrollTop + index * self.__itemHeight;

    self.scrollTo(self.__scrollTop, animate);

    self.__selectItem(self.__content.children[index]);
  },
  select: function select(value, animate) {
    var self = this;

    var children = self.__content.children;
    for (var i = 0, len = children.length; i < len; i++) {
      if (children[i].dataset.value === value) {
        self.selectByIndex(i, animate);
        return;
      }
    }

    self.selectByIndex(0, animate);
  },
  getValue: function getValue() {
    return this.value;
  },
  scrollTo: function scrollTo(top, animate) {
    var self = this;

    animate = animate === undefined ? true : animate;

    if (self.__isDecelerating) {
      _animate2.default.stop(self.__isDecelerating);
      self.__isDecelerating = false;
    }

    top = Math.round(top / self.__itemHeight) * self.__itemHeight;
    top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop);

    if (top === self.__scrollTop || !animate) {
      self.__publish(top);
      self.__scrollingComplete();
      return;
    }
    self.__publish(top, 250);
  },
  destroy: function destroy() {
    this.__component.parentNode && this.__component.parentNode.removeChild(this.__component);
  },
  __selectItem: function __selectItem(selectedItem) {
    var self = this;

    var selectedItemClass = self.options.itemClass + '-selected';
    var lastSelectedElem = self.__content.querySelector('.' + selectedItemClass);
    if (lastSelectedElem) {
      lastSelectedElem.classList.remove(selectedItemClass);
    }
    selectedItem.classList.add(selectedItemClass);

    if (self.value !== null) {
      self.__prevValue = self.value;
    }

    self.value = selectedItem.dataset.value;
  },
  __scrollingComplete: function __scrollingComplete() {
    var self = this;

    var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight);

    self.__selectItem(self.__content.children[index]);
    if (self.__prevValue !== null && self.__prevValue !== self.value) {
      self.options.onSelect(self.value);
    }
  },
  __doTouchStart: function __doTouchStart(touches, timeStamp) {
    var self = this;

    if (touches.length == null) {
      throw new Error('Invalid touch list: ' + touches);
    }
    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp);
    }

    self.__interruptedAnimation = true;

    if (self.__isDecelerating) {
      _animate2.default.stop(self.__isDecelerating);
      self.__isDecelerating = false;
      self.__interruptedAnimation = true;
    }

    if (self.__isAnimating) {
      _animate2.default.stop(self.__isAnimating);
      self.__isAnimating = false;
      self.__interruptedAnimation = true;
    }

    // Use center point when dealing with two fingers
    var currentTouchTop;
    var isSingleTouch = touches.length === 1;
    if (isSingleTouch) {
      currentTouchTop = touches[0].pageY;
    } else {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
    }

    self.__initialTouchTop = currentTouchTop;
    self.__lastTouchTop = currentTouchTop;
    self.__lastTouchMove = timeStamp;
    self.__lastScale = 1;
    self.__enableScrollY = !isSingleTouch;
    self.__isTracking = true;
    self.__didDecelerationComplete = false;
    self.__isDragging = !isSingleTouch;
    self.__isSingleTouch = isSingleTouch;
    self.__positions = [];
  },
  __doTouchMove: function __doTouchMove(touches, timeStamp, scale) {
    var self = this;

    if (touches.length == null) {
      throw new Error('Invalid touch list: ' + touches);
    }
    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp);
    }

    // Ignore event when tracking is not enabled (event might be outside of element)
    if (!self.__isTracking) {
      return;
    }

    var currentTouchTop;

    // Compute move based around of center of fingers
    if (touches.length === 2) {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
    } else {
      currentTouchTop = touches[0].pageY;
    }

    var positions = self.__positions;

    // Are we already is dragging mode?
    if (self.__isDragging) {
      var moveY = currentTouchTop - self.__lastTouchTop;
      var scrollTop = self.__scrollTop;

      if (self.__enableScrollY) {
        scrollTop -= moveY;

        var minScrollTop = self.__minScrollTop;
        var maxScrollTop = self.__maxScrollTop;

        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          // Slow down on the edges
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop;
          } else {
            scrollTop = minScrollTop;
          }
        }
      }

      // Keep list from growing infinitely (holding min 10, max 20 measure points)
      if (positions.length > 40) {
        positions.splice(0, 20);
      }

      // Track scroll movement for decleration
      positions.push(scrollTop, timeStamp);

      // Sync scroll position
      self.__publish(scrollTop);

      // Otherwise figure out whether we are switching into dragging mode now.
    } else {
      var minimumTrackingForScroll = 0;
      var minimumTrackingForDrag = 5;

      var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

      self.__enableScrollY = distanceY >= minimumTrackingForScroll;

      positions.push(self.__scrollTop, timeStamp);

      self.__isDragging = self.__enableScrollY && distanceY >= minimumTrackingForDrag;

      if (self.__isDragging) {
        self.__interruptedAnimation = false;
      }
    }

    // Update last touch positions and time stamp for next event
    self.__lastTouchTop = currentTouchTop;
    self.__lastTouchMove = timeStamp;
    self.__lastScale = scale;
  },
  __doTouchEnd: function __doTouchEnd(timeStamp) {
    var self = this;

    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp);
    }

    // Ignore event when tracking is not enabled (no touchstart event on element)
    // This is required as this listener ('touchmove') sits on the document and not on the element itself.
    if (!self.__isTracking) {
      return;
    }

    // Not touching anymore (when two finger hit the screen there are two touch end events)
    self.__isTracking = false;

    // Be sure to reset the dragging flag now. Here we also detect whether
    // the finger has moved fast enough to switch into a deceleration animation.
    if (self.__isDragging) {
      // Reset dragging flag
      self.__isDragging = false;

      // Start deceleration
      // Verify that the last move detected was in some relevant time frame
      if (self.__isSingleTouch && timeStamp - self.__lastTouchMove <= 100) {
        // Then figure out what the scroll position was about 100ms ago
        var positions = self.__positions;
        var endPos = positions.length - 1;
        var startPos = endPos;

        // Move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 2) {
          startPos = i;
        }

        // If start and stop position is identical in a 100ms timeframe,
        // we cannot compute any useful deceleration.
        if (startPos !== endPos) {
          // Compute relative movement between these two points
          var timeOffset = positions[endPos] - positions[startPos];
          var movedTop = self.__scrollTop - positions[startPos - 1];

          // Based on 50ms compute the movement to apply for each render step
          self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

          // How much velocity is required to start the deceleration
          var minVelocityToStartDeceleration = 4;

          // Verify that we have enough velocity to start deceleration
          if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
            self.__startDeceleration(timeStamp);
          }
        }
      }
    }

    if (!self.__isDecelerating) {
      self.scrollTo(self.__scrollTop);
    }

    // Fully cleanup list
    self.__positions.length = 0;
  },


  // Applies the scroll position to the content element
  __publish: function __publish(top, animationDuration) {
    var self = this;

    // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
    var wasAnimating = self.__isAnimating;
    if (wasAnimating) {
      _animate2.default.stop(wasAnimating);
      self.__isAnimating = false;
    }

    if (animationDuration) {
      // Keep scheduled positions for scrollBy functionality
      self.__scheduledTop = top;

      var oldTop = self.__scrollTop;
      var diffTop = top - oldTop;

      var step = function step(percent, now, render) {
        self.__scrollTop = oldTop + diffTop * percent;
        // Push values out
        if (self.__callback) {
          self.__callback(self.__scrollTop);
        }
      };

      var verify = function verify(id) {
        return self.__isAnimating === id;
      };

      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
        if (animationId === self.__isAnimating) {
          self.__isAnimating = false;
        }
        if (self.__didDecelerationComplete || wasFinished) {
          self.__scrollingComplete();
        }
      };

      // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
      self.__isAnimating = _animate2.default.start(step, verify, completed, animationDuration, wasAnimating ? _util.easeOutCubic : _util.easeInOutCubic);
    } else {
      self.__scheduledTop = self.__scrollTop = top;
      // Push values out
      if (self.__callback) {
        self.__callback(top);
      }
    }
  },


  // Called when a touch sequence end and the speed of the finger was high enough to switch into deceleration mode.
  __startDeceleration: function __startDeceleration(timeStamp) {
    var self = this;

    self.__minDecelerationScrollTop = self.__minScrollTop;
    self.__maxDecelerationScrollTop = self.__maxScrollTop;

    // Wrap class method
    var step = function step(percent, now, render) {
      self.__stepThroughDeceleration(render);
    };

    // How much velocity is required to keep the deceleration running
    var minVelocityToKeepDecelerating = 0.5;

    // Detect whether it's still worth to continue animating steps
    // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
    var verify = function verify() {
      var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
      if (!shouldContinue) {
        self.__didDecelerationComplete = true;
      }
      return shouldContinue;
    };

    var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
      self.__isDecelerating = false;
      if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
        self.scrollTo(self.__scrollTop);
        return;
      }
      if (self.__didDecelerationComplete) {
        self.__scrollingComplete();
      }
    };

    // Start animation and switch on flag
    self.__isDecelerating = _animate2.default.start(step, verify, completed);
  },


  // Called on every step of the animation
  __stepThroughDeceleration: function __stepThroughDeceleration(render) {
    var self = this;

    var scrollTop = self.__scrollTop + self.__decelerationVelocityY;

    var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed;
      self.__decelerationVelocityY = 0;
    }

    if (Math.abs(self.__decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % self.__itemHeight) < 1) {
        self.__decelerationVelocityY = 0;
      }
    } else {
      self.__decelerationVelocityY *= 0.95;
    }

    self.__publish(scrollTop);
  }
};

// Copy over members to prototype
for (var key in members) {
  Scroller.prototype[key] = members[key];
}

module.exports = Scroller;
},{"./animate":45,"./util":46}],41:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
  function Manager(data, count) {
    _classCallCheck(this, Manager);

    this.data = data;
    this.count = count;
  }

  _createClass(Manager, [{
    key: "getChildren",
    value: function getChildren(value) {
      return this.data.filter(function (one) {
        return one.parent === value;
      });
    }
  }, {
    key: "getFirstColumn",
    value: function getFirstColumn() {
      return this.data.filter(function (one) {
        return !one.parent || one.parent === 0;
      });
    }
  }, {
    key: "getColumns",
    value: function getColumns(value) {
      var datas = [];
      for (var i = 0; i < this.count; i++) {
        if (i === 0) {
          datas.push(this.getFirstColumn());
        } else {
          // 没有数据时，取得上一级的第一个
          if (!value[i]) {
            var topValue = datas[i - 1][0].value;
            datas.push(this.getChildren(topValue));
          } else {
            datas.push(this.getChildren(value[i - 1]));
          }
        }
      }
      return datas;
    }
  }]);

  return Manager;
}();

exports.default = Manager;
},{}],3:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("@import './scroller.css';");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _scroller = require('./scroller');

  var _scroller2 = _interopRequireDefault(_scroller);

  var _chain = require('./chain');

  var _chain2 = _interopRequireDefault(_chain);

  var _vm = require('../../vm.js');

  var _vm2 = _interopRequireDefault(_vm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = {
    created: function created() {
      if (this.col !== 0) {
        var length = this.col;
        this.store = new _chain2.default(this.data, length);
        this.data = this.store.getColumns(this.value);
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.render(_this2.data, _this2.value);
      });
    },

    props: {
      data: {
        type: Array
      },
      col: {
        type: Number,
        default: 0
      },
      value: {
        type: Array,
        twoWay: true
      },
      itemClass: {
        type: String,
        default: 'scroller-item'
      },
      target: {
        type: Object
      }
    },
    methods: {
      getId: function getId(i) {
        return '#cmui-picker-' + this.uuid + '-' + i;
      },
      render: function render(data, value) {
        this.count = this.data.length;
        var _this = this;
        if (!data || !data.length) {
          return;
        }
        var count = this.data.length;

        if (value.length < count) {
          for (var i = 0; i < count; i++) {
            Vue.set(_this.value[i], data[i][0].value || data[i][0]);
          }
        }

        var _loop = function _loop(_i) {
          _this.scroller[_i] && _this.scroller[_i].destroy();
          _this.scroller[_i] = new _scroller2.default(_this.getId(_i), {
            data: data[_i],
            defaultValue: value[_i] || data[_i][0].value,
            itemClass: _this.item_class,
            onSelect: function onSelect(value) {
              Vue.set(_this.value[_i], value);
              _vm2.default.$emit('on-change', _this.getValue());
              if (_this.col !== 0) {
                _this.renderChain(_i + 1);
              }
            }
          });
          if (_this.value) {
            _this.scroller[_i].select(value[_i]);
          }
        };

        for (var _i = 0; _i < data.length; _i++) {
          _loop(_i);
        }
      },
      renderChain: function renderChain(i) {
        if (this.col === 0) {
          return;
        }

        if (i > this.count - 1) {
          return;
        }

        var _this = this;
        var ID = this.getId(i);

        this.scroller[i].destroy();
        var list = this.store.getChildren(_this.getValue()[i - 1]);
        this.scroller[i] = new _scroller2.default(ID, {
          data: list,
          itemClass: _this.item_class,
          onSelect: function onSelect(value) {
            Vue.set(_this.value[i], value);
            _vm2.default.$emit('on-change', _this.getValue());
            _this.renderChain(i + 1);
          }
        });

        Vue.set(this.value[i], list[0].value);
        this.renderChain(i + 1);
      },
      getValue: function getValue() {
        var data = [];
        for (var i = 0; i < this.data.length; i++) {
          data.push(this.scroller[i].value);
        }
        return data;
      }
    },
    data: function data() {
      return {
        scroller: [],
        count: 0,
        uuid: Math.random().toString(36).substring(3, 8)
      };
    },

    watch: {
      value: function value(val, oldVal) {
        if (this.col !== 0) {
          if (val !== oldVal) {
            this.data = this.store.getColumns(val);
            this.$nextTick(function () {
              this.render(this.data, val);
            });
          }
        } else {
          for (var i = 0; i < val.length; i++) {
            if (this.scroller[i].value !== val[i]) {
              this.scroller[i].select(val[i]);
            }
          }
        }
      },
      data: function data(newData) {
        var _this3 = this;

        if (Object.prototype.toString.call(newData[0]) === '[object Array]') {
          this.$nextTick(function () {
            _this3.render(newData, _this3.value);

            _this3.$nextTick(function () {
              _vm2.default.$emit('on-change', _this3.getValue());
            });
          });
        } else {
          if (this.col !== 0) {
            var length = this.col;
            this.store = new _chain2.default(newData, length);
            this.data = this.store.getColumns(this.value);
          }
        }
      }
    },
    beforeDestroy: function beforeDestroy() {
      for (var i = 0; i < this.count; i++) {
        this.scroller[i].destroy();
        this.scroller[i] = null;
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-picker" }, [_c('div', { staticClass: "flex-container" }, _vm._l(_vm.data, function (one, index) {
    return _c('div', { staticClass: "flex1" }, [_c('div', { staticClass: "cmui-picker-item", attrs: { "id": 'cmui-picker-' + _vm.uuid + '-' + index } })]);
  }))]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-2e768776", __vue__options__);
    } else {
      hotAPI.reload("data-v-2e768776", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"./scroller":40,"./chain":41,"../../vm.js":16,"vue-hot-reload-api":48,"vue":47}],4:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-scrollbox {\n  overflow-x: scroll;\n  -webkit-overflow-scrolling: touch;\n  &::-webkit-scrollbar{\n    display:none;\n  }\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      target: {
        type: Object,
        default: {}
      },
      col: {
        type: Number,
        default: 2
      },
      totalWidth: {
        type: Number,
        default: 10
      },
      items: {
        type: Array,
        default: []
      }
    },
    computed: {
      itemWidth: function itemWidth() {
        return this.totalWidth / this.col + 'rem';
      },
      warpWidth: function warpWidth() {
        return this.items.length * this.totalWidth / this.col + 'rem';
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-scrollbox" }, [_c('div', { staticClass: "cmui-scrollbox-warp clearfix", style: { 'width': _vm.warpWidth } }, [_vm._t("default")], 2)]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-64c38883", __vue__options__);
    } else {
      hotAPI.reload("data-v-64c38883", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],9:[function(require,module,exports) {
"use strict";

;(function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      target: Object
    },
    data: function data() {
      return {
        itemWidth: this.$parent.itemWidth
      };
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-scrollbox-item float-left pos-r", style: { width: _vm.itemWidth } }, [_vm._t("default")], 2);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-0639144d", __vue__options__);
    } else {
      hotAPI.reload("data-v-0639144d", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],6:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'CMUICollapse',
    componentName: 'CMUICollapse',
    props: {
      shoufengqin: Boolean,
      activeIndex: {
        type: [Array, Number],
        default: function _default() {
          return [];
        }
      }
    },
    data: function data() {
      return {
        activeNames: [].concat(this.activeIndex)
      };
    },

    watch: {
      activeIndex: function (_activeIndex) {
        function activeIndex(_x) {
          return _activeIndex.apply(this, arguments);
        }

        activeIndex.toString = function () {
          return _activeIndex.toString();
        };

        return activeIndex;
      }(function (value) {
        this.activeNames = [].concat(activeIndex);
      })
    },
    methods: {
      setActiveNames: function setActiveNames(activeNames) {
        activeNames = [].concat(activeNames);
        var value = this.shoufengqin ? activeNames[0] : activeNames;
        this.activeNames = activeNames;

        console.log(value);
      },
      itemClick: function itemClick(item) {
        if (this.shoufengqin) {
          this.setActiveNames((this.activeNames[0] || this.activeNames[0] === 0) && this.activeNames[0] === item.name ? '' : item.name);
        } else {
          var activeNames = this.activeNames.slice(0);
          var index = activeNames.indexOf(item.name);
          if (index > -1) {
            activeNames.splice(index, 1);
          } else {
            activeNames.push(item.name);
          }
          this.setActiveNames(activeNames);
        }
      }
    },
    created: function created() {
      this.$on('item-click', this.itemClick);
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-collapse" }, [_vm._t("default")], 2);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-20ccabe5", __vue__options__);
    } else {
      hotAPI.reload("data-v-20ccabe5", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],38:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};
},{}],39:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  functional: true,
  render: function render(h, context) {
    var data = {
      on: {
        beforeEnter: function beforeEnter(el) {
          el.classList.add('collapse-transition');
          if (!el.dataset) el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.style.height = '0';
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        },
        enter: function enter(el) {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          }

          el.style.overflow = 'hidden';
        },
        afterEnter: function afterEnter(el) {
          // for safari: remove class then reset height is necessary
          el.classList.remove('collapse-transition');
          el.style.height = '';
          el.style.overflow = el.dataset.oldOverflow;
        },
        beforeLeave: function beforeLeave(el) {
          if (!el.dataset) el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.dataset.oldOverflow = el.style.overflow;

          el.style.height = el.scrollHeight + 'px';
          el.style.overflow = 'hidden';
        },
        leave: function leave(el) {
          if (el.scrollHeight !== 0) {
            // for safari: add class after set height, or it will jump to zero height suddenly, weired
            el.classList.add('collapse-transition');
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
          }
        },
        afterLeave: function afterLeave(el) {
          el.classList.remove('collapse-transition');
          el.style.height = '';
          el.style.overflow = el.dataset.oldOverflow;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
      }
    };
    return h('transition', data, context.children);
  }
};
},{}],7:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-collapse-item__body,.cmui-collapse-item__header{\n  padding:0.26666667rem;\n  border: 1px solid #dfe6ec;\n  margin-bottom: -1px;\n}\n.cmui-collapse-item__bodyWarp{\n  will-change: height;\n  overflow: hidden;\n}\n.collapse-transition {\n    transition: height .3s ease-in-out;\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mixin = require('../mixin.js');

  var _mixin2 = _interopRequireDefault(_mixin);

  var _collapseTransition = require('./collapse-transition.js');

  var _collapseTransition2 = _interopRequireDefault(_collapseTransition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = {
    name: 'CMUICollapseItem',
    componentName: 'CMUICollapseItem',
    mixins: [_mixin2.default],
    components: {
      CollapseTransition: _collapseTransition2.default
    },
    props: {
      title: String
    },
    data: function data() {
      var _this = this;

      return {
        name: _.findIndex(this.$parent.$children, function (item) {
          return item == _this;
        })
      };
    },

    computed: {
      isActive: function isActive() {
        return this.$parent.activeNames.indexOf(this.name) > -1;
      }
    },
    methods: {
      itemClick: function itemClick() {
        this.dispatch('CMUICollapse', 'item-click', this);
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-collapse-item" }, [_c('div', { staticClass: "cmui-collapse-item__header flex-container", on: { "click": _vm.itemClick } }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('i', { staticClass: "cmui-collapse-item__header__arrow baseIcon baseIcon-roundcheckfill" })], 2), _vm._v(" "), _c('collapse-transition', [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isActive, expression: "isActive" }], staticClass: "cmui-collapse-item__bodyWarp" }, [_c('div', { staticClass: "cmui-collapse-item__body" }, [_vm._t("default")], 2)])])], 1);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-6eae83aa", __vue__options__);
    } else {
      hotAPI.reload("data-v-6eae83aa", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"../mixin.js":38,"./collapse-transition.js":39,"vue-hot-reload-api":48,"vue":47}],8:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vm = require('../../vm.js');

  var _vm2 = _interopRequireDefault(_vm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function getScroll(target, top) {
    var prop = top ? 'pageYOffset' : 'pageXOffset';
    var method = top ? 'scrollTop' : 'scrollLeft';
    var ret = target[prop];
    if (typeof ret !== 'number') {
      ret = window.document.documentElement[method];
    }
    return ret;
  }
  function getOffset(element) {
    var rect = element.getBoundingClientRect();
    var scrollTop = getScroll(window, true);
    var scrollLeft = getScroll(window);
    var docEl = window.document.body;
    var clientTop = docEl.clientTop || 0;
    var clientLeft = docEl.clientLeft || 0;
    return {
      top: rect.top + scrollTop - clientTop,
      left: rect.left + scrollLeft - clientLeft
    };
  }
  exports.default = {
    props: {
      top: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number
      }
    },
    data: function data() {
      return {
        affix: false,
        styles: {}
      };
    },

    computed: {
      offsetType: function offsetType() {
        var type = 'top';
        if (this.bottom >= 0) {
          type = 'bottom';
        }
        return type;
      }
    },
    mounted: function mounted() {
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleScroll, false);
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('resize', this.handleScroll, false);
    },

    methods: {
      handleScroll: function handleScroll() {
        var affix = this.affix;
        var scrollTop = getScroll(window, true);
        var elOffset = getOffset(this.$el);
        var windowHeight = window.innerHeight;
        var elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

        if (elOffset.top - this.top < scrollTop && this.offsetType == 'top' && !affix) {
          this.affix = true;
          this.styles = {
            top: this.top + 'px',
            left: elOffset.left + 'px',
            width: this.$el.offsetWidth + 'px',
            position: 'fixed'
          };
          _vm2.default.$emit('on-change', true);
        } else if (elOffset.top - this.top > scrollTop && this.offsetType == 'top' && affix) {
          this.affix = false;
          this.styles = null;
          _vm2.default.$emit('on-change', false);
        }

        if (elOffset.top + this.bottom + elHeight > scrollTop + windowHeight && this.offsetType == 'bottom' && !affix) {
          this.affix = true;
          this.styles = {
            bottom: this.bottom + 'px',
            left: elOffset.left + 'px',
            width: this.$el.offsetWidth + 'px',
            position: 'fixed'
          };
          _vm2.default.$emit('on-change', true);
        } else if (elOffset.top + this.bottom + elHeight < scrollTop + windowHeight && this.offsetType == 'bottom' && affix) {
          this.affix = false;
          this.styles = null;
          _vm2.default.$emit('on-change', false);
        }
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { staticClass: "cmui-affix", style: _vm.styles }, [_vm._t("default")], 2)]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-753b0a67", __vue__options__);
    } else {
      hotAPI.reload("data-v-753b0a67", __vue__options__);
    }
  })();
}
},{"../../vm.js":16,"vue-hot-reload-api":48,"vue":47}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _number = require("./component/number/number.vue");

var _number2 = _interopRequireDefault(_number);

var _img = require("./component/img/img.vue");

var _img2 = _interopRequireDefault(_img);

var _input = require("./component/input/input.vue");

var _input2 = _interopRequireDefault(_input);

var _picker = require("./component/picker/picker.vue");

var _picker2 = _interopRequireDefault(_picker);

var _scrollbox = require("./component/scrollbox/scrollbox.vue");

var _scrollbox2 = _interopRequireDefault(_scrollbox);

var _scrollboxItem = require("./component/scrollbox/scrollbox-item.vue");

var _scrollboxItem2 = _interopRequireDefault(_scrollboxItem);

var _collapse = require("./component/collapse/collapse.vue");

var _collapse2 = _interopRequireDefault(_collapse);

var _collapseItem = require("./component/collapse/collapse-item.vue");

var _collapseItem2 = _interopRequireDefault(_collapseItem);

var _affix = require("./component/affix/affix.vue");

var _affix2 = _interopRequireDefault(_affix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'cmui-number': _number2.default,
  'cmui-img': _img2.default,
  'cmui-input': _input2.default,
  'cmui-picker': _picker2.default,
  'cmui-scrollbox': _scrollbox2.default,
  'cmui-scrollbox-item': _scrollboxItem2.default,
  'cmui-collapse': _collapse2.default,
  'cmui-collapse-item': _collapseItem2.default,
  'cmui-affix': _affix2.default
};
},{"./component/number/number.vue":1,"./component/img/img.vue":5,"./component/input/input.vue":2,"./component/picker/picker.vue":3,"./component/scrollbox/scrollbox.vue":4,"./component/scrollbox/scrollbox-item.vue":9,"./component/collapse/collapse.vue":6,"./component/collapse/collapse-item.vue":7,"./component/affix/affix.vue":8}],11:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-dialogContainer{\n\tborder-radius: 4px;\n\tposition: relative;\n\toverflow: hidden;\n\tmin-width: 270px;\n\twidth: 72%;\n\tpadding-bottom: 44px;\n\tbackground: #fff;\n}\n.cmui-dialogTitle{\n\ttext-align: center;\n\tfont-size: 18px;\n\tpadding:0 .53333333rem;\n\tmargin:.66666667rem 0 .26666667rem;\n}\n.cmui-dialogBody{\n\tcolor: #666;\n\tfont-size: 15px;\n\tmargin-bottom: .66666667rem;\n\tpadding:0 .53333333rem;\n\tmax-height: 10.2rem;\n\toverflow: auto;\n}\n.cmui-dialogButtons{\n\tposition: absolute;\n\tbottom: 0;\n\twidth: 100%;\n\tborder-top:1px solid #e0e0e0;\n}\n.cmui-dialogButton{\n\t\n}\n\n.cmui-alertContainer{}\n.cmui-alertTitle{}\n.cmui-alertBody{}\n.cmui-alertButtons{}\n.cmui-alertButton{\n\tborder:none;\n\tbackground-color: transparent;\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      className: { type: String, default: '' },
      okText: { type: String, default: '确定' },
      okFn: { type: Function, default: function _default() {} },
      okStyle: { type: Object, default: null }
    },
    data: function data() {
      return {
        showCmuiDialog: false,
        bodyStyle: {
          'max-height': $(window).height() * .72 - 69 - parseInt($('html').css('fontSize')) + 'px'
        }
      };
    },
    methods: {
      cancel: function cancel() {
        this.showCmuiDialog = false;
        document.body.classList.remove('overflow-h');
        typeof this.okFn === 'function' && this.okFn();
      },
      disabledTouchMove: function disabledTouchMove() {}
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.showCmuiDialog ? _c('div', { staticClass: "mask center", class: _vm.className, staticStyle: { "z-index": "1" }, on: { "touchmove": function touchmove($event) {
        $event.preventDefault();$event.stopPropagation();_vm.disabledTouchMove($event);
      } } }, [_c('div', { staticClass: "cmui-dialogContainer cmui-alertContainer" }, [_c('div', { staticClass: "cmui-dialogTitle cmui-alertTitle", domProps: { "innerHTML": _vm._s(_vm.title) } }), _vm._v(" "), _vm.content ? _c('div', { staticClass: "cmui-dialogBody cmui-alertBody", style: _vm.bodyStyle, domProps: { "innerHTML": _vm._s(_vm.content) } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "cmui-dialogButtons cmui-alertButtons" }, [_c('div', { staticClass: "cmui-alertButton cmui-dialogButton btn block", style: _vm.okStyle, domProps: { "innerHTML": _vm._s(_vm.okText) }, on: { "click": function click($event) {
        _vm.cancel();
      } } })])])]) : _vm._e();
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-413a756c", __vue__options__);
    } else {
      hotAPI.reload("data-v-413a756c", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],21:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require("./index.vue");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  title: '',
  content: '',
  className: '',
  okText: '确定',
  okFn: function okFn() {},
  okStyle: null,
  callback: function callback() {}
};
Vue.component('cmui-alert', _index2.default);
var id = 'cmui-alert-' + _.uniqueId();
var CURRENT = null;
$(function () {
  $('<cmui-alert id="' + id + '">').appendTo('body');
  CURRENT = new Vue({
    el: '#' + id
  }).$children[0];
});

function Alert() {
  var options = {};
  if (arguments) {
    if (arguments.length > 1) {
      options.okFn = _.filter(arguments, _.isFunction)[0];
      var stringList = _.filter(arguments, function (item) {
        return (typeof item === "undefined" ? "undefined" : _typeof(item)).match(/string|number|boolean/);
      }).map(function (item) {
        return item.toString();
      });
      options.content = _.last(stringList);
      if (stringList.length > 1) {
        options.title = stringList[0];
      }
    } else {
      if (_typeof(arguments[0]).match(/string|number|boolean/)) {
        options.content = arguments[0];
      } else if (_.isObject(arguments[0])) {
        options = arguments[0];
      } else {
        return CURRENT;
      }
    }
  } else {
    return CURRENT;
  }
  options = _.defaults(_.find(arguments, _.isPlainObject), options, defaults);
  document.body.classList.add('overflow-h');
  CURRENT.showCmuiDialog = true;
  _.each(options, function (value, key) {
    CURRENT[key] = value;
  });
  if (typeof options.callback == 'function') {
    CURRENT.$nextTick(function () {
      options.callback($(CURRENT.$el));
    });
  }
  return CURRENT;
};
exports.default = Alert;
},{"./index.vue":11}],10:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-confirmContainer{}\n.cmui-confirmTitle{}\n.cmui-confirmBody{}\n.cmui-confirmButtons{}\n.cmui-confirmButton{\n\tborder:none;\n\tbackground-color: transparent;\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      className: { type: String, default: '' },
      okText: { type: String, default: '确定' },
      cancelText: { type: String, default: '取消' },
      okFn: { type: Function, default: function _default() {} },
      cancelFn: { type: Function, default: function _default() {} },
      okEnable: { type: Boolean, default: true },
      okDisableStyle: { type: Object, default: null },
      okStyle: { type: Object, default: null },
      cancelStyle: { type: Object, default: null }
    },
    data: function data() {
      return {
        showCmuiDialog: false,
        bodyStyle: {
          'max-height': $(window).height() * .72 - 69 - parseInt($('html').css('fontSize')) + 'px'
        }
      };
    },
    methods: {
      cancel: function cancel() {
        this.showCmuiDialog = false;
        document.body.classList.remove('overflow-h');
        typeof this.cancelFn === 'function' && this.cancelFn();
      },
      ok: function ok() {
        if (this.okEnable) {
          this.showCmuiDialog = false;
          document.body.classList.remove('overflow-h');
          typeof this.okFn === 'function' && this.okFn();
        }
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.showCmuiDialog ? _c('div', { staticClass: "mask center", class: _vm.className, staticStyle: { "z-index": "1" } }, [_c('div', { staticClass: "cmui-dialogContainer cmui-confirmContainer" }, [_c('div', { staticClass: "cmui-dialogTitle cmui-confirmTitle", domProps: { "innerHTML": _vm._s(_vm.title) } }), _vm._v(" "), _vm.content ? _c('div', { staticClass: "cmui-dialogBody cmui-confirmBody", style: _vm.bodyStyle, domProps: { "innerHTML": _vm._s(_vm.content) } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "cmui-dialogButtons cmui-confirmButtons flex-container" }, [_c('div', { staticClass: "cmui-confirmButton cmui-dialogButton btn flex1", class: { 'okDisable': !_vm.okEnable }, style: _vm.okEnable ? _vm.okStyle : _vm.okDisableStyle, domProps: { "innerHTML": _vm._s(_vm.okText) }, on: { "click": function click($event) {
        _vm.ok();
      } } }), _vm._v(" "), _c('div', { staticClass: "cmui-confirmButton cmui-dialogButton btn flex1", style: _vm.cancelStyle, domProps: { "innerHTML": _vm._s(_vm.cancelText) }, on: { "click": function click($event) {
        _vm.cancel();
      } } })])])]) : _vm._e();
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-76453c90", __vue__options__);
    } else {
      hotAPI.reload("data-v-76453c90", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],22:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require("./index.vue");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  title: '',
  content: '',
  className: '',
  okText: '确定',
  cancelText: '取消',
  okFn: function okFn() {},
  cancelFn: function cancelFn() {},
  okEnable: true,
  okDisableStyle: null,
  okStyle: null,
  cancelStyle: null
};
Vue.component('cmui-comfirm', _index2.default);
var id = 'cmui-comfirm-' + _.uniqueId();
var CURRENT = null;
$(function () {
  $('<cmui-comfirm id="' + id + '">').appendTo('body');
  CURRENT = new Vue({
    el: '#' + id
  }).$children[0];
});

function Alert() {
  var options = {};
  if (arguments) {
    if (arguments.length > 1) {
      var fnList = _.filter(arguments, _.isFunction);
      options.okFn = fnList[0];
      if (fnList.length > 1) {
        options.cancelFn = fnList[1];
      }
      var stringList = _.filter(arguments, function (item) {
        return (typeof item === "undefined" ? "undefined" : _typeof(item)).match(/string|number|boolean/);
      }).map(function (item) {
        return item.toString();
      });
      options.content = _.last(stringList);
      if (stringList.length > 1) {
        options.title = stringList[0];
      }
    } else {
      if (_typeof(arguments[0]).match(/string|number|boolean/)) {
        options.content = arguments[0];
      } else if (_.isObject(arguments[0])) {
        options = arguments[0];
      } else {
        return CURRENT;
      }
    }
  } else {
    return CURRENT;
  }
  options = _.defaults(_.find(arguments, _.isPlainObject), options, defaults);
  document.body.classList.add('overflow-h');
  CURRENT.showCmuiDialog = true;
  _.each(options, function (value, key) {
    CURRENT[key] = value;
  });
};
exports.default = Alert;
},{"./index.vue":10}],12:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-noticeContainer{\n\tbackground: rgba(0,0,0,0.7);\n\ttext-align: center;\n\tmin-width: initial;\n\twidth: initial;\n\tpadding-bottom: initial;\n\tmax-width: 72%;\n}\n.cmui-noticeBody{\n\tcolor:white;\n\tmargin:0.26666667rem 0;\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      className: { type: String, default: '' },
      timeout: { type: Number, default: 3000 },
      okFn: { type: Function, default: function _default() {} }
    },
    data: function data() {
      return {
        showCmuiDialog: false,
        bodyStyle: {
          'max-height': $(window).height() * .72 - 69 - parseInt($('html').css('fontSize')) + 'px'
        }
      };
    },
    methods: {
      cancel: function cancel() {
        var _this = this;

        $(this.$el).fadeOut(function () {
          _this.showCmuiDialog = false;
          document.body.classList.remove('overflow-h');
          typeof _this.okFn === 'function' && _this.okFn();
        });
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.showCmuiDialog ? _c('div', { staticClass: "mask mask-transparent center", class: _vm.className, staticStyle: { "z-index": "1" }, on: { "click": _vm.cancel } }, [_c('div', { staticClass: "cmui-dialogContainer cmui-noticeContainer" }, [_vm.content ? _c('div', { staticClass: "cmui-dialogBody cmui-noticeBody", style: _vm.bodyStyle, domProps: { "innerHTML": _vm._s(_vm.content) } }) : _vm._e()])]) : _vm._e();
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-b35472c4", __vue__options__);
    } else {
      hotAPI.reload("data-v-b35472c4", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],24:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require("./index.vue");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  title: '',
  content: '',
  className: '',
  timeout: 3000,
  okFn: function okFn() {}
};
Vue.component('cmui-notice', _index2.default);
var id = 'cmui-notice-' + _.uniqueId();
var CURRENT = null;
var timeHandle;
$(function () {
  $('<cmui-notice id="' + id + '">').appendTo('body');
  CURRENT = new Vue({
    el: '#' + id
  }).$children[0];
});

function Notice() {
  var options = {};
  if (arguments) {
    if (arguments.length > 1) {
      options.okFn = _.filter(arguments, _.isFunction)[0];
      var stringList = _.filter(arguments, function (item) {
        return (typeof item === "undefined" ? "undefined" : _typeof(item)).match(/string|number|boolean/);
      }).map(function (item) {
        return item.toString();
      });
      options.content = stringList[0];
      if (stringList.length > 1) {
        options.timeout = _.last(_.filter(arguments, _.isNumber)) | 0;
      }
    } else {
      if (_typeof(arguments[0]).match(/string|number|boolean/)) {
        options.content = arguments[0];
      } else if (_.isObject(arguments[0])) {
        options = arguments[0];
      } else {
        return CURRENT;
      }
    }
  } else {
    return CURRENT;
  }
  options = _.defaults(_.find(arguments, _.isPlainObject), options, defaults);
  document.body.classList.add('overflow-h');
  CURRENT.showCmuiDialog = true;
  _.each(options, function (value, key) {
    CURRENT[key] = value;
  });
  timeHandle && clearTimeout(timeHandle);
  if (options.timeout) {
    timeHandle = setTimeout(function () {
      clearTimeout(timeHandle);
      CURRENT.cancel();
    }, options.timeout);
  }
};
exports.default = Notice;
},{"./index.vue":12}],14:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 16, stdin */\n.cmui-actionsContainer {\n  padding: 0.13333rem;\n  width: 100%; }\n\n/* line 20, stdin */\n.cmui-actionsGroup {\n  background-color: white;\n  border-radius: 4px; }\n  /* line 23, stdin */\n  .cmui-actionsGroup .cmui-actionsButton {\n    border-bottom: 1px solid #eeeeee; }\n    /* line 25, stdin */\n    .cmui-actionsGroup .cmui-actionsButton:last-child {\n      border-bottom: none; }\n\n/* line 30, stdin */\n.cmui-actionsCancel {\n  background-color: white;\n  border-radius: 4px; }\n  /* line 33, stdin */\n  .cmui-actionsCancel .cmui-actionsButton {\n    margin-top: 0.26667rem;\n    color: #ff6565; }\n\n/* line 38, stdin */\n.cmui-actionsButton {\n  padding: 0.26667rem;\n  text-align: center; }");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      buttons: { type: Array, default: [] },
      className: { type: Array, default: '' },
      cancelText: { type: Array, default: '取消' },
      cancelFn: { type: Function, default: null },
      cancelStyle: { type: Object, default: null }
    },
    data: function data() {
      return {
        showCmuiDialog: false
      };
    },
    methods: {
      cancel: function cancel() {
        this.showCmuiDialog = false;
        document.body.classList.remove('overflow-h');
        typeof this.cancelFn === 'function' && this.cancelFn();
      },
      itemEvent: function itemEvent(item) {
        this.showCmuiDialog = false;
        document.body.classList.remove('overflow-h');
        typeof item.callback === 'function' && item.callback();
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.showCmuiDialog ? _c('div', { staticClass: "mask bottom hfull", class: _vm.className, staticStyle: { "z-index": "1" } }, [_c('div', { staticClass: "cmui-actionsContainer" }, [_c('div', { staticClass: "cmui-actionsGroup" }, _vm._l(_vm.buttons, function (item) {
    return _c('div', { staticClass: "cmui-actionsButton", style: item.style, domProps: { "innerHTML": _vm._s(item.text) }, on: { "click": function click($event) {
          _vm.itemEvent(item);
        } } });
  })), _vm._v(" "), _c('div', { staticClass: "cmui-actionsCancel" }, [_c('div', { staticClass: "cmui-actionsButton", style: _vm.cancelStyle, domProps: { "innerHTML": _vm._s(_vm.cancelText) }, on: { "click": _vm.cancel } })])])]) : _vm._e();
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-0efe92e6", __vue__options__);
    } else {
      hotAPI.reload("data-v-0efe92e6", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require("./index.vue");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  buttons: [],
  className: '',
  cancelText: '取消',
  cancelFn: function cancelFn() {},
  cancelStyle: null
};
Vue.component('cmui-actions', _index2.default);
var id = 'cmui-actions-' + _.uniqueId();
var CURRENT = null;
$(function () {
  $('<cmui-actions id="' + id + '">').appendTo('body');
  CURRENT = new Vue({
    el: '#' + id
  }).$children[0];
});

function actions() {
  var options = { buttons: [] };
  if (arguments) {
    if (arguments.length > 1) {
      var fnList = _.filter(arguments, _.isFunction);
      var styleList = _.filter(arguments, function (item) {
        return _.isObject(item) && !_.isFunction(item);
      });
      var stringList = _.filter(arguments, function (item) {
        return (typeof item === "undefined" ? "undefined" : _typeof(item)).match(/string|number|boolean/);
      }).map(function (item) {
        return item.toString();
      });
      stringList.forEach(function (item, index) {
        var rs = {};
        rs.text = item;
        rs.callback = _.get(fnList, index);
        rs.style = _.get(styleList, index) || _.last(styleList);
        options.buttons.push(rs);
      });
    } else {
      if (_typeof(arguments[0]).match(/string|number|boolean/)) {
        options.buttons.push({ text: arguments[0] });
      } else if (_.isObject(arguments[0])) {
        options = arguments[0];
      } else {
        return CURRENT;
      }
    }
  } else {
    return CURRENT;
  }
  options = _.defaults(_.find(arguments, _.isPlainObject), options, defaults);
  document.body.classList.add('overflow-h');
  CURRENT.showCmuiDialog = true;
  _.each(options, function (value, key) {
    CURRENT[key] = value;
  });
  // return CURRENT
};
exports.default = actions;
},{"./index.vue":14}],15:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      position: { type: String, default: 'center' },
      content: { type: String, default: '' },
      closeFn: Function,
      contentStyle: null
    },
    data: function data() {
      return {
        showCmuiDialog: false
      };
    },
    methods: {
      cancel: function cancel() {
        this.showCmuiDialog = false;
        document.body.classList.remove('overflow-h');
        typeof this.closeFn === 'function' && this.closeFn();
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showCmuiDialog, expression: "showCmuiDialog" }], staticClass: "mask", class: _vm.position, on: { "click": function click($event) {
        _vm.cancel();
      } } }, [_c('div', { staticClass: "mask-content", staticStyle: { "max-width": "100%" }, style: _vm.contentStyle, domProps: { "innerHTML": _vm._s(_vm.content) } })]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-84b2471c", __vue__options__);
    } else {
      hotAPI.reload("data-v-84b2471c", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],25:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.vue");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('cmui-mask', _index2.default);
var id = _.uniqueId('cmui-mask-');
var CURRENT = null;
$(function () {
  $('<cmui-mask id="' + id + '"></cmui-mask>').appendTo('body');
  CURRENT = new Vue({
    el: '#' + id
  }).$children[0];
});
function mask() {
  var defaults = {
    position: 'center',
    content: '',
    closeFn: function closeFn() {},
    callback: function callback() {},
    contentStyle: null
  };
  if (arguments.length) {
    var argString = _.filter(arguments, _.isString);
    defaults.position = _.find(argString, function (item) {
      return _.every(item.split(' ').filter(function (i) {
        return i.length;
      }), function (i) {
        return (/^(top|left|bottom|right|center|between)$/.test(i)
        );
      });
    }) || 'center';
    defaults.content = _.find(argString, function (item) {
      return item !== defaults.position;
    }) || '';
    defaults.callback = _.find(arguments, _.isFunction);
    var argObject = _.find(arguments, _.isPlainObject);
    defaults = _.defaults(argObject, defaults);
    document.body.classList.add('overflow-h');
    CURRENT.showCmuiDialog = true;
    _.each(defaults, function (value, key) {
      CURRENT[key] = value;
    });
    if (typeof defaults.callback == 'function') {
      CURRENT.$nextTick(function () {
        defaults.callback($(CURRENT.$el));
      });
    }
  }
  return CURRENT;
}
exports.default = mask;
},{"./index.vue":15}],17:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-message-list{\n\ttext-align: center;\n}\n.cmui-message{\n\tpadding: 8px 16px;\n    border-radius: 4px;\n    box-shadow: 0 2px 8px rgba(0,0,0,.2);\n    background: #fff;\n    display: inline-block;\n    pointer-events: all;\n    margin: 5px 0;\n}\n.cmui-message-content{\n}\n.cmui-message .cmui-message-content>i{\n\tmargin-right: 8px;\n    font-size: 14px;\n    position: relative;\n    display: inline-block;\n    font-style: normal;\n    vertical-align: baseline;\n    text-align: center;\n    text-transform: none;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}");(function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      duration: { type: Number, default: 1000 },
      beforeCreat: { type: Function, default: function _default() {} },
      afterCreat: { type: Function, default: function _default() {} },
      beforeClose: { type: Function, default: function _default() {} },
      afterClose: { type: Function, default: function _default() {} },
      show: { type: Boolean, default: true }
    },
    beforeMount: function beforeMount() {
      this.beforeCreat();
    },
    mounted: function mounted() {
      var _this = this;
      this.afterCreat(_this.$el.firstChild);
      _.delay(function () {
        _this.beforeClose(_this.$el.firstChild);
        _this.afterClose();
      }, _this.duration);
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.show ? _c('div', { staticClass: "cmui-message-list" }, [_c('div', { staticClass: "cmui-message" }, [_c('div', { staticClass: "cmui-message-content" }, [_vm._t("default")], 2)])]) : _vm._e();
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-d23cadd2", __vue__options__);
    } else {
      hotAPI.reload("data-v-d23cadd2", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.vue");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('cmui-message', _index2.default);
var id = 'cmui-message-' + _.uniqueId();
var CURRENT = null;
function Message() {
  var _arg = _.chain(arguments);
  var defaults = {
    content: _arg.find(function (item) {
      return _.isString(item) && !/^\.|\#[a-z]/i.test(item);
    }).value() || '',
    duration: _arg.find(_.isNumber).value() || 1000,
    beforeCreat: null,
    afterCreat: null,
    beforeClose: null,
    afterClose: _arg.find(_.isFunction).value() || null,
    contentStyle: {},
    iconName: 'roundcheckfill',
    iconStyle: {},
    parent: _arg.find(function (item) {
      return _.isString(item) && /^\.|\#[a-z]/i.test(item);
    }).value() || 'body'
  };
  var functionList = _arg.find(function (item) {
    return _.isArray(item) && _.every(item, _.isFunction);
  }).value();
  if (_.get(functionList, 'length')) {
    switch (functionList.length) {
      case 1:
        defaults.afterClose = functionList[0];
        break;
      case 2:
        defaults.beforeCreat = functionList[0];
        defaults.afterClose = functionList[1];
        break;
      case 3:
        defaults.beforeCreat = functionList[0];
        defaults.afterCreat = functionList[1];
        defaults.afterClose = functionList[2];
        break;
      case 4:
        defaults.beforeCreat = functionList[0];
        defaults.afterCreat = functionList[1];
        defaults.beforeClose = functionList[2];
        defaults.afterClose = functionList[3];
        break;
    }
  }
  var options = _.defaults(defaults, _arg.find(_.isPlainObject).value());
  var containerDom = $(" <div class=\"cmui-message-list\"> </div>");
  var messageTemplate = "\n\t\t<div class=\"cmui-message\">\n\t\t\t<div class=\"cmui-message-content\">" + (options.iconName ? '<i class="baseIcon baseIcon-' + options.iconName + '"></i>' : '') + ("<span>" + options.content + "</span>\n\t\t\t</div>\n\t\t</div>\n\t");
  _.isFunction(options.beforeCreat) && options.beforeCreat();
  var messageDom = containerDom.append(messageTemplate).appendTo(options.parent);
  _.isFunction(options.afterCreat) && options.afterCreat(messageDom);
  _.delay(function () {
    _.isFunction(options.beforeClose) && options.beforeClose(messageDom);
    messageDom.fadeOut('slow', function () {
      messageDom.remove();
      _.isFunction(options.afterClose) && options.afterClose();
    });
  }, options.duration);
};
exports.default = Message;
},{"./index.vue":17}],33:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 7, 2016
 */
!function () {
  "use strict";
  function e(e) {
    e.fn.swiper = function (a) {
      var r;return e(this).each(function () {
        var e = new t(this, a);r || (r = e);
      }), r;
    };
  }var a,
      t = function t(e, i) {
    function s(e) {
      return Math.floor(e);
    }function n() {
      b.autoplayTimeoutId = setTimeout(function () {
        b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b));
      }, b.params.autoplay);
    }function o(e, t) {
      var r = a(e.target);if (!r.is(t)) if ("string" == typeof t) r = r.parents(t);else if (t.nodeType) {
        var i;return r.parents().each(function (e, a) {
          a === t && (i = t);
        }), i ? t : void 0;
      }if (0 !== r.length) return r[0];
    }function l(e, a) {
      a = a || {};var t = window.MutationObserver || window.WebkitMutationObserver,
          r = new t(function (e) {
        e.forEach(function (e) {
          b.onResize(!0), b.emit("onObserverUpdate", b, e);
        });
      });r.observe(e, { attributes: "undefined" == typeof a.attributes ? !0 : a.attributes, childList: "undefined" == typeof a.childList ? !0 : a.childList, characterData: "undefined" == typeof a.characterData ? !0 : a.characterData }), b.observers.push(r);
    }function p(e) {
      e.originalEvent && (e = e.originalEvent);var a = e.keyCode || e.charCode;if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
        if (37 === a || 39 === a || 38 === a || 40 === a) {
          var t = !1;if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length) return;var r = { left: window.pageXOffset, top: window.pageYOffset },
              i = window.innerWidth,
              s = window.innerHeight,
              n = b.container.offset();b.rtl && (n.left = n.left - b.container[0].scrollLeft);for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]], l = 0; l < o.length; l++) {
            var p = o[l];p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + s && (t = !0);
          }if (!t) return;
        }b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev());
      }
    }function d(e) {
      e.originalEvent && (e = e.originalEvent);var a = b.mousewheel.event,
          t = 0,
          r = b.rtl ? -1 : 1;if ("mousewheel" === a) {
        if (b.params.mousewheelForceToAxis) {
          if (b.isHorizontal()) {
            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;t = e.wheelDeltaX * r;
          } else {
            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;t = e.wheelDeltaY;
          }
        } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY;
      } else if ("DOMMouseScroll" === a) t = -e.detail;else if ("wheel" === a) if (b.params.mousewheelForceToAxis) {
        if (b.isHorizontal()) {
          if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;t = -e.deltaX * r;
        } else {
          if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;t = -e.deltaY;
        }
      } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;if (0 !== t) {
        if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
          var i = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
              s = b.isBeginning,
              n = b.isEnd;if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
            b.slideReset();
          }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === i || i === b.maxTranslate()) return;
        } else {
          if (new window.Date().getTime() - b.mousewheel.lastScrollTime > 60) if (0 > t) {
            if (b.isEnd && !b.params.loop || b.animating) {
              if (b.params.mousewheelReleaseOnEdges) return !0;
            } else b.slideNext();
          } else if (b.isBeginning && !b.params.loop || b.animating) {
            if (b.params.mousewheelReleaseOnEdges) return !0;
          } else b.slidePrev();b.mousewheel.lastScrollTime = new window.Date().getTime();
        }return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
      }
    }function u(e, t) {
      e = a(e);var r,
          i,
          s,
          n = b.rtl ? -1 : 1;r = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = r, s = "0") : (s = r, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)");
    }function c(e) {
      return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
    }if (!(this instanceof t)) return new t(e, i);var m = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, hashnav: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, uniqueNavElements: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
        h = i && i.virtualTranslate;i = i || {};var f = {};for (var g in i) {
      if ("object" != _typeof(i[g]) || null === i[g] || i[g].nodeType || i[g] === window || i[g] === document || "undefined" != typeof r && i[g] instanceof r || "undefined" != typeof jQuery && i[g] instanceof jQuery) f[g] = i[g];else {
        f[g] = {};for (var v in i[g]) {
          f[g][v] = i[g][v];
        }
      }
    }for (var w in m) {
      if ("undefined" == typeof i[w]) i[w] = m[w];else if ("object" == _typeof(i[w])) for (var y in m[w]) {
        "undefined" == typeof i[w][y] && (i[w][y] = m[w][y]);
      }
    }var b = this;if (b.params = i, b.originalParams = f, b.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
      if (!b.params.breakpoints) return !1;var e,
          a = !1,
          t = [];for (e in b.params.breakpoints) {
        b.params.breakpoints.hasOwnProperty(e) && t.push(e);
      }t.sort(function (e, a) {
        return parseInt(e, 10) > parseInt(a, 10);
      });for (var r = 0; r < t.length; r++) {
        e = t[r], e >= window.innerWidth && !a && (a = e);
      }return a || "max";
    }, b.setBreakpoint = function () {
      var e = b.getActiveBreakpoint();if (e && b.currentBreakpoint !== e) {
        var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
            t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;for (var r in a) {
          b.params[r] = a[r];
        }b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0);
      }
    }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
      if (b.container.length > 1) {
        var x = [];return b.container.each(function () {
          x.push(new t(this, i));
        }), x;
      }b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
        return "horizontal" === b.params.direction;
      }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
        b.params.allowSwipeToNext = !1;
      }, b.lockSwipeToPrev = function () {
        b.params.allowSwipeToPrev = !1;
      }, b.lockSwipes = function () {
        b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1;
      }, b.unlockSwipeToNext = function () {
        b.params.allowSwipeToNext = !0;
      }, b.unlockSwipeToPrev = function () {
        b.params.allowSwipeToPrev = !0;
      }, b.unlockSwipes = function () {
        b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0;
      }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, r, i) {
        function s() {
          i && i();
        }var n;e.complete && r ? s() : a ? (n = new window.Image(), n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s();
      }, b.preloadImages = function () {
        function e() {
          "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)));
        }b.imagesToLoad = b.container.find("img");for (var a = 0; a < b.imagesToLoad.length; a++) {
          b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e);
        }
      }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
        return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1;
      }, b.stopAutoplay = function (e) {
        b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b));
      }, b.pauseAutoplay = function (e) {
        b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
          b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay());
        }));
      }, b.minTranslate = function () {
        return -b.snapGrid[0];
      }, b.maxTranslate = function () {
        return -b.snapGrid[b.snapGrid.length - 1];
      }, b.updateAutoHeight = function () {
        var e = b.slides.eq(b.activeIndex)[0];if ("undefined" != typeof e) {
          var a = e.offsetHeight;a && b.wrapper.css("height", a + "px");
        }
      }, b.updateContainerSize = function () {
        var e, a;e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height);
      }, b.updateSlidesSize = function () {
        b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];var e,
            a = b.params.spaceBetween,
            t = -b.params.slidesOffsetBefore,
            r = 0,
            i = 0;if ("undefined" != typeof b.size) {
          "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({ marginLeft: "", marginTop: "" }) : b.slides.css({ marginRight: "", marginBottom: "" });var n;b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));var o,
              l = b.params.slidesPerColumn,
              p = n / l,
              d = p - (b.params.slidesPerColumn * p - b.slides.length);for (e = 0; e < b.slides.length; e++) {
            o = 0;var u = b.slides.eq(e);if (b.params.slidesPerColumn > 1) {
              var c, m, h;"column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({ "-webkit-box-ordinal-group": c, "-moz-box-ordinal-group": c, "-ms-flex-order": c, "-webkit-order": c, order: c })) : (h = Math.floor(e / p), m = e - h * p), u.css({ "margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px" }).attr("data-swiper-column", m).attr("data-swiper-row", h);
            }"none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, r = o, i++);
          }b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;var f;if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), (!b.support.flexbox || b.params.setWrapperSize) && (b.isHorizontal() ? b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }) : b.wrapper.css({ height: b.virtualSize + b.params.spaceBetween + "px" })), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), b.params.centeredSlides)) {
            for (f = [], e = 0; e < b.snapGrid.length; e++) {
              b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
            }b.snapGrid = f;
          }if (!b.params.centeredSlides) {
            for (f = [], e = 0; e < b.snapGrid.length; e++) {
              b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
            }b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size);
          }0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({ marginLeft: a + "px" }) : b.slides.css({ marginRight: a + "px" }) : b.slides.css({ marginBottom: a + "px" })), b.params.watchSlidesProgress && b.updateSlidesOffset();
        }
      }, b.updateSlidesOffset = function () {
        for (var e = 0; e < b.slides.length; e++) {
          b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop;
        }
      }, b.updateSlidesProgress = function (e) {
        if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
          "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();var a = -e;b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);for (var t = 0; t < b.slides.length; t++) {
            var r = b.slides[t],
                i = (a - r.swiperSlideOffset) / (r.swiperSlideSize + b.params.spaceBetween);if (b.params.watchSlidesVisibility) {
              var s = -(a - r.swiperSlideOffset),
                  n = s + b.slidesSizesGrid[t],
                  o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;o && b.slides.eq(t).addClass(b.params.slideVisibleClass);
            }r.progress = b.rtl ? -i : i;
          }
        }
      }, b.updateProgress = function (e) {
        "undefined" == typeof e && (e = b.translate || 0);var a = b.maxTranslate() - b.minTranslate(),
            t = b.isBeginning,
            r = b.isEnd;0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !r && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress);
      }, b.updateActiveIndex = function () {
        var e,
            a,
            t,
            r = b.rtl ? b.translate : -b.translate;for (a = 0; a < b.slidesGrid.length; a++) {
          "undefined" != typeof b.slidesGrid[a + 1] ? r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] && (e = a + 1) : r >= b.slidesGrid[a] && (e = a);
        }(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses());
      }, b.updateClasses = function () {
        b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);var e = b.slides.eq(b.activeIndex);e.addClass(b.params.slideActiveClass);var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);b.params.loop && 0 === t.length && b.slides.eq(0).addClass(b.params.slideNextClass);var r = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);if (b.params.loop && 0 === r.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
          var i,
              s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;if (b.params.loop ? (i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), i > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), i > s - 1 && (i -= s), 0 > i && "bullets" !== b.params.paginationType && (i = s + i)) : i = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
            a(this).index() === i && a(this).addClass(b.params.bulletActiveClass);
          }) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
            var n = (i + 1) / s,
                o = n,
                l = 1;b.isHorizontal() || (l = n, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed);
          }"custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]));
        }b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))));
      }, b.updatePagination = function () {
        if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
          var e = "";if ("bullets" === b.params.paginationType) {
            for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; a > t; t++) {
              e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
            }b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination();
          }"fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0]);
        }
      }, b.update = function (e) {
        function a() {
          r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses();
        }if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
          var t, r;b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a());
        } else b.params.autoHeight && b.updateAutoHeight();
      }, b.onResize = function (e) {
        b.params.breakpoints && b.setBreakpoint();var a = b.params.allowSwipeToPrev,
            t = b.params.allowSwipeToNext;b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);var r = !1;if (b.params.freeMode) {
          var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight();
        } else b.updateClasses(), r = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);b.params.lazyLoading && !r && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t;
      };var T = ["mousedown", "mousemove", "mouseup"];window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = { start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0], move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1], end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2] }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
        var a = e ? "off" : "on",
            t = e ? "removeEventListener" : "addEventListener",
            r = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
            s = b.support.touch ? r : document,
            n = b.params.nested ? !0 : !1;b.browser.ie ? (r[t](b.touchEvents.start, b.onTouchStart, !1), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (r[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1)), !i.simulateTouch || b.device.ios || b.device.android || (r[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))), window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && r[t]("click", b.preventClicks, !0);
      }, b.attachEvents = function () {
        b.initEvents();
      }, b.detachEvents = function () {
        b.initEvents(!0);
      }, b.allowClick = !0, b.preventClicks = function (e) {
        b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
      }, b.onClickNext = function (e) {
        e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext();
      }, b.onClickPrev = function (e) {
        e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev();
      }, b.onClickIndex = function (e) {
        e.preventDefault();var t = a(this).index() * b.params.slidesPerGroup;b.params.loop && (t += b.loopedSlides), b.slideTo(t);
      }, b.updateClickedSlide = function (e) {
        var t = o(e, "." + b.params.slideClass),
            r = !1;if (t) for (var i = 0; i < b.slides.length; i++) {
          b.slides[i] === t && (r = !0);
        }if (!t || !r) return b.clickedSlide = void 0, void (b.clickedIndex = void 0);if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
          var s,
              n = b.clickedIndex;if (b.params.loop) {
            if (b.animating) return;s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
              b.slideTo(n);
            }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
              b.slideTo(n);
            }, 0)) : b.slideTo(n);
          } else b.slideTo(n);
        }
      };var S,
          C,
          z,
          M,
          E,
          P,
          k,
          I,
          L,
          B,
          D = "input, select, textarea, button",
          H = Date.now(),
          A = [];b.animating = !1, b.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };var G, O;if (b.onTouchStart = function (e) {
        if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
          if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void (b.allowClick = !0);if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                r = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
              if (S = !0, C = !1, z = !0, E = void 0, O = void 0, b.touches.startX = t, b.touches.startY = r, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                var i = !0;a(e.target).is(D) && (i = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), i && e.preventDefault();
              }b.emit("onTouchStart", b, e);
            }
          }
        }
      }, b.onTouchMove = function (e) {
        if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
          if (e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void (b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);if (b.params.onlyExternal) return b.allowClick = !1, void (S && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, M = Date.now()));if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return C = !0, void (b.allowClick = !1);if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof E) {
              var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;E = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle;
            }if (E && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof O && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (O = !0), S) {
              if (E) return void (S = !1);if (O || !b.browser.ieTouch) {
                b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), C || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), C = !0;var r = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;r *= b.params.touchRatio, b.rtl && (r = -r), b.swipeDirection = r > 0 ? "prev" : "next", P = r + k;var s = !0;if (r > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + r, b.params.resistanceRatio))) : 0 > r && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - r, b.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && k > P && (P = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > k && (P = k), b.params.followFinger) {
                  if (b.params.threshold > 0) {
                    if (!(Math.abs(r) > b.params.threshold || I)) return void (P = k);if (!I) return I = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = k, void (b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY);
                  }(b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === A.length && A.push({ position: b.touches[b.isHorizontal() ? "startX" : "startY"], time: M }), A.push({ position: b.touches[b.isHorizontal() ? "currentX" : "currentY"], time: new window.Date().getTime() })), b.updateProgress(P), b.setWrapperTranslate(P);
                }
              }
            }
          }
        }
      }, b.onTouchEnd = function (e) {
        if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, S) {
          b.params.grabCursor && C && S && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");var t = Date.now(),
              r = t - M;if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > r && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function () {
            b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e));
          }, 300)), 300 > r && 300 > t - H && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function () {
            b && (b.allowClick = !0);
          }, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || P === k) return void (S = C = !1);S = C = !1;var i;if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
            if (i < -b.minTranslate()) return void b.slideTo(b.activeIndex);if (i > -b.maxTranslate()) return void (b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));if (b.params.freeModeMomentum) {
              if (A.length > 1) {
                var s = A.pop(),
                    n = A.pop(),
                    o = s.position - n.position,
                    l = s.time - n.time;b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || new window.Date().getTime() - s.time > 300) && (b.velocity = 0);
              } else b.velocity = 0;A.length = 0;var p = 1e3 * b.params.freeModeMomentumRatio,
                  d = b.velocity * p,
                  u = b.translate + d;b.rtl && (u = -u);var c,
                  m = !1,
                  h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate();else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate();else if (b.params.freeModeSticky) {
                var f,
                    g = 0;for (g = 0; g < b.snapGrid.length; g += 1) {
                  if (b.snapGrid[g] > -u) {
                    f = g;break;
                  }
                }u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u);
              }if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);else if (b.params.freeModeSticky) return void b.slideReset();b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                  b && b.onTransitionEnd();
                }));
              })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                b && b.onTransitionEnd();
              }))) : b.updateProgress(u), b.updateActiveIndex();
            }return void ((!b.params.freeModeMomentum || r >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()));
          }var v,
              w = 0,
              y = b.slidesSizesGrid[0];for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) {
            "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
          }var x = (i - b.slidesGrid[w]) / y;if (r > b.params.longSwipesMs) {
            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);"next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w));
          } else {
            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);"next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w);
          }
        }
      }, b._slideTo = function (e, a) {
        return b.slideTo(e, a, !0, !0);
      }, b.slideTo = function (e, a, t, r) {
        "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);var i = -b.snapGrid[b.snapIndex];b.params.autoplay && b.autoplaying && (r || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i);for (var s = 0; s < b.slidesGrid.length; s++) {
          -Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
        }return !b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
          b && b.onTransitionEnd(t);
        }))), !0));
      }, b.onTransitionStart = function (e) {
        "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)));
      }, b.onTransitionEnd = function (e) {
        b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash();
      }, b.slideNext = function (e, a, t) {
        if (b.params.loop) {
          if (b.animating) return !1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
        }return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
      }, b._slideNext = function (e) {
        return b.slideNext(!0, e, !0);
      }, b.slidePrev = function (e, a, t) {
        if (b.params.loop) {
          if (b.animating) return !1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex - 1, a, e, t);
        }return b.slideTo(b.activeIndex - 1, a, e, t);
      }, b._slidePrev = function (e) {
        return b.slidePrev(!0, e, !0);
      }, b.slideReset = function (e, a, t) {
        return b.slideTo(b.activeIndex, a, e);
      }, b.setWrapperTransition = function (e, a) {
        b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e);
      }, b.setWrapperTranslate = function (e, a, t) {
        var r = 0,
            i = 0,
            n = 0;b.isHorizontal() ? r = b.rtl ? -e : e : i = e, b.params.roundLengths && (r = s(r), i = s(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + r + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + r + "px, " + i + "px)")), b.translate = b.isHorizontal() ? r : i;var o,
            l = b.maxTranslate() - b.minTranslate();o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate);
      }, b.getTranslate = function (e, a) {
        var t, r, i, s;return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
          return e.replace(",", ".");
        }).join(", ")), s = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && r && (r = -r), r || 0);
      }, b.getWrapperTranslate = function (e) {
        return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e);
      }, b.observers = [], b.initObservers = function () {
        if (b.params.observeParents) for (var e = b.container.parents(), a = 0; a < e.length; a++) {
          l(e[a]);
        }l(b.container[0], { childList: !1 }), l(b.wrapper[0], { attributes: !1 });
      }, b.disconnectObservers = function () {
        for (var e = 0; e < b.observers.length; e++) {
          b.observers[e].disconnect();
        }b.observers = [];
      }, b.createLoop = function () {
        b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();var e = b.wrapper.children("." + b.params.slideClass);"auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);var t,
            r = [],
            i = [];for (e.each(function (t, s) {
          var n = a(this);t < b.loopedSlides && i.push(s), t < e.length && t >= e.length - b.loopedSlides && r.push(s), n.attr("data-swiper-slide-index", t);
        }), t = 0; t < i.length; t++) {
          b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
        }for (t = r.length - 1; t >= 0; t--) {
          b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
        }
      }, b.destroyLoop = function () {
        b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index");
      }, b.reLoop = function (e) {
        var a = b.activeIndex - b.loopedSlides;b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1);
      }, b.fixLoop = function () {
        var e;b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0));
      }, b.appendSlide = function (e) {
        if (b.params.loop && b.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
          e[a] && b.wrapper.append(e[a]);
        } else b.wrapper.append(e);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0);
      }, b.prependSlide = function (e) {
        b.params.loop && b.destroyLoop();var a = b.activeIndex + 1;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
          for (var t = 0; t < e.length; t++) {
            e[t] && b.wrapper.prepend(e[t]);
          }a = b.activeIndex + e.length;
        } else b.wrapper.prepend(e);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1);
      }, b.removeSlide = function (e) {
        b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));var a,
            t = b.activeIndex;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
          for (var r = 0; r < e.length; r++) {
            a = e[r], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
          }t = Math.max(t, 0);
        } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1);
      }, b.removeAllSlides = function () {
        for (var e = [], a = 0; a < b.slides.length; a++) {
          e.push(a);
        }b.removeSlide(e);
      }, b.effects = { fade: { setTranslate: function setTranslate() {
            for (var e = 0; e < b.slides.length; e++) {
              var a = b.slides.eq(e),
                  t = a[0].swiperSlideOffset,
                  r = -t;b.params.virtualTranslate || (r -= b.translate);var i = 0;b.isHorizontal() || (i = r, r = 0);var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);a.css({ opacity: s }).transform("translate3d(" + r + "px, " + i + "px, 0px)");
            }
          }, setTransition: function setTransition(e) {
            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
              var a = !1;b.slides.transitionEnd(function () {
                if (!a && b) {
                  a = !0, b.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
                    b.wrapper.trigger(e[t]);
                  }
                }
              });
            }
          } }, flip: { setTranslate: function setTranslate() {
            for (var e = 0; e < b.slides.length; e++) {
              var t = b.slides.eq(e),
                  r = t[0].progress;b.params.flip.limitRotation && (r = Math.max(Math.min(t[0].progress, 1), -1));var i = t[0].swiperSlideOffset,
                  s = -180 * r,
                  n = s,
                  o = 0,
                  l = -i,
                  p = 0;if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(r)) + b.slides.length, b.params.flip.slideShadows) {
                var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                    u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0));
              }t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
            }
          }, setTransition: function setTransition(e) {
            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
              var t = !1;b.slides.eq(b.activeIndex).transitionEnd(function () {
                if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                  t = !0, b.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = 0; r < e.length; r++) {
                    b.wrapper.trigger(e[r]);
                  }
                }
              });
            }
          } }, cube: { setTranslate: function setTranslate() {
            var e,
                t = 0;b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({ height: b.width + "px" })) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));for (var r = 0; r < b.slides.length; r++) {
              var i = b.slides.eq(r),
                  s = 90 * r,
                  n = Math.floor(s / 360);b.rtl && (s = -s, n = Math.floor(-s / 360));var o = Math.max(Math.min(i[0].progress, 1), -1),
                  l = 0,
                  p = 0,
                  d = 0;r % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (r - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (r - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (r - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";if (1 >= o && o > -1 && (t = 90 * r + 90 * o, b.rtl && (t = 90 * -r - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                    m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
              }
            }if (b.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px", "transform-origin": "50% 50% -" + b.size / 2 + "px" }), b.params.cube.shadow) if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");else {
              var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                  f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                  g = b.params.cube.shadowScale,
                  v = b.params.cube.shadowScale / f,
                  w = b.params.cube.shadowOffset;e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)");
            }var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)");
          }, setTransition: function setTransition(e) {
            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e);
          } }, coverflow: { setTranslate: function setTranslate() {
            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, r = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
              var o = b.slides.eq(s),
                  l = b.slidesSizesGrid[s],
                  p = o[0].swiperSlideOffset,
                  d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                  u = b.isHorizontal() ? r * d : 0,
                  c = b.isHorizontal() ? 0 : r * d,
                  m = -i * Math.abs(d),
                  h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                  f = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                    w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
              }
            }if (b.browser.ie) {
              var y = b.wrapper[0].style;y.perspectiveOrigin = t + "px 50%";
            }
          }, setTransition: function setTransition(e) {
            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
          } } }, b.lazy = { initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(e, t) {
          if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
            var r = b.slides.eq(e),
                i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (i = i.add(r[0])), 0 !== i.length && i.each(function () {
              var e = a(this);e.addClass("swiper-lazy-loading");var i = e.attr("data-background"),
                  s = e.attr("data-src"),
                  n = e.attr("data-srcset");b.loadImage(e[0], s || i, n, !1, function () {
                if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
                  var a = r.attr("data-swiper-slide-index");if (r.hasClass(b.params.slideDuplicateClass)) {
                    var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");b.lazy.loadImageInSlide(o.index(), !1);
                  } else {
                    var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');b.lazy.loadImageInSlide(l.index(), !1);
                  }
                }b.emit("onLazyImageReady", b, r[0], e[0]);
              }), b.emit("onLazyImageLoad", b, r[0], e[0]);
            });
          }
        }, load: function load() {
          var e;if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
            b.lazy.loadImageInSlide(a(this).index());
          });else if (b.params.slidesPerView > 1) for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++) {
            b.slides[e] && b.lazy.loadImageInSlide(e);
          } else b.lazy.loadImageInSlide(b.activeIndex);if (b.params.lazyLoadingInPrevNext) if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
            var t = b.params.lazyLoadingInPrevNextAmount,
                r = b.params.slidesPerView,
                i = Math.min(b.activeIndex + r + Math.max(t, r), b.slides.length),
                s = Math.max(b.activeIndex - Math.max(r, t), 0);for (e = b.activeIndex + b.params.slidesPerView; i > e; e++) {
              b.slides[e] && b.lazy.loadImageInSlide(e);
            }for (e = s; e < b.activeIndex; e++) {
              b.slides[e] && b.lazy.loadImageInSlide(e);
            }
          } else {
            var n = b.wrapper.children("." + b.params.slideNextClass);n.length > 0 && b.lazy.loadImageInSlide(n.index());var o = b.wrapper.children("." + b.params.slidePrevClass);o.length > 0 && b.lazy.loadImageInSlide(o.index());
          }
        }, onTransitionStart: function onTransitionStart() {
          b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load();
        }, onTransitionEnd: function onTransitionEnd() {
          b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load();
        } }, b.scrollbar = { isTouched: !1, setDragPosition: function setDragPosition(e) {
          var a = b.scrollbar,
              t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
              r = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
              i = -b.minTranslate() * a.moveDivider,
              s = -b.maxTranslate() * a.moveDivider;i > r ? r = i : r > s && (r = s), r = -r / a.moveDivider, b.updateProgress(r), b.setWrapperTranslate(r, !0);
        }, dragStart: function dragStart(e) {
          var a = b.scrollbar;a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b);
        }, dragMove: function dragMove(e) {
          var a = b.scrollbar;a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b));
        }, dragEnd: function dragEnd(e) {
          var a = b.scrollbar;a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
            a.track.css("opacity", 0), a.track.transition(400);
          }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset());
        }, enableDraggable: function enableDraggable() {
          var e = b.scrollbar,
              t = b.support.touch ? e.track : document;a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd);
        }, disableDraggable: function disableDraggable() {
          var e = b.scrollbar,
              t = b.support.touch ? e.track : document;a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd);
        }, set: function set() {
          if (b.params.scrollbar) {
            var e = b.scrollbar;e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0);
          }
        }, setTranslate: function setTranslate() {
          if (b.params.scrollbar) {
            var e,
                a = b.scrollbar,
                t = (b.translate || 0, a.dragSize);e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
              a.track[0].style.opacity = 0, a.track.transition(400);
            }, 1e3));
          }
        }, setTransition: function setTransition(e) {
          b.params.scrollbar && b.scrollbar.drag.transition(e);
        } }, b.controller = { LinearSpline: function LinearSpline(e, a) {
          this.x = e, this.y = a, this.lastIndex = e.length - 1;var t, r;this.x.length;this.interpolate = function (e) {
            return e ? (r = i(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0;
          };var i = function () {
            var e, a, t;return function (r, i) {
              for (a = -1, e = r.length; e - a > 1;) {
                r[t = e + a >> 1] <= i ? a = t : e = t;
              }return e;
            };
          }();
        }, getInterpolateFunction: function getInterpolateFunction(e) {
          b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid));
        }, setTranslate: function setTranslate(e, a) {
          function r(a) {
            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex();
          }var i,
              s,
              n = b.params.control;if (b.isArray(n)) for (var o = 0; o < n.length; o++) {
            n[o] !== a && n[o] instanceof t && r(n[o]);
          } else n instanceof t && a !== n && r(n);
        }, setTransition: function setTransition(e, a) {
          function r(a) {
            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
              s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd());
            }));
          }var i,
              s = b.params.control;if (b.isArray(s)) for (i = 0; i < s.length; i++) {
            s[i] !== a && s[i] instanceof t && r(s[i]);
          } else s instanceof t && a !== s && r(s);
        } }, b.hashnav = { init: function init() {
          if (b.params.hashnav) {
            b.hashnav.initialized = !0;var e = document.location.hash.replace("#", "");if (e) for (var a = 0, t = 0, r = b.slides.length; r > t; t++) {
              var i = b.slides.eq(t),
                  s = i.attr("data-hash");if (s === e && !i.hasClass(b.params.slideDuplicateClass)) {
                var n = i.index();b.slideTo(n, a, b.params.runCallbacksOnInit, !0);
              }
            }
          }
        }, setHash: function setHash() {
          b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "");
        } }, b.disableKeyboardControl = function () {
        b.params.keyboardControl = !1, a(document).off("keydown", p);
      }, b.enableKeyboardControl = function () {
        b.params.keyboardControl = !0, a(document).on("keydown", p);
      }, b.mousewheel = { event: !1, lastScrollTime: new window.Date().getTime() }, b.params.mousewheelControl) {
        try {
          new window.WheelEvent("wheel"), b.mousewheel.event = "wheel";
        } catch (N) {
          (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel");
        }!b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll");
      }b.disableMousewheelControl = function () {
        return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1;
      }, b.enableMousewheelControl = function () {
        return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1;
      }, b.parallax = { setTranslate: function setTranslate() {
          b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
            u(this, b.progress);
          }), b.slides.each(function () {
            var e = a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
              var a = Math.min(Math.max(e[0].progress, -1), 1);u(this, a);
            });
          });
        }, setTransition: function setTransition(e) {
          "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
            var t = a(this),
                r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;0 === e && (r = 0), t.transition(r);
          });
        } }, b._plugins = [];for (var R in b.plugins) {
        var W = b.plugins[R](b, b.params[R]);W && b._plugins.push(W);
      }return b.callPlugins = function (e) {
        for (var a = 0; a < b._plugins.length; a++) {
          e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }, b.emitterEventListeners = {}, b.emit = function (e) {
        b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);var a;if (b.emitterEventListeners[e]) for (a = 0; a < b.emitterEventListeners[e].length; a++) {
          b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }, b.on = function (e, a) {
        return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b;
      }, b.off = function (e, a) {
        var t;if (e = c(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
          for (t = 0; t < b.emitterEventListeners[e].length; t++) {
            b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
          }return b;
        }
      }, b.once = function (e, a) {
        e = c(e);var t = function t() {
          a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t);
        };return b.on(e, t), b;
      }, b.a11y = { makeFocusable: function makeFocusable(e) {
          return e.attr("tabIndex", "0"), e;
        }, addRole: function addRole(e, a) {
          return e.attr("role", a), e;
        }, addLabel: function addLabel(e, a) {
          return e.attr("aria-label", a), e;
        }, disable: function disable(e) {
          return e.attr("aria-disabled", !0), e;
        }, enable: function enable(e) {
          return e.attr("aria-disabled", !1), e;
        }, onEnterKey: function onEnterKey(e) {
          13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click());
        }, liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'), notify: function notify(e) {
          var a = b.a11y.liveRegion;0 !== a.length && (a.html(""), a.html(e));
        }, init: function init() {
          b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion);
        }, initPagination: function initPagination() {
          b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
            var e = a(this);b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
          });
        }, destroy: function destroy() {
          b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove();
        } }, b.init = function () {
        b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b);
      }, b.cleanupStyles = function () {
        b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"));
      }, b.destroy = function (e, a) {
        b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null);
      }, b.init(), b;
    }
  };t.prototype = { isSafari: function () {
      var e = navigator.userAgent.toLowerCase();return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
    }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), isArray: function isArray(e) {
      return "[object Array]" === Object.prototype.toString.apply(e);
    }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1 }, device: function () {
      var e = navigator.userAgent,
          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
          t = e.match(/(iPad).*OS\s([\d_]+)/),
          r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
          i = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);return { ios: t || i || r, android: a };
    }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
      }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
        var e = document.createElement("div").style;return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
      }(), flexbox: function () {
        for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
          if (a[t] in e) return !0;
        }
      }(), observer: function () {
        return "MutationObserver" in window || "WebkitMutationObserver" in window;
      }() }, plugins: {} };for (var r = function () {
    var e = function e(_e) {
      var a = this,
          t = 0;for (t = 0; t < _e.length; t++) {
        a[t] = _e[t];
      }return a.length = _e.length, this;
    },
        a = function a(_a, t) {
      var r = [],
          i = 0;if (_a && !t && _a instanceof e) return _a;if (_a) if ("string" == typeof _a) {
        var s,
            n,
            o = _a.trim();if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
          var l = "div";for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = _a, i = 0; i < n.childNodes.length; i++) {
            r.push(n.childNodes[i]);
          }
        } else for (s = t || "#" !== _a[0] || _a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(_a) : [document.getElementById(_a.split("#")[1])], i = 0; i < s.length; i++) {
          s[i] && r.push(s[i]);
        }
      } else if (_a.nodeType || _a === window || _a === document) r.push(_a);else if (_a.length > 0 && _a[0].nodeType) for (i = 0; i < _a.length; i++) {
        r.push(_a[i]);
      }return new e(r);
    };return e.prototype = { addClass: function addClass(e) {
        if ("undefined" == typeof e) return this;for (var a = e.split(" "), t = 0; t < a.length; t++) {
          for (var r = 0; r < this.length; r++) {
            this[r].classList.add(a[t]);
          }
        }return this;
      }, removeClass: function removeClass(e) {
        for (var a = e.split(" "), t = 0; t < a.length; t++) {
          for (var r = 0; r < this.length; r++) {
            this[r].classList.remove(a[t]);
          }
        }return this;
      }, hasClass: function hasClass(e) {
        return this[0] ? this[0].classList.contains(e) : !1;
      }, toggleClass: function toggleClass(e) {
        for (var a = e.split(" "), t = 0; t < a.length; t++) {
          for (var r = 0; r < this.length; r++) {
            this[r].classList.toggle(a[t]);
          }
        }return this;
      }, attr: function attr(e, a) {
        if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;for (var t = 0; t < this.length; t++) {
          if (2 === arguments.length) this[t].setAttribute(e, a);else for (var r in e) {
            this[t][r] = e[r], this[t].setAttribute(r, e[r]);
          }
        }return this;
      }, removeAttr: function removeAttr(e) {
        for (var a = 0; a < this.length; a++) {
          this[a].removeAttribute(e);
        }return this;
      }, data: function data(e, a) {
        if ("undefined" != typeof a) {
          for (var t = 0; t < this.length; t++) {
            var r = this[t];r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a;
          }return this;
        }if (this[0]) {
          var i = this[0].getAttribute("data-" + e);return i ? i : this[0].dom7ElementDataStorage && (e in this[0].dom7ElementDataStorage) ? this[0].dom7ElementDataStorage[e] : void 0;
        }
      }, transform: function transform(e) {
        for (var a = 0; a < this.length; a++) {
          var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
        }return this;
      }, transition: function transition(e) {
        "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
          var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
        }return this;
      }, on: function on(e, t, r, i) {
        function s(e) {
          var i = e.target;if (a(i).is(t)) r.call(i, e);else for (var s = a(i).parents(), n = 0; n < s.length; n++) {
            a(s[n]).is(t) && r.call(s[n], e);
          }
        }var n,
            o,
            l = e.split(" ");for (n = 0; n < this.length; n++) {
          if ("function" == typeof t || t === !1) for ("function" == typeof t && (r = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) {
            this[n].addEventListener(l[o], r, i);
          } else for (o = 0; o < l.length; o++) {
            this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({ listener: r, liveListener: s }), this[n].addEventListener(l[o], s, i);
          }
        }return this;
      }, off: function off(e, a, t, r) {
        for (var i = e.split(" "), s = 0; s < i.length; s++) {
          for (var n = 0; n < this.length; n++) {
            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(i[s], t, r);else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) {
              this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[s], this[n].dom7LiveListeners[o].liveListener, r);
            }
          }
        }return this;
      }, once: function once(e, a, t, r) {
        function i(n) {
          t(n), s.off(e, a, i, r);
        }var s = this;"function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), s.on(e, a, i, r);
      }, trigger: function trigger(e, a) {
        for (var t = 0; t < this.length; t++) {
          var r;try {
            r = new window.CustomEvent(e, { detail: a, bubbles: !0, cancelable: !0 });
          } catch (i) {
            r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a;
          }this[t].dispatchEvent(r);
        }return this;
      }, transitionEnd: function transitionEnd(e) {
        function a(s) {
          if (s.target === this) for (e.call(this, s), t = 0; t < r.length; t++) {
            i.off(r[t], a);
          }
        }var t,
            r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;if (e) for (t = 0; t < r.length; t++) {
          i.on(r[t], a);
        }return this;
      }, width: function width() {
        return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
      }, outerWidth: function outerWidth(e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
      }, height: function height() {
        return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
      }, outerHeight: function outerHeight(e) {
        return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
      }, offset: function offset() {
        if (this.length > 0) {
          var e = this[0],
              a = e.getBoundingClientRect(),
              t = document.body,
              r = e.clientTop || t.clientTop || 0,
              i = e.clientLeft || t.clientLeft || 0,
              s = window.pageYOffset || e.scrollTop,
              n = window.pageXOffset || e.scrollLeft;return { top: a.top + s - r, left: a.left + n - i };
        }return null;
      }, css: function css(e, a) {
        var t;if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (t = 0; t < this.length; t++) {
              for (var r in e) {
                this[t].style[r] = e[r];
              }
            }return this;
          }if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
        }if (2 === arguments.length && "string" == typeof e) {
          for (t = 0; t < this.length; t++) {
            this[t].style[e] = a;
          }return this;
        }return this;
      }, each: function each(e) {
        for (var a = 0; a < this.length; a++) {
          e.call(this[a], a, this[a]);
        }return this;
      }, html: function html(e) {
        if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;for (var a = 0; a < this.length; a++) {
          this[a].innerHTML = e;
        }return this;
      }, text: function text(e) {
        if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;for (var a = 0; a < this.length; a++) {
          this[a].textContent = e;
        }return this;
      }, is: function is(t) {
        if (!this[0]) return !1;var r, i;if ("string" == typeof t) {
          var s = this[0];if (s === document) return t === document;if (s === window) return t === window;if (s.matches) return s.matches(t);if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);if (s.mozMatchesSelector) return s.mozMatchesSelector(t);if (s.msMatchesSelector) return s.msMatchesSelector(t);for (r = a(t), i = 0; i < r.length; i++) {
            if (r[i] === this[0]) return !0;
          }return !1;
        }if (t === document) return this[0] === document;if (t === window) return this[0] === window;if (t.nodeType || t instanceof e) {
          for (r = t.nodeType ? [t] : t, i = 0; i < r.length; i++) {
            if (r[i] === this[0]) return !0;
          }return !1;
        }return !1;
      }, index: function index() {
        if (this[0]) {
          for (var e = this[0], a = 0; null !== (e = e.previousSibling);) {
            1 === e.nodeType && a++;
          }return a;
        }
      }, eq: function eq(a) {
        if ("undefined" == typeof a) return this;var t,
            r = this.length;return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]]);
      }, append: function append(a) {
        var t, r;for (t = 0; t < this.length; t++) {
          if ("string" == typeof a) {
            var i = document.createElement("div");for (i.innerHTML = a; i.firstChild;) {
              this[t].appendChild(i.firstChild);
            }
          } else if (a instanceof e) for (r = 0; r < a.length; r++) {
            this[t].appendChild(a[r]);
          } else this[t].appendChild(a);
        }return this;
      }, prepend: function prepend(a) {
        var t, r;for (t = 0; t < this.length; t++) {
          if ("string" == typeof a) {
            var i = document.createElement("div");for (i.innerHTML = a, r = i.childNodes.length - 1; r >= 0; r--) {
              this[t].insertBefore(i.childNodes[r], this[t].childNodes[0]);
            }
          } else if (a instanceof e) for (r = 0; r < a.length; r++) {
            this[t].insertBefore(a[r], this[t].childNodes[0]);
          } else this[t].insertBefore(a, this[t].childNodes[0]);
        }return this;
      }, insertBefore: function insertBefore(e) {
        for (var t = a(e), r = 0; r < this.length; r++) {
          if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
            t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i]);
          }
        }
      }, insertAfter: function insertAfter(e) {
        for (var t = a(e), r = 0; r < this.length; r++) {
          if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
            t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i].nextSibling);
          }
        }
      }, next: function next(t) {
        return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : []);
      }, nextAll: function nextAll(t) {
        var r = [],
            i = this[0];if (!i) return new e([]);for (; i.nextElementSibling;) {
          var s = i.nextElementSibling;t ? a(s).is(t) && r.push(s) : r.push(s), i = s;
        }return new e(r);
      }, prev: function prev(t) {
        return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []);
      }, prevAll: function prevAll(t) {
        var r = [],
            i = this[0];if (!i) return new e([]);for (; i.previousElementSibling;) {
          var s = i.previousElementSibling;t ? a(s).is(t) && r.push(s) : r.push(s), i = s;
        }return new e(r);
      }, parent: function parent(e) {
        for (var t = [], r = 0; r < this.length; r++) {
          e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
        }return a(a.unique(t));
      }, parents: function parents(e) {
        for (var t = [], r = 0; r < this.length; r++) {
          for (var i = this[r].parentNode; i;) {
            e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
          }
        }return a(a.unique(t));
      }, find: function find(a) {
        for (var t = [], r = 0; r < this.length; r++) {
          for (var i = this[r].querySelectorAll(a), s = 0; s < i.length; s++) {
            t.push(i[s]);
          }
        }return new e(t);
      }, children: function children(t) {
        for (var r = [], i = 0; i < this.length; i++) {
          for (var s = this[i].childNodes, n = 0; n < s.length; n++) {
            t ? 1 === s[n].nodeType && a(s[n]).is(t) && r.push(s[n]) : 1 === s[n].nodeType && r.push(s[n]);
          }
        }return new e(a.unique(r));
      }, remove: function remove() {
        for (var e = 0; e < this.length; e++) {
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        }return this;
      }, add: function add() {
        var e,
            t,
            r = this;for (e = 0; e < arguments.length; e++) {
          var i = a(arguments[e]);for (t = 0; t < i.length; t++) {
            r[r.length] = i[t], r.length++;
          }
        }return r;
      } }, a.fn = e.prototype, a.unique = function (e) {
      for (var a = [], t = 0; t < e.length; t++) {
        -1 === a.indexOf(e[t]) && a.push(e[t]);
      }return a;
    }, a;
  }(), i = ["jQuery", "Zepto", "Dom7"], s = 0; s < i.length; s++) {
    window[i[s]] && e(window[i[s]]);
  }var n;n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
    function a(s) {
      if (s.target === this) for (e.call(this, s), t = 0; t < r.length; t++) {
        i.off(r[t], a);
      }
    }var t,
        r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        i = this;if (e) for (t = 0; t < r.length; t++) {
      i.on(r[t], a);
    }return this;
  }), "transform" in n.fn || (n.fn.transform = function (e) {
    for (var a = 0; a < this.length; a++) {
      var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
    }return this;
  }), "transition" in n.fn || (n.fn.transition = function (e) {
    "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
      var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
    }return this;
  })), window.Swiper = t;
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
  "use strict";
  return window.Swiper;
});
//# sourceMappingURL=maps/swiper.min.js.map
},{}],34:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sliderMethodsList = ['disableMousewheelControl', 'enableMousewheelControl', 'enableKeyboardControl', 'disableKeyboardControl', 'slideNext', 'slidePrev', 'slideTo', 'startAutoplay', 'stopAutoplay', 'destroy', 'getWrapperTranslate', 'setWrapperTranslate', 'removeSlide', 'removeAllSlides', 'updateContainerSize', 'updateSlidesSize', 'updateProgress', 'updatePagination', 'updateClasses', 'update', 'onResize', 'detachEvents', 'attachEvents', 'appendSlide', 'prependSlide', 'on', 'once', 'off', 'lockSwipes', 'lockSwipeToNext', 'lockSwipeToPrev', 'reLoop', 'disableTouchControl', 'enableTouchControl', 'unsetGrabCursor', 'setGrabCursor'];
var sliderPropsList = ['activeIndex', 'realIndex', 'previousIndex', 'width', 'height', 'touches', 'params', 'container', 'wrapper', 'slides', 'bullets', 'translate', 'progress', 'isBeginning', 'isEnd', 'autoplaying', 'animating', 'clickedIndex', 'clickedSlide', 'prevButton', 'nextButton'];
function CMUI_SliderList() {
  this.length = 0;
}
sliderMethodsList.forEach(function (item) {
  CMUI_SliderList.prototype[item] = function (arg) {
    var _this = this;

    _.times(this.length).forEach(function (index) {
      if (_this[index] instanceof Swiper) {
        _this[index][item](arg);
      }
    });
    return this;
  };
});
sliderPropsList.forEach(function (item) {
  CMUI_SliderList.prototype[item] = function () {
    return _.get(this, '[0]' + item);
  };
});
CMUI_SliderList.prototype.add = function (item) {
  if (item instanceof Swiper) {
    this[this.length++] = item;
  }
  return this;
};
CMUI_SliderList.prototype.remove = function () {
  var _this2 = this;

  _.times(this.length, function (index) {
    var swiper = _this2[index];
    if (swiper instanceof Swiper) {
      var container = swiper.container;
      var baseIndex = _.findKey(sliderList, swiper);
      swiper.destroy(false, true);
      container.remove();
      _this2[index] = null;
      if (_this2 != sliderList) {
        sliderList[baseIndex] = null;
      }
    }
  });
  return this;
};
CMUI_SliderList.prototype.eq = function () {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var temp = new CMUI_SliderList();
  return temp.add(this[index]);
};
var sliderList = new CMUI_SliderList();
exports.CMUI_SliderList = CMUI_SliderList;
exports.default = sliderList;
},{}],43:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = thememaker;
function thememaker() {
  var _this = this;
  var theme = this.theme;
  var options = {
    pagination: '.pagination',
    paginationClickable: true,
    loop: true,
    //autoplayDisableOnInteraction:false,
    // lazyLoading         : true,
    // updateOnImagesReady : true,
    preloadImages: true
  };
  switch (theme) {
    default:
      break;
    case 1:
      options.effect = 'coverflow', options.grabCursor = true, options.centeredSlides = true, options.slidesPerView = 2, options.loop = false, options.coverflow = {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      };
      break;
    case 2:
      options.pagination = false, options.direction = 'vertical';
      break;
    case 3:
      options.paginationType = 'custom', options.paginationCustomRender = function (swiper, current, total) {
        return '<span>' + current + '/' + total + '</span>';
      };
      break;
    case 4:
      options.pagination = false;
      _this.col = 0;
      _this.auto = 0;
      options.loop = false;
      break;
    case 5:
      options.effect = 'coverflow';
      options.centeredSlides = true;
      options.slidesPerView = 1.1;
      options.loop = false;
      options.spaceBetween = 45;
      options.coverflow = {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false
      };
      options.paginationType = 'custom';
      options.paginationCustomRender = function (swiper, current, total) {
        return '<span class="text-white fs-12 marginr40 text-right lh-20">' + current + '/' + total + '</span>';
      };
      break;
  }
  if (this.col === 0) {
    options.slidesPerView = 'auto';
    this.$children.forEach(function (item) {
      item.$el.style.width = 'auto';
    });
  } else {
    options.slidesPerView = this.col || options.slidesPerView || 1;
  }
  options.spaceBetween = this.space || options.spaceBetween || 0;
  options.autoplay = function (_this) {
    if (_this.auto == 0) {
      return 0;
    } else {
      return options.autoplay || 3000;
    }
  }(this);
  options.autoHeight = this.autoHeight;
  options.slidesPerColumn = this.span || options.slidesPerColumn || 1;
  options.loop = this.loop;
  options.autoplayDisableOnInteraction = this.autoplayDisable;
  return _.defaults(this.options, options);
}
},{}],13:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("@import url(./swiper.css);");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _swiper = require('./swiper');

  var _swiper2 = _interopRequireDefault(_swiper);

  var _sliderList = require('./sliderList');

  var _sliderList2 = _interopRequireDefault(_sliderList);

  var _themeMaker = require('./themeMaker');

  var _themeMaker2 = _interopRequireDefault(_themeMaker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = {
    mounted: function mounted() {
      var _this = this;
      setTimeout(function () {
        _this.swiper = new _swiper2.default($('.swiper-container', _this.$el), _themeMaker2.default.call(_this));
        _this.swiperIndex = _sliderList2.default.length;
        _sliderList2.default.add(_this.swiper);
      }, 0);
    },
    watch: {
      items: function items(newData, oldData) {
        var _this = this;
        this.swiper && this.swiper.destroy(false, true);
        if (!(newData && oldData && newData.length === oldData.length)) {
          $(_this.$el).find('.pagination').empty();
        }
        setTimeout(function () {
          if (_this.items) {
            _this.swiper = new _swiper2.default($('.swiper-container', _this.$el), _themeMaker2.default.call(_this));
            _sliderList2.default[_this.swiperIndex] = _this.swiper;
          }
        }, 0);
      }
    },
    props: {
      id: { type: String, default: _.uniqueId('cmui-slider_') },
      items: { type: Array },
      theme: { type: Number },
      col: { type: Number },
      span: { type: Number },
      space: { type: Number },
      auto: { type: Number },
      loop: { type: Boolean },
      autoplayDisable: { type: Boolean },
      target: { type: Object },
      autoHeight: { type: Boolean, default: false },
      options: { type: Object }
    },
    destroyed: function destroyed() {
      this.swiper && this.swiper.destroy(true, true);
      $(this.$el).remove();
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-slider" }, [_c('div', { staticClass: "swiper-container", attrs: { "id": _vm.id } }, [_c('div', { staticClass: "swiper-wrapper" }, [_vm._t("default")], 2), _vm._v(" "), _c('div', { staticClass: "pagination" })])]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-0430f8e5", __vue__options__);
    } else {
      hotAPI.reload("data-v-0430f8e5", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"./swiper":33,"./sliderList":34,"./themeMaker":43,"vue-hot-reload-api":48,"vue":47}],16:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    data: function data() {
      return {
        name: 'cmui-slider-item'
      };
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "swiper-slide" }, [_vm._t("default")], 2);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-6e26ddaa", __vue__options__);
    } else {
      hotAPI.reload("data-v-6e26ddaa", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],35:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  1: {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2,
    loop: false,
    coverflow: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  },
  2: {},
  3: {}
};
},{}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slider = require("./slider.vue");

var _slider2 = _interopRequireDefault(_slider);

var _sliderItem = require("./slider-item.vue");

var _sliderItem2 = _interopRequireDefault(_sliderItem);

var _swiper = require("./swiper");

var _swiper2 = _interopRequireDefault(_swiper);

var _sliderList = require("./sliderList");

var _sliderList2 = _interopRequireDefault(_sliderList);

var _sliderThemeList = require("./sliderThemeList");

var _sliderThemeList2 = _interopRequireDefault(_sliderThemeList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('cmui-slider', _slider2.default);
Vue.component('cmui-slider-item', _sliderItem2.default);
function Slider() {
  if (arguments.length) {
    var argParent,
        argStrings = [],
        argObject,
        argFunction,
        tempSliderList = new _sliderList.CMUI_SliderList();
    _.forEach(arguments, function (item) {
      if (_.isString(item)) {
        if (item[0] == '.' || item[0] == '#') {
          if (!argParent) {
            var dom = $(item);
            if (dom.length) {
              argParent = dom;
            }
          }
        } else {
          argStrings.push(item);
        }
      } else if (_.isNumber(item)) {
        argStrings.push(item.toString());
      } else if (_.isFunction(item)) {
        argFunction = item;
      } else if (_.isArray(item) && _.every(item, _.isString)) {
        argStrings = argStrings.concat(item);
      } else if (_.isObject(item)) {
        if (item instanceof jQuery) {
          argParent = item;
        } else {
          argObject = item;
        }
      }
    });

    //只有一个选择器的情况
    if (argParent && arguments.length == 1) {
      _.filter(_sliderList2.default, function (value, key) {
        return argParent == _.get(value, 'container');
      }).forEach(function (item) {
        return tempSliderList.add(item);
      });
      return tempSliderList;
    }
    var defaultOptions = {
      parent: argParent || $('body'),
      items: function () {
        if (argFunction) {
          var rs = argFunction();
          if (_.isArray(rs)) {
            return rs;
          } else {
            return [];
          }
        } else {
          return argStrings.length ? argStrings : [];
        }
      }(),
      id: _.uniqueId('cmui-slider_'),
      options: {},
      theme: ''
    };
    var options = _.assign(defaultOptions, argObject);
    var parent = $(options.parent).eq(0);
    if (!parent.length) {
      return _sliderList2.default;
    }
    var tpl = '';
    tpl += '<div class="cmui-slider">';
    tpl += '	<div class="swiper-container" id="' + options.id + '" >';
    tpl += '		<div class="swiper-wrapper">';
    options.items.forEach(function (item) {
      tpl += '<div class="swiper-slide">';
      tpl += item.toString();
      tpl += '</div>';
    });
    tpl += '		</div>';
    tpl += '	    <div class="pagination"></div>';
    tpl += '	</div>';
    tpl += '</div>';
    var dom = $(tpl);
    parent.append(dom);
    //主题拓展
    if (options.theme) {
      _.defaults(options.options, _sliderThemeList2.default[options.theme]);
    }
    var swiper = new _swiper2.default($('.swiper-container', dom), options.options);
    _sliderList2.default.add(swiper);
    return tempSliderList.add(swiper);
  } else {
    return _sliderList2.default;
  }
}
exports.default = Slider;
},{"./slider.vue":13,"./slider-item.vue":16,"./swiper":33,"./sliderList":34,"./sliderThemeList":35}],18:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'cmui-list',
    props: {
      col: { type: [Number, Array], default: 1 },
      space: { type: Number, default: 0 },
      border: { type: [Boolean, String], default: false },
      target: Object
    },
    data: function data() {
      var defaultBorderColor = "#eeeeee",
          isColor = /^#[a-fA-F0-9]{6}$/.test(this.border),
          borderColor = isColor ? this.border : defaultBorderColor;
      return {
        borderColor: borderColor
      };
    },
    computed: {
      realSpace: function realSpace() {
        var value = parseInt(this.space);
        if (_.isNumber(value)) {
          if (_.inRange(value, -1, 51)) {
            return value / 75 || 0;
          }
        }
        return 0;
      },
      realCol: function realCol() {
        var value = this.col;
        if (_.isNumber(value)) {
          if (_.inRange(value, 0, 11)) {
            return parseInt(value) || 1;
          } else {
            return 1;
          }
        } else if (_.isArray(value) && _.every(value, _.isNumber)) {
          return value.map(function (item) {
            return parseInt(item) || 1;
          });
        } else {
          return parseInt(value) || 1;
        }
      },
      containerStyle: function containerStyle() {
        return {
          'margin-right': '-' + this.realSpace + 'rem',
          'margin-bottom': '-' + this.realSpace + 'rem'
        };
      },
      boxShadow: function boxShadow() {
        if (this.border && this.realSpace == 0) {
          return '0px 0px 0px 1px ' + this.borderColor;
        }
        return;
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-list overflow-h", style: { boxShadow: _vm.boxShadow } }, [_c('div', { staticClass: "clearfix", style: _vm.containerStyle }, [_vm._t("default")], 2)]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-23508985", __vue__options__);
    } else {
      hotAPI.reload("data-v-23508985", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],19:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-list-item{\n    float: left;\n    position: relative;\n    min-height: 1px;\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'cmui-list-item',
    data: function data() {
      var itemContainerStyle,
          parent = this.$parent,
          border;
      if (parent.border && parent.realSpace != 0) {
        border = '1px solid ' + parent.borderColor;
      }
      return {
        itemContainerStyle: { border: border }
      };
    },
    computed: {
      itemList: function itemList() {
        return this.$parent.$children.filter(function (item) {
          return item.$options._componentTag == "cmui-list-item";
        });
      }
    },
    methods: {
      itemStyle: function itemStyle() {
        var width,
            clear,
            col = this.$parent.realCol,
            colCount = _.isNumber(col) ? col : col.length,
            index = _.findIndex(this.itemList, this),
            paddingRight = this.$parent.realSpace + 'rem',
            paddingBottom = this.$parent.realSpace + 'rem',
            boxShadow = this.$parent.boxShadow;
        if (_.isNumber(col)) {
          width = 100 / col + '%';
          clear = index % col === 0 ? 'left' : undefined;
        } else if (_.isArray(col)) {
          var total = col.reduce(function (pre, next) {
            return pre + next;
          });
          width = 100 * col[index % col.length] / total + '%';
          clear = index % col.length === 0 ? 'left' : undefined;
        }
        return { width: width, clear: clear, paddingRight: paddingRight, paddingBottom: paddingBottom, boxShadow: boxShadow };
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-list-item", style: _vm.itemStyle() }, [_c('div', { staticClass: "cmui-list-item-container", style: _vm.itemContainerStyle }, [_vm._t("default")], 2)]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-100e648b", __vue__options__);
    } else {
      hotAPI.reload("data-v-100e648b", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],36:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function CMUI_ListList() {
  this.length = 0;
}
CMUI_ListList.prototype.add = function (item) {
  //类型判断暂时没加
  this[this.length++] = item;
  return this;
};
CMUI_ListList.prototype.remove = function () {
  var _this = this;

  _.times(this.length, function (index) {
    if (_this[index] instanceof jQuery) {
      _this[index].remove();
      _this[index] = null;
    }
  });
  return this;
};
CMUI_ListList.prototype.eq = function () {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var temp = new CMUI_ListList();
  return temp.add(this[index]);
};
var listList = new CMUI_ListList();
exports.CMUI_ListList = CMUI_ListList;
exports.default = listList;
},{}],31:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = factory();
  } else {
    /* jshint sub:true */
    window["Sortable"] = factory();
  }
})(function sortableFactory() {
  "use strict";

  if (typeof window == "undefined" || !window.document) {
    return function sortableError() {
      throw new Error("Sortable.js requires a window with a document");
    };
  }

  var dragEl,
      parentEl,
      ghostEl,
      cloneEl,
      rootEl,
      nextEl,
      lastDownEl,
      scrollEl,
      scrollParentEl,
      scrollCustomFn,
      lastEl,
      lastCSS,
      lastParentCSS,
      oldIndex,
      newIndex,
      activeGroup,
      putSortable,
      autoScroll = {},
      tapEvt,
      touchEvt,
      moved,


  /** @const */
  R_SPACE = /\s+/g,
      R_FLOAT = /left|right|inline/,
      expando = 'Sortable' + new Date().getTime(),
      win = window,
      document = win.document,
      parseInt = win.parseInt,
      $ = win.jQuery || win.Zepto,
      Polymer = win.Polymer,
      captureMode = false,
      supportDraggable = !!('draggable' in document.createElement('div')),
      supportCssPointerEvents = function (el) {
    // false when IE11
    if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
      return false;
    }
    el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
      _silent = false,
      abs = Math.abs,
      min = Math.min,
      savedInputChecked = [],
      touchDragOverListeners = [],
      _autoScroll = _throttle(function ( /**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
    // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
    if (rootEl && options.scroll) {
      var _this = rootEl[expando],
          el,
          rect,
          sens = options.scrollSensitivity,
          speed = options.scrollSpeed,
          x = evt.clientX,
          y = evt.clientY,
          winWidth = window.innerWidth,
          winHeight = window.innerHeight,
          vx,
          vy,
          scrollOffsetX,
          scrollOffsetY;

      // Delect scrollEl
      if (scrollParentEl !== rootEl) {
        scrollEl = options.scroll;
        scrollParentEl = rootEl;
        scrollCustomFn = options.scrollFn;

        if (scrollEl === true) {
          scrollEl = rootEl;

          do {
            if (scrollEl.offsetWidth < scrollEl.scrollWidth || scrollEl.offsetHeight < scrollEl.scrollHeight) {
              break;
            }
            /* jshint boss:true */
          } while (scrollEl = scrollEl.parentNode);
        }
      }

      if (scrollEl) {
        el = scrollEl;
        rect = scrollEl.getBoundingClientRect();
        vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
        vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
      }

      if (!(vx || vy)) {
        vx = (winWidth - x <= sens) - (x <= sens);
        vy = (winHeight - y <= sens) - (y <= sens);

        /* jshint expr:true */
        (vx || vy) && (el = win);
      }

      if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
        autoScroll.el = el;
        autoScroll.vx = vx;
        autoScroll.vy = vy;

        clearInterval(autoScroll.pid);

        if (el) {
          autoScroll.pid = setInterval(function () {
            scrollOffsetY = vy ? vy * speed : 0;
            scrollOffsetX = vx ? vx * speed : 0;

            if ('function' === typeof scrollCustomFn) {
              return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
            }

            if (el === win) {
              win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
            } else {
              el.scrollTop += scrollOffsetY;
              el.scrollLeft += scrollOffsetX;
            }
          }, 24);
        }
      }
    }
  }, 30),
      _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      if (value === void 0 || value === true) {
        value = group.name;
      }

      if (typeof value === 'function') {
        return value;
      } else {
        return function (to, from) {
          var fromGroup = from.options.group.name;

          return pull ? value : value && (value.join ? value.indexOf(fromGroup) > -1 : fromGroup == value);
        };
      }
    }

    var group = {};
    var originalGroup = options.group;

    if (!originalGroup || (typeof originalGroup === "undefined" ? "undefined" : _typeof(originalGroup)) != 'object') {
      originalGroup = { name: originalGroup };
    }

    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;

    options.group = group;
  };

  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */
  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
    }

    this.el = el; // root element
    this.options = options = _extend({}, options);

    // Export instance
    el[expando] = this;

    // Default options
    var defaults = {
      group: Math.random(),
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: true,
      animation: 0,
      setData: function setData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', dragEl.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: 'data-id',
      delay: 0,
      forceFallback: false,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: { x: 0, y: 0 }
    };

    // Set default options
    for (var name in defaults) {
      !(name in options) && (options[name] = defaults[name]);
    }

    _prepareGroup(options);

    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    // Setup drag mode
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;

    // Bind events
    _on(el, 'mousedown', this._onTapStart);
    _on(el, 'touchstart', this._onTapStart);
    _on(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      _on(el, 'dragover', this);
      _on(el, 'dragenter', this);
    }

    touchDragOverListeners.push(this._onDragOver);

    // Restore sorting
    options.store && this.sort(options.store.get(this));
  }

  Sortable.prototype = /** @lends Sortable.prototype */{
    constructor: Sortable,

    _onTapStart: function _onTapStart( /** Event|TouchEvent */evt) {
      var _this = this,
          el = this.el,
          options = this.options,
          preventOnFilter = options.preventOnFilter,
          type = evt.type,
          touch = evt.touches && evt.touches[0],
          target = (touch || evt).target,
          originalTarget = evt.target.shadowRoot && evt.path[0] || target,
          filter = options.filter,
          startIndex;

      _saveInputCheckedState(el);

      // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
      if (dragEl) {
        return;
      }

      if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
        return; // only left button or enabled
      }

      target = _closest(target, options.draggable, el);

      if (!target) {
        return;
      }

      if (lastDownEl === target) {
        // Ignoring duplicate `down`
        return;
      }

      // Get the index of the dragged element within its parent
      startIndex = _index(target, options.draggable);

      // Check filter
      if (typeof filter === 'function') {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
          preventOnFilter && evt.preventDefault();
          return; // cancel dnd
        }
      } else if (filter) {
        filter = filter.split(',').some(function (criteria) {
          criteria = _closest(originalTarget, criteria.trim(), el);

          if (criteria) {
            _dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
            return true;
          }
        });

        if (filter) {
          preventOnFilter && evt.preventDefault();
          return; // cancel dnd
        }
      }

      if (options.handle && !_closest(originalTarget, options.handle, el)) {
        return;
      }

      // Prepare `dragstart`
      this._prepareDragStart(evt, touch, target, startIndex);
    },

    _prepareDragStart: function _prepareDragStart( /** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
      var _this = this,
          el = _this.el,
          options = _this.options,
          ownerDocument = el.ownerDocument,
          dragStartFn;

      if (target && !dragEl && target.parentNode === el) {
        tapEvt = evt;

        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        oldIndex = startIndex;

        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;

        dragEl.style['will-change'] = 'transform';

        dragStartFn = function dragStartFn() {
          // Delayed drag has been triggered
          // we can re-enable the events: touchmove/mousemove
          _this._disableDelayedDrag();

          // Make the element draggable
          dragEl.draggable = _this.nativeDraggable;

          // Chosen item
          _toggleClass(dragEl, options.chosenClass, true);

          // Bind the events: dragstart/dragend
          _this._triggerDragStart(evt, touch);

          // Drag start event
          _dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
        };

        // Disable "draggable"
        options.ignore.split(',').forEach(function (criteria) {
          _find(dragEl, criteria.trim(), _disableDraggable);
        });

        _on(ownerDocument, 'mouseup', _this._onDrop);
        _on(ownerDocument, 'touchend', _this._onDrop);
        _on(ownerDocument, 'touchcancel', _this._onDrop);
        _on(ownerDocument, 'pointercancel', _this._onDrop);
        _on(ownerDocument, 'selectstart', _this);

        if (options.delay) {
          // If the user moves the pointer or let go the click or touch
          // before the delay has been reached:
          // disable the delayed drag
          _on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
          _on(ownerDocument, 'touchend', _this._disableDelayedDrag);
          _on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
          _on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
          _on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
          _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },

    _disableDelayedDrag: function _disableDelayedDrag() {
      var ownerDocument = this.el.ownerDocument;

      clearTimeout(this._dragStartTimer);
      _off(ownerDocument, 'mouseup', this._disableDelayedDrag);
      _off(ownerDocument, 'touchend', this._disableDelayedDrag);
      _off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
      _off(ownerDocument, 'mousemove', this._disableDelayedDrag);
      _off(ownerDocument, 'touchmove', this._disableDelayedDrag);
      _off(ownerDocument, 'pointermove', this._disableDelayedDrag);
    },

    _triggerDragStart: function _triggerDragStart( /** Event */evt, /** Touch */touch) {
      touch = touch || (evt.pointerType == 'touch' ? evt : null);

      if (touch) {
        // Touch device support
        tapEvt = {
          target: dragEl,
          clientX: touch.clientX,
          clientY: touch.clientY
        };

        this._onDragStart(tapEvt, 'touch');
      } else if (!this.nativeDraggable) {
        this._onDragStart(tapEvt, true);
      } else {
        _on(dragEl, 'dragend', this);
        _on(rootEl, 'dragstart', this._onDragStart);
      }

      try {
        if (document.selection) {
          // Timeout neccessary for IE9
          setTimeout(function () {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {}
    },

    _dragStarted: function _dragStarted() {
      if (rootEl && dragEl) {
        var options = this.options;

        // Apply effect
        _toggleClass(dragEl, options.ghostClass, true);
        _toggleClass(dragEl, options.dragClass, false);

        Sortable.active = this;

        // Drag start event
        _dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
      } else {
        this._nulling();
      }
    },

    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
          return;
        }

        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;

        if (!supportCssPointerEvents) {
          _css(ghostEl, 'display', 'none');
        }

        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
            parent = target,
            i = touchDragOverListeners.length;

        if (parent) {
          do {
            if (parent[expando]) {
              while (i--) {
                touchDragOverListeners[i]({
                  clientX: touchEvt.clientX,
                  clientY: touchEvt.clientY,
                  target: target,
                  rootEl: parent
                });
              }

              break;
            }

            target = parent; // store last element
          }
          /* jshint boss:true */
          while (parent = parent.parentNode);
        }

        if (!supportCssPointerEvents) {
          _css(ghostEl, 'display', '');
        }
      }
    },

    _onTouchMove: function _onTouchMove( /**TouchEvent*/evt) {
      if (tapEvt) {
        var options = this.options,
            fallbackTolerance = options.fallbackTolerance,
            fallbackOffset = options.fallbackOffset,
            touch = evt.touches ? evt.touches[0] : evt,
            dx = touch.clientX - tapEvt.clientX + fallbackOffset.x,
            dy = touch.clientY - tapEvt.clientY + fallbackOffset.y,
            translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

        // only set the status to dragging, when we are actually dragging
        if (!Sortable.active) {
          if (fallbackTolerance && min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }

          this._dragStarted();
        }

        // as well as creating the ghost element on the document body
        this._appendGhost();

        moved = true;
        touchEvt = touch;

        _css(ghostEl, 'webkitTransform', translate3d);
        _css(ghostEl, 'mozTransform', translate3d);
        _css(ghostEl, 'msTransform', translate3d);
        _css(ghostEl, 'transform', translate3d);

        evt.preventDefault();
      }
    },

    _appendGhost: function _appendGhost() {
      if (!ghostEl) {
        var rect = dragEl.getBoundingClientRect(),
            css = _css(dragEl),
            options = this.options,
            ghostRect;

        ghostEl = dragEl.cloneNode(true);

        _toggleClass(ghostEl, options.ghostClass, false);
        _toggleClass(ghostEl, options.fallbackClass, true);
        _toggleClass(ghostEl, options.dragClass, true);

        _css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
        _css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
        _css(ghostEl, 'width', rect.width);
        _css(ghostEl, 'height', rect.height);
        _css(ghostEl, 'opacity', '0.8');
        _css(ghostEl, 'position', 'fixed');
        _css(ghostEl, 'zIndex', '100000');
        _css(ghostEl, 'pointerEvents', 'none');

        options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

        // Fixing dimensions.
        ghostRect = ghostEl.getBoundingClientRect();
        _css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
        _css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
      }
    },

    _onDragStart: function _onDragStart( /**Event*/evt, /**boolean*/useFallback) {
      var dataTransfer = evt.dataTransfer,
          options = this.options;

      this._offUpEvents();

      if (activeGroup.checkPull(this, this, dragEl, evt)) {
        cloneEl = _clone(dragEl);

        cloneEl.draggable = false;
        cloneEl.style['will-change'] = '';

        _css(cloneEl, 'display', 'none');
        _toggleClass(cloneEl, this.options.chosenClass, false);

        rootEl.insertBefore(cloneEl, dragEl);
        _dispatchEvent(this, rootEl, 'clone', dragEl);
      }

      _toggleClass(dragEl, options.dragClass, true);

      if (useFallback) {
        if (useFallback === 'touch') {
          // Bind touch events
          _on(document, 'touchmove', this._onTouchMove);
          _on(document, 'touchend', this._onDrop);
          _on(document, 'touchcancel', this._onDrop);
          _on(document, 'pointermove', this._onTouchMove);
          _on(document, 'pointerup', this._onDrop);
        } else {
          // Old brwoser
          _on(document, 'mousemove', this._onTouchMove);
          _on(document, 'mouseup', this._onDrop);
        }

        this._loopId = setInterval(this._emulateDragOver, 50);
      } else {
        if (dataTransfer) {
          dataTransfer.effectAllowed = 'move';
          options.setData && options.setData.call(this, dataTransfer, dragEl);
        }

        _on(document, 'drop', this);
        setTimeout(this._dragStarted, 0);
      }
    },

    _onDragOver: function _onDragOver( /**Event*/evt) {
      var el = this.el,
          target,
          dragRect,
          targetRect,
          revert,
          options = this.options,
          group = options.group,
          activeSortable = Sortable.active,
          isOwner = activeGroup === group,
          isMovingBetweenSortable = false,
          canSort = options.sort;

      if (evt.preventDefault !== void 0) {
        evt.preventDefault();
        !options.dragoverBubble && evt.stopPropagation();
      }

      if (dragEl.animated) {
        return;
      }

      moved = true;

      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
      : putSortable === this || (activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt)) && (evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
      ) {
          // Smart auto-scrolling
          _autoScroll(evt, options, this.el);

          if (_silent) {
            return;
          }

          target = _closest(evt.target, options.draggable, el);
          dragRect = dragEl.getBoundingClientRect();

          if (putSortable !== this) {
            putSortable = this;
            isMovingBetweenSortable = true;
          }

          if (revert) {
            _cloneHide(activeSortable, true);
            parentEl = rootEl; // actualization

            if (cloneEl || nextEl) {
              rootEl.insertBefore(dragEl, cloneEl || nextEl);
            } else if (!canSort) {
              rootEl.appendChild(dragEl);
            }

            return;
          }

          if (el.children.length === 0 || el.children[0] === ghostEl || el === evt.target && _ghostIsLast(el, evt)) {
            //assign target only if condition is true
            if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
              target = el.lastElementChild;
            }

            if (target) {
              if (target.animated) {
                return;
              }

              targetRect = target.getBoundingClientRect();
            }

            _cloneHide(activeSortable, isOwner);

            if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
              if (!dragEl.contains(el)) {
                el.appendChild(dragEl);
                parentEl = el; // actualization
              }

              this._animate(dragRect, dragEl);
              target && this._animate(targetRect, target);
            }
          } else if (target && !target.animated && target !== dragEl && target.parentNode[expando] !== void 0) {
            if (lastEl !== target) {
              lastEl = target;
              lastCSS = _css(target);
              lastParentCSS = _css(target.parentNode);
            }

            targetRect = target.getBoundingClientRect();

            var width = targetRect.right - targetRect.left,
                height = targetRect.bottom - targetRect.top,
                floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display) || lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0,
                isWide = target.offsetWidth > dragEl.offsetWidth,
                isLong = target.offsetHeight > dragEl.offsetHeight,
                halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
                nextSibling = target.nextElementSibling,
                after = false;

            if (floating) {
              var elTop = dragEl.offsetTop,
                  tgTop = target.offsetTop;

              if (elTop === tgTop) {
                after = target.previousElementSibling === dragEl && !isWide || halfway && isWide;
              } else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
                after = (evt.clientY - targetRect.top) / height > 0.5;
              } else {
                after = tgTop > elTop;
              }
            } else if (!isMovingBetweenSortable) {
              after = nextSibling !== dragEl && !isLong || halfway && isLong;
            }

            var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

            if (moveVector !== false) {
              if (moveVector === 1 || moveVector === -1) {
                after = moveVector === 1;
              }

              _silent = true;
              setTimeout(_unsilent, 30);

              _cloneHide(activeSortable, isOwner);

              if (!dragEl.contains(el)) {
                if (after && !nextSibling) {
                  el.appendChild(dragEl);
                } else {
                  target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
                }
              }

              parentEl = dragEl.parentNode; // actualization

              this._animate(dragRect, dragEl);
              this._animate(targetRect, target);
            }
          }
        }
    },

    _animate: function _animate(prevRect, target) {
      var ms = this.options.animation;

      if (ms) {
        var currentRect = target.getBoundingClientRect();

        if (prevRect.nodeType === 1) {
          prevRect = prevRect.getBoundingClientRect();
        }

        _css(target, 'transition', 'none');
        _css(target, 'transform', 'translate3d(' + (prevRect.left - currentRect.left) + 'px,' + (prevRect.top - currentRect.top) + 'px,0)');

        target.offsetWidth; // repaint

        _css(target, 'transition', 'all ' + ms + 'ms');
        _css(target, 'transform', 'translate3d(0,0,0)');

        clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          _css(target, 'transition', '');
          _css(target, 'transform', '');
          target.animated = false;
        }, ms);
      }
    },

    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;

      _off(document, 'touchmove', this._onTouchMove);
      _off(document, 'pointermove', this._onTouchMove);
      _off(ownerDocument, 'mouseup', this._onDrop);
      _off(ownerDocument, 'touchend', this._onDrop);
      _off(ownerDocument, 'pointerup', this._onDrop);
      _off(ownerDocument, 'touchcancel', this._onDrop);
      _off(ownerDocument, 'pointercancel', this._onDrop);
      _off(ownerDocument, 'selectstart', this);
    },

    _onDrop: function _onDrop( /**Event*/evt) {
      var el = this.el,
          options = this.options;

      clearInterval(this._loopId);
      clearInterval(autoScroll.pid);
      clearTimeout(this._dragStartTimer);

      // Unbind events
      _off(document, 'mousemove', this._onTouchMove);

      if (this.nativeDraggable) {
        _off(document, 'drop', this);
        _off(el, 'dragstart', this._onDragStart);
      }

      this._offUpEvents();

      if (evt) {
        if (moved) {
          evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }

        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

        if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
          // Remove clone
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }

        if (dragEl) {
          if (this.nativeDraggable) {
            _off(dragEl, 'dragend', this);
          }

          _disableDraggable(dragEl);
          dragEl.style['will-change'] = '';

          // Remove class's
          _toggleClass(dragEl, this.options.ghostClass, false);
          _toggleClass(dragEl, this.options.chosenClass, false);

          // Drag stop event
          _dispatchEvent(this, rootEl, 'unchoose', dragEl, rootEl, oldIndex);

          if (rootEl !== parentEl) {
            newIndex = _index(dragEl, options.draggable);

            if (newIndex >= 0) {
              // Add event
              _dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

              // Remove event
              _dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

              // drag from one list and drop into another
              _dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
              _dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
            }
          } else {
            if (dragEl.nextSibling !== nextEl) {
              // Get the index of the dragged element within its parent
              newIndex = _index(dragEl, options.draggable);

              if (newIndex >= 0) {
                // drag & drop within the same list
                _dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
                _dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
              }
            }
          }

          if (Sortable.active) {
            /* jshint eqnull:true */
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
            }

            _dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

            // Save sorting
            this.save();
          }
        }
      }

      this._nulling();
    },

    _nulling: function _nulling() {
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = scrollEl = scrollParentEl = tapEvt = touchEvt = moved = newIndex = lastEl = lastCSS = putSortable = activeGroup = Sortable.active = null;

      savedInputChecked.forEach(function (el) {
        el.checked = true;
      });
      savedInputChecked.length = 0;
    },

    handleEvent: function handleEvent( /**Event*/evt) {
      switch (evt.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(evt);
          break;

        case 'dragover':
        case 'dragenter':
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;

        case 'selectstart':
          evt.preventDefault();
          break;
      }
    },

    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [],
          el,
          children = this.el.children,
          i = 0,
          n = children.length,
          options = this.options;

      for (; i < n; i++) {
        el = children[i];
        if (_closest(el, options.draggable, this.el)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }

      return order;
    },

    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order) {
      var items = {},
          rootEl = this.el;

      this.toArray().forEach(function (id, i) {
        var el = rootEl.children[i];

        if (_closest(el, this.options.draggable, rootEl)) {
          items[id] = el;
        }
      }, this);

      order.forEach(function (id) {
        if (items[id]) {
          rootEl.removeChild(items[id]);
          rootEl.appendChild(items[id]);
        }
      });
    },

    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set(this);
    },

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest(el, selector) {
      return _closest(el, selector || this.options.draggable, this.el);
    },

    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;

      if (value === void 0) {
        return options[name];
      } else {
        options[name] = value;

        if (name === 'group') {
          _prepareGroup(options);
        }
      }
    },

    /**
     * Destroy
     */
    destroy: function destroy() {
      var el = this.el;

      el[expando] = null;

      _off(el, 'mousedown', this._onTapStart);
      _off(el, 'touchstart', this._onTapStart);
      _off(el, 'pointerdown', this._onTapStart);

      if (this.nativeDraggable) {
        _off(el, 'dragover', this);
        _off(el, 'dragenter', this);
      }

      // Remove draggable attributes
      Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
        el.removeAttribute('draggable');
      });

      touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

      this._onDrop();

      this.el = el = null;
    }
  };

  function _cloneHide(sortable, state) {
    if (sortable.lastPullMode !== 'clone') {
      state = true;
    }

    if (cloneEl && cloneEl.state !== state) {
      _css(cloneEl, 'display', state ? 'none' : '');

      if (!state) {
        if (cloneEl.state) {
          if (sortable.options.group.revertClone) {
            rootEl.insertBefore(cloneEl, nextEl);
            sortable._animate(dragEl, cloneEl);
          } else {
            rootEl.insertBefore(cloneEl, dragEl);
          }
        }
      }

      cloneEl.state = state;
    }
  }

  function _closest( /**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
    if (el) {
      ctx = ctx || document;

      do {
        if (selector === '>*' && el.parentNode === ctx || _matches(el, selector)) {
          return el;
        }
        /* jshint boss:true */
      } while (el = _getParentOrHost(el));
    }

    return null;
  }

  function _getParentOrHost(el) {
    var parent = el.host;

    return parent && parent.nodeType ? parent : el.parentNode;
  }

  function _globalDragOver( /**Event*/evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
    }
    evt.preventDefault();
  }

  function _on(el, event, fn) {
    el.addEventListener(event, fn, captureMode);
  }

  function _off(el, event, fn) {
    el.removeEventListener(event, fn, captureMode);
  }

  function _toggleClass(el, name, state) {
    if (el) {
      if (el.classList) {
        el.classList[state ? 'add' : 'remove'](name);
      } else {
        var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
        el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
      }
    }
  }

  function _css(el, prop, val) {
    var style = el && el.style;

    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '');
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }

        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style)) {
          prop = '-webkit-' + prop;
        }

        style[prop] = val + (typeof val === 'string' ? '' : 'px');
      }
    }
  }

  function _find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName),
          i = 0,
          n = list.length;

      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }

      return list;
    }

    return [];
  }

  function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
    sortable = sortable || rootEl[expando];

    var evt = document.createEvent('Event'),
        options = sortable.options,
        onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

    evt.initEvent(name, true, true);

    evt.to = rootEl;
    evt.from = fromEl || rootEl;
    evt.item = targetEl || rootEl;
    evt.clone = cloneEl;

    evt.oldIndex = startIndex;
    evt.newIndex = newIndex;

    rootEl.dispatchEvent(evt);

    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }

  function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
    var evt,
        sortable = fromEl[expando],
        onMoveFn = sortable.options.onMove,
        retVal;

    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);

    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || toEl.getBoundingClientRect();
    evt.willInsertAfter = willInsertAfter;

    fromEl.dispatchEvent(evt);

    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvt);
    }

    return retVal;
  }

  function _disableDraggable(el) {
    el.draggable = false;
  }

  function _unsilent() {
    _silent = false;
  }

  /** @returns {HTMLElement|false} */
  function _ghostIsLast(el, evt) {
    var lastEl = el.lastElementChild,
        rect = lastEl.getBoundingClientRect();

    // 5 — min delta
    // abs — нельзя добавлять, а то глюки при наведении сверху
    return evt.clientY - (rect.top + rect.height) > 5 || evt.clientX - (rect.left + rect.width) > 5;
  }

  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */
  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent,
        i = str.length,
        sum = 0;

    while (i--) {
      sum += str.charCodeAt(i);
    }

    return sum.toString(36);
  }

  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */
  function _index(el, selector) {
    var index = 0;

    if (!el || !el.parentNode) {
      return -1;
    }

    while (el && (el = el.previousElementSibling)) {
      if (el.nodeName.toUpperCase() !== 'TEMPLATE' && (selector === '>*' || _matches(el, selector))) {
        index++;
      }
    }

    return index;
  }

  function _matches( /**HTMLElement*/el, /**String*/selector) {
    if (el) {
      selector = selector.split('.');

      var tag = selector.shift().toUpperCase(),
          re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

      return (tag === '' || el.nodeName.toUpperCase() == tag) && (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length);
    }

    return false;
  }

  function _throttle(callback, ms) {
    var args, _this;

    return function () {
      if (args === void 0) {
        args = arguments;
        _this = this;

        setTimeout(function () {
          if (args.length === 1) {
            callback.call(_this, args[0]);
          } else {
            callback.apply(_this, args);
          }

          args = void 0;
        }, ms);
      }
    };
  }

  function _extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }

    return dst;
  }

  function _clone(el) {
    return $ ? $(el).clone(true)[0] : Polymer && Polymer.dom ? Polymer.dom(el).cloneNode(true) : el.cloneNode(true);
  }

  function _saveInputCheckedState(root) {
    var inputs = root.getElementsByTagName('input');
    var idx = inputs.length;

    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }

  // Fixed #973: 
  _on(document, 'touchmove', function (evt) {
    if (Sortable.active) {
      evt.preventDefault();
    }
  });

  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: function get() {
        captureMode = {
          capture: false,
          passive: false
        };
      }
    }));
  } catch (err) {}

  // Export utils
  Sortable.utils = {
    on: _on,
    off: _off,
    css: _css,
    find: _find,
    is: function is(el, selector) {
      return !!_closest(el, selector, el);
    },
    extend: _extend,
    throttle: _throttle,
    closest: _closest,
    toggleClass: _toggleClass,
    clone: _clone,
    index: _index
  };

  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */
  Sortable.create = function (el, options) {
    return new Sortable(el, options);
  };

  // Export
  Sortable.version = '1.6.0';
  return Sortable;
});
},{}],29:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = require("./list.vue");

var _list2 = _interopRequireDefault(_list);

var _listItem = require("./list-item.vue");

var _listItem2 = _interopRequireDefault(_listItem);

var _listList = require("./listList");

var _listList2 = _interopRequireDefault(_listList);

var _Sortable = require("./Sortable.js");

var _Sortable2 = _interopRequireDefault(_Sortable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('cmui-list', _list2.default);
Vue.component('cmui-list-item', _listItem2.default);
function getItemClassByCol(col) {
  if (_.isNumber(col)) {
    switch (col) {
      case 2:
        return 'box-span6';
      case 3:
        return 'box-span4';
      case 4:
        return 'box-span3';
      case 5:
        return 'box-col3';
      case 6:
        return 'box-span2';
      default:
        return 'box-span12';
    }
  } else if (_.isArray(col) && col.every(function (item) {
    return item == parseInt(item);
  })) {
    var total = col.reduce(function (pre, next) {
      return pre + next;
    });
    if (total % 2 == 0 || total % 3 == 0) {
      return col.map(function (item) {
        return 'box-span' + parseInt(12 / total * item);
      });
    } else if (total % 5 == 0) {
      return col.map(function (item) {
        return 'box-col' + parseInt(15 / total * item);
      });
    } else {
      return ['box-span12'];
    }
  } else {
    return 'box-span12';
  }
}
function List() {
  if (!arguments.length) {
    return _listList2.default;
  } else {
    var defaultOptions = {
      col: _.find(arguments, function (item) {
        return _.isNumber(item) || _.isArray(item) && _.every(item, _.isNumber);
      }) || 1,
      space: _.filter(arguments, _.isNumber)[1] || 20,
      items: _.find(arguments, function (item) {
        return _.isArray(item) && _.every(item, _.isString) || _.isFunction(item);
      }) || [],
      parent: _.find(arguments, function (item) {
        return _.isElement(item) || item instanceof jQuery;
      }) || 'body',
      sortable: !!_.find(arguments, _.isBoolean),
      options: {
        draggable: '.cmui-list-item'
      }
    };
    var options = _.defaultsDeep(defaultOptions, _.find(arguments, _.isPlainObject));
    if (_.isFunction(options.items)) {
      var rs = options.items();
      if (_.isArray(rs)) {
        options.items = rs;
      }
    }
    if (options.space % 10 != 0 || !_.inRange(options.space, -1, 51)) {
      options.space = 20;
    }
    var realColClass = getItemClassByCol(options.col);
    var template = '';
    template += '<div class="cmui-list overflow-h">';
    template += '	<div class="clearfix marginr-n' + options.space + ' marginb-n' + options.space + '">';
    _.forEach(options.items, function (item, index) {
      template += '<div class="cmui-list-item paddingr' + options.space + ' paddingb' + options.space + ' ';
      if (_.isString(realColClass)) {
        template += realColClass;
      } else if (_.isArray(realColClass)) {
        template += realColClass[index % options.col.length];
      }
      template += '">' + item.toString() + '</div>';
    });
    template += '	</div>';
    template += '</div>';
    template = $(template);
    $(options.parent).append(template);
    if (options.sortable) {
      new _Sortable2.default(template.find('>.clearfix')[0], options.options);
    }
    _listList2.default.add(template);
    return template;
  }
}
exports.default = List;
/**
 * maple.list(2,[],20,dom)
 * maple.list({
 * 	col:number or list
 * 	space:number
 * 	item:array or function 
 * })
 */
},{"./list.vue":18,"./list-item.vue":19,"./listList":36,"./Sortable.js":31}],22:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'cmui-tabbar-nav',
    render: function render(h) {
      var activeIndex = this.activeIndex,
          itemStyle = this.itemStyle,
          itemEvent = this.itemEvent;

      var items = this.items.map(function (item, index) {
        return h('div', {
          'class': ['cmui-tabbar__head-item flex1', _.get(item, 'data.staticClass'), index === activeIndex ? 'active' : ''],
          style: itemStyle,
          on: {
            click: _.partialRight(itemEvent, item, index)
          },
          key: index
        }, item.children.filter(function (inner) {
          return _.get(inner, 'data.attrs.slot') !== 'content';
        }));
      });
      return h('div', {
        'class': {
          'cmui-tabbar__nav': true,
          'flex1': true
        }
      }, items);
    },

    props: {
      items: Array,
      activeIndex: Number,
      itemStyle: Object
    },
    methods: {
      itemEvent: function itemEvent(event, item, index) {
        var oldIndex = this.$parent.activeIndex;
        var model = _.get(item, 'data.model.value');
        this.$emit('nav-item', item, index, oldIndex, model);
        this.$parent.changeToIndex(index);
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-0e04f69b", __vue__options__);
    } else {
      hotAPI.reload("data-v-0e04f69b", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],23:[function(require,module,exports) {
"use strict";

;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'cmui-tabbar-pane',
    render: function render(h) {
      var activeIndex = this.activeIndex;

      var items = this.items.map(function (item, index) {
        return h('div', {
          'class': ['cmui-tabbar__pane-item', index === activeIndex ? 'active' : ''],
          style: {
            'display': index === activeIndex ? 'block' : 'none'
          },
          key: index
        }, item.children.filter(function (inner) {
          return _.get(inner, 'data.attrs.slot') === 'content';
        }));
      });
      return h('div', {
        'class': {
          'cmui-tabbar__pane': true
        }
      }, items);
    },

    props: {
      items: Array,
      activeIndex: Number
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-779bc9a0", __vue__options__);
    } else {
      hotAPI.reload("data-v-779bc9a0", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":48,"vue":47}],44:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'cmui-render',
  functional: true,
  props: {
    data: { type: Object, default: {} }
  },
  render: function render(h, ctx) {
    var _$get = _.get(ctx, 'props.data'),
        tag = _$get.tag,
        data = _$get.data,
        children = _$get.children;

    return h(tag, data, children);
  }
};
},{}],32:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListObject = {};

var List = function () {
  function List(name, vm) {
    var _this = this;

    _classCallCheck(this, List);

    var lenght = 0;
    ListObject[name] = ListObject[name] || [];
    if (vm && vm._isVue) {
      _.forEach(ListObject[name], function (item) {
        if (item.$el === vm.$el) {
          _this[lenght++] = item;
        }
      });
    } else {
      _.forEach(ListObject[name], function (item) {
        _this[lenght++] = item;
      });
    }
    Object.defineProperty(this, "length", {
      value: lenght,
      writable: true,
      enumerable: false
    });
    Object.defineProperty(this, "name", {
      value: name,
      enumerable: false
    });
  }

  _createClass(List, [{
    key: "add",
    value: function add(vm) {
      ListObject[this.name] = ListObject[this.name] || [];
      ListObject[this.name].push(vm);
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      _.forEach(this, function (item) {
        item.$destroy();
        _.remove(ListObject[_this2.name], function (o) {
          return o.$el === item.$el;
        });
      });
      return this;
    }
  }]);

  return List;
}();

exports.default = List;
},{}],20:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/*theme1*/\n/* line 53, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-top.cmui-tabbar.theme1 .cmui-tabbar__nav {\n  border-bottom: 1px solid #eeeeee; }\n\n/* line 54, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-left.cmui-tabbar.theme1 .cmui-tabbar__nav {\n  border-right: 1px solid #eeeeee; }\n\n/* line 55, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-right.cmui-tabbar.theme1 .cmui-tabbar__nav {\n  border-left: 1px solid #eeeeee; }\n\n/* line 56, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-bottom.cmui-tabbar.theme1 .cmui-tabbar__nav {\n  border-top: 1px solid #eeeeee; }\n\n/* line 60, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-top.cmui-tabbar.theme1 .cmui-tabbar__head-item {\n  border-bottom: 2px solid transparent; }\n  /* line 62, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-top.cmui-tabbar.theme1 .cmui-tabbar__head-item.active {\n    border-bottom-color: #ff6565; }\n\n/* line 66, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-left.cmui-tabbar.theme1 .cmui-tabbar__head-item {\n  border-right: 2px solid transparent; }\n  /* line 68, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-left.cmui-tabbar.theme1 .cmui-tabbar__head-item.active {\n    border-right-color: #ff6565; }\n\n/* line 72, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-bottom.cmui-tabbar.theme1 .cmui-tabbar__head-item {\n  border-top: 2px solid transparent; }\n  /* line 74, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-bottom.cmui-tabbar.theme1 .cmui-tabbar__head-item.active {\n    border-top-color: #ff6565; }\n\n/* line 78, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-right.cmui-tabbar.theme1 .cmui-tabbar__head-item {\n  border-left: 2px solid transparent; }\n  /* line 80, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-right.cmui-tabbar.theme1 .cmui-tabbar__head-item.active {\n    border-left-color: #ff6565; }\n\n/* line 84, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar.theme1 .cmui-tabbar__head-item.active {\n  color: #ff6565; }\n\n/*theme2*/\n/* line 101, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar.theme2 .cmui-tabbar__head-item {\n  border: 1px solid #eeeeee; }\n  /* line 104, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-top.cmui-tabbar.theme2 .cmui-tabbar__head-item:not(:first-child) {\n    margin-left: -1px; }\n  /* line 109, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-bottom.cmui-tabbar.theme2 .cmui-tabbar__head-item:not(:first-child) {\n    margin-left: -1px; }\n  /* line 114, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-left.cmui-tabbar.theme2 .cmui-tabbar__head-item:not(:first-child) {\n    margin-top: -1px; }\n  /* line 119, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-right.cmui-tabbar.theme2 .cmui-tabbar__head-item:not(:first-child) {\n    margin-top: -1px; }\n  /* line 123, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-top.cmui-tabbar.theme2 .cmui-tabbar__head-item.active {\n    border-bottom-color: white; }\n  /* line 124, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-left.cmui-tabbar.theme2 .cmui-tabbar__head-item.active {\n    border-right-color: white; }\n  /* line 125, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-right.cmui-tabbar.theme2 .cmui-tabbar__head-item.active {\n    border-left-color: white; }\n  /* line 126, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar-bottom.cmui-tabbar.theme2 .cmui-tabbar__head-item.active {\n    border-top-color: white; }\n  /* line 127, src/maple/component/tabbar/theme.scss */\n  .cmui-tabbar.theme2 .cmui-tabbar__head-item.active {\n    color: #ff6565; }\n\n/* line 132, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-top.cmui-tabbar.theme2 .cmui-tabbar__content {\n  margin-top: -1px;\n  border-top: 1px solid #eeeeee; }\n\n/* line 136, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-left.cmui-tabbar.theme2 .cmui-tabbar__content {\n  margin-left: -1px;\n  border-left: 1px solid #eeeeee; }\n\n/* line 140, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-right.cmui-tabbar.theme2 .cmui-tabbar__content {\n  margin-right: -1px;\n  border-right: 1px solid #eeeeee; }\n\n/* line 144, src/maple/component/tabbar/theme.scss */\n.cmui-tabbar-bottom.cmui-tabbar.theme2 .cmui-tabbar__content {\n  margin-bottom: -1px;\n  border-bottom: 1px solid #eeeeee; }");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _tabbarNav = require('./tabbar-nav.vue');

  var _tabbarNav2 = _interopRequireDefault(_tabbarNav);

  var _tabbarPane = require('./tabbar-pane.vue');

  var _tabbarPane2 = _interopRequireDefault(_tabbarPane);

  var _render = require('../base/render');

  var _render2 = _interopRequireDefault(_render);

  var _list = require('../base/list.js');

  var _list2 = _interopRequireDefault(_list);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = {
    name: 'cmui-tabbar',
    components: {
      cmuiTabbarNav: _tabbarNav2.default,
      cmuiTabbarPane: _tabbarPane2.default,
      cmuiRender: _render2.default
    },
    render: function render(h) {
      var items = this.items,
          activeIndex = this.activeIndex,
          position = this.position,
          changeToPre = this.changeToPre,
          changeToNext = this.changeToNext,
          headContainerClass = this.headContainerClass,
          itemStyle = this.itemStyle,
          navItem = this.navItem,
          extras = this.extras,
          extraEvent = this.extraEvent;

      var content = h('div', {
        'class': {
          'cmui-tabbar__content': true,
          'flex1': position === 'left' || position === 'right'
        }
      }, [h('cmui-tabbar-pane', {
        props: {
          items: items,
          activeIndex: activeIndex
        },
        ref: 'pane'
      })]);
      var pre = h('div', {
        'class': {
          'cmui-tabbar__pre': true,
          'text-center': true
        },
        on: {
          click: changeToPre
        }
      }, [h('i', { 'class': 'baseIcon baseIcon-' + (this.isVertical ? 'fold' : 'back') })]);
      var next = h('div', {
        'class': {
          'cmui-tabbar__next': true,
          'text-center': true
        },
        on: {
          click: changeToNext
        }
      }, [h('i', { 'class': 'baseIcon baseIcon-' + (this.isVertical ? 'unfold' : 'right') })]);
      var nav = h('cmui-tabbar-nav', {
        'class': headContainerClass,
        props: {
          items: items,
          activeIndex: activeIndex,
          itemStyle: itemStyle
        },
        on: {
          'nav-item': navItem
        },
        ref: 'nav'
      });
      var extraList = extras.map(function (item, index) {
        return h('div', {
          'class': 'cmui-tabbar__extra-item',
          key: index,
          on: {
            click: _.partialRight(extraEvent, item, index)
          }
        }, [item]);
      });
      var extra = h('div', {
        'class': {
          'cmui-tabbar__extra': true,
          'flex-container': !this.isVertical
        }
      }, extraList);
      var head = h('div', {
        'class': {
          'cmui-tabbar__head': true,
          'flex-container': !this.isVertical,
          'flex-container-col': this.isVertical
        }
      }, [this.nav[0] ? pre : undefined, nav, this.nav[1] ? next : undefined, extraList.length ? extra : undefined]);
      return h('div', {
        'class': {
          'cmui-tabbar': true,
          'flex-container vfull': this.isVertical,
          'cmui-tabbar-top': this.position === 'top',
          'cmui-tabbar-left': this.position === 'left',
          'cmui-tabbar-bottom': this.position === 'bottom',
          'cmui-tabbar-right': this.position === 'right'
        },
        style: {
          'max-height': this.isVertical ? '100%' : 'none'
        }
      }, _.includes(['right', 'bottom'], position) ? [content, head] : [head, content]);
    },

    data: function data() {
      return {
        items: this.getItems()
      };
    },
    props: {
      col: { type: [String, Number], default: 'auto' },
      activeIndex: { type: Number, default: 0 },
      nav: { type: Array, default: [false, false] },
      watch: null,
      position: { type: String, default: 'top' }
    },
    methods: {
      scrollAcitveIntoViewIfNeeded: function scrollAcitveIntoViewIfNeeded() {
        var isStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var tabBar = this.$refs.nav.$el;
        var activeItem = tabBar.children[this.activeIndex];
        var tabBarP = tabBar.getBoundingClientRect();
        var activeItemP = activeItem.getBoundingClientRect();
        var pos = this.isVertical ? ['top', 'bottom'] : ['left', 'right'];
        if (!_.inRange(activeItemP[pos[0]], tabBarP[pos[0]], tabBarP[pos[1]])) {
          activeItem.scrollIntoView(isStart);
        }
      },
      changeToNext: function changeToNext() {
        var _this = this;

        if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++;
          this.$nextTick(function () {
            _this.scrollAcitveIntoViewIfNeeded(false);
          });
        }
      },
      changeToPre: function changeToPre() {
        var _this2 = this;

        if (this.activeIndex > 0) {
          this.activeIndex--;
          this.$nextTick(function () {
            _this2.scrollAcitveIntoViewIfNeeded(true);
          });
        }
      },
      changeToIndex: function changeToIndex() {
        var _this3 = this;

        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (_.inRange(index, this.items.length)) {
          this.activeIndex = index;
          this.$nextTick(function () {
            _this3.scrollAcitveIntoViewIfNeeded(true);
          });
        }
      },
      changeByStep: function changeByStep() {
        var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (_.inRange(this.activeIndex + num, this.items.length)) {
          this.activeIndex += num;
        }
      },
      getItems: function getItems() {
        return this.$slots.default.filter(function (item) {
          return item.tag === 'cmui-tabbar-item';
        });
      },
      updata: function updata() {
        var _this4 = this;

        this.items = [];
        this.$nextTick(function (_) {
          _this4.items = _this4.getItems();
        });
      },
      extraEvent: function extraEvent(event, item, index) {
        this.$emit('extra-click', this, item, index);
      },
      navItem: function navItem() {
        this.$emit.apply(this, ['item-click', this].concat(Array.prototype.slice.call(arguments)));
      }
    },
    watch: {
      watch: function watch() {
        this.updata();
      }
    },
    computed: {
      realCol: function realCol() {
        if (_.isString(this.col)) {
          if (this.col === 'auto' || this.col === 'flex') {
            return this.col;
          } else {
            return 'auto';
          }
        } else if (_.isNumber(this.col)) {
          return this.col;
        } else {
          return 'auto';
        }
      },
      itemStyle: function itemStyle() {
        var rs = {},
            number = void 0;
        if (_.isNumber(this.col)) {
          number = 100 / this.col + '%';
          if (this.isVertical) {
            rs.height = number;
          } else {
            rs.width = number;
          }
        }
        return rs;
      },
      isVertical: function isVertical() {
        return _.includes(['left', 'right'], this.position);
      },
      headContainerClass: function headContainerClass() {
        return {
          'scroll-container': !this.isVertical,
          'flex-container': this.realCol === 'flex' && !this.isVertical,
          'flex-container-col': this.realCol === 'flex' && this.isVertical,
          'scroll-container-y': this.isVertical
        };
      },
      showPreNav: function showPreNav() {
        return !!_.get(this.nav, '[0]');
      },
      showNextNav: function showNextNav() {
        return !!_.get(this.nav, '[1]');
      },
      extras: function extras() {
        return this.$slots.extra || [];
      }
    },
    mounted: function mounted() {
      new _list2.default('tabbar').add(this);
    },
    destroyed: function destroyed() {
      $(this.$el).remove();
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-03415b76", __vue__options__);
    } else {
      hotAPI.reload("data-v-03415b76", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"./tabbar-nav.vue":22,"./tabbar-pane.vue":23,"../base/render":44,"../base/list.js":32,"vue-hot-reload-api":48,"vue":47}],28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tabbar = require("./tabbar.vue");

var _tabbar2 = _interopRequireDefault(_tabbar);

var _list = require("../base/list.js");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component(_tabbar2.default.name, _tabbar2.default);
function TabBar() {
  // get
  if (!arguments.length) {
    return new _list2.default('tabbar');
  }
  if (arguments.length == 1 && arguments[0]._isVue) {
    return new _list2.default('tabbar', arguments[0]);
  }
  // set
  var defaultOptions = _(_tabbar2.default.props).mapValues(function (o) {
    return _.get(o, 'default');
  }).defaults({
    items: [],
    parent: 'body',
    className: '',
    itemClick: null,
    extra: '',
    extraClick: null
  }).value();
  _.forEach(arguments, function (arg) {
    if (_.isArray(arg)) {
      if (_.every(arg, _.isBoolean)) {
        defaultOptions.nav = arg;
      } else {
        defaultOptions.items = arg;
      }
    } else if (_.isString(arg)) {
      if (/^\.|\#/.test(arg)) {
        defaultOptions.parent = arg;
      } else if (_.includes(['top', 'right', 'bottom', 'left'], arg)) {
        defaultOptions.position = arg;
      } else if (_.includes(['flex', 'auto'], arg)) {
        defaultOptions.col = arg;
      }
    } else if (_.isNumber(arg)) {
      defaultOptions.col = arg;
    } else if (arg instanceof jQuery) {
      defaultOptions.parent = arg;
    } else if (_.isFunction(arg)) {
      defaultOptions.itemClick = arg;
    }
  });
  var options = _.defaults(_.find(arguments, _.isPlainObject), defaultOptions);
  var tpl = $("\n\t\t<cmui-tabbar\n\t\tclass=\"" + (options.className || '') + "\"\n\t\t:active-index=\"" + options.activeIndex + "\"\n\t\tposition=\"" + options.position + "\"\n\t\t:nav=\"nav\"\n\t\t:col=\"col\"\n\t\t:watch=\"list\"\n\t\t@item-click=\"itemClick\"\n\t\t@extra-click=\"extraClick\"\n\t\t>\n\t\t\t<div slot=\"extra\" v-for=\"item in extraList\" v-html=\"item\"></div>\n\t\t\t<cmui-tabbar-item v-for=\"(item,index) in list\" :key=\"index\">\n\t\t\t\t<div v-html=\"item.title\"></div><div slot=\"content\" v-html=\"item.content\"></div>\n\t\t\t</cmui-tabbar-item>\n\t\t</cmui-tabbar>\n\t");
  var parent = $(options.parent);
  if (parent.length) {
    $(options.parent).append(tpl);
    return new Vue({
      el: tpl[0],
      data: function data() {
        return {
          list: options.items,
          col: options.col,
          nav: options.nav,
          extraList: [].concat(options.extra)
        };
      },
      methods: {
        itemClick: _.isFunction(options.itemClick) ? options.itemClick : null,
        extraClick: _.isFunction(options.extraClick) ? options.extraClick : null
      }
    });
  }
}
exports.default = TabBar;
},{"./tabbar.vue":20,"../base/list.js":32}],21:[function(require,module,exports) {
"use strict";

var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".cmui-textarea textarea{\n\twidth:100%;\n\theight:150px;\n\tborder:none;\n}");(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      id: { type: String, default: _.uniqueId('cmui_textarea') },
      name: { type: String, default: '' },
      model: { type: String, default: '' },
      placeholder: { type: String, default: 'please' },
      className: { type: [Array, String], default: '' },
      max: { type: Number, default: -1 },
      style: { type: Object, default: null },
      space: { type: Number, default: 20 }
    },
    data: function data() {
      var space = this.space;
      var className = this.className;
      var textareaClass;
      var maxNumberClass;
      if (_.isArray(className)) {
        className = className.join(' ');
      }
      if (_.inRange(space, -1, 50) && space % 10 == 0) {
        textareaClass = 'padding' + space + ' ' + className;
        maxNumberClass = 'right' + space + ' bottom' + space;
      } else {
        textareaClass = this.className;
        maxNumberClass = 'right20 bottom20';
      }
      return {
        textareaClass: textareaClass,
        maxNumberClass: maxNumberClass
      };
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "cmui-textarea pos-r" }, [_c('textarea', { directives: [{ name: "model", rawName: "v-model", value: _vm.model, expression: "model" }], class: _vm.textareaClass, style: _vm.style, attrs: { "name": _vm.name, "id": _vm.id, "placeholder": _vm.placeholder, "maxlength": _vm.max }, domProps: { "value": _vm.model }, on: { "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.model = $event.target.value;
      } } }), _vm._v(" "), _vm.max >= 0 ? _c('div', { staticClass: "pos-a text-light", class: _vm.maxNumberClass, domProps: { "textContent": _vm._s(_vm.model.length + '/' + _vm.max) } }) : _vm._e()]);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    module.hot.dispose(__vueify_style_dispose__);
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-4410978a", __vue__options__);
    } else {
      hotAPI.reload("data-v-4410978a", __vue__options__);
    }
  })();
}
},{"vueify/lib/insert-css":49,"vue-hot-reload-api":48,"vue":47}],30:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textarea = require("./textarea.vue");

var _textarea2 = _interopRequireDefault(_textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('cmui-textarea', _textarea2.default);
exports.default = {};
},{"./textarea.vue":21}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _cookie = require("./cache/cookie");

var _session = require("./cache/session");

var _local = require("./cache/local");

var _util = require("./util");

var util = _interopRequireWildcard(_util);

var _support = require("./support");

var support = _interopRequireWildcard(_support);

var _url = require("./url");

var _url2 = _interopRequireDefault(_url);

var _log = require("./log");

var _log2 = _interopRequireDefault(_log);

var _load = require("./load");

var _load2 = _interopRequireDefault(_load);

var _scroll_bar = require("./scroll_bar");

var _scroll_bar2 = _interopRequireDefault(_scroll_bar);

var _device = require("./device");

var _device2 = _interopRequireDefault(_device);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

var _vm = require("./vm");

var _vm2 = _interopRequireDefault(_vm);

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _index = require("./ui/alert/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./ui/confirm/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./ui/notice/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("./ui/actions/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("./ui/mask/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("./ui/message/index.js");

var _index12 = _interopRequireDefault(_index11);

var _index13 = require("./component/slider/index.js");

var _index14 = _interopRequireDefault(_index13);

var _index15 = require("./component/list/index.js");

var _index16 = _interopRequireDefault(_index15);

var _index17 = require("./component/tabbar/index.js");

var _index18 = _interopRequireDefault(_index17);

var _index19 = require("./component/form/index.js");

var _index20 = _interopRequireDefault(_index19);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//挂载cookie
_core2.default.cookie = _cookie.cookie;

//挂载sessionStorage
_core2.default.sessionData = _session.sessionData;

//挂载localStorage
_core2.default.localData = _local.localData;

//挂载工具方法
_core2.default._ = util;
_core2.default.util = util;

//挂载支持
_core2.default.support = support;

//挂载url处理方法
_core2.default.url = _url2.default;

//挂载console.log
_core2.default.log = _log2.default;

//挂载load
_core2.default.load = _load2.default;

//挂载滚动事件
_core2.default.scrollBar = _scroll_bar2.default;

//挂载设备信息
_core2.default.device = _device2.default;

//挂载style
_core2.default.style = _style2.default;

//挂载vm控制器
_core2.default.vm = _vm2.default;


_core2.default.notice = _index6.default;
_core2.default.alert = _index2.default;
_core2.default.confirm = _index4.default;
_core2.default.actions = _index8.default;
_core2.default.mask = _index10.default;
_core2.default.slider = _index14.default;
_core2.default.tabbar = _index18.default;
_core2.default.list = _index16.default;
_core2.default.form = _index20.default;
_core2.default.message = _index12.default;
// // 初始化通用组件
Object.keys(_component2.default).forEach(function (d) {
  return Vue.component(d, _component2.default[d]);
});
exports.default = window.maple = _core2.default;
},{"./core":7,"./cache/cookie":19,"./cache/session":18,"./cache/local":20,"./util":8,"./support":9,"./url":10,"./log":11,"./load":12,"./scroll_bar":13,"./device":14,"./style":15,"./vm":16,"./component":17,"./ui/alert/index.js":21,"./ui/confirm/index.js":22,"./ui/notice/index.js":24,"./ui/actions/index.js":23,"./ui/mask/index.js":25,"./ui/message/index.js":26,"./component/slider/index.js":27,"./component/list/index.js":29,"./component/tabbar/index.js":28,"./component/form/index.js":30}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(config) {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    },
    data: config && config.hot
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:55094/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id, undefined, {
    hot: true
  });

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,5])