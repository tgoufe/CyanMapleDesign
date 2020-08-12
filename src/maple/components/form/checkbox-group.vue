<template>
    <div class="cmui-checkbox-group" :class="{form:!cmuiForm,'btn-group':isBtn}">
        <slot></slot>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'cmuiCheckboxGroup',
  inject: {
    cmuiFormItem: { default: '' },
    cmuiForm: { default: '' }
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
    max: { type: Number, default: Infinity },
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
<style lang="scss">
.cmui-checkbox-group{
  &.group{
    .cmui-checkbox{
      margin-right:0;
      &:not(:first-child):not(:last-child){
        input{border-radius: 0;}
      }
      &:first-child{
        input{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      &:last-child{
        input{
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
}
</style>
