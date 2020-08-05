<template>
    <div class="cmui-radio-group" :class="{form:!cmuiForm,'btn-group':isBtn}">
        <slot></slot>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'cmuiRadioGroup',
  inject: {
    cmuiFormItem: { default: '' },
    cmuiForm: { default: '' }
  },
  provide() {
    return {
      cmuiRadioGroup: this
    }
  },
  props: {
    value: { type: [String, Number, Boolean], default: null },
    disabled: { type: Boolean, default: false },
    targetClass: { type: String, default: '' }
  },
  computed: {
    isBtn() {
      return _.includes(this.targetClass, 'btn')
    }

  },
  watch: {
    value(value) {
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.change', value)
    }
  }
}
</script>
