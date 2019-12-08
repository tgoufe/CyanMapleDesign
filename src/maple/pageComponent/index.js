const context = require.context('./', true, /\.vue$/)
const components = context.keys().map(key => {
  let component = context(key).default
  component.install = function(Vue) {
    Vue.component(component.name, component)
  }
  return component
})
export default components
