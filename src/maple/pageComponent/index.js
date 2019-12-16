import screen from './screen.vue'
import screenItem from './screen-item.vue'
const components = [
  screen,
  screenItem
].map(component => {
  component.install = function(Vue) {
    Vue.component(component.name, component)
  }
  return component
})
export default components
