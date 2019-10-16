<template>
    <div>
        <p>默认</p>
        <div class="btn">默认</div>
        <p>色彩</p>
        <div v-for="color in colors" class="btn margin20" :class="[color]">btn</div>
        <p>圆角</p>
        <div v-for="color in colors" class="btn margin20 radius" :class="[color]">btn radius</div>
        <p>翻转</p>
        <div v-for="color in colors" class="btn margin20 reverse" :class="[color]">btn reverse</div>
        <p>圆角+翻转</p>
        <div v-for="color in colors" class="btn margin20 reverse radius" :class="[color]">radius reverse</div>
        <p>尺寸</p>
        <div class="margin20 btn small">small</div>
        <div class="margin20 btn">default</div>
        <div class="margin20 btn big">big</div>
        <p>块</p>
        <div class="btn green block reverse radius">block</div>
        <div class="btn green block radius">block</div>
        <p>组</p>
        <div class="btn-group">
            <div class="btn reverse blue radius">上一页</div>
            <div class="btn reverse blue radius" v-for="i in 3">{{i}}</div>
            <div class="btn reverse blue radius">下一页</div>
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
