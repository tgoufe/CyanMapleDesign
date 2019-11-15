<template>
<div class="padding20">
    <p>所有的模块都以一比一的尺寸进行展示</p>
    <cmui-number v-model="x">横向比</cmui-number>
    <cmui-number v-model="y">纵向比</cmui-number>
    <div style="margin:0 auto;width:200px">
        <div class="ratio-container" :ratio="ratio">
            <img :src="imglist[0]" alt="">
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
      imglist:[...img.whiteList,...img.blackList],
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

<style scoped>

</style>
