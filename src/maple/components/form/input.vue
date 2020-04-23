<template>
  <div class="pos-r cmui-input form flex-container">
    <span
      v-if="align === 'left' && (label || $slots.default)"
      class="cmui-input__label cmui-form__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
    <!-- 前置 -->
    <div class="flex-container" :class="{ flex1: !flex }">
      <div
        v-if="$slots.prepend || prepend"
        class="cmui-input__prepend flex-container"
        :class="[targetClass, { disabled: prependDisabled }]"
      >
        <slot v-if="$slots.prepend" name="prepend" />
        <span v-if="prepend">{{ prepend }}</span>
      </div>
      <!-- 主体 -->
      <div
        class="cmui-input__main pos-r flex-container"
        :class="{ flex1: !label || !$slots.default }"
      >
        <input
          ref="input"
          v-model.lazy="value"
          :style="inputStyle"
          :type="selfType"
          :name="name"
          :readonly="readonly"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="targetClass"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
        <div
          v-if="type === 'search'"
          class="input-search"
          :style="{ display: type === 'search' ? 'block' : 'none' }"
        ></div>
        <!-- <div class="input-changeType" style="display:block"></div> -->
        <div
          v-if="reset === true && !disabled"
          class="input-reset"
          :style="{ display: value.length ? 'block' : 'none' }"
          @click="resetInput()"
        ></div>
      </div>
      <!-- 后置 -->
      <div
        v-if="$slots.append || append"
        class="cmui-input__append flex-container"
        :class="[targetClass, { disabled: appendDisabled }]"
      >
        <slot v-if="$slots.append" name="append" />
        <span v-if="append" v-text="append" />
      </div>
    </div>
    <span
      v-if="align === 'right' && (label || $slots.default)"
      class="cmui-input__label cmui-form__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </div>
</template>
<style lang="scss" type="text/scss" scoped>
@import "../../../cyan/variables";
.cmui-input {
  .cmui-input__prepend,
  .cmui-input__append {
    background-color: $border-color-default;
    border: 1px solid map-get($grayList, "lighter");
    &.reverse {
      border-color: transparent;
      border-bottom-color: map-get($grayList, "lighter");
      background-color: transparent;
    }
    &.disabled {
      color: #bbbbbb;
    }
    & > * {
      line-height: 26px;
      &:not(:first-child) {
        border-left: 1px solid map-get($grayList, "lighter");
        padding-left: 10px;
      }
    }
    select {
      border: none;
    }
    .cmui-select select {
      padding: 0;
      padding-right: 16px !important;
      background-position-x: right;
    }
  }
  .cmui-input__prepend {
    &.radius {
      border-radius: $border-radius-base 0 0 $border-radius-base;
      &.reverse {
        border-radius: 0;
      }
    }
    margin-right: -1px;
  }
  .cmui-input__append {
    margin-left: -1px;
    &.radius {
      border-radius: 0 $border-radius-base $border-radius-base 0;
      &.reverse {
        border-radius: 0;
      }
    }
  }
}
</style>
<script>
import mixin from './mixin.js'

export default {
  name: 'cmui-input',
  mixins: [mixin],
  props: {
    type: { type: String, default: 'text', intro: '设置输入框类型' },
    reset: { type: Boolean, default: false, intro: '是否显示清除的icon' },
    prepend: { type: String, default: '', intro: '前置文本内容' },
    append: { type: String, default: '', intro: '后置文本内容' },
    width: { type: [Number, String], default: 0, intro: '设置输入框的宽度，单位为PX' },
    prependDisabled: { type: Boolean, default: false, intro: '禁用前置文本' },
    appendDisabled: { type: Boolean, default: false, intro: '禁用后置文本' },
    changeType: { type: Boolean, default: false, intro: '在类型为password的时候是否显示切换类型按钮' }
  },
  computed: {
    inputStyle() {
      let style = {}
      if (this.$slots.prepend || this.prepend || this.reverse) {
        style.borderTopLeftRadius = '0px'
        style.borderBottomLeftRadius = '0px'
      }
      if (this.$slots.append || this.append || this.reverse) {
        style.borderTopRightRadius = '0px'
        style.borderBottomRightRadius = '0px'
      }
      if (this.reset) {
        style.paddingRight = '40px'
      }
      if (this.type === 'search') {
        style.paddingLeft = '40px'
      }
      if (this.width) {
        style.width = this.width + 'px'
      }
      return style
    },
    selfType() {
      return this.type === 'number' ? 'tel' : this.type
    }
  },
  methods: {
    resetInput: function() {
      const target = this.$refs.input
      target.value = ''
      target.focus()
      this.$emit('reset', target, this)
      this.$emit('input', '', target, this)
    },
    handleInput(event) {
      console.log(`input handleInput`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      if (this.type === 'number') {
        let rs = /(-)?\d+\.?(\d+)?/.exec(value)
        value = rs ? rs[0] : ''
      }
      // target.value=value;
      this.$emit('input', value, target, this)
      this.$nextTick(this.rendered)
    }
  }
}
</script>
