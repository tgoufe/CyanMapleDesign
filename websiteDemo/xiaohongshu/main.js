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
document.title='小红书'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
