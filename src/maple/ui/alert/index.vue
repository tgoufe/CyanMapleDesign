<template>
	<div>
		<transition
		enter-active-class="an an-in an-fade"
    	leave-active-class="an an-out an-fade"
    	>
			<div
			class="fixed-full cmui-dialogMask cmui-alertMask"
			v-if="showCmuiDialog"
			></div>
		</transition>
		<transition
		enter-active-class="an an-in an-zoom"
    	leave-active-class="an an-out an-zoom"
    	>
			<div class="mask mask-transparent center" :class="className" style="z-index: 1;" v-if="showCmuiDialog" @touchmove.prevent.stop="disabledTouchMove">
				<div class="cmui-dialogContainer cmui-alertContainer">
					<div class="cmui-dialogTitle cmui-alertTitle" v-html="title" v-if="title"></div>
					<div class="cmui-dialogBody cmui-alertBody" v-if="content" v-html="content" :style="bodyStyle"></div>
					<div class="cmui-dialogButtons cmui-alertButtons">
						<div class="cmui-alertButton cmui-dialogButton" v-html="okText" :style="okStyle" @click="cancel()"></div>
					</div>
				</div>
			</div>
    	</transition>
	</div>
</template>
<style lang="scss">
@import "theme";
</style>
<script>
	export default {
		props:{
			title: {type:String,default:''},
			content: {type:String,default:''},
			className: {type:String,default:''},
			okText: {type:String,default:'确定'},
			okFn:{type:Function,default:function(){}},
			okStyle:{type:Object,default:null}
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
				document.body.classList.remove('overflow-h');
				(typeof this.okFn==='function')&&this.okFn()
			}
			, disabledTouchMove(){}
		}
	}
</script>
