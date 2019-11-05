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
      background: rgb(250, 250, 250);
}
.radius{border-radius: 4px;overflow: hidden;}
</style>
