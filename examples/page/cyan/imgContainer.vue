<template>
<div>
    <p>可以使用 full flex-x flex-y round top left bottom center right border 随意组合，下面列举了几个常见的组合方式</p>
    <p>原始图片</p>
    <img :src="imglist[1]" alt="">
    <div class="list list-col2">
        <div class="list-item padding20" v-for="name in classList">
            <p class="text-center">{{name||'默认'}}</p>
            <div class="ratio-container">
                <div class="img-container" :class="name">
                    <img :src="imglist[1]" alt="">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import img from '@assets/img.js'
export default {
  name: 'imgContainer',
  data(){
    return {
      imglist:[...img.whiteList,...img.blackList],
      classList:[
        '',
        'flex-x',
        'flex-x left',
        'flex-x right',
        'flex-y',
        'flex-y top',
        'fex-y bottom',
        'flex-x flex-y center',
        'full',
        'round',
        'round full',
        'flex-x flex-y top round',
      ]
    }
  }
}
</script>

<style scoped>
.img-container{
    box-shadow:0 0 2px 2px black;
}
</style>
