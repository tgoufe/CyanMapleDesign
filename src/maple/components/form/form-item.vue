<template>
    <div class="cmui-form-item" :class="[{
      'cmui-form-item--feedback': cmuiForm && cmuiForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required,
      'is-no-asterisk': cmuiForm && cmuiForm.hideRequiredAsterisk
    },]"
         :style="itemStyle"
    >
        <label-wrap
            :is-auto-width="labelStyle && labelStyle.width === 'auto'"
            :update-all="cmuiForm.labelWidth === 'auto'"
        >
            <label v-if="label || $slots.label" :for="labelFor" class="cmui-form-item__label" :style="labelStyle" :class="targetClass">
                <slot name="label">{{ label }}</slot>
            </label>
        </label-wrap>
        <div class="cmui-form-item__content pos-r" :style="contentStyle">
            <slot></slot>
            <transition name="cmui-zoom-in-top">
                <slot
                        v-if="validateState === 'error' && showMessage && cmuiForm.showMessage"
                        name="error"
                        :error="validateMessage"
>
                    <div
                            class="cmui-form-item__error"
                            :class="{
              'cmui-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (cmuiForm && cmuiForm.inlineMessage || false)
            }"
                    >
                        {{ validateMessage }}
                    </div>
                </slot>
            </transition>
        </div>
    </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import _ from 'lodash'
import emitter from '../mixin.js'
import LabelWrap from './label-wrap.vue'
function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
};
export default {
  name: 'cmui-form-item',
  components: { LabelWrap },
  mixins: [emitter],
  provide() {
    return {
      cmuiFormItem: this
    }
  },
  inject: ['cmuiForm'],
  props: {
    label: { type: String, default: '', intro: '标签文本' },
    labelWidth: { type: String, default: '', intro: '标签宽度' },
    prop: { type: String, default: '', intro: '表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的' },
    required: { type: Boolean, default: undefined, intro: '是否必填' },
    rules: { type: [Object, Array], default: () => null, intro: '表单验证规' },
    error: { type: String, default: '', intro: '表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息' },
    validateStatus: { type: String, default: '', intro: '表单验证状态，通常不需要设置' },
    for: { type: String, default: '', intro: 'label标签的for属性' },
    inlineMessage: { type: [String, Boolean], default: '', intro: '以行内形式展示校验信息' },
    showMessage: { type: Boolean, default: true, intro: '是否显示校验错误信息' },
    targetClass: { type: String, default: '', intro: '设置到label标签上的样式' }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: ''
    }
  },
  computed: {
    labelFor() {
      return this.for || this.prop
    },
    labelStyle() {
      const ret = {}
      const labelWidth = this.labelWidth || this.cmuiForm.labelWidth
      if (this.cmuiForm.labelPosition !== 'top') {
        ret.float = 'left'
      }
      ret.textAlign = this.cmuiForm.labelPosition === 'left' ? 'left' : 'right'
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    itemStyle() {
      if (this.cmuiForm.itemSpace) {
        return { marginBottom: this.cmuiForm.itemSpace }
      }
      return {}
    },
    contentStyle() {
      const ret = {}
      const label = this.label
      if (this.cmuiForm.labelPosition === 'top') return ret
      if (!label && !this.labelWidth && this.isNested) return ret
      const labelWidth = this.labelWidth || this.cmuiForm.labelWidth
      if (labelWidth === 'auto') {
        if (this.labelWidth === 'auto') {
          ret.marginLeft = this.computedLabelWidth
        } else if (this.cmuiForm.labelWidth === 'auto') {
          ret.marginLeft = this.cmuiForm.autoLabelWidth
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    },
    fieldValue() {
      const model = this.cmuiForm.model
      if (!model || !this.prop) { return }
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      return getPropByPath(model, path, true).v
    },
    isRequired() {
      let rules = this.getRules()
      let isRequired = false
      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value
        this.validateState = value ? 'error' : ''
      }
    },
    validateStatus(value) {
      this.validateState = value
    }
  },
  mounted() {
    if (this.prop) {
      this.cmuiForm.addField(this)
      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })
      this.addValidateEvents()
    }
  },
  beforeDestroy() {
    this.cmuiForm.removeField(this)
  },
  methods: {
    validate(trigger, callback = () => {}) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }
      this.validateState = 'validating'
      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage, invalidFields)
        this.cmuiForm && this.cmuiForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
      })
    },
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },
    resetField() {
      this.validateState = ''
      this.validateMessage = ''
      let model = this.cmuiForm.model
      let value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      let prop = getPropByPath(model, path, true)
      this.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }
      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false
      })
      this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue)
    },
    getRules() {
      let formRules = this.cmuiForm.rules
      const selfRules = this.rules
      const requiredRule = this.required !== undefined ? { required: !!this.required } : []
      const prop = getPropByPath(formRules, this.prop || '')
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []
      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      }).map(rule => _.assign({}, rule))
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    },
    updateComputedLabelWidth(width) {
      this.computedLabelWidth = width ? `${width}px` : ''
    },
    addValidateEvents() {
      const rules = this.getRules()
      if (rules.length || this.required !== undefined) {
        this.$on('form.blur', this.onFieldBlur)
        this.$on('form.change', this.onFieldChange)
      }
    },
    removeValidateEvents() {
      this.$off()
    }
  }
}
</script>
<style lang="scss" type="text/scss">
    .cmui-form-item{
        &.is-error{
            input{border-color:#F56C6C}
        }
    }
    .cmui-form-item__error{
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
</style>
