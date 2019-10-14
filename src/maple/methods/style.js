import { ready } from './dom'
import _ from 'lodash'
var cmuiStyle
var cssRules
var cssRulesLen
ready(function() {
  cmuiStyle = document.createElement('style')
  document.head.appendChild(cmuiStyle)
  cssRules = _.get(cmuiStyle, 'sheet.cssRules')
  cssRulesLen = cssRules.length
})
function style() {
  if (arguments.length) {
    let argStringList = _.filter(arguments, _.isString)
    let selector = _.get(argStringList, 0)
    let name = _.camelCase(_.get(argStringList, 1)) || undefined
    let value = _.get(argStringList, 2)
    value = _.find(arguments, _.isPlainObject) || value
    if (selector && name && value) {
      // 设置样式
      if (_.isString(value)) {
        let matchRule = _.findLast(
          cssRules,
          item => _.get(item, 'selectorText') === selector
        )
        if (matchRule) {
          matchRule.style[name] = value
        } else {
          cmuiStyle.sheet.insertRule(selector + '{}', cssRulesLen)
          cmuiStyle.sheet.cssRules[cssRulesLen++].style[name] = value
        }
      }
    } else if (selector && name) {
      if (value === undefined) {
        // 读取样式
        let t = _.findLast(
          cssRules,
          item => _.get(item, 'selectorText') === selector
        )
        return _.get(t, `style[${name}]`)
      } else {
        // 删除选择器下的具体样式
        let t = _.findLast(
          cssRules,
          item => _.get(item, 'selectorText') === selector
        )
        t = _.get(t, 'style')
        delete t[name]
      }
    } else if (selector && _.isPlainObject(value)) {
      _.forEach(value, (value, key) => {
        style(selector, key, value)
      })
    } else if (selector) {
      // 读取样式
      if (name === '' || value === '') {
      } else {
        let tempStyle = _.findLast(
          cssRules,
          item => _.get(item, 'selectorText') === selector
        )
        tempStyle = _.get(tempStyle, 'style')
        let arr = _.filter(tempStyle, item => item)
        return _.pick(tempStyle, arr)
      }
    }
  }
  return cmuiStyle
}
export default style
