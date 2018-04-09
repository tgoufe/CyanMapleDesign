<template>
	<transition
	  v-on:before-enter="beforeEnter"
	  v-on:enter="enter"
	  v-on:after-enter="afterEnter"
	  v-on:enter-cancelled="enterCancelled"

	  v-on:before-leave="beforeLeave"
	  v-on:leave="leave"
	  v-on:after-leave="afterLeave"
	  v-on:leave-cancelled="leaveCancelled"
	>
		<div class="cmui-mask-panel fixed-full"
		@click="hide()"
		@touchstart="maskStart($event)"
		@touchmove="maskMove($event)"
		@touchend="maskEnd($event)"
		v-show="show"
		>
			<div class="cmui-mask-panel_wrap abs-full flex-container" :class="position_c" >
				<div class="cmui-mask-panel_content flex-container-col" :style="{width:width_c,height:height_c}" @click.stop>
					<div class="cmui-mask-panel_top">
						<slot name="top"></slot>
					</div>
					<div class="cmui-mask-panel_main flex1 scroll-container-y">
						<slot></slot>
					</div>
					<div class="cmui-mask-panel_bottom">
						<slot name="bottom"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<style lang="scss">
.cmui-mask-panel{
	background-color: rgba(0,0,0,.5);
	z-index: 9;
}
.cmui-mask-panel_wrap{}
.cmui-mask-panel_content{
	background-color: white;
}
.cmui-mask-panel_top{width: 100%;}
.cmui-mask-panel_main{width: 100%; }
.cmui-mask-panel_bottom	{width: 100%;}
</style>
<script>
	let warpDom;
	let contentDom;
	let warpData={};
	let contentData={};
	let pos;
	let speedString;
	let prefix=(function(){
	    let div = document.createElement('div');  
	    let cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';  
	    div.style.cssText = cssText;  
	    let style = div.style;  
	    if (style.webkitTransition) {  
	        return '-webkit-';  
	    }  
	    if (style.MozTransition) {  
	        return '-moz-';  
	    }  
	    if (style.oTransition) {  
	        return '-o-';  
	    }  
	    if (style.msTransition) {  
	        return '-ms-';  
	    }  
	    return '';  
	})()
	export default{
		props:{
			position:{type:String,default:'right'},
			width:{type:String,default:''},
			height:{type:String,default:''},
			show:{type:Boolean,default:false}
		},
		mounted(){
			warpDom=$(this.$el).find('.cmui-mask-panel_wrap')[0];
			contentDom=$(this.$el).find('.cmui-mask-panel_main')[0];
			pos=/left|right/.test(this.position_c)?'X':'Y';
			speedString=/right|bottom/.test(this.position_c)?'':'-';
		},
		computed:{
			position_c(){
				return _.compact(this.position.split(' ')).filter(item=>
					_.includes(['top','left','right','bottom','center'],item)
				).join(' ')
			},
			width_c(){
				if(this.width&&_.isString(this.width)){
					return this.width;
				}else{
					return _.includes(this.position_c,['bottom','top'])
					?'100%'
					:'80%'
				}
			},
			height_c(){
				if(this.height&&_.isString(this.height)){
					return this.height;
				}else{
					return _.includes(this.position_c,['bottom','top'])
					?'60%'
					:'100%'
				}
			},
			value(){
				return this.show;
			}
		},
		methods:{
			hide(){
				this.show=false;
				this.$emit('update:show', false);
			},
			maskStart(e){
				let target=e.target;
				if(target===warpDom){
					warpData.startPosition=e.touches["0"][`page${pos}`]
				}else{
					let elScroll;
					if(target===contentDom){
						elScroll=$(target)
					}else if((elScroll = $(target).parents($(contentDom))).length == 0){
						elScroll = null;
					}
					if (!elScroll) {
					    return;
					}
					contentData.elScroll = elScroll;
					contentData.posY = e.touches["0"].pageY;
					contentData.scrollY = elScroll.scrollTop();
					contentData.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
				}
			},
			maskMove(e){
				if(e.target===warpDom){
					let dis=e.touches["0"][`page${pos}`]-warpData.startPosition;
					if(dis*(speedString+'1')>0){
						this.$el.style[prefix+'transform']=`translate${pos}(${dis}px)`;
						warpData.dis=Math.abs(dis);
					}
					e.preventDefault();
				}else{
					if (contentData.maxscroll <= 0) {
					    e.preventDefault();
					}
					let elScroll = contentData.elScroll;
					let scrollTop = elScroll.scrollTop();
					let events = e.touches["0"];
					let distanceY = events.pageY - contentData.posY;
					if (distanceY > 0 && scrollTop == 0) {
					    e.preventDefault();
					    return;
					}
					if (distanceY < 0 && (scrollTop + 1 >= contentData.maxscroll)) {
					    e.preventDefault();
					    return;
					}
				}
			},
			maskEnd(e){
				if(e.target===warpDom){
					let _this=this;
					let needHide=warpData.dis>document.body.clientWidth/2;
					if(needHide){
						this.hide();
					}else{
						let timer=requestAnimationFrame(function fn(){
							warpData.dis-=8;
							_this.$el.style[prefix+'transform']=`translate${pos}(${speedString}${warpData.dis}px)`;
							if(warpData.dis>0){
								requestAnimationFrame(fn)
							}else{
								_this.$el.style[prefix+'transform']=''
								cancelAnimationFrame(timer);
							}
						})
					}
				}else{
					contentData.maxscroll = 0;
				}
			},
			enter(e){
				console.log(e);
			}
		}
	}
</script>