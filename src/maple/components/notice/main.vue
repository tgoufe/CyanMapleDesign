<template>
	<cmui-popup
			position="center"
			:visible.sync="showCmuiDialog"
			class="cmui-notice"
			:mask-event="false"
			:target-class="`cmui-notice__container cmui-dialog__container ${targetClass}`"
	>
		<div class="cmui-dialog__warp cmui-notice__warp text-center">
			<div class="cmui-dialog__body cmui-notice__body" v-if="content" v-html="content" :style="bodyStyle" :class="className"></div>
		</div>
	</cmui-popup>
</template>
<script>
	import cmuiPopup from '@components/popup/main.vue';
	export default {
		name:'cmui-notice',
		props:{
			content: {type:String,default:''},
			className: {type:String,default:''},
			timeout: {type:Number,default:3000},
			closeFn:{type:Function,default:function(){}},
			targetClass:{type:String,default:''}
		},
		data:function(){
			let dom=document.documentElement;
			return {
				showCmuiDialog:false,
				bodyStyle:{
					'max-height':dom.clientHeight*.72-69-parseInt(getComputedStyle(dom).fontSize)+'px'
				}
			}
		},
		components:{
			cmuiPopup
		},
		methods: {
			cancel: function(){
				this.showCmuiDialog=false;
				(typeof this.closeFn==='function')&&this.closeFn()
			}
		}
	}
</script>
