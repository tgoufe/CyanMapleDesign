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
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    okText: { type: String, default: '确定' },
    okFn: { type: Function, default: function() {} },
    okStyle: { type: Object, default: null },
    cancelText: { type: String, default: '取消' },
    cancelStyle: { type: Object, default: null },
    cancelFn: { type: Function, default: function() {} },
    okDisable: { type: Boolean, default: false },
    okDisableStyle: { type: Object, default: null },
    cancelDisable: { type: Boolean, default: false },
    cancelDisableStyle: { type: Object, default: null },
    visible: { type: Boolean, default: false },
    targetClass: { type: String, default: '' },
    reverse: { type: Boolean, default: false }
  },
  compontents: {
    cmuiPopup
  },
  data: function() {
    let dom = document.documentElement
    return {
      bodyStyle: {
        'max-height':
          dom.clientHeight * 0.72 -
          69 -
          parseInt(getComputedStyle(dom).fontSize) +
          'px'
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
