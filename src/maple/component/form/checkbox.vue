<template>
    <label class="cmui-checkbox" :class="{'flex-container':flex}">
      <span :class="{checked:slefValue}" class="cmui-check__label" v-if="align==='left'">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
      <input
      ref="checkbox"
      type="checkbox"
      :name="name"
      v-model="slefValue"
      :readonly="readonly"
      :class="[targetClass]"
      :disabled="disabled"
      @change="handleChange">
      <span :class="{checked:slefValue}" class="cmui-check__label" v-if="align==='right'">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
    </label>
</template>
<style type="text/css" lang="scss">
@import "../../../cyan/variables";
.cmui-check__label {
  &.checked {
    color: $form-color-base;
  }
}
</style>
<script type="text/javascript">
import mixin from "./mixin.js";
import _ from 'lodash';
export default {
  mixins: [mixin],
  props: {
    path:String
  },
  computed: {
    slefValue:{
      get(){
        let value=this.value;
        return _.isArray(value)?
                _.every(value,item=>(_.isObject(item)?_.get(item,this.path):item)===true):
                value;
      },
      set(value){
        if(_.isArray(value)){
          let dom=this.$refs.checkbox;
          let allTrue=_.every(value,item=>(_.isObject(item)?_.get(item,this.path):item)===true);
          let allFalse=_.every(value,item=>(_.isObject(item)?_.get(item,this.path):item)===false);
          if(dom){
            dom.indeterminate=!(allTrue||allFalse);
          }
        }
      }
    }
  },
  methods: {
    handleChange(event) {
      const target = event.target;
      const value = target.checked;
      const beforeChangeEvent=this.$listeners['before-change'];
      if(_.isFunction(beforeChangeEvent)){
        this.disabled=true;
        new Promise((resolve,reject)=>{
          beforeChangeEvent(value,resolve,reject,this);
        }).then(()=>{
          if (_.isArray(this.value)) {
            let length = this.value.length;
            if (_.every(this.value, _.isBoolean)) {
              this.value = new Array(length).fill(value);
            } else {
              _.forEach(this.value, item => {
                _.set(item,this.path,value)
              });
            }
          }
          this.$emit('input',value,this);
          this.$emit('change',value,this);
          this.disabled=false;
        },()=>{
          target.checked=!target.checked;
          this.disabled=false;
        })
      }else{
        if (_.isArray(this.value)) {
          let length = this.value.length;
          if (_.every(this.value, _.isBoolean)) {
            this.value = new Array(length).fill(value);
          } else {
            _.forEach(this.value, item => {
              _.set(item,this.path,value)
            });
          }
        }
        this.$emit("input", value,this);
        this.$emit("change", value,this);
      }

    }
  }
};
</script>
