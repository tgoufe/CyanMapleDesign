import _ from 'lodash'
import components from './components/index.js'
// methods
import methods from './methods/index.js'
function Maple() {
  return new Maple.prototype.Init()
}
Maple.prototype.Init = function() {}
Maple.prototype.Init.prototype = Maple.prototype
const install = function(Vue) {
  if (install.installed) return
  _.forEach(components, component => component.install(Vue, Maple))
  _.assign(Maple, methods)
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.maple = Maple
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default _.assign({}, { install }, components)
