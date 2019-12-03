import Vue from 'vue'
import Router from 'vue-router'
import home from './page/home'
import page from './page/index'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: { title: '携程旅行-酒店预订,机票预订查询,旅游度假,商旅管理-携程无线官网' }
    },
    ...page.routerAdd.map(e => {
      return {
        path: e.path,
        name: e.name,
        component: () => import(`./page/${e.fullPath}`),
        meta: { title: '个人中心' }
      }
    })
  ]
})
