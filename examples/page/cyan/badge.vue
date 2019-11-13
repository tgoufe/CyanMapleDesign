<template>
    <div>
        <p class="title paddingv20 paddingh30">默认</p>
        <div class="padding20">
            <div class="badge">默认</div>
        </div>
        <p class="title paddingv20 paddingh30">色彩</p>
        <div v-for="color in colors" class="badge margin20" :class="[color]">badge</div>
        <p class="title paddingv20 paddingh30">圆角</p>
        <div v-for="color in colors" class="badge margin20 radius" :class="[color]">badge radius</div>
        <p class="title paddingv20 paddingh30">翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse" :class="[color]">badge reverse</div>
        <p class="title paddingv20 paddingh30">圆角+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse radius" :class="[color]">radius reverse</div>
        <p class="title paddingv20 paddingh30">圆</p>
        <div v-for="color in colors" class="badge margin20  round" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">圆+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse  round" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">方块</p>
        <div v-for="color in colors" class="badge margin20  square" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">方块+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse square" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">药片</p>
        <div v-for="color in colors" class="badge margin20  pill" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">药片+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse pill" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">旗帜</p>
        <div class="paddingb20">
            <div v-for="color in colors" class="badge margin20 flag" :class="[color]">B</div>
        </div>
        <p class="title paddingv20 paddingh30">尺寸</p>
        <div class="margin20 badge small">small</div>
        <div class="margin20 badge">default</div>
        <div class="margin20 badge big">big</div>
        <p class="title paddingv20 paddingh30">组</p>
        <div class="badge-group padding20">
            <div class="badge reverse blue radius">上一页</div>
            <div class="badge reverse blue radius" v-for="i in 3">{{i}}</div>
            <div class="badge reverse blue radius">下一页</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'button',
  data() {
    return {
      colors: [
        'red',
        'orange',
        'yellow',
        'green',
        'coffee',
        'blue',
        'purple'
      ]
    }
  }
}
</script>

<style scoped>

</style>
