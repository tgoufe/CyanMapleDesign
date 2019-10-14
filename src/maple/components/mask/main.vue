<template>
  <div class="mask" :class="position" @click="cancel()" v-show="visible">
    <div
      class="mask-content"
      v-html="content"
      @click.stop.prevent="function() {}"
      @touchstart.stop.prevent="function() {}"
      @touchmove.stop.prevent="function() {}"
      :style="contentStyle"
      style="max-width:100%"
    ></div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "cmui-mask",
  methodName: "mask",
  argumentsRole(options, args, CURRENT) {
    var argString = _.filter(args, _.isString);
    options.position = _.find(argString, item => {
      return _.every(item.split(" ").filter(i => i.length), i => {
        return /^(top|left|bottom|right|center|between)$/.test(i);
      });
    });
    options.content = _.find(argString, item => item !== options.position);
    options.callback = _.find(args, _.isFunction);
  },
  props: {
    position: { type: String, default: "center" },
    content: { type: String, default: "" },
    closeFn: { type: Function, default: null },
    contentStyle: { type: Object, default: null }
  },
  data: function() {
    return {
      visible: false
    };
  },
  methods: {
    cancel() {
      this.visible = false;
      document.body.classList.remove("overflow-h");
      typeof this.closeFn === "function" && this.closeFn($(this.$el));
    }
  }
};
</script>
