<template>
	<cmui-popup
			position="center"
			:visible.sync="showCmuiDialog"
			class="cmui-alert"
			:mask-event="false"
			target-class="cmui-dialog__container cmui-alert__container">
			<div class="cmui-dialog__title cmui-alert__title" v-html="title" v-if="title" slot="top"></div>
			<div class="cmui-dialog__warp cmui-alert__warp">
				<div class="cmui-dialog__body cmui-alert__body" v-if="content" v-html="content" :style="bodyStyle"></div>
			</div>
			<div class="cmui-dialog__buttons cmui-alert__buttons">
				<div class="cmui-alert__button cmui-dialog__button" v-html="okText" :style="okStyle" @click="cancel()" slot="bottom"></div>
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
			okFn:{type:Function,default:function(){}},
			okStyle:{type:Object,default:null}
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
				(typeof this.okFn==='function')&&this.okFn()
			}
			, disabledTouchMove(){}
		}
	}
</script>
