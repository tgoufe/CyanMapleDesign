import _ from 'lodash'
let exportModule = window || {}
let methodName = 'initCMUI'
let checkDevice = () => /iphone|ipad|android|micromessenger/i.test(window.navigator.appVersion) || document.scrollingElement.clientWidth < 770
let isMobile = checkDevice()
let isInit = false
export default (function() {
  if (!window || !document) {
    return function() {}
  }
  function setFontSize() {
    if (document.body) {
      document.documentElement.style.fontSize = isMobile ? '10vw' : '75px'
      document.body.style.fontSize = '14px'
    } else {
      document.addEventListener('DOMContentLoaded', setFontSize)
    }
  }
  setFontSize()
  // insert style
  let cmuiStyle = document.createElement('style')
  document.head.appendChild(cmuiStyle)
  let cssRules = cmuiStyle.sheet.cssRules
  let cssRulesLen = cssRules.length
  function insertStyle(selector, name, value) {
    name = name.replace(/[A-Z]/g, i => `-${i.toLowerCase()}`)
    cmuiStyle.sheet.insertRule(`${selector}{${name}:${value}}`, cssRulesLen)
  }
  // set pm
  let PMstore = new Set()
  let reg = /\b((padding|margin|radius)[trblvh]?|top|bottom|right|left)(-n)?\d+\b/g
  let nameObject = {
    t: ['Top'],
    l: ['Left'],
    r: ['Right'],
    b: ['Bottom'],
    v: ['Top', 'Bottom'],
    h: ['Left', 'Right']
  }
  function setPMBySet(set) {
    for (let item of set) {
      // ratio
      if (~item.indexOf('ratio')) {
        let [, x, y] = /ratio(\d+)\/(\d+)/.exec(item)
        insertStyle(`.ratio-container[ratio="${x}/${y}"]::before`, 'padding-top', `${y / x * 100}%`)
        continue
      }
      let [key, name, pos, isN, value] =
        /(padding|margin|radius)([trblvh])?(-n)?(\d+)/.exec(item) ||
        /(top|left|right|bottom)()?(-n)?(\d+)/.exec(item)
      // radius
      if (name === 'radius') {
        [
          [`.${key}`, 'border-radius', `${value}px`],
          [`.${key}.list::before, .${key}.border.light.item > *`, 'border-radius', `${value * 2}px`],
          [`.inputGroup input.${key}:first-child, .btn-group .btn.${key}:first-child, .badge-group .badge.${key}:first-child`, 'border-radius', `${value}px`],
          [`.inputGroup input.${key}:last-child, .btn-group .btn.${key}:last-child, .badge-group .badge.${key}:last-child`, 'border-radius', `${value}px`]
        ].forEach(item => {
          insertStyle(...item)
        })
        continue
      }
      value = isMobile ? `${value / 75}rem` : `${value}px`
      if (pos) {
        nameObject[pos].forEach(posName => {
          insertStyle('.' + key, `${name}${posName}`, (isN ? '-' : '') + value)
        })
      } else {
        insertStyle('.' + key, `${name}`, (isN ? '-' : '') + value)
      }
    }
  }
  function setPMByClass(className) {
    let PMstoreTemp = new Set()
    let match = ([...className].join(' ').match(reg) || [])
      .concat([...className].join(' ').match(/ratio\d+\/\d+/g) || [])
    match.forEach(item => {
      if (!PMstore.has(item)) {
        PMstore.add(item)
        PMstoreTemp.add(item)
      }
    })
    setPMBySet(PMstoreTemp)
  }
  function setPMByDom(dom = document) {
    let PMstoreTemp = new Set()
    let domList =
      dom.querySelectorAll(
        '[class*=padding],[class*=margin],[class*=top],[class*=right],[class*=left],[class*=bottom],[class*=radius],.ratio-container[ratio]'
      ) || []
    ;[...domList].forEach(item => {
      // ratio
      if (item.classList.contains('ratio-container') && /\d+\/\d+/.test(item.getAttribute('ratio'))) {
        let ratio = item.getAttribute('ratio')
        ratio = `ratio${ratio}`
        if (!PMstore.has(ratio)) {
          PMstore.add(ratio)
          PMstoreTemp.add(ratio)
        }
        return
      }
      let match = item.className.match(reg) || []
      match.forEach(item => {
        if (!PMstore.has(item)) {
          PMstore.add(item)
          PMstoreTemp.add(item)
        }
      })
    })
    setPMBySet(PMstoreTemp)
  }
  function obs() {
    !isInit && new MutationObserver(mutations => {
      isInit = true
      let temp = new Set()
      let classList = new Set()
      mutations.reduce((rs, item) => {
        if (item.type === 'attributes') {
          switch (item.attributeName) {
            case 'class':
              [...item.target.classList].forEach(className => classList.add(className))
              break
            case 'ratio':
              classList.add('ratio' + item.target.getAttribute('ratio'))
          }
        } else if (item.type === 'childList' && item.addedNodes.length) {
          temp.add(item.target)
        }
      }, {})
      ;[...temp].forEach(setPMByDom)
      classList.size && setPMByClass(classList)
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributeFilter: ['class', 'ratio']
    })
  }
  // set initCMUI
  function addMethod(name, fn) {
    let oldObject = exportModule[name]
    exportModule[name] = function() {
      if (fn.length === arguments.length) return fn.apply(this, arguments)
      if (typeof oldObject === 'function') {
        return oldObject.apply(this, arguments)
      }
    }
  }
  addMethod(methodName, initByAuto)
  addMethod(methodName, initByNumber)
  addMethod(methodName, initByRange)
  let resetRule = _.debounce(() => {
    if (checkDevice() !== isMobile) {
      isMobile = checkDevice()
      setFontSize()
      _.forEach(cmuiStyle.sheet.rules, rule => {
        let { style } = rule
        let len = style.length
        while (len--) {
          let name = style[len].replace(/-(\w)/, (word, $1) => $1.toUpperCase())
          let value = style[name].match(/\d+\.?\d+/g)[0]
          if (isMobile) {
            style[name] = value / 75 + 'rem'
          } else {
            style[name] = value * 75 + 'px'
          }
        }
      })
    }
  }, 500)
  window.addEventListener('resize', resetRule, false)
  function initByAuto() {
    if (document.body) {
      obs()
      setPMByDom()
    } else {
      document.addEventListener('DOMContentLoaded', initByAuto, false)
    }
  }
  function setStep(number, step = 1) {
    let data = new Set()
    for (let i = 0; i < number; i += step) {
      ;['padding', 'margin'].forEach(name => {
        ;['t', 'r', 'b', 'l', 'h', 'v'].forEach(pos => {
          data.add(`${name}${pos}${i}`)
        })
        data.add(`${name}${i}`)
      })
    }
    setPMBySet(data)
  }
  function initByNumber(number) {
    setStep(number)
  }
  function initByRange(number, step) {
    setStep(number, step)
  }
  return exportModule[methodName]
})()
