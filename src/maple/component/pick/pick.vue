<template>
    <cmui-popup
    position="bottom"
    :visible.sync="visible"
    class="cmui-picker"
    >
        <div class="flex-container padding10">
            <div class="cmui-picker__cancel">
                <div class="btn red radius small" @click="_cancel()">取消</div>
            </div>
            <div class="flex1 text-center">title</div>
            <div class="cmui-picker__ok">
                <div class="btn red radius small" @click="_ok()">确定</div>
            </div>
        </div>
        <div class="pos-r cmui-picker_content">
            <div class="cmui-picker__linet abs-top"></div>
            <div class="cmui-picker__lineb abs-bottom"></div>
            <div class="cmui-picker__wrapper flex-container vfull" ref="wheelWrapper" style="height:200px;overflow: hidden">
                <div v-for="(data,index) in pickerData" :key="index" class="flex1 swiper-container">
                    <ul class="cmui-picker__scroll swiper-wrapper">
                        <li v-for="(item,index) in data" class="cmui-picker__item text-center swiper-slide" :key="index">{{item.text}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </cmui-popup>
</template>
<style lang="scss">
    .cmui-picker__linet,.cmui-picker__lineb{
        position: absolute;
        height:86px;
        pointer-events: none;
        z-index: 9;
    }
    .cmui-picker__linet{
        border-bottom:1px solid #cccccc;
        background-image:linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0));
    }
    .cmui-picker__lineb{
        border-top:1px solid #cccccc;
        background-image:linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));
    }
    .cmui-picker__item{
        font-size:20px;
        &.swiper-slide-active{
            color: #ff8d66;
            &~.cmui-picker__item:nth-child(1){
                color:blue;
            }
        }
    }
</style>

<script>
  import cmuiPopup from '../popup/popup.vue';
  import Swiper from 'swiper';
  export default {
    props:{
      data:Array
      , selectIndex:Array
      , visible:false
      , rightFn:Function
      , leftFn:Function
    },
    computed:{
      pickerData(){
        function formatData(data){
          return _.map(data,col=>{
            return _.map(col,item=>{
              return _.isObject(item)?item:{text:item.toString(),value:item};
            }).filter(item=>!!item.text)
          })
        }
        return formatData(_.every(this.data,_.isArray)?this.data:[this.data]);
      },
      pickerSelectIndex(){
        let colLen=this.pickerData.length;
        if(_.isNumber(this.selectIndex)){
          return _.fill(Array(colLen),this.selectIndex);
        }else if(_.isArray(this.selectIndex)){
          return _.map(this.selectIndex,item=>+item);
        }else{
          return _.fill(Array(colLen),0)
        }
      }
    },
    components: {
      cmuiPopup
    },
    watch:{
      visible:{
        immediate: true,
        handler(value){
          this.wheels = this.wheels || [];
          let wheelWrapper = this.$refs.wheelWrapper;
          let _this=this;
          if(value&&!this.wheels.length){
            this.$nextTick(function(){
              _.forEach(_this.pickerData,(item,index)=>{
                _this._initWheel(wheelWrapper,index)
              });
            })
          }
          this.$emit('update:visible', value);
        }
      },
      pickerData(value){
        this._resetWheel();
      }
    },
    methods:{
      _initWheel(wheelWrapper,index){
        let _this=this;
        _this.wheels[index]=new Swiper(wheelWrapper.children[index],{
          direction : 'vertical',
          centeredSlides : true,
          slidesPerView:'auto',
          effect : 'coverflow',
          initialSlide :_this.pickerSelectIndex[index]||0,
          coverflowEffect: {
            rotate: -30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : false
          },
          on:{
            transitionEnd(swiper){
              _this.pickerSelectIndex[index]=this.activeIndex;
            }
          }
        })
      },
      _resetWheel(){
        let _this=this;
        let wheelWrapper = this.$refs.wheelWrapper;
        this.wheels.forEach(wheel=>wheel.destroy());
        this.wheels=[];
        this.$nextTick(function(){
          _.forEach(_this.pickerData,(item,index)=>{
            _this._initWheel(wheelWrapper,index)
          });
        })
      },
      _getData(){
        let _this=this;
        return _.map(this.wheels,(item,index)=>{
          return {
            text:_this.pickerData[index][item.activeIndex].text,
            value:_this.pickerData[index][item.activeIndex].value
          };
        })
      },
      _ok(){
        this.visible=false;
        let data=this._getData();
        _.isFunction(this.rightFn)&&this.rightFn(data,this);
        this.$emit('select',data,this);
      },
      _cancel(){
        this.visible=false;
        _.isFunction(this.leftFn)&&this.leftFn(this);
        this.$emit('cancel',this);
      }
    }
  }
</script>