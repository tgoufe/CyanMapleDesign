<template>
  <label class="cmui-radio" :class="{ 'flex-container': flex&&!isBtn ,'dis-i':!flex||isBtn,'cmui-checkbox__disabled':isDisabled}"
  :style="{marginRight:cmuiRadioGroup.space}"
  >
    <span
      v-if="align === 'left'"
      :class="{ checked: model === label }"
      class="cmui-radio__label"
      :style="labelStyle"
    >
      <slot v-if="!isBtn" />
      <template v-if="!$slots.default && !isBtn">{{ label }}</template>
    </span>
    <input
      ref="radio"
      v-model="model"
      type="radio"
      :name="name"
      :value="label"
      :readonly="readonly"
      :class="[cmuiRadioGroup.targetClass,targetClass]"
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
      <slot v-if="!isBtn" />
      <template v-if="!$slots.default && !isBtn">{{ label }}</template>
    </span>
  </label>
</template>
<script type="text/javascript">
import mixin from './mixin.js'
export default {
  name: 'cmui-radio',
  mixins: [mixin],
  inject: {
    cmuiRadioGroup: { default: '' },
    cmuiForm: { default: '' }
  },
  data() {
    return {
      radioValue: this.value,
      isBtn: !!~(this.cmuiRadioGroup.targetClass || this.targetClass).split(' ').indexOf('btn')
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
      return this.isBtn ? _.get(this, '$slots.default[0].text', this.label) : ''
    }
  }
}
</script>
