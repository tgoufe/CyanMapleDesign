<template>
  <label class="cmui-checkbox" :class="{ 'flex-container': flex&&!isBtn,'dis-i':!flex||isBtn ,'cmui-checkbox__disabled':isDisabled}" :for="_uid">

    <span
      v-if="align === 'left' && !isBtn"
      :class="{ checked: isChecked }"
      class="cmui-check__label"
    >
      <slot></slot>
      <template v-if="!$slots.default ">{{ selfLabel }}</template>
    </span>
    <input
      :id="_uid"
      ref="checkbox"
      v-model="model"
      type="checkbox"
      :name="name"
      :readonly="readonly"
      :class="[cmuiCheckboxGroup.targetClass,targetClass]"
      :disabled="isDisabled"
      :label="isBtn?selfLabel:''"
      :value="selfValue"
      @change="handleChange"
    >
    <span
      v-if="align === 'right' && !isBtn"
      :class="{ checked: isChecked }"
      class="cmui-check__label"
    >
      <slot></slot>
      <template v-if="!$slots.default">{{ selfLabel }}</template>
    </span>
  </label>
</template>
<style lang="scss" type="text/scss" scoped>
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
    path: { type: String, default: '', intro: '当v-model设置为数组的时候用于指定匹配项的路径' },
    value: { type: [Object, String, Number, Boolean, Array], default: false },
    label: { type: [String, Number, Boolean], default: '' }
  },
  inject: {
    cmuiCheckboxGroup: {
      default: ''
    }
  },
  data: function() {
    return {
      indeterminate: false,
      innerDisabled: false,
      isBtn: !!~(this.cmuiCheckboxGroup.targetClass || this.targetClass).split(' ').indexOf('btn'),
      isExceedLimit: false
    }
  },
  computed: {
    model: {
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
        } else {
          return this.inGroup ? this.cmuiCheckboxGroup.value : !!value
        }
      },
      set(value) {
        if (this.inGroup) {
          let { min, max } = this.cmuiCheckboxGroup
          this.isExceedLimit = !_.inRange(value.length, min - 1, max + 1)
          this.isExceedLimit === false &&
          this.cmuiCheckboxGroup.$emit('input', value)
        }
      }
    },
    selfValue() {
      let { value, label } = this.$options.propsData
      return value
        ? _.isPlainObject(value) && value.value ? value.value : value
        : label || this.label
    },
    selfLabel() {
      let { value, label } = this.$options.propsData
      return _.isPlainObject(value) && value.label
        ? value.label
        : label || this.label
    },
    inGroup() {
      return !!this.cmuiCheckboxGroup
    },
    isLimitDisabled() {
      if (!this.inGroup) {
        return false
      } else {
        const { max, min } = this.cmuiCheckboxGroup
        return !!(max || min) && ((this.model.length >= max && !this.isChecked) || (this.model.length <= min && this.isChecked))
      }
    },
    isDisabled() {
      return this.disabled ||
              this.innerDisabled ||
              this.isLimitDisabled ||
              (this.cmuiForm || {}).disabled ||
              (this.cmuiCheckboxGroup || {}).disabled
    },
    isChecked() {
      if (_.isBoolean(this.model)) {
        return this.model
      } else if (_.isArray(this.model)) {
        return _.includes(this.model, this.label)
      }
      return false
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
      if (this.isExceedLimit) return
      const target = event.target
      const value = target.checked
      const beforeChangeEvent = this.$listeners['before-change']
      if (_.isFunction(beforeChangeEvent)) {
        this.innerDisabled = true
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
            this.innerDisabled = false
          },
          () => {
            target.checked = !target.checked
            this.innerDisabled = false
          }
        )
      } else {
        if (_.isArray(this.value)) {
          let length = this.value.length
          if (_.every(this.value, _.isBoolean)) {
            this.$emit('input', new Array(length).fill(value), this)
          } else {
            this.value.forEach(item => _.set(item, this.path, value))
          }
        } else {
          this.$emit('input', value, this)
        }
        this.$emit('change', value, this)
      }
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.change')
    }
  }
}
</script>
