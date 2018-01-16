import '../../src/pageComponent/head/index.js'
var count=0
window.vm=new Vue({
	el:'#main',
	data:{
		tabbarData:_.times(5,index=>{
			return {
				title:'tab'+index
			}
		}),
		tabPosition:'top',
		tabNav:[false,false],
		tabCol:'auto'
	},
	methods:{
		add(){
			this.tabbarData.push({
				title:'new Tab'+(++count)
			})
		},
		extra(vm,item,index){
			console.log(arguments)
		},
		navItem(){
			console.log(arguments)
		}
	}
})