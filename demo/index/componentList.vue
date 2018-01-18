<template>
	<cmui-list :col="1" :border="true">
		<cmui-list-item v-for="item in list" class="bg-white">
			<router-link :to="item.path" class="flex-container padding30 text-dark">
				<span>{{item.title}}</span>
				<i class="baseIcon baseIcon-right"></i>
			</router-link>
		</cmui-list-item>
	</cmui-list>
</template>
<script>
	const componentData={
		base:{
			pageTitle:'基础组件',
			list:['badge', 'button', 'layout', 'type']
		},
		ui:{
			pageTitle:'UI组件',
			list:[
				'mask',
				'notice',
				'actions',
				'alert',
				'confirm',
				'slider',
				'list',
				'action',
				'number',
				'input',
				'tabbar'
			]
		},
		page:{
			pageTitle:'页面组件',
			list:[
				'head',
				'foot',
				'tabbar'
			]
		},
		business:{
			pageTitle:'业务组件',
			list:['mask', 'notice', 'action', 'alert']
		},
		default:{
			pageTitle:'CMUI组件列表',
			list:[
					{title:'基础组件',path:'/componentList/base'},
					{title:'UI组件',path:'/componentList/ui'},
					{title:'页面组件',path:'/componentList/page'},
					{title:'业务组件',path:'/componentList/business'}
			]
		}
	}
	export default{
		data:function(){
			const id=this.$router.currentRoute.params.id;
			this.$root.headTitle=_.get(componentData,`${id}.pageTitle`);
			const list=_.get(componentData,`${id}.list`,[]).map(item=>{
				if(_.isString(item)){
					return {title:item,path:`/${item}`}
				}else{
					return item;
				}
			});
			return {
				list
			}
		},
		watch: {
			'$route' (to, from) {
				const id=to.params.id;
				this.$root.headTitle=_.get(componentData,`${id}.pageTitle`);
				const list=_.get(componentData,`${id}.list`,[]).map(item=>{
					if(_.isString(item)){
						return {title:item,path:`/${item}`}
					}else{
						return item;
					}
				});
				this.list=list
			}
		}
	}
</script>