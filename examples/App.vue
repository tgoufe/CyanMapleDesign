<template>
  <div id="app">
    <head-bar title="CyanMapleDesign" @left-icon-click="$router.back()"></head-bar>
    <router-view class="padding30"/>
  </div>
</template>

<script>
import headBar from './components/head'
import _ from 'lodash'
import '../CMUI/style/CMUI.css'
import '../CMUI/style/theme.css'
import styleinit from '../src/maple/styleInit'
styleinit()
export default {
  name: 'app',
  components: {
    headBar
  }
}
</script>

<style lang='scss' type="text/scss">
</style>
