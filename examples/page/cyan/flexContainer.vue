<template>
<div>
    <p>你可以使用top left right bottom center reverse round hfull vfull这些class随意组合</p>
    <p>横向布局</p>
    <div v-for="name in classList">
        <p>{{name||'默认'}}</p>
        <div class="flex-container" :class="name">
            <div class="flexDemo" v-for="i in 3">
                {{i}}
            </div>
        </div>
    </div>
    <p>纵向布局</p>
    <div v-for="name in classList">
        <p>{{name||'默认'}}</p>
        <div class="flex-container-col" :class="name">
            <div class="flexDemo" v-for="i in 3">
                {{i}}
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
    min-width:30px;
    text-align: center;
    line-height:30px;
}
.flexDemo:nth-child(1){
    background-color: #00BABA;
}
.flexDemo:nth-child(2){
    background-color: #ba4153;
}
.flexDemo:nth-child(3){
    background-color: #7bba7a;
}
.flex-container{
    height:50px;
    border:1px solid black;
    margin-bottom:10px;
}
.flex-container-col{
    height:120px;
    border:1px solid black;
    margin-bottom:10px;
}
</style>
