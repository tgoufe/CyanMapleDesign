/**
 * 转换Excel数据到表格
 * 参数可以为通过Excel复制的字符串，也可以为某一个表单元素，通常是textare
 * @param {string|HTMLElement} data
 */
export const excel2Array = data => {
  return (data instanceof HTMLElement ? data.value : data)
    .split(/\n/)
    .filter(i => i.replace(/[\s\t]/g, ''))
    .reduce((rs, item) => {
      rs.push(item.split(/\t/))
      return rs
    }, [])
}
export const is = (type, obj) => new RegExp(type, 'i').test(Object.prototype.toString.call(obj).slice(8, -1))
export const assign = Object.assign
export const camelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}
export const debounce = (func, wait = 50, opts = {}) => {
  let timer = null
  let result
  let { leading = false } = opts
  let debounced = function(...args) {
    if (timer) clearTimeout(timer)
    if (leading) {
      let callNow = !timer
      timer = setTimeout(() => (timer = null), wait)
      if (callNow) result = func.apply(this, args)
    } else {
      timer = setTimeout(() => func.apply(this, args), wait)
    }
    return result
  }
  debounced.cancel = () => {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}
export const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj)
export const defaultsDeep = () => {}
export const defer = (fn, ...args) => setTimeout(fn, 1, ...args)
export const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args)
export const difference = (...args) =>
  args.reduce((pre, next) => pre.filter(x => !new Set(next).has(x)))

export const differenceBy = (...args) => {
  let lastArg = args[args.length - 1]
  let fn = typeof lastArg === 'function' ? lastArg : i => i
  return args.reduce((pre, next) =>
    typeof next === 'function'
      ? pre
      : pre.filter(x => !new Set(next.map(fn)).has(fn(x)))
  )
}

export const differenceWith = (...args) => {
  let lastArg = args[args.length - 1]
  let fn = typeof lastArg === 'function' ? lastArg : (a, b) => b
  return args.reduce((pre, next) =>
    typeof next === 'function'
      ? pre
      : pre.filter(a => !~next.findIndex(b => fn(a, b)))
  )
}

export const fill = () => {}

export const find = () => {}
export const findIndex = () => {}
export const findKey = () => {}
export const findLast = () => {}
export const findLastIndex = () => {}

export const get = (obj, path, rs) =>
  path
    .replace(/\[([^\[\]]*)\]/g, '.$1.')
    .split('.')
    .filter(t => t !== '')
    .reduce((a, b) => a && a[b], obj) || rs

export const includes = (target, value) => !!~target.indexOf(value)
export const inRange = () => {}
export const isArray = (value) => {
  return isObject(value) ? is('array', value) : false
}
export const isBoolean = value => typeof value === 'boolean'
export const isElement = () => {}
export const isEqual = () => {}
export const isFunction = value => typeof value === 'function'
export const isNumber = value => typeof value === 'number'
export const isObject = target => {
  let type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}
export const isPlainObject = val =>
  !!val && typeof val === 'object' && val.constructor === Object
export const isString = val => typeof val === 'string'
export const last = arr =>
  arr && arr.length ? arr[arr.length - 1] : undefined
export const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj)
    return acc
  }, {})
export const max = () => {}
export const min = () => {}
export const once = () => {}
export const partialRight = (fn, ...partials) => (...args) =>
  fn(...args, ...partials)
export const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})
export const remove = (arr, ...items) => {
  items.forEach(item => {
    let index = arr.indexOf(item)
    if (~index) {
      arr.splice(index, 1)
    }
  })
  return arr
}
export const set = () => {}
export const shuffle = arr => {
  let len = arr.length
  while (len) {
    let index = Math.floor(Math.random() * len--);
    [arr[index], arr[len]] = [arr[len], arr[index]]
  }
  return arr
}
export const throttle = (func, wait = 50, opts = {}) => {
  let preTime = 0
  let timer = null
  let { leading = true, trailing = true } = opts
  let throttled = function(...args) {
    let now = Date.now()
    if (!leading && !preTime) preTime = now
    if (now - preTime >= wait || preTime > now) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      preTime = now
      func.apply(this, args)
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        preTime = Date.now()
        timer = null
        func.apply(this, args)
      }, wait - now + preTime)
    }
  }
  throttled.cancel = () => {
    clearTimeout(timer)
    timer = null
    preTime = 0
  }
  return throttled
}
export const times = (num, fn = i => i) =>
  Array.from({ length: num }).reduce(
    (rs, _, index) => rs.concat(fn(index)),
    []
  )
export const uniqueId = ((prefix = 'CyanMaple_uuid_') => {
  let index = 0
  return function() {
    return prefix + index++
  }
})()
export const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  )
export const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  )
export const objectToQueryString = queryParameters =>
  queryParameters
    ? Object.entries(queryParameters).reduce(
      (queryString, [key, val], index) => {
        let symbol = index === 0 ? '?' : '&'
        queryString +=
            typeof val === 'string' ? `${symbol}${key}=${val}` : ''
        return queryString
      },
      ''
    )
    : ''
export const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  )
export const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
export const toCamelCase = str => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}
export const intersection = (...args) =>
  args.reduce((pre, next) => pre.filter(x => new Set(next).has(x)))

export const intersectionBy = (...args) => {
  let lastArg = args[args.length - 1]
  let fn = typeof lastArg === 'function' ? lastArg : i => i
  return args.reduce((pre, next) =>
    typeof next === 'function'
      ? pre
      : pre.filter(x => new Set(next.map(fn)).has(fn(x)))
  )
}

export const intersectionWith = (...args) => {
  let lastArg = args[args.length - 1]
  let fn = typeof lastArg === 'function' ? lastArg : (a, b) => b
  return args.reduce((pre, next) =>
    typeof next === 'function'
      ? pre
      : pre.filter(a => ~next.findIndex(b => fn(a, b)))
  )
}
const [every, some, filter, forEach, map] = ['every', 'some', 'filter', 'forEach', 'map'].map(methodName => {
  return function(obj, fn) {
    let values = Object.values(obj)
    let keys = Object.keys(obj)
    return keys[methodName](function(value, index, obj) {
      return fn(values[index], keys[index], obj)
    })
  }
})
export default {
  excel2Array,
  assign,
  camelCase,
  debounce,
  defaults,
  defaultsDeep,
  defer,
  delay,
  difference,
  differenceBy,
  differenceWith,
  fill,
  find,
  findIndex,
  findKey,
  findLast,
  findLastIndex,
  get,
  includes,
  inRange,
  is,
  isArray,
  isBoolean,
  isElement,
  isEqual,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isString,
  last,
  every,
  some,
  filter,
  forEach,
  map,
  mapValues,
  max,
  min,
  once,
  partialRight,
  pick,
  remove,
  set,
  shuffle,
  throttle,
  times,
  uniqueId,
  escapeHTML,
  unescapeHTML,
  objectToQueryString,
  getURLParameters,
  toKebabCase,
  toCamelCase,
  intersection,
  intersectionBy,
  intersectionWith
}
