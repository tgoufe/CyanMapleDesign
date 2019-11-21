<template>
<div>
  <p class="title paddingv20 paddingh30">所有的模块都以一比一的尺寸进行展示</p>
  
  <div class="padding40" style="width:100%;">
      <div class="ratio-container" :ratio="ratio">
          <img :src="imglist[1]" alt="">
      </div>
  </div>
<!--   <cmui-number v-model="x">横向比</cmui-number>
  <cmui-number v-model="y">纵向比</cmui-number> -->
  <div class="fixed-bottom bg-black fs-16 text-white paddingb50" style="z-index:1">
    <div class="flex-container paddingv10 paddingh50">
      <div class="flex-container left">
        <div>横向</div>
        <div style="min-width: 100px" class="text-center">{{x}}</div>
      </div>
      <div class="flex1 paddingl50 paddingt10 themeSlidebar">
        <cmui-slidebar v-model="x" :step="1" class="marginb20"></cmui-slidebar>
      </div>
    </div>
    <div class="flex-container paddingv10 paddingh50">
      <div class="flex-container left">
        <div>纵向</div>
        <div style="min-width: 100px" class="text-center">{{y}}</div>
      </div>
      <div class="flex1 paddingl50 paddingt10 themeSlidebar">
        <cmui-slidebar v-model="y" :step="1" class="marginb20"></cmui-slidebar>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import img from '@assets/img.js'
export default {
  name: 'ratioContainer',
  data(){
    return {
      imglist:[...img.cmList,...img.cmList],
      x: 1,
      y: 1
    }
  },
  computed: {
    ratio(){
      return `${this.x}/${this.y}`
    }
  }
}
</script>

<style lang="scss">
  .themeSlidebar{
    .cmui-slidebar{
      .cmui-slidebar__bar{
        background: rgba(102,102,102,.6);
        height:10px;
        border-radius:10px;
      }
      .cmui-slidebar__progress{
        background: rgba(102,102,102,.6);
        height:10px;
        border-radius:10px;
      }
      .cmui-slidebar__dot{
        background:#02baba;
        border:2px solid white;
      }
    }
  }
</style>
