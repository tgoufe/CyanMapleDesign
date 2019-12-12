import log from './log'
import _ from 'lodash'
function scrollTo(target, dom = document.documentElement) {
  let { top, left } = target
  if (_.isNumber(top)) {
    let domPos = dom.scrollTop
    if (Math.abs(top - domPos) <= 3) {
      dom.scrollTop = top
    } else {
      let t = dom.scrollTop
      dom.scrollTop = top < domPos ? (domPos - domPos / 8) : (domPos + (top - domPos) / 8 + 1)
      if (dom.scrollTop === t) return
      requestAnimationFrame(() => scrollTo({ top }, dom))
    }
  }
  if (_.isNumber(left)) {
    let domPos = dom.scrollLeft
    if (Math.abs(left - domPos) <= 3) {
      dom.scrollLeft = left
    } else {
      let t = dom.scrollLeft
      dom.scrollLeft = left < domPos ? (domPos - domPos / 8) : (domPos + (left - domPos) / 8 + 1)
      if (dom.scrollLeft === t) return
      requestAnimationFrame(() => scrollTo({ left }, dom))
    }
  }
}
export default function(...arg) {
  let dom = _.remove(arg, _.isElement)[0] || document.documentElement
  let domScrollTop = dom.scrollTop || document.body.scrollTop
  let domScrollLeft = dom.scrollLeft || document.body.scrollLeft
  let argLen = arg.length
  let regexp = /^(\d+(?:\.\d+)?)(%|view)?$/
  let curr, total, view, temp
  if (argLen === 1) {
    // 读操作
    switch (arg[0]) {
      case 'top':
        total = dom.scrollHeight
        curr = domScrollTop
        view = dom.clientHeight
        break
      case 'bottom':
        total = dom.scrollHeight
        view = dom.clientHeight
        curr = total - domScrollTop - view
        break
      case 'left':
        total = dom.scrollWidth
        curr = domScrollLeft
        view = dom.clientWidth
        break
      case 'right':
        total = dom.scrollWidth
        view = dom.clientWidth
        curr = total - domScrollLeft - view
        break
      default:
        break
    }
    return {
      px: curr,
      percent: Math.floor((curr / total) * 100),
      view: parseFloat((curr / view).toFixed(1))
    }
  } else {
    // 写操作
    temp = regexp.exec(arg[1].toString())
    if (temp) {
      switch (arg[0]) {
        case 'top':
          curr = parseFloat(temp[1])
          if (temp[2] === '%') {
            // 百分比
            curr = (curr * dom.scrollHeight) / 100
          } else if (temp[2] === 'view') {
            // 屏数
            curr = curr * dom.clientHeight
          }
          scrollTo({ top: curr }, dom)
          // dom.scrollTop = curr
          break
        case 'bottom':
          curr = parseFloat(temp[1])

          if (temp[2] === '%') {
            // 百分比
            curr = Math.max(dom.scrollHeight * (1 - curr / 100), 0)
          } else if (temp[2] === 'view') {
            // 屏数
            curr = Math.max(
              dom.scrollHeight - (curr + 1) * dom.clientHeight,
              0
            )
          } else {
            curr = dom.scrollHeight - curr
          }
          scrollTo({ top: curr }, dom)
          // dom.scrollTop = curr
          break
        case 'left':
          curr = parseFloat(temp[1])
          if (temp[2] === '%') {
            // 百分比
            curr = (curr * dom.scrollWidth) / 100
          } else if (temp[2] === 'view') {
            // 屏数
            curr = curr * dom.clientWidth
          }
          scrollTo({ left: curr }, dom)
          // dom.scrollLeft = curr
          break
        case 'right':
          curr = parseFloat(temp[1])
          if (temp[2] === '%') {
            // 百分比
            curr = Math.max(dom.scrollWidth * (1 - curr / 100), 0)
          } else if (temp[2] === 'view') {
            // 屏数
            curr = Math.max(dom.scrollWidth - (curr + 1) * dom.clientWidth, 0)
          } else {
            curr = dom.scrollWidth - curr
          }
          scrollTo({ left: curr }, dom)
          // dom.scrollLeft = curr
          break
        default:
          log('scrollBar反向设置错误，请使用"left right top bottom" 中的值')
          break
      }
    } else {
      log('scrollBar数值设置错误，请使用"20"，"20%"或"20view"形式的参数')
    }
  }
}
