import Vue from 'vue'
import Router from 'vue-router'
import activity from './page/activity'
import home from './page/home'
import view from './page/view'
import kind from './page/kind'
import user from './page/user'
import page from './page/index'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/',
      name: 'home',
      component: home
    },  {
      path: '/view',
      name: 'view',
      component: view
    },  {
      path: '/user',
      name: 'user',
      component: user
    },  {
      path: '/kind',
      name: 'kind',
      component: kind
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
