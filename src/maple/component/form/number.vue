<template>
<div class="cmui-number form">
    <div class="inputGroup" :class="{'inputGroup-reverse':reverse,'inputGroup-radius':radius}">
        <div class="input_addon" @click="changeNumber(-1)" :class="{'disabled':!canMin}">-</div>
        <input
        type="number"
        ref="number"
        :name="name"
        :value="value"
        :readonly="readonly"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[{'form-radius':radius,'input-reverse':reverse},size,className]"
        @input="handleInput"
    	@focus="handleFocus"
    	@blur="handleBlur"
    	@change="handleChange"
        >
        <div class="input_addon" @click="changeNumber(1)" :class="{'disabled':!canMax}">+</div>
    </div>
</div>
</template>
<script>
import vm from "../../vm.js";
import mixin from "./mixin.js";
export default {
	methods:{
	    changeNumber:function(num){
	        this.value=+this.value+num;
	        if(this.max||this.max===0){
	            this.value=this.value>=this.max?this.max:this.value;
	        }
	        if(this.min||this.min===0){
	            this.value=this.value<=this.min?this.min:this.value;
	        }
	        vm.$emit('numChange', this, this.value)
	        if(this.value===this.max){
	        	vm.$emit('numMax', this, this.value);
	        }
	        if(this.value===this.min){
	        	vm.$emit('numMin', this, this.value)
	        }
	    }
	},
	mixins: [mixin],
	props:{
	    max:{type:Number},
	    min:{type:Number},
        readonly:{type:Boolean,default:false}
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
