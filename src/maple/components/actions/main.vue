<template>
  <cmui-popup
    position="bottom"
    :visible.sync="selfVisible"
    :target-style="{ height: 'auto' }"
    class="cmui-actions "
    target-class="cmui-actions__container"
  >
    <div
      v-if="title"
      slot="top"
      class="cmui-actions__title"
      v-html="title"
    ></div>
    <div class="cmui-actions__group">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="cmui-actions__button"
        :class="{ active: activeIndex === index }"
        :style="getActionStyle(item.style, itemStyle)"
        @click="itemEvent(item, index)"
        v-html="getActionText(item, index)"
      ></div>
    </div>
    <div v-if="cancelText" slot="bottom" class="cmui-actions__cancel">
      <div
        class="cmui-actions__button"
        :style="cancelStyle"
        @click="cancel"
        v-html="cancelText"
      ></div>
    </div>
  </cmui-popup>
</template>
<script>
import cmuiPopup from '../popup/main.vue'
import _ from 'lodash'
export default {
  name: 'cmui-actions',
  methodName: 'actions',
  argumentsRole(options, args, CURRENT) {
    options.items = []
    if (args.length > 1) {
      let fnList = _.filter(args, _.isFunction)
      options.selectFn = fnList[0]
      options.cancelFn = fnList[1]
      let styleList = _.filter(args, _.isPlainObject)
      if (styleList.length === 1) {
        options.itemStyle = styleList[0]
      }
      let stringList = _.filter(args, item =>
        (typeof item).match(/string|number|boolean/)
      ).map(item => item.toString())
      stringList.forEach((item, index) => {
        let rs = { text: item }
        let style = _.get(styleList, index)
        if (style) {
          rs.style = style
        }
        options.items.push(rs)
      })
      let arrArg = _.find(args, _.isArray)
      if (arrArg) {
        options.items = arrArg
      }
    } else {
      if ((typeof args[0]).match(/string|number|boolean/)) {
        options.items.push({ text: args[0] })
      } else if (_.isArray(args[0])) {
        options.items = args[0]
      } else if (_.isFunction(args[0])) {
        return this.argumentsRole(args[0]())
      }
    }
  },
  props: {
    items: {
      type: Array,
      default: function() {
        return []
      },
      intro: '每一项的文本内容，用[String...]的形式表示'
    },
    cancelText: { type: String, default: '取消', intro: '取消按钮的文本' },
    cancelFn: { type: Function, default: null, intro: '取消按钮的事件' },
    cancelStyle: { type: Object, default: null, intro: '取消按钮的样式' },
    itemStyle: { type: Object, default: null, intro: '每一项的样式' },
    selectFn: { type: Function, default: null, intro: '每一项被选择时的事件' },
    activeIndex: { type: Number, default: -1, intro: '被选中项的索引' },
    title: { type: String, default: '', intro: '标题内容' },
    visible: { type: Boolean, default: false, intro: '是否显示组件，需要使用sync' }
  },
  compontents: {
    cmuiPopup
  },
  computed: {
    selfVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },
  methods: {
    cancel: function() {
      this.selfVisible = false
      this.$emit('cancel', this)
      _.isFunction(this.cancelFn) && this.cancelFn()
    },
    itemEvent: function(item, index) {
      this.selfVisible = false
      this.$emit('select', item, index, this)
      _.isFunction(this.selectFn) && this.selectFn(item, index)
    },
    getActionText(value, index) {
      if (_.isFunction(value)) {
        return this.getActionText(value())
      } else if (_.isObject(value)) {
        value.text = value.text || index
        return String(value.text)
      } else {
        return String(value)
      }
    },
    getActionStyle(itemStyle, baseStyle) {
      return _.defaults(itemStyle, baseStyle)
    }
  }
}
</script>
