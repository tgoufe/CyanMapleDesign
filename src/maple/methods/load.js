import _ from 'lodash'
function BaseLoad(src, tagName, props = {}) {
  return !src
    ? Promise.resolve(null)
    : new Promise((resolve, reject) => {
      let dom = document.createElement(tagName)
      dom.src = src
      ;(function loop(props, target) {
        _.forEach(props, (value, key) => {
          _.isObject(value) ? loop(value, target[key]) : (target[key] = value)
        })
      })(props, dom)
      dom.onload = function() {
        setTimeout(function() {
          resolve(dom)
        })
      }
      dom.onError = function() {
        reject(new Error(''))
      }
      document.body.appendChild(dom)
    })
}
function load(type, url) {
  if (_.isObject(type)) {
    ;({ type, url } = type)
  }
  switch (type) {
    case 'js':
    case 'javascript':
      return BaseLoad(url, 'javascript', {
        type: 'text/javascript'
      })
    case 'css':
      return BaseLoad(url, 'link', {
        ref: 'stylesheet'
      })
    case 'img':
    case 'image':
      return BaseLoad(url, 'img', {
        style: {
          display: 'none'
        }
      })
    case 'iframe':
      return BaseLoad(url, 'iframe', {
        style: {
          display: 'none'
        }
      })
    default:
      return Promise.resolve(null)
  }
}
export default load
