<template>
  <div class="swiper-slide overflow-h" :style="itemStyle">
    <slot></slot>
  </div>
</template>
<script>
import basemixin from "../mixin.js";
import _ from "lodash";
export default {
  name: "cmui-scroll-item",
  mixins: [basemixin],
  data: function() {
    let parent = this.getParent("cmui-scroll");
    let itemStyle = {};
    if (_.get(parent, "direction") === "v" && _.get(parent, "col") === "auto") {
      itemStyle.height = "auto";
    }
    return {
      itemStyle
    };
  }
};
</script>
