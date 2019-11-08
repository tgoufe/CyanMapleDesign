import List from './components/list/index.js'
import ListItem from './components/list-item/index.js'
import ListGroup from './components/list-group/index.js'
import VirtualList from './components/virtualList/index.js'
const components = [
  List,
  ListItem,
  ListGroup,
  VirtualList
]
const install = function(Vue) {
  if (install.installed) return
  components.forEach(function(component) {
    component.install(Vue)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  List,
  ListItem,
  ListGroup,
  VirtualList
}
