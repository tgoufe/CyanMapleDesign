<template>
	<cmui-popup
			position="center"
			:visible.sync="selfVisible"
			class="cmui-alert"
			:mask-event="false"
			:target-class="`cmui-dialog__container cmui-alert__container ${targetClass}`">
			<div class="cmui-dialog__title cmui-alert__title" v-if="title||$slots.top">
				<template v-html="title" v-if="!$slots.top"></template>
				<slot name="top" v-else></slot>
			</div>
			<div class="cmui-dialog__warp cmui-alert__warp">
				<div class="cmui-dialog__body cmui-alert__body scroll-container-y" v-if="!content||$slots.default" :style="bodyStyle">
					<slot v-if="$slots.default"></slot>
				</div>
				<div class="cmui-dialog__body cmui-alert__body scroll-container-y" v-if="content||!$slots.default" :style="bodyStyle" v-html="content">
					
				</div>
			</div>
			<div class="cmui-dialog__buttons cmui-alert__buttons">
				<div class="cmui-alert__button cmui-dialog__button" :class="{'okDisable':okDisable}" :style="okDisable?okDisableStyle:okStyle" @click="cancel()">
					<template v-html="okText" v-if="!$slots.bottom"></template>
					<slot name="bottom" v-else></slot>
				</div>
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
			okDisable:{type:Boolean,default:false},
			okDisableStyle:{type:Object,default:null},
			visible:{type:Boolean,default:false},
			targetClass:{type:String,default:''}
		},
		compontents:{
			cmuiPopup
		},
		data:function(){
			return {
				bodyStyle:{
					'max-height':$(window).height()*.72-69-parseInt($('html').css('fontSize'))+'px'
				}
			}
		},
		computed:{
			selfVisible(){
				let value=!!this.visible;
				this.$emit('update:visible', value);
				return value;
			}
		},
		methods: {
			cancel: function(){
				if(!this.okDisable){
					this.visible=false;
					(typeof this.okFn==='function')&&this.okFn()
				}
				
			}
		}
	}
</script>
