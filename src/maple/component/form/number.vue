<template>
	<cmui-input type="number"
	ref="input"
	:name="name"
	:value="value"
    :readonly="readonly"
    :placeholder="placeholder"
    :disabled="disabled"
    :target-class="targetClass"
    :label="label"
    :align="align"
    :reset="false"
    :prepend-disabled="!canSub"
	:append-disabled="!canAdd"
    @input="handleInput"
	@focus="handleFocus"
	@blur="handleBlur"
	@change="handleChange"
	>
		<span slot="prepend" @click="changeNumber(-1)">-</span>
		<span slot="append" @click="changeNumber(1)">+</span>
		<slot></slot>
	</cmui-input>
</template>
<script>
import cmuiInput from './input.vue';
import mixin from "./mixin.js";
export default {
	components:{
		cmuiInput
	},
	mixins: [mixin],
	methods:{
	    changeNumber:function(num){
	    	if((!this.canAdd&&num===1)||(!this.canSub&&num===-1)){
	    		return
	    	}
	    	const innerThis=this.$children[0];
	    	const target=this.$children[0].$refs.input;
	    	const value = this.value;
	        this.value=+value+num;
        	this.value=_.min([this.max,this.value]);
        	this.value=_.max([this.min,this.value]);
        	this.canAdd=this.canSub=true
	        if(+this.value===this.max){
	        	this.$emit('max',this.value,target,innerThis);
	        	this.canAdd=false;
	        }
	        if(+this.value===this.min){
	        	this.$emit('min',this.value,target,innerThis);
	        	this.canSub=false;
	        }
	        this.$emit('input',this.value,target,innerThis);
	    }
	},
	props:{
	    max:Number,
	    min:Number,
	    rule:RegExp,
	    canAdd:{type:Boolean,default:true},
	    canSub:{type:Boolean,default:true}
	},
	computed:{
		canMax(){
			if(this.max||this.max===0){
				return this.value<this.max;
			}else{
				return true
			}
		},
		canMin(){
			if(this.min||this.min===0){
				return this.value>this.min;
			}else{
				return true
			}
		}
	}
};
</script>
