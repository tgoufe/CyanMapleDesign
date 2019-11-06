<template>
  <div id="app">
    <router-view></router-view>
    <cfooteer class="pos-f bottom0"></cfooteer>
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
    }
  }
}
</script>

<style lang='scss' type="text/scss">

</style>
