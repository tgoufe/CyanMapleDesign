<template>
    <div class="cmui-radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'cmuiRadioGroup',
  inject: {
    cmuiFormItem: {
      default: ''
    }
  },
  provide() {
    return {
      cmuiRadioGroup: this
    }
  },
  props: {
    value: { type: [String, Number, Boolean], default: null },
    disabled: { type: Boolean, default: false }
  },
  watch: {
    value(value) {
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.change', value)
    }
  }
}
</script>
