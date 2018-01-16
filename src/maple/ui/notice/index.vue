<template>
	<div class="mask mask-transparent center" :class="className" style="z-index: 1;" v-if="showCmuiDialog" @click="cancel">
		<div class="cmui-dialogContainer cmui-noticeContainer">
			<div class="cmui-dialogBody cmui-noticeBody" v-if="content" v-html="content" :style="bodyStyle"></div>
		</div>
	</div>
</template>
<style>
	.cmui-noticeContainer{
		background: rgba(0,0,0,0.7);
		text-align: center;
		min-width: initial;
		width: initial;
		padding-bottom: initial;
		max-width: 72%;
	}
	.cmui-noticeBody{
		color:white;
		margin:0.26666667rem 0;
	}
</style>
<script>
	export default {
		props:{
			title: {type:String,default:''},
			content: {type:String,default:''},
			className: {type:String,default:''},
			timeout: {type:Number,default:3000},
			okFn:{type:Function,default:function(){}},
		},
		data:function(){
			return {
				showCmuiDialog:false,
				bodyStyle:{
					'max-height':$(window).height()*.72-69-parseInt($('html').css('fontSize'))+'px'
				}
			}
		},
		methods: {
			cancel: function(){
				$(this.$el).fadeOut(()=>{
					this.showCmuiDialog=false;
					document.body.classList.remove('overflow-h');
					(typeof this.okFn==='function')&&this.okFn()
				})
			}
		}
	}
</script>