import '../../src/pageComponent/head/index.js'
import componentList from './componentList.vue';
import badge from './badge.vue';
import button from './button.vue';
import actions from './actions.vue';
import collapse from './collapse.vue';
import tabbar from './tabbar.vue';
import affix from './affix.vue';
import alert from './alert.vue';
const routes = [
  { path: '/componentList/:id', component: componentList },
  { path: '/badge/', component: badge },
  { path: '/button/', component: button },
  { path: '/collapse/', component: collapse },
  { path: '/tabbar/', component: tabbar },
  { path: '/affix/', component: affix },
  { path: '/alert/', component: alert },
  { path: '/actions/', component: actions }
]
const router = new VueRouter({
  routes
})
console.log(location)
if(location.hash)
window.vm= new Vue({
	el:'#main',
	router,
	data:{
		headTitle:'CMUI组件列表',
		componentList:_.times(20,index=>{
			return {
				title:'组件'+index,link:'###'
			}
		})
	},
	methods:{
		goback(){
			this.$router.go(-1)
		}
	},
	mounted(){
		if(location.hash==='#/'){
			this.$router.replace('/componentList/default')
		}
	}
})