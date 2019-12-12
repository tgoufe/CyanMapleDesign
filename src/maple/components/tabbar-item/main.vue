<template>
  <div v-show="active" class="cmui-tabbar-item">
    <slot></slot>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'cmui-tabbar-item',
  inject: ['cmuiTabbar'],
  data: () => ({
    index: null
  }),
  computed: {
    active() {
      return this.index === this.cmuiTabbar.activeIndex
    }
  },
  created () {
    this.cmuiTabbar.items.push(this)
  },
  beforeDestroy () {
    _.remove(this.cmuiTabbar.items, this)
  }
}
</script>
