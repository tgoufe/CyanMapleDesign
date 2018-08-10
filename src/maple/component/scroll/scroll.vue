<template>
    <div class="cmui-scroll swiper-container" ref="scroll">
        <div class="abs-top flex-container" :style="pullStartStyle" ref="pullStart" v-if="pullEvent">
            <slot name="pullStart" v-if="$slots.pullStart"></slot>
            <p v-text="pullStartText" class="text-center"></p>
        </div>
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="abs-bottom flex-container" :style="pullEndStyle" ref="pullEnd">
            <slot name="pullEnd" v-if="$slots.pullEnd"></slot>
            <p v-text="pullEndText" class="text-center"></p>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    name:'cmui-scroll',
    data:function(){
      console.log(this)
      return {
        swiper:null,
        pullStartStyle:{},
        pullEndStyle:{},
        pullStartText:'',
        pullEndText:''
      }
    },
    props:{
      col:{type:[String,Number],default:'auto'},
      direction:{type:String,default:'h'},
      watch:null,
      pullDis:{type:Number,default:50},
      pullEvent:{type:Boolean,default:true},
      freeMode:{type:Boolean,default:true},
      pullText:Array,
    },
    watch:{
      watch(){
        if(this.swiper){
          this.$nextTick(()=>{
            this.swiper.update();
          })
        }
      }
    },
    methods:{
      updatePull(progress,translate,endHandel){
        if(!this.pullEvent){
          return ;
        }
        if(progress<0){
          this.pullStartStyle[this.direction=='v'?'top':'left']=_.min([translate-20,10])+'px';
          console.log(this.pullStartText)
          if(translate>this.pullDis){
            this.pullStartText=_.get(this.pullText,1);
            endHandel&&this.$emit('pullStart',this)
          }else{
            this.pullStartText=_.get(this.pullText,0);
          }
        }else if(progress>1){
          /**
           * todo 位置计算
           * 现在滑动到底部时的距离计算有误差，需要改正
           * */
          this.pullEndStyle[this.direction=='v'?'bottom':'right']=_.min([translate*(progress-1)*-1-20,10])+'px';
          if(translate*(progress-1)*-1-20>this.pullDis){
            this.pullEndText=_.get(this.pullText,3);
            endHandel&&this.$emit('pullEnd',this)
          }else{
            this.pullEndText=_.get(this.pullText,2);
          }
        }
        this.$emit('pull',progress,this);
      },
      resetPull(){
        this.pullStartStyle[this.direction=='v'?'top':'left']=`-100%`
        this.pullEndStyle[this.direction=='v'?'bottom':'right']=`-100%`
      }
    },
    mounted(){
      let container=this.$refs.scroll;
      let _this=this;
      this.$nextTick(function(){
        _this.swiper=new Swiper(container,{
          direction:_this.direction=='v'?'vertical':'horizontal',
          slidesPerView :+_this.col||'auto',
          freeMode:_this.freeMode,
          on:{
            progress(value){
              _this.updatePull(value,this.translate);
            },
            touchEnd(){
              _this.updatePull(this.progress,this.translate,true);
              _.delay(_this.resetPull)
            }
          }
        });
      })
    }
}
</script>