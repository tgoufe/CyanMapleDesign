<template>
<img class="cmui-img"
:src="realSrc"
alt=""
@click="imgClick()"
@error="srcError()"
/>
</template>
<script>
import imagePreView from './imagePreView';
let lazyLoadList=[];
let windowHeight=window.screen.availHeight;
let windowWidth=window.screen.availWidth;
let checkFinish=true;
const checkLazyLoadImage=_.debounce(function(){
    if(checkFinish){
        checkFinish=false;
        for(let i=0;i<lazyLoadList.length;i++ ){
            const dom=lazyLoadList[i].dom;
            const pos=dom.getBoundingClientRect();
            const canViewV=_.inRange(pos.top>0?pos.top:(pos.top+pos.height),windowHeight);
            const canViewH=_.inRange(pos.left,windowWidth);
            if( canViewV&&canViewH){
                dom.src=lazyLoadList[i].imageUrl
                lazyLoadList.splice(i--,1)
            }
            if(pos.top>windowHeight){
                break;
            }
        }
        checkFinish=true;
    }
},500)
$(function(){
    $(window).on('scroll',checkLazyLoadImage);
    $(window).on('resize',function(){
        windowHeight=window.screen.availHeight;
        windowWidth=window.screen.availWidth;
    })
})
const base64_1x1='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
export default {
        props:{
            src:{type:String,default:base64_1x1},
            lazyLoad:{type:Boolean,default:false},
            lazySrc:{type:String,default:base64_1x1},
            errorSrc:{type:String,default:base64_1x1},
            preView:{type:Boolean,default:false},
            preViewList:{type:Array,default:[]},
            preViewIndex:{type:Number,default:0},
            preViewOptions:{type:Object,default:{}}
        },
        computed:{
            realSrc(){
                return this.lazyLoad?this.lazySrc:this.src
            }
        },
        methods:{
            imgClick:function(){
                if(this.preView){
                    let list=this.preViewList.length?this.preViewList:this.src;
                    let index=this.preViewIndex;
                    imagePreView.call(this,list,index,this.preViewOptions);
                }
            },
            srcError(){
                this[this.lazyLoad?'lazySrc':'src']=this.errorSrc
            }
        },
        mounted(){
            if(this.lazyLoad){
                const dom=this.$el;
                const imageUrl=this.src;
                const DOMRect=dom.getBoundingClientRect();
                const top=DOMRect.top;
                const left=DOMRect.left;
                const index=_.findLastIndex(lazyLoadList,item=>{
                    return item.top<top
                })
                lazyLoadList.splice(index+1,0,{
                    dom,
                    imageUrl,
                    top,
                    left
                })
            }
            checkLazyLoadImage()
        }
};
</script>
