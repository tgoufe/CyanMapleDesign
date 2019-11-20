<template>
  <label class="cmui-checkbox" :class="{ 'flex-container': flex }" :for="_uid">
    <span
      v-if="align === 'left'"
      :class="{ checked: slefValue }"
      class="cmui-check__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
    <input
      :id="_uid"
      ref="checkbox"
      v-model="slefValue"
      type="checkbox"
      :name="name"
      :readonly="readonly"
      :class="[targetClass]"
      :disabled="disabled || selfDisable"
      :label="selflabel"
      @change="handleChange"
    >
    <span
      v-if="align === 'right'"
      :class="{ checked: slefValue }"
      class="cmui-check__label"
    >
      <slot />
      <template v-if="!$slots.default && !isBtn">{{ label }}</template>
    </span>
  </label>
</template>
<style type="text/css" lang="scss">
@import "../../../cyan/variables";
.cmui-check__label {
  &.checked {
    color: $form-color-base;
  }
}
</style>
<script type="text/javascript">
import mixin from './mixin.js'
import _ from 'lodash'
export default {
  name: 'cmui-checkbox',
  mixins: [mixin],
  props: {
    path: { type: String, default: '' }
  },
  data: function() {
    return {
      indeterminate: false,
      selfDisable: false,
      isBtn: !!~this.targetClass.split(' ').indexOf('btn')
    }
  },
  computed: {
    slefValue: {
      get() {
        let value = this.value
        if (_.isArray(value)) {
          let allTrue = _.every(
            this.value,
            item => (_.isObject(item) ? _.get(item, this.path) : item) === true
          )
          let allFalse = _.every(
            this.value,
            item => (_.isObject(item) ? _.get(item, this.path) : item) === false
          )
          this.indeterminate = !(allTrue || allFalse)
          return allTrue
        }
        return !!value
      },
      set(value) {}
    },
    selflabel() {
      return this.isBtn ? this.label : ''
    }
  },
  watch: {
    indeterminate(value) {
      let dom = this.$refs.checkbox
      if (dom) {
        dom.indeterminate = value
      }
    }
  },
  methods: {
    handleChange(event) {
      const target = event.target
      const value = target.checked
      const beforeChangeEvent = this.$listeners['before-change']
      if (_.isFunction(beforeChangeEvent)) {
        this.selfDisable = true
        new Promise((resolve, reject) => {
          beforeChangeEvent(value, resolve, reject, this)
        }).then(
          () => {
            if (_.isArray(this.value)) {
              let length = this.value.length
              if (_.every(this.value, _.isBoolean)) {
                this.value = new Array(length).fill(value)
              } else {
                _.forEach(this.value, item => {
                  _.set(item, this.path, value)
                })
              }
            }
            this.$emit('input', value, this)
            this.$emit('change', value, this)
            this.selfDisable = false
          },
          () => {
            target.checked = !target.checked
            this.selfDisable = false
          }
        )
      } else {
        if (_.isArray(this.value)) {
          let length = this.value.length
          if (_.every(this.value, _.isBoolean)) {
            this.value = new Array(length).fill(value)
          } else {
            _.forEach(this.value, item => {
              _.set(item, this.path, value)
            })
          }
        } else {
          this.$emit('input', value, this)
        }
        this.$emit('change', value, this)
      }
    }
  }
}
</script>
