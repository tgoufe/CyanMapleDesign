<template>
	<label class="cmui-radio" :class="{'flex-container':flex}">
		<span :class="{checked:label===radioValue}" class="cmui-radio__label" v-if="align==='left'" :style="labelStyle">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
		<input type="radio"
		:name="name"
		:value="label"
		:readonly="readonly"
		:class="[targetClass]"
		:disabled="disabled"
		v-model="radioValue"
		@change="handleChange"
		>
		<span :class="{checked:label===radioValue}" class="cmui-radio__label" v-if="align==='right'" :style="labelStyle">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
	</label>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
  import mixin from "./mixin.js";
	export default {
		name:'cmui-radio',
		mixins: [mixin],
		computed:{
			labelStyle(){
				let style={}
				if(this.disabled){
					style.color='#ccc'
				}
				return style
			}
		},
		data(){
			return {
				radioValue: this.value
			}
		},
		watch:{
			value(newValue) {
				this.radioValue = newValue
			}
		}
	}
</script>
