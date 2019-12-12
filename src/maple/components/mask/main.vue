<template>
  <div v-show="visible" class="mask" :class="position" @click="cancel()">
    <div
      class="mask-content"
      :style="contentStyle"
      style="max-width:100%"
      @click.stop.prevent="function() {}"
      @touchstart.stop.prevent="function() {}"
      @touchmove.stop.prevent="function() {}"
      v-html="content"
    ></div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'cmui-mask',
  methodName: 'mask',
  argumentsRole(options, args, CURRENT) {
    var argString = _.filter(args, _.isString)
    options.position = _.find(argString, item => {
      return _.every(item.split(' ').filter(i => i.length), i => {
        return /^(top|left|bottom|right|center|between)$/.test(i)
      })
    })
    options.content = _.find(argString, item => item !== options.position)
    options.callback = _.find(args, _.isFunction)
  },
  props: {
    position: { type: String, default: 'center', intro: '内容的位置，继承于flex-container，可以使用top，left，bottom，right，center，between中的任意一项或两项配合' },
    content: { type: String, default: '', intro: '遮罩内部的内容' },
    closeFn: { type: Function, default: null, intro: '关闭遮罩时的事件' },
    contentStyle: { type: Object, default: null, intro: '遮罩渲染完成后的回调' }
  },
  data: function() {
    return {
      visible: false
    }
  },
  methods: {
    cancel() {
      this.visible = false
      document.body.classList.remove('overflow-h')
      typeof this.closeFn === 'function' && this.closeFn(this.$el)
    }
  }
}
</script>
