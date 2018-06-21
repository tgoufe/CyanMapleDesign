<script src="../../../../../Puppeteer/puppeteerTest.js"></script>
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
            <div class="flex1 text-center cmui-picker__title">{{title}}</div>
            <div class="cmui-picker__ok">
                <div class="btn red radius small" @click="_ok()">确定</div>
            </div>
        </div>
        <div class="pos-r cmui-picker_content">

            <div class="cmui-picker__wrapper flex-container vfull" ref="wheelWrapper" style="height:200px;overflow: hidden">
                <div v-for="(data,index) in pickerData" :key="index" class="flex1 swiper-container">
                    <ul class="cmui-picker__scroll swiper-wrapper">
                        <li v-for="(item,index) in data" class="cmui-picker__item text-center swiper-slide text-limit1" :key="index">{{item.text}}</li>
                    </ul>
                </div>
            </div>
            <div class="cmui-picker__linet abs-top"></div>
            <div class="cmui-picker__lineb abs-bottom"></div>
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
        }
    }
    .cmui-picker__title{font-size: 20px;}
</style>

<script>
  import cmuiPopup from '../popup/popup.vue';
  import Swiper from 'swiper';
  function formatWheelData(wheelData){
    return _.map(wheelData,item=>{
      if(_.isPlainObject(item)){
        if(_.isArray(item.children)){
          item.text=String(item.text);
          item.children=formatWheelData(item.children);
        }
        return item;
      }else{
        return {text:item.toString(),value:item}
      }
    })
  }
  function formatData(data){
    return _.map(data,(whleeData,wheelIndex)=>{
      return formatWheelData(whleeData,wheelIndex);
    })
  }
  function getInitData(data,selectIndex){
    let pickerData=formatData(_.every(data,_.isArray)?data:[data]);
    let pickerSelectIndex=(function(){
      let colLen=pickerData.length;
      if(_.isNumber(selectIndex)){
        return _.fill(Array(colLen),selectIndex);
      }else if(_.isArray(selectIndex)){
        return _.map(selectIndex,Number);
      }else{
        return _.fill(Array(colLen),0)
      }
    })();
    let wheelStore=[pickerData[0]];
    for(let index=0;index<pickerData.length;index++){
      let wheelData=pickerData[index];
      let activeIndex=_.get(pickerSelectIndex,index,0);
      let chiildrenData=_.get(wheelData,`[${activeIndex}].children`);
      if(chiildrenData){
        wheelStore[index+1]=pickerData[index+1]||[];
        pickerData[index+1]=chiildrenData;
      }else if(index<pickerData.length-1){
        wheelStore[index+1]=pickerData[index+1]||[]
      }
    }
    return {
      pickerData,
      pickerSelectIndex,
      wheelStore
    }
  }
  export default {
    props:{
      data:Array
      , selectIndex:Array
      , visible:false
      , rightFn:Function
      , leftFn:Function
      , title:String
    },
    data:function(){
      return getInitData(this.data,this.selectIndex);
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
          if(value&&!this.wheels.length){
            this.$nextTick(()=>{
              _.forEach(this.pickerData,(item,index)=>{
                this.initWheel(wheelWrapper,index)
              })
            })
          }
          this.$emit('update:visible', value);
        }
      },
      data(value){
        this.setData(value);
      }
    },
    methods:{
      initWheel(wheelWrapper,index=0){
        let _this=this;
        let initialSlide=this.pickerSelectIndex[index]||0;
        let isInit=true;
        _this.wheels[index]=new Swiper(wheelWrapper.children[index],{
          direction : 'vertical',
          centeredSlides : true,
          slidesPerView:'auto',
          initialSlide:initialSlide,
          // freeMode:true,
          // freeModeSticky:true,
          effect : 'coverflow',
          coverflowEffect: {
            rotate: -25,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : false
          },
          on:{
            transitionEnd(){
              if(!isInit&&index!==_this.pickerData.length-1){
                _this.updateData(index,this.activeIndex);
                _this.updataWheels(index+1);
              }else{
                isInit=false;
              }
            }
          }
        });
      },
      updateData(index,active){
        if(!_.get(this,`pickerData[${index}][${active}]`)){
          active=0;
        }
        this.pickerSelectIndex[index]=active;
        let children=_.get(this,`pickerData[${index}][${active}].children`);
        if(children){
          if(!_.isEqual(this.pickerData[index+1],children)){
            this.pickerData.splice(index+1,1,children)
          }else{
            index++
          }
          this.updateData(index+1,this.pickerSelectIndex[index+1]);
        }else{
          for(let item;item=this.pickerData[++index];){
            this.pickerData.splice(index,1,this.wheelStore[index])
          }
        }
      },
      updataWheels(fromIndex=0){
        this.$nextTick(()=>{
          for(let item;item=this.wheels[fromIndex++];){
            item.updateSlides();
            item.slideTo(this.pickerSelectIndex[fromIndex-1],false);
          }
        })
      },
      getData(){
        let _this=this;
        return _.map(this.wheels,(item,index)=>{
          return {
            text:_this.pickerData[index][item.activeIndex].text,
            value:_this.pickerData[index][item.activeIndex].value
          };
        })
      },
      setData(data,selectIndex=0){
        _.forEach(this.wheels,item=>{
          item.destroy()
        })
        this.wheels=[];
        let wheelWrapper = this.$refs.wheelWrapper;
        _.assign(this,getInitData(data,selectIndex));
        this.$nextTick(()=>{
          _.forEach(this.pickerData,(item,index)=>{
            this.initWheel(wheelWrapper,index)
          })
        })
        return;
      },
      _ok(){
        this.visible=false;
        let data=this.getData();
        console.log(data)
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