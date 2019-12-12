import Vue from 'vue'
import Router from 'vue-router'
import home from './page/home'
import page from './page/index'
import faxian from './page/faxian'
import order from './page/order'
import wode from './page/wode'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/faxian',
      component: faxian
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/wode',
      component: wode
    },
    ...page.routerAdd.map(e => {
      return {
        path: e.path,
        name: e.name,
        component: () => import(`./page/${e.fullPath}`)
      }
    })
  ]
})
