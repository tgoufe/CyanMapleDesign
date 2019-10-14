import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import page from './page/index'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    ...page.routerAdd
  ]
})
