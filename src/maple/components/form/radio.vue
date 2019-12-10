<template>
  <label class="cmui-radio" :class="{ 'flex-container': flex ,'cmui-checkbox__disabled':isDisabled}">
    <span
      v-if="align === 'left'"
      :class="{ checked: model === label }"
      class="cmui-radio__label"
      :style="labelStyle"
    >
      <slot />
      <template v-if="!$slots.default && !isBtn">{{ label }}</template>
    </span>
    <input
      ref="radio"
      v-model="model"
      type="radio"
      :name="name"
      :value="label"
      :readonly="readonly"
      :class="[targetClass]"
      :disabled="isDisabled"
      :label="selflabel"
      @change="handleChange"
    >
    <span
      v-if="align === 'right'"
      :class="{ checked: label === model }"
      class="cmui-radio__label"
      :style="labelStyle"
    >
      <slot />
      <template v-if="!$slots.default && !isBtn">{{ label }}</template>
    </span>
  </label>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
import mixin from './mixin.js'
export default {
  name: 'cmui-radio',
  mixins: [mixin],
  inject: {
    cmuiRadioGroup: {
      default: ''
    }
  },
  data() {
    return {
      radioValue: this.value,
      isBtn: !!~this.targetClass.split(' ').indexOf('btn')
    }
  },
  computed: {
    isDisabled() {
      return this.disabled ||
              (this.cmuiForm || {}).disabled ||
              (this.cmuiRadioGroup || {}).disabled
    },
    inGroup() {
      return !!this.cmuiRadioGroup
    },
    model: {
      get() {
        return this.inGroup ? this.cmuiRadioGroup.value : this.value
      },
      set(value) {
        if (this.inGroup) {
          this.cmuiRadioGroup.$emit('input', value)
        } else {
          this.$emit('input', value)
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
      }
    },
    labelStyle() {
      let style = {}
      if (this.isDisabled) {
        style.color = '#ccc'
      }
      return style
    },
    selflabel() {
      return this.isBtn ? this.label : ''
    }
  }
  // watch: {
  //   value(newValue) {
  //     this.radioValue = newValue
  //   }
  // }
}
</script>
