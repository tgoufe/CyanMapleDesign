<template>
  <div id="app">
    <router-view class="paddingb100"></router-view>
    <Cfooteer class="pos-f bottom0"></Cfooteer>
  </div>
</template>

<script>
  import footeer from './page/footeer'
export default {
  name: 'App',
  components: {
    Cfooteer: footeer
  },
  data () {
    return {
      path: ''
    }
  },
  watch:{
    $route: {
      handler (val, old) {
        this.path = val.fullPath
      },
      deep: true
    }
  }
}
</script>

<style lang='scss' type="text/scss">

</style>
