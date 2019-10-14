<template>
  <div class="cmui-list-item" v-bind:style="itemStyle()" ref="listItem">
    <div class="cmui-list-item-title" v-if="$slots.title || title">
      <slot name="title"></slot>
      <template v-if="!$slots.title">{{ title }}</template>
    </div>
    <div class="cmui-list-item-container" :style="itemContainerStyle">
      <slot></slot>
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
import _ from "lodash";
export default {
  name: "cmui-list-item",
  // mixins:[baseMixin],
  inject: ["bus"],
  props: {
    title: { type: String, default: "" },
    bgcolor: { type: String, default: "" },
    border: { type: Boolean, default: true }
  },
  data: function() {
    return {
      position: {},
      index: 0
    };
  },
  computed: {
    itemContainerStyle() {
      let boxShadow,
        parent = this.bus.parent;
      if (this.border && parent.border && parent.realSpace !== 0) {
        boxShadow = "0px 0px 0px 1px " + parent.borderColor;
      }
      return { boxShadow };
    }
  },
  created() {
    this.index = this.bus.children.push(this) - 1;
  },
  destroyed() {
    _.remove(this.bus.children, this);
  },
  methods: {
    itemStyle() {
      let width,
        col = this.bus.parent.realCol,
        colCount = (_.isArray(col) ? col.length : col) || 1,
        clear = this.index % colCount === 0 ? "left" : undefined,
        padding = this.bus.parent.realSpace / 2 + "rem",
        boxShadow = this.bus.parent.boxShadow,
        backgroundColor = this.bgcolor;
      if (_.isNumber(col) && col !== 1) {
        width = 100 / col + "%";
      } else if (_.isArray(col)) {
        let total = col.reduce((pre, next) => pre + next);
        width = (100 * col[this.index % col.length]) / total + "%";
      }
      return { width, clear, padding, boxShadow, backgroundColor };
    }
  }
};
</script>
