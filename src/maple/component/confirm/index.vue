<template>
	<cmui-popup
	position="center"
	class="cmui-confirm"
	:mask-event="false"
	:visible.sync="showCmuiDialog"
	target-class="cmui-dialog__container cmui-confirm__container"
	>
		<div class="cmui-dialog__title cmui-confirm__title" slot="top" v-html="title" v-if="titel"></div>
		<div class="cmui-dialog__warp cmui-confirm__warp">
			<div class="cmui-dialog__body cmui-confirm__body" v-if="content" v-html="content" :style="bodyStyle">
		</div>
		</div>
		<div class="cmui-dialog__buttons cmui-confirm__buttons flex-container" slot="bottom">
			<div class="cmui-confirm__button ok cmui-dialog__button flex1" :class="{'okDisable':!okEnable}" :style="okEnable?okStyle:okDisableStyle" v-html="okText" @click="ok()"></div>
			<div class="cmui-confirm__button cancel cmui-dialog__button flex1" v-html="cancelText" :style="cancelStyle" @click="cancel()"></div>
		</div>
	</cmui-popup>
</template>
<script>
	import cmuiPopup from '../popup/popup.vue';
	export default {
		props:{
			title: {type:String,default:''},
			content: {type:String,default:''},
			className: {type:String,default:''},
			okText: {type:String,default:'确定'},
			cancelText: {type:String,default:'取消'},
			okFn:{type:Function,default:function(){}},
			cancelFn:{type:Function,default:function(){}},
			okEnable:{type:Boolean,default:true},
			okDisableStyle:{type:Object,default:null},
			okStyle:{type:Object,default:null},
			cancelStyle:{type:Object,default:null}
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
				if(this.okEnable){
					this.showCmuiDialog=false;
					(typeof this.okFn==='function')&&this.okFn()
				}
			}
		}
	}
</script>
