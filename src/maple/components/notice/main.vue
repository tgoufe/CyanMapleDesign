<template>
	<cmui-popup
			position="center"
			:visible.sync="visible"
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
	import _ from 'lodash';
	export default {
		name:'cmui-notice',
		methodName:'notice',
		argumentsRole(options,args,CURRENT){
			if(args.length>1){
				options.callback=_.filter(args,_.isFunction)[0];
				var stringList=_.filter(args,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString());
				options.content=stringList[0];
				if(stringList.length>1){
					options.timeout=_.last(_.filter(args,_.isNumber))|0;
				}
			}else{
				if( (typeof args[0]).match(/string|number|boolean/)){
					options.content=args[0];
				}else if(_.isObject(args[0])){
					options=args[0];
				}else{
					return CURRENT;
				}
			}
		},

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
				visible:false,
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
				this.visible=false;
				(typeof this.closeFn==='function')&&this.closeFn()
			}
		}
	}
</script>
