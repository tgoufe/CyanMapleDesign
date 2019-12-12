<template>
<div>
    <p class="title paddingv20 paddingh30">横向滚动</p>
    <div class="scroll-container paddingh10 paddingv15">
        <div class="ratio-container marginh5" style="width:100px;" v-for="item in imglist">
            <div class="img-container border flex-x" style="border-radius:8px;">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
    <p class="title paddingv20 paddingh30">纵向滚动</p>
    <div class="scroll-container-y paddingh15 paddingv10" style="height:400px">
        <div class="ratio-container marginv5" style="width:100px;" v-for="item in imglist">
            <div class="img-container border flex-x" style="border-radius:8px;">
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
      imglist: [...img.cmList, ...img.cmList]
    }
  }
}
</script>

<style scoped>

</style>
