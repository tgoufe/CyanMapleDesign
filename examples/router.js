import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import page from './page/index'
let autoRaouter=page.map(i=>({
  path:i.path.slice(13,-4),
  component: ()=>import(`.${i.path.slice(8)}`),
}))
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    ...autoRaouter
  ]
})
