<template>
	<label class="cmui-iput_container" :class="{'flex-container':flex}">
		<span :class="{checked:slefValue}" class="cmui-check__label" v-if="align==='left'">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
		<input
		type="checkbox"
		:name="name"
		v-model="slefValue"
		:readonly="readonly"
		:class="[targetClass]"
		:disabled="disabled"
		@change="handleChange"
		>
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
export default {
  mixins: [mixin],
  props: {
    align: { type: String, default: "left" },
    label: String,
    targetClass: String,
    rule: { type: String, default: "item" }
  },
  computed: {
    slefValue() {
      let value = this.value;
      return _.isArray(value)
        ? _.every(value, item => !!eval(this.rule))
        : value;
    }
  },
  methods: {
    handleChange(event) {
      const target = event.target;
      const value = target.checked;
      if (_.isArray(this.value)) {
        let length = this.value.length;
        if (_.every(this.value, _.isBoolean)) {
          this.value = _.fill(new Array(length), value);
        } else {
          _.forEach(this.value, item => {
            eval(this.rule + "=value");
          });
        }
        this.$emit("input", this.value, target, this);
      } else {
        this.$emit("input", value, target, this);
      }
      this.$emit("change", value, target, this);
    }
  }
};
</script>
