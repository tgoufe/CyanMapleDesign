<template>
	<cmui-popup
	position="center"
	:visible.sync="showCmuiDialog"
	class="cmui-notice"
	:mask-event="false"
	target-class="cmui-notice__container cmui-dialog__container"
	>
		<div class="cmui-dialog__warp cmui-notice__warp text-center">
			<div class="cmui-dialog__body cmui-notice__body" v-if="content" v-html="content" :style="bodyStyle"></div>
		</div>
	</cmui-popup>
</template>
<script>
	import cmuiPopup from '../popup/popup.vue';
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
		compontents:{
			cmuiPopup
		},
		methods: {
			cancel: function(){
				this.showCmuiDialog=false;
				(typeof this.okFn==='function')&&this.okFn()
			}
		}
	}
</script>