<template>
<div>
    <p>横向滚动</p>
    <div class="scroll-container">
        <div class="ratio-container" style="width:100px;" v-for="item in imglist">
            <div class="img-container border flex-x">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
    <p>纵向滚动</p>
    <div class="scroll-container-y" style="height:330px">
        <div class="ratio-container" style="width:100px;" v-for="item in imglist">
            <div class="img-container border flex-x">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import img from '@assets/img.js'
export default {
  name: 'scrollContainer',
  data() {
    return {
      imglist: [...img.whiteList, ...img.blackList]
    }
  }
}
</script>

<style scoped>

</style>
