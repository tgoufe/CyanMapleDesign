<template>
	<transition name="cmui-dialog-fade">
	<div class="fixed-full flex-container center cmui-dialogMask cmui-confirmMask" :class="className" style="z-index: 1;" v-show="showCmuiDialog">
		<div class="cmui-dialogContainer cmui-confirmContainer">
			<div class="cmui-dialogTitle cmui-confirmTitle" v-html="title"></div>
			<div class="cmui-dialogBody cmui-confirmBody" v-if="content" v-html="content" :style="bodyStyle"></div>
			<div class="cmui-dialogButtons cmui-confirmButtons flex-container">
				<div class="cmui-confirmButton cmui-confirmButton__ok cmui-dialogButton flex1" :class="{'okDisable':!okEnable}" :style="okEnable?okStyle:okDisableStyle" v-html="okText" @click="ok()"></div>
				<div class="cmui-confirmButton cmui-confirmButton__cancel cmui-dialogButton flex1" v-html="cancelText" :style="cancelStyle" @click="cancel()"></div>
			</div>
		</div>
	</div>
	</transition>
</template>
<style lang="scss">
	@import "theme";
	.cmui-confirmContainer{}
	.cmui-confirmTitle{}
	.cmui-confirmBody{}
	.cmui-confirmButtons{}
	.cmui-confirmButton{
		border:none;
		background-color: transparent;
	}

	.cmui-dialog-fade-enter-active{
		.cmui-dialogMask{
			animation: dialog-fadein .4s
		}
		.cmui-dialogContainer{
			animation: dialog-zoom .4s
		}
	}
	@keyframes dialog-fadein{
		0%{opacity: 0}
		100%{opacity: 1}
	}
	@keyframes dialog-zoom{
		0%{transform: scale(0)}
		50%{transform: scale(1.1)}
		100%{transform: scale(1)}
	}
</style>
<script>
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
				(typeof this.cancelFn==='function')&&this.cancelFn()
			},
			ok:function(){
				if(this.okEnable){
					this.showCmuiDialog=false;
					document.body.classList.remove('overflow-h');
					(typeof this.okFn==='function')&&this.okFn()
				}
			}
		}
	}
</script>
