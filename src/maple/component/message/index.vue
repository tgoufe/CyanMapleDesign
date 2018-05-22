<template>
	<div class="cmui-message-list" v-if="show">
		<div class="cmui-message">
			<div class="cmui-message-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<style>
	.cmui-message-list{
		text-align: center;
	}
	.cmui-message{
		padding: 8px 16px;
	    border-radius: 4px;
	    box-shadow: 0 2px 8px rgba(0,0,0,.2);
	    background: #fff;
	    display: inline-block;
	    pointer-events: all;
	    margin: 5px 0;
	}
	.cmui-message-content{
	}
	.cmui-message .cmui-message-content>i{
		margin-right: 8px;
	    font-size: 14px;
	    position: relative;
	    display: inline-block;
	    font-style: normal;
	    vertical-align: baseline;
	    text-align: center;
	    text-transform: none;
	    text-rendering: optimizeLegibility;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
</style>
<script>
	export default {
		props:{
			duration:{type:Number,default:1000},
			beforeCreat:{type:Function,default:function(){}},
			afterCreat:{type:Function,default:function(){}},
			beforeClose:{type:Function,default:function(){}},
			afterClose:{type:Function,default:function(){}},
			show:{type:Boolean,default:true}
		},
		beforeMount(){
			this.beforeCreat();
		},
		mounted(){
			var _this=this;
			this.afterCreat(_this.$el.firstChild);
			_.delay(function(){
				_this.beforeClose(_this.$el.firstChild);
				_this.afterClose();
			},_this.duration)
		}
	}
</script>