<template>
  <cmui-popup
    position="bottom"
    :visible.sync="visible"
    :target-style="{ height: 'auto' }"
    class="cmui-actions "
    target-class="cmui-actions__container"
  >
    <div
      class="cmui-actions__title"
      v-html="title"
      v-if="title"
      slot="top"
    ></div>
    <div class="cmui-actions__group">
      <div
        class="cmui-actions__button"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in items"
        v-html="getActionText(item, index)"
        @click="itemEvent(item, index)"
        :style="getActionStyle(item.style, itemStyle)"
      ></div>
    </div>
    <div class="cmui-actions__cancel" slot="bottom" v-if="cancelText">
      <div
        class="cmui-actions__button"
        v-html="cancelText"
        :style="cancelStyle"
        @click="cancel"
      ></div>
    </div>
  </cmui-popup>
</template>
<script>
import cmuiPopup from "../popup/main.vue";
import _ from "lodash";
export default {
  name: "cmui-actions",
  methodName: "actions",
  argumentsRole(options, args, CURRENT) {
    options.items = [];
    if (args.length > 1) {
      let fnList = _.filter(args, _.isFunction);
      options.selectFn = fnList[0];
      options.cancelFn = fnList[1];
      let styleList = _.filter(args, _.isPlainObject);
      if (styleList.length === 1) {
        options.itemStyle = styleList[0];
      }
      let stringList = _.filter(args, item =>
        (typeof item).match(/string|number|boolean/)
      ).map(item => item.toString());
      stringList.forEach((item, index) => {
        let rs = { text: item };
        let style = _.get(styleList, index);
        if (style) {
          rs.style = style;
        }
        options.items.push(rs);
      });
      let arrArg = _.find(args, _.isArray);
      if (arrArg) {
        options.items = arrArg;
      }
    } else {
      if ((typeof args[0]).match(/string|number|boolean/)) {
        options.items.push({ text: args[0] });
      } else if (_.isArray(args[0])) {
        options.items = args[0];
      } else if (_.isFunction(args[0])) {
        return actions(args[0]());
      }
    }
  },
  props: {
    items: {
      type: Array,
      default: function() {
        return [];
      }
    },
    cancelText: { type: String, default: "取消" },
    cancelFn: { type: Function, default: null },
    cancelStyle: { type: Object, default: null },
    itemStyle: { type: Object, default: null },
    selectFn: { type: Function, default: null },
    activeIndex: { type: Number, default: -1 },
    title: { type: String, default: "" },
    visible: { type: Boolean, default: false }
  },
  compontents: {
    cmuiPopup
  },
  watch: {
    visible(value) {
      this.$emit("update:visible", value);
    }
  },
  methods: {
    cancel: function() {
      this.visible = false;
      this.$emit("cancel", this);
      _.isFunction(this.cancelFn) && this.cancelFn();
    },
    itemEvent: function(item, index) {
      this.visible = false;
      this.$emit("select", item, index, this);
      _.isFunction(this.selectFn) && this.selectFn(item, index);
    },
    getActionText(value, index) {
      if (_.isFunction(value)) {
        return this.getActionText(value());
      } else if (_.isObject(value)) {
        value.text = value.text || index;
        return String(value.text);
      } else {
        return String(value);
      }
    },
    getActionStyle(itemStyle, baseStyle) {
      return _.defaults(itemStyle, baseStyle);
    }
  }
};
</script>
