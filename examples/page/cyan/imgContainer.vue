<template>
<div>
    <!-- <p class="text-black fs-18 padding30">可以使用 full flex-x flex-y round top left bottom center right border 随意组合，下面列举了几个常见的组合方式</p> -->
    <p class="title paddingv20 paddingh30">默认图片</p>
    <img :src="imgList" alt="">
    <p class="title paddingv20 paddingh30">常见组合方式</p>
    <div class="list list-col2 paddingh15 paddingb50">
        <div class="list-item padding20" v-for="name in classList">
            <p class="dian pos-r text-center marginb30 fs-12">{{name||'Default'}}</p>
            <div class="ratio-container">
                <div class="img-container" :class="name">
                    <img :src="imgList" alt="">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import img from '@assets/imgContainer_test.png'
export default {
  name: 'imgContainer',
  data(){
    return {
      imgList:img,
      classList:[
        '',
        'flex-x',
        'flex-x left',
        'flex-x right',
        'flex-y',
        'flex-y top',
        'flex-y bottom',
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
    box-shadow:0 0 0 1px black;
}
.dian:before{
    content: '';
    position: absolute;
    left:0;
    width: 8px;
    height:8px;
    border-radius: 50%;
    background: #00BABA;
    top: 4px;
}
</style>
