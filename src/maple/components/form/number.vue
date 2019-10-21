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
    :prepend-disabled="!canSubSelf"
    :append-disabled="!canAddSelf"
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
    max: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    rule: RegExp,
    canAdd: { type: Boolean, default: true },
    canSub: { type: Boolean, default: true },
    beforeChange: { type: Function, default: null },
    width: { type: [Number, String], default: '' }
  },
  data () {
    return {
      canSubSelf: this.canSub,
      canAddSelf: this.canAdd,
      selfValue: this.value
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
      this.selfValue = value
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
      console.log(`number changeNumber`)
      if ((!this.canAddSelf && num === 1) || (!this.canSubSelf && num === -1)) {
        return
      }
      const value = this.selfValue
      const beforeChangeEvent = this.$listeners['before-change']
      let targetValue = +value + num
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
      console.log(`number setBtnState`, this.selfValue)
      this.canAddSelf = this.canSubSelf = true
      if (+this.selfValue === this.max) {
        this.canAddSelf = false
        !isFirst && this.$emit('max', this.selfValue, this)
      }
      if (+this.selfValue === this.min) {
        !isFirst && this.$emit('min', this.selfValue, this)
        this.canSubSelf = false
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
