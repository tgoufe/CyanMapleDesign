<template>
	<label class="cmui-radio">
		<span :class="{checked:label===value}" class="cmui-radio__label" v-if="align==='left'">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
		<input type="radio"
		:name="name"
		:value="label"
		:readonly="readonly"
		:class="[targetClass]"
		:disabled="disabled"
		v-model="value"
		@change="handleChange"
		>
		<span :class="{checked:label===value}" class="cmui-radio__label" v-if="align==='right'">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
	</label>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
  import mixin from "./mixin.js";
	export default {
		mixins: [mixin],
		props:{

		}
	}
</script>