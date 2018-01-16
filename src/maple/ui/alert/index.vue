<template>
	<div class="mask center" :class="className" style="z-index: 1;" v-if="showCmuiDialog" @touchmove.prevent.stop="disabledTouchMove">
		<div class="cmui-dialogContainer cmui-alertContainer">
			<div class="cmui-dialogTitle cmui-alertTitle" v-html="title"></div>
			<div class="cmui-dialogBody cmui-alertBody" v-if="content" v-html="content" :style="bodyStyle"></div>
			<div class="cmui-dialogButtons cmui-alertButtons">
				<div class="cmui-alertButton cmui-dialogButton btn block" v-html="okText" :style="okStyle" @click="cancel()"></div>
			</div>
		</div>
	</div>
</template>
<style>
.cmui-dialogContainer{
	border-radius: 4px;
	position: relative;
	overflow: hidden;
	min-width: 270px;
	width: 72%;
	padding-bottom: 44px;
	background: #fff;
}
.cmui-dialogTitle{
	text-align: center;
	font-size: 18px;
	padding:0 .53333333rem;
	margin:.66666667rem 0 .26666667rem;
}
.cmui-dialogBody{
	color: #666;
	font-size: 15px;
	margin-bottom: .66666667rem;
	padding:0 .53333333rem;
	max-height: 10.2rem;
	overflow: auto;
}
.cmui-dialogButtons{
	position: absolute;
	bottom: 0;
	width: 100%;
	border-top:1px solid #e0e0e0;
}
.cmui-dialogButton{
	
}

.cmui-alertContainer{}
.cmui-alertTitle{}
.cmui-alertBody{}
.cmui-alertButtons{}
.cmui-alertButton{
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
