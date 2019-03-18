<template>
    <div class="cmui-slider" v-if="visible">
        <div class="swiper-container" :id="id" ref="swiper-container" :style="containerStyle">
            <div class="swiper-wrapper">
                <!-- <div class="swiper-slider-prepend"></div> todo-->
                <slot></slot>
                <!-- <div class="swiper-slider-append"></div> todo-->
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
    }else{
    	propOptions.slidesPerView = this.col;
    }
    //set scrollbar
    if(this.scrollbar){
        propOptions.scrollbar={
            el:'.swiper-scrollbar'
        }
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
    ['loop', 'autoplay', 'direction','freeMode'].forEach(item => {
        propOptions[item] = this[item];
    })
    let rsOptions=_.defaultsDeep(options, propOptions, themeOptions);
    if(rsOptions.slidesPerView === 'auto'){
        let pos=(rsOptions.direction==='vertical')?'height':'width'
        this.$children.forEach(item => {
            item.$el.style[pos] =item.$el.style[pos]|| 'auto';
        });
    }
    return rsOptions;
}
const DEFAULT_EVENTS = [
    'beforeDestroy',
    'slideChange',
    'slideChangeTransitionStart',
    'slideChangeTransitionEnd',
    'slideNextTransitionStart',
    'slideNextTransitionEnd',
    'slidePrevTransitionStart',
    'slidePrevTransitionEnd',
    'transitionStart',
    'transitionEnd',
    'touchStart',
    'touchMove',
    'touchMoveOpposite',
    'sliderMove',
    'touchEnd',
    'click',
    'tap',
    'doubleTap',
    'imagesReady',
    'progress',
    'reachBeginning',
    'reachEnd',
    'fromEdge',
    'setTranslate',
    'setTransition',
    'resize'
]
let sliderObserve=new class {
    constructor(){
        this.controlList={};
        this.refList=[];
        this.subscribeList=[];
    }
    observeControl(vm){
        let _this=this;
        let controlName=vm.control;
        if(controlName&&_.isString(controlName)){
            this.refList.forEach(item=>{
                if(item.name===controlName){
                    this.bindControl(vm.swiper,item.vm.swiper)
                }
            })
            this.controlList[controlName]=vm.swiper;
            this.subscribeList.push((swiper,ref)=>{
                if(this.controlList[ref]){
                    this.bindControl(this.controlList[ref],swiper)
                }
            })
        }
        let refName=_.get(vm,'$vnode.data.ref');
        if(refName){
            this.refList.push({vm,name:refName});
            this.publish(vm.swiper,refName)
        }
    }
    bindControl(controlSwiper,targetSwiper){
        targetSwiper.controller.control=controlSwiper;
    }
    publish(swiper,refName){
        this.subscribeList.forEach(item=>item(swiper,refName));
    }
}
export default {
    watch: {
        watch: {
            immediate: false,
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
        return {
            visible: true
        }
    },
    mounted(){
        this.resetSwiper();
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
        watch: { type: Object, default: {} },
        theme: { type: Number, default: 0 },
        options: { type: Object, default: null},
        loop: { type: Boolean, default: false },
        autoplay: { type: Boolean, default: false },
        col: { type: Number, default: 1 },
        page: { type: [Boolean, String, Number], default: false },
        direction: { type: String, default: 'horizontal' },
        height: { type: String, default: '' },
        nav: { type: Boolean, default: false },
        space:{type:Number,default:0},
        freeMode:{type:Boolean,default:false},
        scrollbar:{type:Boolean,default:false},
        control:{type:String,default:''}
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
                    sliderObserve.observeControl(this)
                    
                	if(hasInit){
                		sliderList[this.swiperIndex]=this.swiper;
                	}else{
                		sliderList.add(this.swiper);
                	}
                    this.bindEvents();
                    this.$emit('rendered', this);
                }, 0)
            })
        },
        update() {
            if (this.swiper) {
                this.swiper.update && this.swiper.update()
                this.swiper.navigation && this.swiper.navigation.update()
                this.swiper.pagination && this.swiper.pagination.render()
                this.swiper.pagination && this.swiper.pagination.update()
            }
        },
        bindEvents(){
            let vm = this;
            DEFAULT_EVENTS.forEach(eventName => {
              this.swiper.on(eventName, function(...args) {
                vm.$emit(eventName, ...args,vm.swiper)
                vm.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...args,vm.swiper)
              })
            })
        }
    }
}
</script>