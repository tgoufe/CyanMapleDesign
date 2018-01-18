import '../../src/pageComponent/head/index.js'
import componentList from './componentList.vue';
import badge from './badge.vue';
import button from './button.vue';
import actions from './actions.vue';
const routes = [
  { path: '/componentList/:id', component: componentList },
  { path: '/badge/', component: badge },
  { path: '/button/', component: button },
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