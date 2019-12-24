<template>
  <div v-show="active" class="cmui-tabbar-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'cmui-tabbar-item',
  inject: ['cmuiTabbar'],
  data: () => ({
    index: null
  }),
  computed: {
    active() {
      return this.cmuiTabbar.screen || this.index === this.cmuiTabbar.activeIndex
    }
  },
  updated() {
    this.cmuiTabbar.update(true)
  }
}
</script>
