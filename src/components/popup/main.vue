<template>
	<transition name="cmui-popup">
	<div class="cmui-popup fixed-full" v-show="visible">
		<!-- <transition name="fade"> -->
			<div class="cmui-popup__mask abs-full" @click="maskClick">
		      <slot name="mask"></slot>
		    </div>
		<!-- </transition> -->
	    <div class="cmui-popup__container abs-full flex-container"
		:class="[_position]"
	    >
	      <div class="cmui-popup__content"
			:style="[_contentStyle,targetStyle]"
			:class="[targetClass,{'flex-container-col':useFlex}]"
	      >
	        <div class="cmui-popup__top">
				<slot name="top"></slot>
			</div>
			<div class="cmui-popup__main flex1 scroll-container-y" ref="main">
				<slot></slot>
			</div>
			<div class="cmui-popup__bottom">
				<slot name="bottom"></slot>
			</div>
	      </div>
	      </div>
	    </div>
	</transition>
</template>
<style type="text/css" lang="scss">
.cmui-popup{
	z-index: 1000;
	.cmui-popup__mask{
		background-color: rgba(0, 0, 0, .4);
		&::before{
			display: block;
			width: 1px;
			height: 1px;
			margin-left: -10px;
			background-color: rgba(0, 0, 0, .1);
			content: ".";
		}
	}
	.cmui-popup__container{
		pointer-events: none;
	}
	.cmui-popup__content{
		max-width: 100%;
		max-height: 100%;
		background-color: white;
		pointer-events: auto;
	}
	.cmui-popup__top{width:100%;}
	.cmui-popup__main{width:100%;}
	.cmui-popup__bottom{width:100%;}
}

/* animate */

.cmui-popup{
	transition-duration:.3s;
}
.cmui-popup-enter, .cmui-popup-leave-to{
	.cmui-popup__mask{
		opacity:0;
	}
	.cmui-popup__container{
		&.right{transform: translateX(100%); }
		&.top{transform: translateY(-100%); }
		&.bottom{transform: translateY(100%); }
		&.left{transform: translateX(-100%); }
	}
}
.cmui-popup-enter-active,.cmui-popup-leave-active{
	.cmui-popup__mask{
		transition: opacity .4s;
	}
	.cmui-popup__container{
		transition: transform .4s;
	}
}
.cmui-popup-enter-active .cmui-popup__container.center{
	.cmui-popup__content{
		animation: dialog-zoom-in .4s;
	}
}
.cmui-popup-leave-active .cmui-popup__container.center{
	.cmui-popup__content{
		animation: dialog-zoom-out .4s;
	}
}

@keyframes dialog-zoom-in{
	0%{transform: scale(0);}
    50%{transform: scale(1.1);}
    100%{transform: scale(1);}
}

@keyframes dialog-zoom-out{
    0%{transform: scale(1);}
    50%{transform: scale(1.1);}
	100%{transform: scale(0);}
}
</style>
<script type="text/javascript">
	import device from '@methods/device.js';
	let scrollRec;
	export default{
		name:'popup',
		props:{
			visible:{type:Boolean,default:false},
			maskEvent:{type:Boolean,default:true},
			position:{type:String,default:'right'},
			targetStyle:Object,
			targetClass:Array,
			stopPageScroll:{type:Boolean,default:true}
		},
		data:function(){
			let isIos=device.os==='ios';
			let ua=/OS\s(\d+)/.exec(window.navigator.userAgent);
			return {
				useFlex:!(ua&&isIos&&parseInt(ua[1]<9))
			}
		},
		methods:{
			maskClick(){
				if(this.maskEvent){
					this.visible=false;
				}
			}
		},
		computed:{
			_position(){
				return this.position.match(/(top|right|left|bottom|center)\b/g)
			},
			_contentStyle(){
				let width,height;
				let position=this._position.join(' ')
				switch(position){
					case 'top':
						width='100%';
						// height="60%";
						break;
					case 'bottom':
						width='100%';
						// height="60%";
						break;
					case 'left':
						height='100%';
						width='80%';
						break;
					case 'right':
						height='100%';
						width='80%';
						break;
				}
				return {width,height};
			}
		},
		mounted(){

		},
		watch:{
			visible:{
				immediate: true,
				handler:function(value){
					if(this.stopPageScroll){
						if(value){
							scrollRec=document.documentElement.scrollTop||document.body.scrollTop;
							document.body.style.top = -scrollRec+'px';
							document.body.classList.add('fixed-full');
						}else{
							document.body.style.removeProperty('top');
							document.body.classList.remove('fixed-full');
							document.documentElement.scrollTop=scrollRec;
						}
					}
					this.$emit('update:visible', value);
				}
			}
		}
	}
</script>