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
        }
    }
    .cmui-picker__title{font-size: 20px;}
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
      , title:String
    },
    data:function(){
      let _this=this;
      function baseForm(data,index,arr){
        return _.map(data,item=>{
          if(_.isPlainObject(item)){
            if(_.isArray(item.children)){
              arr[index+1]=arr[index+1]||[];
              item.text=String(item.text);
              item.children=baseForm(item.children,index+1,arr);
            }
            return item;
          }else{
            return {text:item.toString(),value:item}
          }
        })
      }
      function formatData(data){
        return _.map(data,(col,index,arr)=>{
          return baseForm(col,index,arr);
        })
      }
      let pickerData=formatData(_.every(this.data,_.isArray)?this.data:[this.data]);
      let pickerSelectIndex=(function(){
        let colLen=pickerData.length;
        if(_.isNumber(_this.selectIndex)){
          return _.fill(Array(colLen),this.selectIndex);
        }else if(_.isArray(_this.selectIndex)){
          return _.map(_this.selectIndex,Number).concat(Array(pickerData.length-_this.selectIndex.length).fill(0));
        }else{
          return _.fill(Array(colLen),0)
        }
      })();
      let wheelStore=JSON.parse(JSON.stringify(pickerData));
      // _.forEach(pickerData,(item,index)=>{
      //   if(pickerSelectIndex[index]&&item.children){
      //     wheelStore[index+1]=pickerData[index+1];
      //     pickerData[index+1]=item;
      //   }
      // })
      return {
        pickerData,
        pickerSelectIndex,
        wheelStore
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
          console.log(this.pickerData)
          if(value&&!this.wheels.length){
            this.setData(0,this.pickerSelectIndex[0]);
            this.$nextTick(()=>{
              _.forEach(this.pickerData,(item,index)=>{
                this.initWheel(wheelWrapper,index)
              })
              
            })
          }
          this.$emit('update:visible', value);
        }
      }
    },
    methods:{
      initWheel(wheelWrapper,index=0){
        let _this=this;
        let initialSlide=this.pickerSelectIndex[index]||0;
        let tag=false;
        _this.wheels[index]=new Swiper(wheelWrapper.children[index],{
          direction : 'vertical',
          centeredSlides : true,
          slidesPerView:'auto',
          effect : 'coverflow',
          initialSlide :initialSlide,
          coverflowEffect: {
            rotate: -30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : false
          },
          on:{
            transitionEnd(){
              if(tag&&index!=_this.pickerData.length-1){
                console.log('tag',index,this.activeIndex)
                _this.setData(index,this.activeIndex);
                _this.updataWheels();
              }
            }
          }
        });
        if(!tag){
          tag=!tag;
          this.updataWheels();
        }
      },
      setData(index,active){
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
          this.setData(index+1,this.pickerSelectIndex[index+1]);
        }else{
          index++;
          for(let len=this.pickerData.length;index<len;index++){
            this.$set(this.pickerData[index-1],this.wheelStore[index]);
          }
        }
      },
      updataWheels(){
        this.$nextTick(()=>{
          this.wheels.forEach((wheel,index)=>{
            wheel.updateSlides();
            wheel.slideTo(this.pickerSelectIndex[index],500,false);
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