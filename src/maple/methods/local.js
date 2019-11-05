import { isObject } from 'lodash'
import { localStorage as supportLocal } from './support'
import { isTimeStr, formatTimeStr } from './util'

let sessionKey = 'tg_local_cache'
let cache = supportLocal ? localStorage : false
let data = supportLocal ? JSON.parse((
  cache.getItem(sessionKey) || JSON.stringify({}))) : {}
let formatData = function() {
  let d = {}
  let t = new Date().getTime()
  for (let i in data) {
    if (t - data[i].t < data[i].time || !data[i].time) {
      d[i] = data[i].value
    }
  }
  return d
}
let localData = function() {
  let length = arguments.length
  let d = {}
  let t = new Date().getTime()
  if (!length) {
    return formatData()
  } else if (length === 1) {
    if (isObject(arguments[0])) {
      for (let i in arguments[0]) {
        if (arguments[0].hasOwnProperty(i)) {
          d[i] = { value: arguments[0][i], time: 0, t: t }
        }
      }
      data = Object.assign({}, data, d)
      cache && cache.setItem(sessionKey, JSON.stringify(data))
    } else {
      return formatData()[arguments[0]]
    }
  } else if (length === 2) {
    if (isObject(arguments[0]) && isTimeStr(arguments[1])) {
      for (let i in arguments[0]) {
        if (arguments[0].hasOwnProperty(i)) {
          d[i] = { value: arguments[0][i], time: formatTimeStr(arguments[1]), t: t }
        }
      }
      data = Object.assign({}, data, d)
    } else {
      data[arguments[0]] = { value: arguments[1], time: 0, t: t }
    }
    cache && cache.setItem(sessionKey, JSON.stringify(data))
  } else if (length === 3) {
    d[arguments[0]] = { value: arguments[1], time: formatTimeStr(arguments[2]), t: t }
    data = Object.assign({}, data, d)
    cache && cache.setItem(sessionKey, JSON.stringify(data))
  }
}

localData.remove = function(key) {
  let length = arguments.length
  if (!length) {
    this.removeAll()
  } else {
    for (let i = 0; i < length; i++) {
      data[arguments[i]] = undefined
      delete data[arguments[i]]
    }
    cache && cache.setItem(sessionKey, JSON.stringify(data))
  }
}
localData.removeAll = function() {
  data = {}
  cache && cache.setItem(sessionKey, JSON.stringify(data))
}

export { localData }

export default localData
