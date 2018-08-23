<template>
	<cmui-input type="number"
	ref="input"
	:name="name"
	v-model="value"
    :readonly="readonly"
    :placeholder="placeholder"
    :disabled="disabled"
    :target-class="targetClass"
    :label="label"
    :align="align"
    :reset="false"
    :prepend-disabled="!canSub"
	:append-disabled="!canAdd"
	:flex="flex"
	:width="width"
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
	    changeNumber:function(num=0){
	    	let _this=this;
	    	if((!this.canAdd&&num===1)||(!this.canSub&&num===-1)){
	    		return
	    	}
	    	const innerThis=this.$children[0];
	    	const target=this.$children[0].$refs.input;
	    	const value = this.value;
	    	let targetValue=+value+num;
	    	targetValue=_.min([this.max,targetValue]);
	        targetValue=_.max([this.min,targetValue]);
	    	if(_.isFunction(this.beforeChange)){
	    		this.canAdd=this.canSub=false;
	    		let next=function(newValue){
	    			_this.value=_.isUndefined(newValue)?targetValue:newValue;
	    			_this.setBtnState();
	    			_this.$emit('input',_this.value,target,innerThis);
	    		}
	    		this.beforeChange(value,next)
	    	}else{
	        	this.value=targetValue;
	        	this.setBtnState();
		        this.$emit('input',this.value,target,innerThis);
	    	}
	    },
	    setBtnState(){
	    	const innerThis=this.$children[0];
	    	const target=this.$children[0].$refs.input;
			this.canAdd=this.canSub=true;
			if(+this.value===this.max){
				this.canAdd=false;
				this.$emit('max',this.value,target,innerThis);
			}
			if(+this.value===this.min){
				this.$emit('min',this.value,target,innerThis);
				this.canSub=false;
			}
		},
		handleBlur(){
          const target = event.target;
          const value = target.value;
			this.changeNumber(0);
			this.$emit("blur", value, target, this);
		}
	},
	props:{
	    max:Number,
	    min:Number,
	    rule:RegExp,
	    canAdd:{type:Boolean,default:true},
	    canSub:{type:Boolean,default:true},
	    beforeChange:Function,
	    width:[Number,String],
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
