import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import config from './config'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/uilist',
      name: 'uilist',
      component: () => import(`./page/uilist.vue`)
    },
    ...config.pageList.map(({ name }) => ({
      path: `/${name}`,
      name,
      component: () => import(`./page/${name}.vue`)
    }))
  ]
})
