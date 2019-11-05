import _ from 'lodash'
function dialogInstall(Component) {
  let { name, props, methodName, argumentsRole } = Component
  let defaultsOptions = _.mapValues(props, item =>
    _.isFunction(item.default) ? item.default() : item.default
  )
  let timeHandle
  let id = `${name}-` + _.uniqueId()
  let CURRENT = null
  let setCurrent = _.once(function(Vue) {
    let dom = document.createElement(name)
    dom.id = id
    document.body.appendChild(dom)
    let Dialog = Vue.extend(Component)
    CURRENT = new Dialog().$mount(dom)
    // let dom = document.createElement(name)
    // dom.id = id
    // document.body.appendChild(dom)
    // CURRENT = new Vue({
    //   el: '#' + id
    // }).$children[0]
  })
  Component.install = function(Vue, Maple) {
    Vue.component(name, Component)
    function dialog() {
      setCurrent(Vue)
      let options = {}
      if (arguments.length) {
        let rs = argumentsRole(options, arguments, CURRENT)
        if (rs === CURRENT) {
          return CURRENT
        }
      } else {
        return CURRENT
      }
      options = _.defaults(
        _.find(arguments, _.isPlainObject),
        options,
        defaultsOptions
      )
      _.forEach(options, (value, key) => {
        CURRENT[key] = value
      })
      CURRENT.visible = true
      if (typeof options.callback === 'function') {
        CURRENT.$nextTick(function() {
          options.callback(CURRENT.$el)
        })
      }
      timeHandle && clearTimeout(timeHandle)
      if (options.timeout) {
        timeHandle = setTimeout(() => {
          clearTimeout(timeHandle)
          CURRENT.cancel()
        }, options.timeout)
      }
      return CURRENT
    }
    Vue.prototype[methodName] = dialog
    if (Maple) {
      Maple[methodName] = dialog
    }
  }
  return Component
}
export default dialogInstall
