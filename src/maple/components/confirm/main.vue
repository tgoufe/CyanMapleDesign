<template>
  <cmui-popup
    position="center"
    class="cmui-confirm cmui-dialog"
    :mask-event="false"
    :visible.sync="selfVisible"
    :target-class="
      `cmui-dialog__container cmui-confirm__container ${targetClass}`
    "
  >
    <div class="cmui-dialog__content cmui-confirm__content">
      <div
              v-if="title || $slots.top"
              class="cmui-dialog__title cmui-confirm__title"
      >
        <div v-if="!$slots.top" v-html="title" />
        <slot v-else name="top" />
      </div>
      <div class="cmui-dialog__warp cmui-confirm__warp">
        <div
                v-if="!content || $slots.default"
                class="cmui-dialog__body cmui-alert__body scroll-container-y"
                :style="bodyStyle"
        >
          <slot v-if="$slots.default" />
        </div>
        <div
                v-if="content || !$slots.default"
                class="cmui-dialog__body cmui-alert__body scroll-container-y"
                :style="bodyStyle"
                v-html="content"
        ></div>
      </div>
    </div>

    <div
      slot="bottom"
      class="cmui-dialog__buttons cmui-confirm__buttons flex-container"
      :class="{ reverse: reverse }"
    >
      <template v-if="!$slots.bottom">
        <div
          class="cmui-confirm__button ok cmui-dialog__button flex1"
          :class="{ okDisable: okDisable }"
          :style="okDisable ? okDisableStyle : okStyle"
          @click="!okDisable && ok()"
          v-html="okText"
        ></div>
        <div
          class="cmui-confirm__button cancel cmui-dialog__button flex1"
          :class="{ cancelDisable: cancelDisable }"
          :style="cancelDisable ? cancelDisableStyle : cancelStyle"
          @click="!cancelDisable && cancel()"
          v-html="cancelText"
        ></div>
      </template>
      <slot v-else name="bottom" />
    </div>
  </cmui-popup>
</template>
<script>
import cmuiPopup from '../popup/main.vue'
import _ from 'lodash'
export default {
  name: 'cmui-confirm',
  methodName: 'confirm',
  argumentsRole(options, args, CURRENT) {
    if (args.length > 1) {
      let fnList = _.filter(args, _.isFunction)
      options.okFn = fnList[0]
      options.cancelFn = fnList[1]
      options.callback = fnList[2]
      let stringList = _.filter(args, item =>
        (typeof item).match(/string|number|boolean/)
      ).map(item => item.toString())
      options.content = _.last(stringList)
      if (stringList.length > 1) {
        options.title = stringList[0]
      }
    } else {
      if ((typeof args[0]).match(/string|number|boolean/)) {
        options.content = args[0]
      } else if (_.isObject(args[0])) {
        options = args[0]
      } else {
        return CURRENT
      }
    }
  },
  props: {
    title: { type: String, default: '', intro: '标题(支持html)' },
    content: { type: String, default: '', intro: '内容(支持html)' },
    okText: { type: String, default: '确定', intro: '确认按钮文字' },
    okFn: { type: Function, default: function() {}, intro: '点击确认按钮执行的事件' },
    okStyle: { type: Object, default: null, intro: '确认按钮样式' },
    cancelText: { type: String, default: '取消', intro: '确认按钮是否可用' },
    cancelStyle: { type: Object, default: null, intro: '确认按钮不可用时的样式' },
    cancelFn: { type: Function, default: function() {}, intro: '取消按钮文本' },
    okDisable: { type: Boolean, default: false, intro: '取消按钮样式' },
    okDisableStyle: { type: Object, default: null, intro: '点击取消按钮触发的回调' },
    cancelDisable: { type: Boolean, default: false, intro: '禁用取消按钮' },
    cancelDisableStyle: { type: Object, default: null, intro: '禁用取消按钮时的样式' },
    visible: { type: Boolean, default: false, intro: '弹窗是否可见' },
    targetClass: { type: String, default: '', intro: '为组件设置额外的class，用于修改样式' },
    reverse: { type: Boolean, default: false, intro: '翻转取消和确定按钮位置' }
  },
  compontents: {
    cmuiPopup
  },
  data: function() {
    return {
      bodyStyle: {
        'max-height': 'auto'
      }
    }
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
  mounted() {
    let dom = document.documentElement
    this.bodyStyle['max-height'] = dom.clientHeight * 0.72 - 69 - parseInt(getComputedStyle(dom).fontSize) + 'px'
  },
  methods: {
    cancel: function() {
      this.visible = false
      typeof this.cancelFn === 'function' && this.cancelFn()
    },
    ok: function() {
      this.visible = false
      typeof this.okFn === 'function' && this.okFn()
    }
  }
}
</script>
