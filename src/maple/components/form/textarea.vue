<template>
  <div
    class="cmui-textarea pos-r form flex-container"
    :class="positionClass"
  >
    <span
      v-if="align === 'left' && (label || $slots.default)"
      :class="{ checked: slefValue }"
      class="cmui-input__label cmui-form__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
    <div
      class="pos-r"
      :class="{ flex1: !flex }"
    >
      <textarea
        ref="textarea"
        v-model="slefValue"
        :maxlength="max"
        :name="name"
        :readonly="readonly"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[targetClass, 'hide-scrollBar']"
        :style="targetStyle"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      ></textarea>
      <div
        v-if="max >= 0"
        class="pos-a text-light"
        style="right:12px;bottom:4px;"
        v-text="slefValue.length + '/' + max"
      ></div>
    </div>
    <span
      v-if="align === 'right' && (label || $slots.default)"
      :class="{ checked: slefValue }"
      class="cmui-input__label cmui-form__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </div>
</template>
<style>
.cmui-textarea textarea {
  min-height: 100px;
}
</style>
<script>
import mixin from './mixin.js'
import _ from 'lodash'
export default {
  name: 'cmui-textarea',
  mixins: [mixin],
  props: {
    auto: { type: Boolean, default: false },
    max: { type: Number, default: -1 },
    space: { type: Number, default: 20 },
    width: { type: [Number, String], default: 0 }
  },
  computed: {
    targetStyle () {
      let style = {}
      if (this.width) {
        style.width = parseInt(this.width) + 'px'
      }
      return style
    },
    positionClass () {
      if (_.includes(this.targetClass.split(' '), 'center')) {
        return ''
      } else if (_.includes(this.targetClass.split(' '), 'bottom')) {
        return 'bottom'
      } else {
        return 'top'
      }
    },
    slefValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value, this.$refs.textarea, this)
      }
    }
  },
  mounted() {
    this.setTextAreaHeight()
  },
  methods: {
    rendered () {
      this.setTextAreaHeight()
    },
    setTextAreaHeight () {
      if (this.auto) {
        const target = this.$refs.textarea
        const cloneTarget = document.createElement('textarea')
        let style = window.getComputedStyle(target, null);
        ['fontSize', 'lineHeight', 'width', 'border', 'padding'].forEach(
          item => {
            cloneTarget.style[item] = style[item]
          }
        )
        cloneTarget.value = this.slefValue
        document.body.appendChild(cloneTarget)
        target.style.height = cloneTarget.scrollHeight + 'px'
        document.body.removeChild(cloneTarget)
      }
    },
    handlePaste (e) {
      const target = this.$refs.textarea
      if (this.max) {
        target.value = target.value.slice(0, this.max)
      }
    }
  }
}
</script>
