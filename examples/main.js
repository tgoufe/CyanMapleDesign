import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import 'lodash'
import SvgIcon from './components/SvgIcon.vue'// svg组件
import requireAll from './icons/index.js'
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
