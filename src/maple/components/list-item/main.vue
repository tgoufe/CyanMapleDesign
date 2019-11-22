<template>
  <div ref="listItem" class="cmui-list-item" :style="itemStyle()">
    <div v-if="$slots.title || title" class="cmui-list-item-title">
      <slot name="title" />
      <template v-if="!$slots.title">
{{ title }}
</template>
    </div>
    <div class="cmui-list-item-container" :style="itemContainerStyle">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.cmui-list-item {
  float: left;
  position: relative;
  min-height: 1px;
  width: 100%;
}
.cmui-list-item-title {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 20;
}
</style>
<script>
import _ from 'lodash'
export default {
  name: 'cmui-list-item',
  // mixins:[baseMixin],
  inject: ['bus'],
  props: {
    title: { type: String, default: '', intro: '标题文本' },
    bgcolor: { type: String, default: '', intro: '背景色' },
    border: { type: Boolean, default: true, intro: '是否显示边框' }
  },
  data: function() {
    return {
      position: {},
      index: 0
    }
  },
  computed: {
    itemContainerStyle() {
      let boxShadow
      let parent = this.bus.parent
      if (this.border && parent.border && parent.realSpace !== 0) {
        boxShadow = '0px 0px 0px 1px ' + parent.borderColor
      }
      return { boxShadow }
    }
  },
  created() {
    this.index = this.bus.children.push(this) - 1
  },
  destroyed() {
    _.remove(this.bus.children, this)
  },
  methods: {
    itemStyle() {
      let width
      let col = this.bus.parent.realCol
      let colCount = (_.isArray(col) ? col.length : col) || 1
      let clear = this.index % colCount === 0 ? 'left' : undefined
      let padding = this.bus.parent.realSpace / 2 + 'rem'
      let boxShadow = this.bus.parent.boxShadow
      let backgroundColor = this.bgcolor
      if (_.isNumber(col) && col !== 1) {
        width = 100 / col + '%'
      } else if (_.isArray(col)) {
        let total = col.reduce((pre, next) => pre + next)
        width = (100 * col[this.index % col.length]) / total + '%'
      }
      return { width, clear, padding, boxShadow, backgroundColor }
    }
  }
}
</script>
