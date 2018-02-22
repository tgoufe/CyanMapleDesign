<template>
	<div style="height:1000px">
		<a href="javascript:void(0)" class="btn red" @click="alert">
			alert
		</a>
	</div>
</template>
<script>
	export default {
		mounted(){
			this.$root.headTitle='alert'
		},
		methods:{
			alert(){
				maple.alert('123','456')
			}
		}
	}
</script>