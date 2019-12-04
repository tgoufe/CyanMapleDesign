<template>
    <form action="" class="form cmui-form" :class="[`cmui-form-label${labelPosition}`]">
        <slot></slot>
    </form>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'cmui-form',
  provide() {
    return {
      cmuiForm: this
    }
  },
  props: {
    model: { type: Object, default: null, intro: '表单数据对象' },
    rules: { type: Object, default: null, intro: '表单验证规则' },
    labelPosition: { type: String, default: 'right', intro: '表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width' },
    labelWidth: { type: String, default: '', intro: '表单标签的宽度，如100px' },
    itemSpace: { type: String, default: '22px', intro: '每个item之间的间距，默认为22，如果需要使用targetClass自行设置，可以将该值设置为空' },
    inlineMessage: { type: Boolean, default: false, intro: '是否以行内形式展示校验信息' },
    statusIcon: { type: Boolean, default: false, intro: '是否在输入框中显示校验结果反馈图标' },
    showMessage: { type: Boolean, default: true, intro: '是否显示校验错误信息' },
    size: { type: String, default: '', intro: '用于控制该表单内组件的尺寸' },
    disabled: { type: Boolean, default: false, intro: '是否禁用该表单内的所有组件' },
    validateOnRuleChange: { type: Boolean, default: true, intro: '是否在 rules 属性改变后立即触发一次验证' },
    hideRequiredAsterisk: { type: Boolean, default: false, intro: '是否显示必填字段的标签旁边的红色星号' }
  },
  data() {
    return {
      fields: [],
      potentialLabelWidthArr: []
    }
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0
      const max = Math.max(...this.potentialLabelWidthArr)
      return max ? `${max}px` : ''
    }
  },
  watch: {
    rules() {
      this.fields.forEach(field => {
        field.removeValidateEvents()
        field.addValidateEvents()
      })
      if (this.validateOnRuleChange) {
        this.validate(() => {})
      }
    }
  },
  methods: {
    addField(field) {
      this.fields.push(field)
    },
    removeField(field) {
      _.remove(this.fields, item => item === field)
    },
    resetFields() {
      if (!this.model) {
        console.warn('model is required for resetFields to work.')
        return
      }
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    clearValidate(props = []) {
      const fields = props.length
        ? (typeof props === 'string'
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields
      fields.forEach(field => {
        field.clearValidate()
      })
    },
    validate(callback) {
      if (!this.model) {
        console.warn('model is required for validate to work!')
        return
      }
      let promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }
      let valid = true
      let count = 0
      if (this.fields.length === 0 && callback) {
        callback.call(this, true)
      }
      let invalidFields = {}
      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = _.assign({}, invalidFields, field)
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields)
          }
        })
      })

      if (promise) {
        return promise
      }
    },
    validateField(props, cb) {
      props = [].concat(props)
      const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1)
      if (!fields.length) {
        console.warn('please pass correct props!')
        return
      }
      fields.forEach(field => {
        field.validate('', cb)
      })
    },
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width)
      if (index === -1) {
        throw new Error('unpected width ', width)
      }
      return index
    },
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal)
        this.potentialLabelWidthArr.splice(index, 1, val)
      } else if (val) {
        this.potentialLabelWidthArr.push(val)
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val)
      this.potentialLabelWidthArr.splice(index, 1)
    }
  }
}
</script>
