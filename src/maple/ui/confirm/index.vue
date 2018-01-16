<template>
	<div class="mask center" :class="className" style="z-index: 1;" v-if="showCmuiDialog">
		<div class="cmui-dialogContainer cmui-confirmContainer">
			<div class="cmui-dialogTitle cmui-confirmTitle" v-html="title"></div>
			<div class="cmui-dialogBody cmui-confirmBody" v-if="content" v-html="content" :style="bodyStyle"></div>
			<div class="cmui-dialogButtons cmui-confirmButtons flex-container">
				<div class="cmui-confirmButton cmui-dialogButton btn flex1" :class="{'okDisable':!okEnable}" :style="okEnable?okStyle:okDisableStyle" v-html="okText" @click="ok()"></div>
				<div class="cmui-confirmButton cmui-dialogButton btn flex1" v-html="cancelText" :style="cancelStyle" @click="cancel()"></div>
			</div>
		</div>
	</div>
</template>
<style>
	.cmui-confirmContainer{}
	.cmui-confirmTitle{}
	.cmui-confirmBody{}
	.cmui-confirmButtons{}
	.cmui-confirmButton{
		border:none;
		background-color: transparent;
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
