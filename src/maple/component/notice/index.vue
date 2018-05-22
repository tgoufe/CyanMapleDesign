<template>
	<div class="fixed-full flex-container cmui-dialogMask cmui-noticeMask center" :class="className" style="z-index: 1;" v-if="showCmuiDialog" @click="cancel">
		<div class="cmui-dialogContainer cmui-noticeContainer text-center">
			<div class="cmui-dialogBody cmui-noticeBody" v-if="content" v-html="content" :style="bodyStyle"></div>
		</div>
	</div>
</template>
<style lang="scss">
</style>
<script>
	export default {
		props:{
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