
export default function thememaker(){
	var _this=this;
	var theme=this.theme;
	var options={
		pagination          : '.pagination',
		paginationClickable : true,
		loop                : true,
		//autoplayDisableOnInteraction:false,
		// lazyLoading         : true,
		// updateOnImagesReady : true,
		preloadImages       : true
	}
	switch(theme){
		default:
			break
		case 1:
				options.effect         = 'coverflow',
				options.grabCursor     = true,
				options.centeredSlides = true,
				options.slidesPerView  = 2,
		        options.loop=false,
				options.coverflow      = {
		            rotate: 50,
		            stretch: 0,
		            depth: 100,
		            modifier: 1,
		            slideShadows : true
		        };
			break;
		case 2:
				options.pagination     = false,
				options.direction 	   = 'vertical';
			break;
		case 3:
				options.paginationType      = 'custom',
				options.paginationCustomRender 	   = function (swiper, current, total) {
				      return '<span>' + current + '/' + total + '</span>';
				  };
			break;
		case 4:
			options.pagination     = false;
			_this.col=0;
			_this.auto=0;
			options.loop=false;
			break
		case 5:
			options.effect         = 'coverflow';
			options.centeredSlides = true;
			options.slidesPerView  = 1.1;
	        options.loop=false;
	        options.spaceBetween=45;
			options.coverflow      = {
	            rotate: 0,
	            stretch: 0,
	            depth: 200,
	            modifier: 1,
	            slideShadows : false
	        };
	        options.paginationType      = 'custom';
				options.paginationCustomRender 	   = function (swiper, current, total) {
				      return '<span class="text-white fs-12 marginr40 text-right lh-20">' + current + '/' + total + '</span>';
				  };
	        break;
	}
	if(this.col===0){
		options.slidesPerView='auto';
		this.$children.forEach(item=>{
			item.$el.style.width='auto'
		})
	}else{
		options.slidesPerView=this.col||options.slidesPerView || 1
	}
	options.spaceBetween=this.space||options.spaceBetween || 0;
	options.autoplay=(function(_this){
		if(_this.auto==0){
			return 0;
		}else{
			return options.autoplay  || 3000
		}
	})(this);
	options.autoHeight=this.autoHeight;
	options.slidesPerColumn=this.span||options.slidesPerColumn||1;
	options.loop=this.loop;
	options.autoplayDisableOnInteraction=this.autoplayDisable;
	return _.defaults(this.options,options)
}