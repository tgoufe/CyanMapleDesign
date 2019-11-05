<template>
    <div>
        <p>默认</p>
        <div class="badge">默认</div>
        <p>色彩</p>
        <div v-for="color in colors" class="badge margin20" :class="[color]">badge</div>
        <p>圆角</p>
        <div v-for="color in colors" class="badge margin20 radius" :class="[color]">badge radius</div>
        <p>翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse" :class="[color]">badge reverse</div>
        <p>圆角+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse radius" :class="[color]">radius reverse</div>
        <p>圆</p>
        <div v-for="color in colors" class="badge margin20  round" :class="[color]">B</div>
        <p>圆+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse  round" :class="[color]">B</div>
        <p>方块</p>
        <div v-for="color in colors" class="badge margin20  square" :class="[color]">B</div>
        <p>方块+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse square" :class="[color]">B</div>
        <p>药片</p>
        <div v-for="color in colors" class="badge margin20  pill" :class="[color]">B</div>
        <p>药片+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse pill" :class="[color]">B</div>
        <p>旗帜</p>
        <div v-for="color in colors" class="badge margin20 flag" :class="[color]">B</div>
        <p>尺寸</p>
        <div class="margin20 badge small">small</div>
        <div class="margin20 badge">default</div>
        <div class="margin20 badge big">big</div>
        <p>组</p>
        <div class="badge-group">
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
