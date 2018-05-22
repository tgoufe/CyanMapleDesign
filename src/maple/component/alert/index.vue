<template>
	<cmui-popup position="center" :visible.sync="showCmuiDialog">
			<div class="cmui-dialogTitle cmui-alertTitle" v-html="title" v-if="title" slot="top"></div>
			<div class="cmui-dialogContainer cmui-alertContainer">
				<div class="cmui-dialogBody cmui-alertBody" v-if="content" v-html="content" :style="bodyStyle"></div>
			</div>
			<div class="cmui-dialogButtons cmui-alertButtons">
				<div class="cmui-alertButton cmui-dialogButton" v-html="okText" :style="okStyle" @click="cancel()" slot="bottom"></div>
			</div>
	</cmui-popup>
</template>
<script>
	import cmuiPopup from '../../component/popup/popup.vue';
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
				document.body.classList.remove('overflow-h');
				(typeof this.okFn==='function')&&this.okFn()
			}
			, disabledTouchMove(){}
		}
	}
</script>
