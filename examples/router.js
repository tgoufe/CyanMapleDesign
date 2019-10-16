import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import page from './page/index'
let a = require('../CMUI/style/CMUI.css')
console.log(a)
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
