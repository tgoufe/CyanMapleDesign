<template>
	<div class="mask bottom hfull" :class="className" style="z-index: 1;" v-if="showCmuiDialog">
		<div class="cmui-actionsContainer">
			<div class="cmui-actionsGroup">
				<div class="cmui-actionsButton" v-for="item in buttons" v-html="item.text" @click="itemEvent(item)" :style="item.style"></div>
			</div>
			<div class="cmui-actionsCancel">
				<div class="cmui-actionsButton" v-html="cancelText" :style="cancelStyle"  @click="cancel"></div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import "../../../cyan/variables";
	@import "../../../cyan/lib/function";
	.cmui-actionsContainer{
		padding:getLayoutSize(1);
		width:100%;
	}
	.cmui-actionsGroup{
		background-color: white;
		border-radius: 4px;
		.cmui-actionsButton{
			border-bottom:1px solid $border-color-default;
			&:last-child{
				border-bottom:none;
			};
		}
	}
	.cmui-actionsCancel{
		background-color: white;
		border-radius: 4px;
		.cmui-actionsButton{
			margin-top:getLayoutSize(2);
			color:map-get($colorList,'red');
		}
	}
	.cmui-actionsButton{
		padding:getLayoutSize(2);
		text-align: center;
	}
</style>
<script>
	export default {
		props:{
			buttons:{type:Array,default:[]}
			, className:{type:Array,default:''}
			, cancelText:{type:Array,default:'取消'}
			, cancelFn:{type:Function,default:null}
			, cancelStyle:{type:Object,default:null}
		},
		data:function(){
			return {
				showCmuiDialog:false
			}
		},
		methods: {
			cancel: function(){
				this.showCmuiDialog=false;
				document.body.classList.remove('overflow-h');
				(typeof this.cancelFn==='function')&&this.cancelFn()
			},
			itemEvent:function(item){
				this.showCmuiDialog=false;
				document.body.classList.remove('overflow-h');
				(typeof item.callback==='function')&&item.callback();
			}
		}
	}
</script>
