<template>
    <div class="cmui-slider" v-if="visible">
        <div class="swiper-container" :id="id" ref="swiper-container" :style="containerStyle">
            <div class="swiper-wrapper">
                <div class="swiper-slider-prepend"></div>
                <slot></slot>
                <div class="swiper-slider-append"></div>
            </div>
            <!-- Add Arrows -->
            <div class="swiper-button-next" v-if="this.nav"></div>
            <div class="swiper-button-prev" v-if="this.nav"></div>
            <!-- Add pagination -->
            <div class="swiper-pagination"></div>
            <!-- Add scrollbar -->
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</template>
<style type="text/css">
	.swiper-scrollbar:empty{
		display: none;
	}
</style>
<script type="text/javascript">
import Swiper from 'swiper';
import themeList from './themeList.json';
import sliderList from './sliderList';
function optionsMaker(options, themeName) {
    let themeOptions = _.get(themeList,themeName);
    let propOptions = {};
    //set slidesPerView as col
    if (this.col === 0) {
        propOptions.slidesPerView = 'auto';
        this.$children.forEach(item => {
            item.$el.style.width = 'auto';
        });
    }else{
    	propOptions.slidesPerView = this.col;
    }

    //set pagination as page
    if (this.page) {
        let tempOption = {
            el: '.swiper-pagination'
        };
        if (_.isString(this.page)) {
            if (this.page === 'progress') {
                tempOption.type = 'progressbar';
            } else if (this.page === 'number') {
                tempOption.type = 'fraction';
            }
        } else if (_.isNumber(this.page)) {
        	tempOption.dynamicBullets=true;
            tempOption.dynamicMainBullets = parseInt(this.page) || 1;
        }
        _.set(propOptions, 'pagination', tempOption);
    }
    //set navigation as nav
    if (this.nav) {
        _.set(propOptions, 'navigation', {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        })
    }
    //set spaceBetween as space
    if(this.space){
    	propOptions.spaceBetween=this.space;
    }
    //提取常用属性方便使用
    ['loop', 'autoplay', 'direction'].forEach(item => {
        propOptions[item] = this[item];
    })
    return _.defaultsDeep(options, propOptions, themeOptions);
}
export default {
    watch: {
        items: {
            immediate: true,
            handler(value) {
                this.resetSwiper();
            }
        },
        options: {
            deep: true,
            handler(newOptions, oldOptions) {
                this.resetSwiper();
            }
        }
    },
    data: function() {
        // console.log(this)
        return {
            visible: true
        }
    },
    computed: {
        containerStyle() {
            let rs = {};
            if (this.height) {
                rs.height = this.height;
            }
            return rs;
        }
    },
    props: {
    	id:{type:String,default:_.uniqueId('cmui-slider_')},
        items: { type: Array, default: [] },
        theme: { type: Number, default: 0 },
        options: { type: Object, default: null },
        loop: { type: Boolean, default: false },
        autoplay: { type: Boolean, default: false },
        col: { type: Number, default: 1 },
        page: { type: [Boolean, String, Number], default: false },
        direction: { type: String, default: 'horizontal' },
        height: { type: String, default: '' },
        nav: { type: Boolean, default: false },
        space:{type:Number,default:0},
    },
    methods: {
        destroy() {
            this.swiper && this.swiper.destroy(true, false);
            this.visible = false;
        },
        resetSwiper() {
            this.$nextTick(() => {
            	let hasInit=!!this.swiper;
            	if(hasInit){
					this.swiper.destroy(false, false);
            	}else{
            		this.swiperIndex=sliderList.length;
            	}
                _.delay(() => { 
                	this.swiper = new Swiper(this.$refs['swiper-container'], optionsMaker.call(this, this.options), this.theme);
                	if(hasInit){
                		sliderList[this.swiperIndex]=this.swiper;
                	}else{
                		sliderList.add(this.swiper);
                	}
                }, 0)
            })
        }
    }
}
</script>