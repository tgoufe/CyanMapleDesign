const doc = (typeof document === 'undefined') ? {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ''
  },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return {
      initEvent() {}
    }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      }
    }
  },
  location: { hash: '' }
} : document; // eslint-disable-line
const win = (typeof window === 'undefined') ? {
  doc,
  navigator: {
    userAgent: ''
  },
  location: {},
  history: {},
  CustomEvent: function CustomEvent() {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ''
      }
    }
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {}
} : window; // eslint-disable-line
export { win as window, doc as document }
