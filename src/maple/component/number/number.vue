<template>
<div class="cmui-number form">
    <div class="inputGroup" :class="{'inputGroup-reverse':reverse,'inputGroup-radius':radius}">
        <div class="input_addon" @click="changeNumber(-1)" :class="{'disabled':!canMin}">-</div>
        <input type="number" v-model="start"  :readonly="readonly">
        <div class="input_addon" @click="changeNumber(1)" :class="{'disabled':!canMax}">+</div>
    </div>
</div>
</template>
<script>
import vm from "../../vm.js";
export default {
	methods:{
	    changeNumber:function(num){
	        this.start=+this.start+num;
	        if(this.max||this.max===0){
	            this.start=this.start>=this.max?this.max:this.start;
	        }
	        if(this.min||this.min===0){
	            this.start=this.start<=this.min?this.min:this.start;
	        }
	        vm.$emit('numChange', this, this.start)
	        if(this.start===this.max){
	        	vm.$emit('numMax', this, this.start);
	        }
	        if(this.start===this.min){
	        	vm.$emit('numMin', this, this.start)
	        }
	    }
	},
	props:{
	    reverse:{type:Boolean},
	    radius:{type:Boolean},
	    max:{type:Number},
	    min:{type:Number},
	    start:{type:Number,default:0},
        readonly:{type:Boolean,default:false},
	    target: {type:Object}
	},
	computed:{
		canMax(){
			if(this.max||this.max===0){
				return this.start<this.max;
			}else{
				return true
			}
		},
		canMin(){
			if(this.min||this.min===0){
				return this.start>this.min;
			}else{
				return true
			}
		}
	}
};
</script>
