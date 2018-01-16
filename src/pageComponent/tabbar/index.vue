<template>
	<div class="pc-tabbar">
		<div v-if="col==='auto'">
			<div class="scroll-container">
				<div class="pc-tabbar-item" v-for="(item,index) in items" :key="index">
					<span v-text="item.title" class="fs-14"></span>
				</div>
			</div>
		</div>
		<div v-if="col==='flex'"></div>
		<div v-if="typeof col==='number'">
			
		</div>
	</div>
</template>
<style lang="scss"></style>
<script>
	export default{
		name:'pc-tabbar',
		props:{
			col:{type:[Number,String],default:'auto'},
			items:{type:Array,default(){
				return _.times(10,function(){
					return{
						title:'123'
					}
				})
			}}
		},
		
		mounted:function(){
			console.log(this)
		}
	}
</script>