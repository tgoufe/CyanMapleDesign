<template>
<div>
    <p>所有的模块都以一比一的尺寸进行展示</p>
    <div class="list list-col2">
        <div class="list-item" v-for="item in imglist">
            <div class="padding10">
                <div class="ratio-container">
                    <div class="img-container flex-x">
                        <img :src="item" alt="">
                    </div>
                </div>
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
      imglist:[...img.whiteList,...img.blackList]
    }
  }
}
</script>

<style scoped>

</style>
