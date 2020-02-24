<template>
  <cmui-input
    ref="input"
    v-model="selfValue"
    type="number"
    :name="name"
    :readonly="readonly"
    :placeholder="placeholder"
    :disabled="disabled"
    :target-class="targetClass"
    :label="label"
    :align="align"
    :reset="false"
    :prepend-disabled="!(canSubSelf && canSub)"
    :append-disabled="!(canAddSelf && canAdd)"
    :flex="flex"
    :width="width"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  >
    <span
      slot="prepend"
      @click="changeNumber(-1)"
    >-</span>
    <span
      slot="append"
      @click="changeNumber(1)"
    >+</span>
    <slot />
  </cmui-input>
</template>
<script>
import cmuiInput from './input.vue'
import mixin from './mixin.js'
import _ from 'lodash'
export default {
  name: 'cmui-number',
  components: {
    cmuiInput
  },
  mixins: [mixin],
  props: {
    max: { type: Number, default: Infinity, intro: '允许输入的最大值' },
    min: { type: Number, default: -Infinity, intro: '允许输入的最小值' },
    canAdd: { type: Boolean, default: true, intro: '加号按钮是否可以点击' },
    canSub: { type: Boolean, default: true, intro: '减号按钮是否可以点击' },
    beforeChange: { type: Function, default: null, intro: '输入框内容发生变化前要执行的函数' },
    width: { type: [Number, String], default: '', intro: '设置宽度' },
    step: { type: Number, default: 1, intro: '设置步长' },
    precision: { type: Number, default: 0, intro: '设置精度' }
  },
  data () {
    return {
      canSubSelf: this.canSub,
      canAddSelf: this.canAdd,
      selfValue: (+this.value).toFixed(this.precision)
    }
  },
  computed: {
    canMax () {
      if (this.max || this.max === 0) {
        return this.value < this.max
      } else {
        return true
      }
    },
    canMin () {
      if (this.min || this.min === 0) {
        return this.value > this.min
      } else {
        return true
      }
    }
  },
  watch: {
    value (value) {
      this.setBtnState()
      this.selfValue = (+value).toFixed(this.precision)
      console.log(arguments)
    },
    max () {
      this.setBtnState()
    },
    min () {
      this.setBtnState()
    },
    canSub (value) {
      this.canSubSelf = !!value
    },
    canAdd (value) {
      this.canAddSelf = !!value
    }
  },
  created () {
    this.setBtnState(true)
    // this.setBtnState.call(this, true)
  },
  methods: {
    changeNumber: function (num = 0) {
      if ((!(this.canAddSelf && this.canAdd) && num === 1) || (!(this.canSubSelf && this.canSub) && num === -1)) {
        return
      }
      const value = this.selfValue
      const beforeChangeEvent = this.$listeners['before-change']
      let targetValue = +value + num * this.step
      targetValue = targetValue.toFixed(this.precision)
      targetValue = _.min([this.max, targetValue])
      targetValue = _.max([this.min, targetValue])
      if (_.isFunction(beforeChangeEvent)) {
        this.canAddSelf = this.canSubSelf = false
        new Promise((resolve, reject) => {
          beforeChangeEvent(targetValue, resolve, reject, this)
        }).then(
          () => {
            this.selfValue = targetValue
            this.setBtnState()
            this.$emit('input', this.selfValue, this)
          },
          () => {
            this.setBtnState()
            this.$emit('input', this.selfValue, this)
          }
        )
      } else {
        this.selfValue = targetValue
        this.setBtnState()
        this.$emit('input', this.selfValue, this)
      }
    },
    setBtnState (isFirst = false) {
      this.canAddSelf = this.canSubSelf = true
      switch (true) {
        case this.selfValue === this.max:
          this.canAddSelf = false
          !isFirst && this.$emit('max', this.selfValue, this)
          break
        case this.selfValue === this.min:
          this.canSubSelf = false
          !isFirst && this.$emit('min', this.selfValue, this)
          break
        case this.selfValue > this.max:
          this.selfValue = this.max
          break
        case this.selfValue < this.min:
          this.selfValue = this.min
          break
      }
    },
    handleBlur () {
      console.log(`number handleBlur`)
      const target = event.target
      const value = target.value
      this.changeNumber(0)
      this.$emit('blur', value, this)
    },
    handleInput (event) {
      console.log(`number handleInput`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('input', value, this)
      this.$nextTick(this.rendered)
      this.setBtnState()
    },
    handleChange (event) {
      console.log(`number handleChange`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('change', value, this)
      this.$emit('input', value, this)
      this.setBtnState()
    },
    getInput () {
      return this.$children[0].$refs.input
    }
  }
}
</script>
