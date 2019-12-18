import screen from './screen.vue'
import screenItem from './screen-item.vue'
import classify from './classify.vue'
import classifyItem from './classify-item.vue'
const components = [
  screen,
  screenItem,
  classify,
  classifyItem
].map(component => {
  component.install = function(Vue) {
    Vue.component(component.name, component)
  }
  return component
})
export default components
