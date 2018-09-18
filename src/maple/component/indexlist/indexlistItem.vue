<template>
	<div class="cmui-indexlist-item">
		<div class="cmui-indexlist__title">
			<slot name="title"></slot>
			<template v-if="!$slots.title">{{title}}</template>
		</div>
		<div class="cmui-indexlist__content">
			<slot></slot>
		</div>
	</div>
</template>
<style type="text/css" lang="scss">
	.cmui-indexlist__title{
		position: sticky;
	    top: 0;
	    z-index: 20;
	    margin-top: 0;
	    background-color: white;
	}
</style>
<script type="text/javascript">
	export default{
		props:{
			title:{type:String,default:''}
		}
	}
</script>