<template>
	<cmui-list-item
	class="cmui-list-group"
	:border="false"
	>
		<cmui-list :border="border">
			<div class="cmui-list-item-title">{{title}}</div>
			<slot></slot>
		</cmui-list>
	</cmui-list-item>
</template>
<script>
import cmuiListItem from "./list-item.vue";
import {remove} from 'lodash';
// import cmuiList from "./list.vue";
// import base from '../mixin.js';
export default{
	// mixins:[base],
	inject:['bus'],
	components:{
		cmuiListItem
	},
	props:{
		title:{type:String,default:''}
	},
	data:function(){
		let parent=this.bus.parent;//this.getParent('cmui-list');
		return{
			border:parent.border
		}
	},
	created(){
		let parent=this.bus.parent;//this.getParent('cmui-list')
		if(parent.index){
			parent.groupList.push({
				title:this.title,
				vm:this
			})
		}
	},
	destroyed(){
		let parent=this.bus.parent;//this.getParent('cmui-list')
		if(parent.index){
			remove(parent.groupList,item=>item.vm===this);
		}
	}
}
</script>