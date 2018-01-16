<template>
	<div class="pc-poster">
		<cmui-list :col="data.col||1" :border="data.border||false" :space="data.space||0">
			<cmui-list-item v-for="(item,key) in data.items" :key="key">
				<a :href="item.clickUrl||'###'">
					<img :src="item.imageUrl" alt="" v-if="item.imageUrl">
				</a>
				<pc-poster :data="item" v-if="item.items"></pc-poster>
			</cmui-list-item>
		</cmui-list>
	</div>
</template>
<style lang="scss"></style>
<script>
	export default{
		name:'pc-poster',
		props:{
			data:{type:Object,default:{}}
		}
	}
</script>