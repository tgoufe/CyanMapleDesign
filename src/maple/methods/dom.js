function isInView(dom) {
  let { top, left, bottom, right } = dom.getBoundingClientRect()
  let { innerHeight, innerWidth } = window
  // let offsetY = top - (document.body.scrollTop || document.documentElement.scrollTop)
  // let offsetX = left - (document.body.scrollLeft || document.documentElement.scrollLeft)
  // let inY = offsetY >= 0 && offsetY < height
  // let inX = offsetX >= 0 && offsetX < width
  return top < innerHeight && bottom > 0 && left < innerWidth && right > 0
}
function ready(fn) {
  if (!window || !document) {
    return
  }
  if (document.addEventListener) {
    document.addEventListener(
      'DOMContentLoaded',
      function() {
        // document.removeEventListener('DOMContentLoaded',arguments.callee, false);
        fn(window)
      },
      false
    )
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        // document.detachEvent('onreadystatechange', arguments.callee);
        fn(window)
      }
    })
  }
}
export { isInView, ready }
