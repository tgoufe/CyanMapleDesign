<template>
    <div class="form" style="padding-bottom: 120px;" :class="[formColor]">
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
          <div class="flex-container left">
            <span class="text-white" style="min-width: 55px;">Color</span>
            <input type="color" v-model="formColor" style="width:32px;height:32px;border-radius:50%;border:2px solid #fff;padding:0"/>
          </div>
            
          <div class="btn-group margint20 flex-container">
            <span class="text-white left" style="min-width: 55px;">Size</span>
            <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size=''" :class="size==''?'badgeCurrent':'badgeDefault'">Default</div></div>
                <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size='small'" :class="size=='small'?'badgeCurrent':'badgeDefault'">Small</div></div>
                <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size='big'" :class="size=='big'?'badgeCurrent':'badgeDefault'">Big</div></div>
            </div>
          </div>
        </div>
        <p class="text-white fs-18 paddingh50 paddingv30 bg-black">自定义色彩：请修改色彩查看变化</p>
        <div :style="{color:formColor}">
          <p class="title paddingv20 paddingh30">checkbox</p>
          <div class="list border">
              <div class="list-item paddingv30 paddingh50 flex-container" v-for="item in checkboxData" :key="item">
                  <span class="left">{{item||'默认'}}</span>
                  <input type="checkbox" :class="[item,size]" checked class="custom" label="选项">
              </div>
          </div>

          <p class="title paddingv20 paddingh30">radio</p>
          <div class="list border">
              <div class="list-item paddingv30 paddingh50 flex-container" v-for="item in ratioData" :key="item">
                  <span class="left">{{item=='0'?'默认':item}}</span>
                  <input type="radio" :class="[item,size]" :name="item" class="marginr30 custom" checked label="选项">
                  <input type="radio" :class="[item,size]" :name="item" class="custom" label="选项">
              </div>
          </div>
          <p class="title paddingv20 paddingh30">input</p>
          <div class="paddingv5 paddingh50">
              <div class="fs-16 paddingv10">input</div>
              <input type="text" class="borderBlack custom" :class="size" placeholder="请输入内容">
              <div class="fs-16 paddingv10 margint20">input reverse</div>
              <input type="text" class="borderBlackReverse reverse custom" :class="size" placeholder="请输入内容">
          </div>

          <p class="title paddingv20 paddingh30">select</p>
          <div class="paddingv5 paddingh50">
            <div class="fs-16 paddingv10">select</div>
            <select class="borderBlack custom" name="" id="" :class="size" placeholder="请输入内容">
                <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
            </select>
            <div class="fs-16 paddingv10">select reverse</div>
            <select name="" id="" class="reverse borderBlackReverse custom" :class="size" placeholder="请输入内容">
                <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
            </select>
          </div>
          <p class="title paddingv20 paddingh30">textarea</p>
          <div class="paddingv5 paddingh50">
            <div class="fs-16 paddingv10">textarea</div>
            <textarea class="borderBlack custom" name="" id="" cols="30" rows="10" placeholder="请输入内容"></textarea>
            <div class="fs-16 paddingv10">textarea reverse</div>
            <textarea name="" id="" cols="30" rows="10" class="reverse borderBlackReverse custom" placeholder="请输入内容"></textarea>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'form',
  data(){
    return{
        formColor:'#50d246',
        checkboxData:[
            '','reverse','square','square reverse','switch','btn','btn radius','btn light','btn light radius','btn reverse','btn reverse radius'
        ],
        ratioData:[
            '0','reverse','square','square reverse','btn','btn radius','btn light','btn light radius','btn reverse','btn reverse radius'
        ],
        size:''
    }
  }
}
</script>

<style scoped>
.bg-{background-color: #00baba}
.badgeCurrent{
    width:100%;
    border:2px solid white !important;
    padding: 5px 10px !important;
    background-color: #00BABA !important;
}
.badgeDefault{
    background: none !important;
    padding: 5px 10px !important;
}
p.title{
    font-size: 14px;
    background: rgba(0,0,0,0.04);
    color: #666666;
    line-height: 20px;
}
.borderBlack{
    border:1px solid black !important;
}
.borderBlackReverse{
    border-bottom:1px solid black !important;
}
input[type='color']::-webkit-color-swatch-wrapper{
  padding: 0;
}
input[type='color']::-webkit-color-swatch{
  border: 0;
  border-radius: 50%;
}
</style>
