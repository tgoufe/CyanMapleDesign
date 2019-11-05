<template>
  <div id="app">
    <head-bar
      title="CyanMapleDesign"
      @left-icon-click="$router.back()"
    />
    <!-- <transition :name="transitionName"> -->
    <router-view
      class="child-view"
      style="width:100%"
    />
    <!-- </transition> -->
  </div>
</template>

<script>
import headBar from './components/head'
import maple from '@maple/index.js'
import vue from 'vue'
import '@theme/default.scss'
import './assets/style.css'
import styleinit from '../src/maple/styleInit'
// vue.config.warnHandler = new Function()
styleinit()
maple.install(vue)
export default {
  name: 'App',
  components: {
    headBar
  },
  data () {
    return {
      transitionName: 'slide-left',
      visible: true
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = (to.path.match(/\/\w+/g) || '').length
      const fromDepth = (from.path.match(/\/\w+/g) || '').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang='scss' type="text/scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
