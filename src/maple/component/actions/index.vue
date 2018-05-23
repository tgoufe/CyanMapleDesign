<template>
	<cmui-popup
	position="bottom"
	:visible.sync="showCmuiDialog"
	:target-style="{height:'auto'}"
	class="cmui-actions"
	target-class="cmui-actions__container"
	>
		<div class="cmui-actions__group">
			<div class="cmui-actions__button" v-for="item in buttons" v-html="item.text" @click="itemEvent(item)" :style="item.style"></div>
		</div>
		<div class="cmui-actions__cancel" slot="bottom">
			<div class="cmui-actions__button" v-html="cancelText" :style="cancelStyle"  @click="cancel"></div>
		</div>
	</cmui-popup>
</template>
<script>
	import cmuiPopup from '../popup/popup.vue';
	export default {
		props:{
			buttons:{type:Array,default:[]}
			, className:{type:Array,default:''}
			, cancelText:{type:Array,default:'取消'}
			, cancelFn:{type:Function,default:null}
			, cancelStyle:{type:Object,default:null}
		},
		compontents:{
			cmuiPopup
		},
		data:function(){
			return {
				showCmuiDialog:false,
				slide:false
			}
		},
		methods: {
			cancel: function(){
				this.showCmuiDialog=false;
				(typeof this.cancelFn==='function')&&this.cancelFn()
			},
			itemEvent:function(item){
				this.showCmuiDialog=false;
				(typeof item.callback==='function')&&item.callback();
			}
		}
	}
</script>
