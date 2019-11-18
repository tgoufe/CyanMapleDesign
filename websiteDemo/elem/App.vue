<template>
  <div id="app">
    <router-view></router-view>
    <elem-footer class="pos-f bottom0 bordert bg-white paddingv50 fs-18 lh-18 margint50"></elem-footer>
  </div>
</template>

<script>
import elemFooter from './page/elemFooter.vue'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components:{
    elemFooter
  }
}
</script>

<style lang='scss' type="text/scss">
</style>
