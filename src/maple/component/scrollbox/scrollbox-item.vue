<template>
<div class="cmui-scrollbox-item float-left pos-r" v-bind:style="{width:itemWidth}">
	<slot></slot>
</div>

</template>
<script>
export default {
	props:{
		target:Object
	},
  data(){
    return{
      itemWidth:this.$parent.itemWidth
    }
  }
};
</script>
<style>

</style>
