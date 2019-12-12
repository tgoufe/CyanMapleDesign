<template>
  <cmui-popup
    position="center"
    :visible.sync="selfVisible"
    class="cmui-alert cmui-dialog"
    :mask-event="false"
    :target-class="
      `cmui-dialog__container cmui-alert__container ${targetClass}`
    "
  >
    <div class="cmui-dialog__content cmui-alert__content">
      <div
              v-if="title || $slots.top"
              class="cmui-dialog__title cmui-alert__title"
      >
        <div v-if="!$slots.top" v-html="title" />
        <slot v-else name="top" />
      </div>
      <div class="cmui-dialog__warp cmui-alert__warp">
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
    <div class="cmui-dialog__buttons cmui-alert__buttons">
      <div
        v-if="!$slots.bottom"
        class="cmui-alert__button cmui-dialog__button"
        :class="{ okDisable: okDisable }"
        :style="okDisable ? okDisableStyle : okStyle"
        @click="cancel()"
        v-html="okText"
      ></div>
      <slot v-else name="bottom" />
    </div>
  </cmui-popup>
</template>
<script>
import _ from 'lodash'
import cmuiPopup from '../popup/main.vue'
export default {
  name: 'cmui-alert',
  methodName: 'alert',
  argumentsRole(options, args, CURRENT) {
    if (args.length > 1) {
      options.okFn = _.filter(args, _.isFunction)[0]
      options.callback = _.filter(args, _.isFunction)[1]
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
  components: {
    cmuiPopup
  },
  props: {
    title: { type: String, default: '', intro: '标题' },
    content: { type: String, default: '', intro: '内容' },
    okText: { type: String, default: '确定', intro: '确定按钮文本' },
    okFn: { type: Function, default: function() {}, intro: '点击确定触发的回调' },
    okStyle: { type: Object, default: null, intro: '确定按钮样式' },
    okDisable: { type: Boolean, default: false, intro: '禁用确定按钮' },
    okDisableStyle: { type: Object, default: null, intro: '确定按钮禁用样式' },
    visible: { type: Boolean, default: false, intro: '组件是否显示，需要使用sync' },
    targetClass: { type: String, default: '', intro: '容器附加class' }
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
      if (!this.okDisable) {
        this.selfVisible = false
        typeof this.okFn === 'function' && this.okFn()
      }
    }
  }
}
</script>
