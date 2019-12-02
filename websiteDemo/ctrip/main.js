import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import 'lodash'
import CMUI from '../../src/maple/index.js'
import styleInit from '../../src/maple/styleInit.js'
import '../font/iconfont.css'
import './cyan.scss'
import './default.scss'

styleInit()
CMUI.install(Vue)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
