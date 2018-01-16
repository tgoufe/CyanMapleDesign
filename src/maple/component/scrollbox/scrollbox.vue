<template>
<div class="cmui-scrollbox">
	<div class="cmui-scrollbox-warp clearfix" v-bind:style="{'width':warpWidth}">
		<slot></slot>
	</div>
</div>
</template>
<script>
export default {
	props:{
		target:{
            type:Object,
            default:{}
        },
        col:{
            type:Number,
            default:2
        },
        totalWidth:{
            type:Number,
            default:10
        },
        items:{
        	type:Array,
        	default:[]
        }
	},
	computed:{
        itemWidth:function(){
            return this.totalWidth / this.col +'rem';
        },
        warpWidth:function(){
            return this.items.length * this.totalWidth / this.col +'rem';
        }
	},
};
</script>
<style>
.cmui-scrollbox {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar{
    display:none;
  }
}
</style>
