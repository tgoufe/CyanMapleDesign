<template>
	<label for="" class="cmui-radio">
		<span :class="{checked:model}" class="cmui-radio__label">
			<template v-if="align==='left'">{{label}}<slot></slot></template>
		</span>
		<input type="radio"
		:name="name"
		v-model="model"
		:readonly="readonly"
		:class="[targetClass]"
		:disabled="disabled"
		@change="handleChange"
		>
		<span :class="{checked:model}" class="cmui-radio__label">
			<template v-if="align==='left'">{{label}}<slot></slot></template>
		</span>
	</label>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
	export default {
		props:{
			targetClass:String,
			label:String,
			align:{type:String,default:'left'}
		}
	}
</script>