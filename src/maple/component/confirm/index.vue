<template>
	<cmui-popup
	position="center"
	class="cmui-confirm"
	:mask-event="false"
	:visible.sync="showCmuiDialog"
	target-class="cmui-dialog__container cmui-confirm__container"
	>
		<div class="cmui-dialog__title cmui-confirm__title" slot="top" v-html="title" v-if="title"></div>
		<div class="cmui-dialog__warp cmui-confirm__warp">
			<div class="cmui-dialog__body cmui-confirm__body scroll-container-y" v-if="content" v-html="content" :style="bodyStyle">
		</div>
		</div>
		<div class="cmui-dialog__buttons cmui-confirm__buttons flex-container" slot="bottom">
			<div class="cmui-confirm__button ok cmui-dialog__button flex1" :class="{'okDisable':okDisable}" :style="okDisable?okDisableStyle:okStyle" v-html="okText" @click="!okDisable&&ok()"></div>
			<div class="cmui-confirm__button cancel cmui-dialog__button flex1" :class="{'cancelDisable':cancelDisable}" :style="cancelDisable?cancelDisableStyle:cancelStyle" v-html="cancelText" @click="!cancelDisable&&cancel()"></div>
		</div>
	</cmui-popup>
</template>
<script>
	import cmuiPopup from '../popup/popup.vue';
	export default {
		props:{
			title: {type:String,default:''},
			content: {type:String,default:''},
			okText: {type:String,default:'确定'},
			okFn:{type:Function,default:function(){}},
			okStyle:{type:Object,default:null},
			cancelText: {type:String,default:'取消'},
			cancelStyle:{type:Object,default:null},
			cancelFn:{type:Function,default:function(){}},
			okDisable:{type:Boolean,default:false},
			okDisableStyle:{type:Object,default:null},
			cancelDisable:{type:Boolean,default:false},
			cancelDisableStyle:{type:Object,default:null},
		},
		compontents:{
			cmuiPopup
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
				this.showCmuiDialog=false;
				(typeof this.cancelFn==='function')&&this.cancelFn()
			},
			ok:function(){
				this.showCmuiDialog=false;
				(typeof this.okFn==='function')&&this.okFn()
			}
		}
	}
</script>
