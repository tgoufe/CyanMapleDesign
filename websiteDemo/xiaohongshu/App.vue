<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' type="text/scss">
body{
      background: #f3f3f3;
}
.radius{border-radius: 4px;overflow: hidden;}
</style>
