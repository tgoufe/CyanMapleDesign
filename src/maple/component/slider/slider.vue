<template>
	<div class="cmui-slider">
		<div class="swiper-container" :id="id">
			<div class="swiper-wrapper">
				<slot></slot>
			</div>
		    <div class="pagination"></div>
		</div>
	</div>
</template>
<script>

import Swiper from './swiper';
import sliderList from './sliderList';
import thememaker from './themeMaker';
export default {
	mounted:function(){
		var _this=this;
		setTimeout(function(){
			_this.swiper=new Swiper($('.swiper-container',_this.$el), thememaker.call(_this));
			_this.swiperIndex=sliderList.length;
			sliderList.add(_this.swiper)
		}, 0);
	},
    watch:{
		items:function(newData,oldData){
			var _this=this;
			this.swiper && this.swiper.destroy(false, true);
			if( !(newData && oldData && newData.length === oldData.length) ){
				$(_this.$el).find('.pagination').empty();
			}
			setTimeout(function(){
				if(_this.items){
					_this.swiper=new Swiper($('.swiper-container',_this.$el), thememaker.call(_this));
					sliderList[_this.swiperIndex]=_this.swiper;
				}
			}, 0);
		}
	},
	props:{
		id:{type:String,default:_.uniqueId('cmui-slider_')},
		items: {type: Array},
		theme:{type:Number},
		col:{type:Number},
		span:{type:Number},
		space:{type:Number},
		auto:{type:Number},
		loop:{type:Boolean},
		autoplayDisable:{type:Boolean},
		target: {type:Object},
		autoHeight:{type:Boolean,default:false},
		options:{type:Object}
	},
	destroyed(){
		this.swiper && this.swiper.destroy(true, true);
		$(this.$el).remove()
	}

};
</script>
<style lang="scss">
@import './swiper.css';
</style>
