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
    import {ready,isInView} from '../../methods/dom';
    import _ from 'lodash';
    let lazyLoadList=[];
    let windowHeight=window.screen.availHeight;
    let windowWidth=window.screen.availWidth;
    let checkFinish=true;
    const checkLazyLoadImage=_.debounce(function(){
        if(checkFinish){
            checkFinish=false;
            for(let i=0;i<lazyLoadList.length;i++ ){
                const {$el,src}=lazyLoadList[i];
                const {inView,top}=isInView($el);
                if(inView){
                    $el.src=src;
                    lazyLoadList.splice(i--,1);
                    continue;
                }else if(top>windowHeight){
                    break;
                }
            }
            checkFinish=true;
        }
    },500);
    ready(function(){
        window.addEventListener('scroll',checkLazyLoadImage);
        window.addEventListener('resize',function(){
            windowHeight=window.screen.availHeight;
            windowWidth=window.screen.availWidth;
        })
    });
    const base64_1x1='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
    export default {
        name:'cmui-img',
        props:{
            src:{type:String,default:base64_1x1},
            lazyLoad:{type:Boolean,default:false},
            lazySrc:{type:String,default:base64_1x1},
            errorSrc:{type:String,default:base64_1x1},
            preView:{type:Boolean,default:false},
            preViewList:{type:Array,default(){return []}},
            preViewIndex:{type:Number,default:0},
            preViewOptions:{type:Object,default(){return{}}}
        },
        data(){
            return {
                realSrc:this.lazyLoad?this.lazySrc:this.src
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
                this[this.lazyLoad?'lazySrc':'realSrc']=this.errorSrc
            }
        },
        created(){
            lazyLoadList.push(this);
        },
        mounted(){
            checkLazyLoadImage();
        },
        destroyed(){
            _.remove(lazyLoadList,this);
        }
    };
</script>
