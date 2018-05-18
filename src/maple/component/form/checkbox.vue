<template>
	<label class="cmui-iput_container">
		<span :class="{checked:slefValue}" class="cmui-check__label">
			<template v-if="align==='left'">{{label}}<slot></slot></template>
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
		<span :class="{checked:slefValue}" class="cmui-check__label">
			<template v-if="align==='right'">{{label}}<slot></slot></template>
		</span>
	</label>
</template>
<style type="text/css" lang="scss">
@import "../../../cyan/variables";
.cmui-check__label{
	&.checked{
		color:$form-color-base;
	}
}
</style>
<script type="text/javascript">
import mixin from "./mixin.js";
export default {
	mixins: [mixin],
	props:{
		align:{type:String,default:'left'},
		label:String,
		targetClass:String,
		rule:{type:String,default:'item'}
	},
	computed:{
		slefValue(){
			let value=this.value;
			return _.isArray(value)
			?_.every(value,item=>!!eval(this.rule))
			:value
		}
	},
	methods:{
		handleChange(event){
			const target=event.target;
		    const value = target.checked;
		    if(_.isArray(this.value)){
		    	let length=this.value.length;
		    	if(_.every(this.value,_.isBoolean)){
		    		this.value=_.fill(new Array(length),value);
		    	}else{
		    		_.forEach(this.value,item=>{
		    			eval(this.rule+'=value');
		    		})
		    	}
	    		this.$emit('input', this.value,target,this);
	    	}else{
	    		this.$emit('input', value,target,this);
	    	}
			this.$emit('change',value,target,this);
		}
	}
}
</script>