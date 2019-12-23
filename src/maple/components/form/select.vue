<template>
  <div class="pos-r cmui-select form flex-container">
    <span
      v-if="align === 'left' && (label || $slots.default)"
      :class="{ checked: value }"
      class="cmui-select__label cmui-form__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
    <div class="flex-container" :class="{ flex1: !flex }">
      <!-- 前置 -->
      <div
        v-if="$slots.prepend || prepend"
        class="cmui-select__prepend flex-container"
        :class="[targetClass, { disabled: prependDisabled }]"
      >
        <slot v-if="$slots.prepend" name="prepend" />
        <span v-if="prepend">{{ prepend }}</span>
      </div>
      <!-- 主体 -->
      <div
        class="cmui-select__main pos-r"
        :class="{ flex1: !label || !$slots.default }"
      >
        <select
          v-model="selfValue"
          :style="inputStyle"
          :name="name"
          :readonly="readonly"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="targetClass"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <option
            v-for="(item,index) in selfData"
            :key="index"
            :value="item.value"
            v-text="item.text"
          ></option>
        </select>
        <div v-if="picker && !disabled" class="abs-full" @click="visible = !visible" />
        <cmui-picker
          v-if="picker && !disabled"
          v-model="selfValue"
          :visible.sync="visible"
          :data="data"
          @select="select"
        ></cmui-picker>
      </div>
      <!-- 后置 -->
      <div
        v-if="$slots.append || append"
        class="cmui-select__append flex-container"
        :class="[targetClass, { disabled: appendDisabled }]"
      >
        <slot v-if="$slots.append" name="append" />
        <span v-if="append" v-text="append" />
      </div>
    </div>
    <span
      v-if="align === 'right' && (label || $slots.default)"
      :class="{ checked: value }"
      class="cmui-select__label cmui-form__label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </div>
</template>
<style type="text/css" lang="scss">
@import "../../../cyan/variables";
.cmui-select {
  .cmui-select__prepend,
  .cmui-select__append {
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
  .cmui-select__prepend {
    &.radius {
      border-radius: $border-radius-base 0 0 $border-radius-base;
      &.reverse {
        border-radius: 0;
      }
    }
    margin-right: -1px;
  }
  .cmui-select__append {
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
import cmuiPicker from '../picker/main.vue'
import _ from 'lodash'
function formateData(data) {
  if (!_.isArray(data)) {
    return []
  } else {
    return data.map(item => {
      if (_.isPlainObject(item)) {
        return _.defaults(item, { text: '', value: undefined })
      } else {
        return { text: item.toString(), value: item.valueOf() }
      }
    })
  }
}
export default {
  name: 'cmui-select',
  components: { cmuiPicker },
  mixins: [mixin],
  props: {
    reset: { type: Boolean, default: true, intro: '是否显示充值按钮' },
    prepend: { type: String, default: '', intro: '前置文本内容' },
    append: { type: String, default: '', intro: '后置文本内容' },
    prependDisabled: { type: Boolean, default: false, intro: '是否禁用前置文本' },
    appendDisabled: { type: Boolean, default: false, intro: '是否禁用后置文本' },
    data: { type: Array, default: () => [], intro: '需要绑定的数据' },
    picker: { type: Boolean, default: false, intro: '是否启用picker模式' },
    width: { type: [Number, String], default: 0, intro: '设置宽度' }
  },
  data: function() {
    return {
      visible: false,
      selfValue: this.value
    }
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
    selfData() {
      return formateData(this.data)
    }
  },
  methods: {
    select(data) {
      this.$emit('input', data[0].value)
    },
    handleChange() {
      const target = event.target
      this.$emit('change', this.selfValue, target, this)
      this.$emit('input', this.selfValue, target, this)
    }
  }
}
</script>
