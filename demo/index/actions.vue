<template>
	<a href="###" class="btn red" @click="show()">show</a>
</template>
<style>
	
</style>
<script>
	export default{
		methods:{
			show(){
				maple.actions(..._.times(10))
			}
		}
	}
</script>