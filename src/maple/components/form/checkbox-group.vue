<template>
    <div class="cmui-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'cmuiCheckboxGroup',
  inject: {
    cmuiFormItem: {
      default: ''
    }
  },
  provide() {
    return {
      cmuiCheckboxGroup: this
    }
  },
  props: {
    value: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    min: { type: Number, default: 0 },
    max: { type: Number, default: Infinity }
  },
  watch: {
    value(value) {
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.change', value)
    }
  }
}
</script>
