<template>
    <div class="pos-r cmui-select form flex-container">
	<span :class="{checked:slefValue}" class="cmui-select__label cmui-form__label" v-if="align==='left'&&(label||$slots.default)">
		<slot></slot>
		<template v-if="!$slots.default">{{label}}</template>
	</span>
  <div class="flex-container" :class="{'flex1':!flex}">
        <!-- 前置 -->
        <div class="cmui-select__prepend flex-container" :class="[targetClass,{disabled:prependDisabled}]" v-if="$slots.prepend||prepend">
            <slot name="prepend" v-if="$slots.prepend"></slot>
            <span v-if="prepend">{{prepend}}</span>
        </div>
        <!-- 主体 -->
        <div class="cmui-select__main pos-r" :class="{flex1:!label||!$slots.default}">
            <select
            :style="inputStyle"
            :name="name"
            :readonly="readonly"
            :placeholder="placeholder"
            :disabled="disabled&&picker"
            :class="targetClass"
            v-model="selfValue"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            >
                <option :value="item.value" v-for="item in selfData" v-text="item.text"></option>
            </select>
            <div class="abs-full" @click="visible=!visible" v-if="picker"></div>
            <cmui-picker :visible.sync="visible" :data="data" @select="select" v-if="picker"></cmui-picker>
        </div>
        <!-- 后置 -->
        <div class="cmui-select__append flex-container" :class="[targetClass,{disabled:appendDisabled}]" v-if="$slots.append||append">
            <slot name="append" v-if="$slots.append"></slot>
            <span v-if="append" v-text="append"></span>
        </div>
        </div>
        <span :class="{checked:slefValue}" class="cmui-select__label cmui-form__label" v-if="align==='right'&&(label||$slots.default)">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
	    </span>
    </div>
</template>
<style type="text/css" lang="scss">
@import "../../cyan/variables";
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
      .cmui-select select{
          padding:0;
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
import mixin from "./mixin.js";
import cmuiPicker from "@components/picker/main.vue";
function formateData(data){
  if(!_.isArray(data)){
    return [];
  }else{
    return data.map(item=>{
      if(_.isPlainObject(item)){
        return _.defaults(item,{text:'',value:undefined});
      }else{
        return {text:item.toString(),value:item.valueOf()};
      }
    })
  }
}
export default {
    name:'cmui-select',
    components:{cmuiPicker},
    props: {
    reset: { type: Boolean, default: true },
    prepend: String,
    append: String,
    prependDisabled: { type: Boolean, default: false },
    appendDisabled: { type: Boolean, default: false },
    data:Array,
    picker:{type:Boolean,default:false},
    width:[Number,String],
    },
    data:function(){
    return {
      visible:false,
      selfValue:this.value
    }
    },
    mixins: [mixin],
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
    selfData(){
      return formateData(this.data);
    }
    },
    methods:{
    select(data){
      this.$emit("input", data[0].value);
    },
    handleChange(){
      const target = event.target;
      this.$emit("change", this.selfValue, target, this);
      this.$emit("input", this.selfValue, target, this);
    }
    }
};
</script>
