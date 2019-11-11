<template>
<div>
    <!-- <p class="text-white fs-18 paddingh50 paddingv30 bg-black">你可以使用top left right bottom center reverse round hfull vfull这些class随意组合</p> -->
    <p class="text-black fs-18 paddingh50 paddingv30">横向布局</p>
    <div v-for="name in classList">
        <p class="title paddingv20 paddingh30">{{name||'默认'}}</p>
        <div class="flex-container" :class="name">
            <div class="flexDemo" v-for="i in 3">
            </div>
        </div>
    </div>
    <p class="text-black fs-18 paddingh50 paddingv30">纵向布局</p>
    <div v-for="name in classList">
        <p class="title paddingv20 paddingh30">{{name||'默认'}}</p>
        <div class="flex-container-col" :class="name">
            <div class="flexDemo" v-for="i in 3">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import img from '@assets/img.js'
export default {
  name: 'flexContainer',
  data() {
    return {
      imglist: [...img.whiteList, ...img.blackList],
      classList: [
        '',
        'top',
        'right',
        'center',
        'top',
        'bottom',
        'top center',
        'right bottom',
        'round',
        'reverse',
        'vfull',
        'hfull',
        'hfull vfull'
      ]
    }
  }
}
</script>

<style scoped>
.flexDemo{
    text-align: center;
    min-width: 24px;
    min-height: 24px;
}
.flexDemo:nth-child(1){
    background-color: #00BABA;
}
.flexDemo:nth-child(2){
    background-color: #007C7C;;
}
.flexDemo:nth-child(3){
    background-color: #003E3E;;
}
.flex-container{
    height:56px;
}
.flex-container-col{
    height:96px;
}
</style>
