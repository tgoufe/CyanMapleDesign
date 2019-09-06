<template>
<div class="pos-r cmui-input form flex-container">
    <span class="cmui-input__label cmui-form__label" v-if="align==='left'&&(label||$slots.default)">
    <slot></slot>
    <template v-if="!$slots.default">{{label}}</template>
    </span>
    <!-- 前置 -->
    <div class="flex-container" :class="{'flex1':!flex}">
    <div class="cmui-input__prepend flex-container" :class="[targetClass,{disabled:prependDisabled}]" v-if="$slots.prepend||prepend">
        <slot name="prepend" v-if="$slots.prepend"></slot>
        <span v-if="prepend">{{prepend}}</span>
    </div>
    <!-- 主体 -->
    <div class="cmui-input__main pos-r" :class="{flex1:!label||!$slots.default}">
        <input :style="inputStyle" :type="selfType" ref="input" :name="name" v-model.lazy="value" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :class="targetClass" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
        <div v-if="type==='search'" class="input-search" :style="{display:type==='search'?'block':'none'}"></div>
        <!-- <div class="input-changeType" style="display:block"></div> -->
        <div class="input-reset" :style="{display:value.length?'block':'none'}" v-if="reset===true&&!disabled" @click="resetInput()"></div>
        
    </div>
    <!-- 后置 -->
    <div class="cmui-input__append flex-container" :class="[targetClass,{disabled:appendDisabled}]" v-if="$slots.append||append">
        <slot name="append" v-if="$slots.append"></slot>
        <span v-if="append" v-text="append"></span>
    </div>
    </div>
    <span class="cmui-input__label cmui-form__label" v-if="align==='right'&&(label||$slots.default)">
    <slot></slot>
    <template v-if="!$slots.default">{{label}}</template>
    </span>
</div>
</template>
<style type="text/css" lang="scss">
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
      padding: (nth(map-get($btn-size-list, "base"), 1) - 26px - 2) / 2
        $padding-base-horizontal;
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
    @each $btnSizeName, $btnSizeValue in $btn-size-list {
      @if (#{$btnSizeName}!="base") {
        &.#{$btnSizeName} > * {
          padding: (nth($btnSizeValue, 1) - 26px - 2) / 2
            $padding-base-horizontal;
        }
      }
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
import mixin from "./mixin.js";
export default {
  props: {
    type: { type: String, default: "text" },
    value: { type: String, default: "" },
    reset: { type: Boolean, default: true },
    prepend: String,
    append: String,
    width:[Number,String],
    prependDisabled: { type: Boolean, default: false },
    appendDisabled: { type: Boolean, default: false },
    changeType:{type:Boolean,default:false}
  },
  mixins: [mixin],
  methods: {
    resetInput: function() {
      const target = this.$refs.input;
      target.value = this.value = "";
      target.focus();
      this.$emit("reset", target, this);
      this.$emit("input", "", target, this);
    },
    handleInput(event) {
        console.log(`input handleInput`);
      let evt = window.event||event;
      let target = evt.target||evt.srcElement;
      let value = target.value;
      if(this.type==='number'){
        let rs=/(\-)?\d+\.?(\d+)?/.exec(value)
        value=rs?rs[0]:''
      }
      // target.value=value;
      this.$emit("input", value, target, this);
      this.$nextTick(this.rendered);
    },
  },
  computed: {
    inputStyle() {
      let style = {};
      if (this.$slots.prepend || this.prepend || this.reverse) {
        style.borderTopLeftRadius = "0px";
        style.borderBottomLeftRadius = "0px";
      }
      if (this.$slots.append || this.append || this.reverse) {
        style.borderTopRightRadius = "0px";
        style.borderBottomRightRadius = "0px";
      }
      if (this.reset) {
        style.paddingRight = "40px";
      }
      if (this.type === "search") {
        style.paddingLeft = "40px";
      }
      if(this.width){
        style.width=this.width+'px';
      }
      return style;
    },
      selfType(){
        return this.type==='number'?'tel':this.type;
      }
  }
};
</script>
