var sliderMethodsList=[ 'disableMousewheelControl', 'enableMousewheelControl', 'enableKeyboardControl', 'disableKeyboardControl', 'slideNext', 'slidePrev', 'slideTo', 'startAutoplay', 'stopAutoplay', 'destroy', 'getWrapperTranslate', 'setWrapperTranslate', 'removeSlide', 'removeAllSlides', 'updateContainerSize', 'updateSlidesSize', 'updateProgress', 'updatePagination', 'updateClasses', 'update', 'onResize', 'detachEvents', 'attachEvents', 'appendSlide', 'prependSlide', 'on', 'once', 'off', 'lockSwipes', 'lockSwipeToNext', 'lockSwipeToPrev', 'reLoop', 'disableTouchControl', 'enableTouchControl', 'unsetGrabCursor', 'setGrabCursor'];
var sliderPropsList=['activeIndex','realIndex','previousIndex','width','height','touches','params','container','wrapper','slides','bullets','translate','progress','isBeginning','isEnd','autoplaying','animating','clickedIndex','clickedSlide','prevButton','nextButton'];
function CMUI_SliderList(){
	this.length=0;
}
sliderMethodsList.forEach(item=>{
	CMUI_SliderList.prototype[item]=function(arg){
		_.times(this.length).forEach(index=>{
			if(this[index] instanceof Swiper){
				this[index][item](arg)
			}
		})
		return this;
	}
})
sliderPropsList.forEach(item=>{
	CMUI_SliderList.prototype[item]=function(){
		return _.get(this,'[0]'+item);
	}
})
CMUI_SliderList.prototype.add=function(item){
	if(item instanceof Swiper){
		this[this.length++]=item;
	}
	return this;
}
CMUI_SliderList.prototype.remove=function(){
	_.times(this.length,index=>{
		var swiper=this[index];
		if(swiper instanceof Swiper){
			var container=swiper.container;
			var baseIndex=_.findKey(sliderList,swiper)
			swiper.destroy(false, true);
			container.remove();
			this[index]=null
			if(this!=sliderList){
				sliderList[baseIndex]=null
			}
		}
	})
	return this;
}
CMUI_SliderList.prototype.eq=function(index=0){
	var temp=new CMUI_SliderList();
	return temp.add(this[index])
}
var sliderList=new CMUI_SliderList;
export  {CMUI_SliderList,sliderList as default};