<template>
  <label class="cmui-radio" :class="{ 'flex-container': flex }">
    <span
      v-if="align === 'left'"
      :class="{ checked: label === radioValue }"
      class="cmui-radio__label"
      :style="labelStyle"
    >
      <slot />
      <template v-if="!$slots.default && !isBtn">{{ label }}</template>
    </span>
    <input
      v-model="radioValue"
      type="radio"
      :name="name"
      :value="label"
      :readonly="readonly"
      :class="[targetClass]"
      :disabled="disabled"
      :label="selflabel"
      @change="handleChange"
    >
    <span
      v-if="align === 'right'"
      :class="{ checked: label === radioValue }"
      class="cmui-radio__label"
      :style="labelStyle"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
import mixin from './mixin.js'
export default {
  name: 'cmui-radio',
  mixins: [mixin],
  data() {
    return {
      radioValue: this.value,
      isBtn: !!~this.targetClass.split(' ').indexOf('btn')
    }
  },
  computed: {
    labelStyle() {
      let style = {}
      if (this.disabled) {
        style.color = '#ccc'
      }
      return style
    },
    selflabel() {
      return this.isBtn ? this.label : ''
    }
  },
  watch: {
    value(newValue) {
      this.radioValue = newValue
    }
  }
}
</script>
