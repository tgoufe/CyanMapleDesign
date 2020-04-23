<template>
    <div v-show="actived" class="cmui-screen-item">
        <slot></slot>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'cmuiScreenItem',
  props: {
    title: { type: String, default: '' }
  },
  data() {
    return {
      check: () => {
        if (!this.cmuiScreen) { throw new Error('请将cmui-screen-item放置在cmui-screen标签中') }
      },
      actived: false
    }
  },
  inject: ['cmuiScreen'],
  created() {
    this.check()
    this.cmuiScreen.children.push(this)
  },
  beforeDestroy() {
    this.check()
    _.remove(this.cmuiScreen.children, this)
  },
  methods: {
    active() {
      this.actived = true
    },
    cancel() {
      this.actived = false
    }
  }
}
</script>
