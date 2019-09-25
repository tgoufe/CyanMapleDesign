<template>
	<cmui-input type="number"
	ref="input"
	:name="name"
	v-model="selfValue"
    :readonly="readonly"
    :placeholder="placeholder"
    :disabled="disabled"
    :target-class="targetClass"
    :label="label"
    :align="align"
    :reset="false"
    :prepend-disabled="!_canSub"
	:append-disabled="!_canAdd"
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
	name:'cmui-number',
	components:{
		cmuiInput
	},
	mixins: [mixin],
	methods:{
	    changeNumber:function(num=0){
	    	console.log(`number changeNumber`);
	    	if((!this._canAdd&&num===1)||(!this._canSub&&num===-1)){
	    		return
	    	}
	    	const value = this.selfValue;
	    	const beforeChangeEvent=this.$listeners['before-change'];
	    	let targetValue=+value+num;
	    	targetValue=_.min([this.max,targetValue]);
	        targetValue=_.max([this.min,targetValue]);
	    	if(_.isFunction(beforeChangeEvent)){
	    		this._canAdd=this._canSub=false;
	    		new Promise((resolve,reject)=>{
					beforeChangeEvent(targetValue,resolve,reject,this);
				}).then(()=>{
					this.selfValue=targetValue;
					this.setBtnState();
					this.$emit('input',this.selfValue,this);
				},()=>{
					this.setBtnState();
					this.$emit('input',this.selfValue,this);
				})
	    	}else{
	        	this.selfValue=targetValue;
	        	this.setBtnState();
		        this.$emit('input',this.selfValue,this);
	    	}
	    },
	    setBtnState(isFirst=false){
	    	console.log(`number setBtnState`,this.selfValue);
			this._canAdd=this._canSub=true;
			if(+this.selfValue===this.max){
				this._canAdd=false;
				!isFirst&&this.$emit('max',this.selfValue,this);
			}
			if(+this.selfValue===this.min){
				!isFirst&&this.$emit('min',this.selfValue,this);
				this._canSub=false;
			}
		},
		handleBlur(){
	    	console.log(`number handleBlur`);
			const target = event.target;
			const value = target.value;
			this.changeNumber(0);
			this.$emit("blur", value,this);
		},
		handleInput(event) {
	    	console.log(`number handleInput`);
			let evt = window.event||event;
			let target = evt.target||evt.srcElement;
			let value = target.value;
			this.$emit("input", value,this);
			this.$nextTick(this.rendered);
			this.setBtnState()
		},
		handleChange(event) {
	    	console.log(`number handleChange`);
			let evt = window.event||event;
			let target = evt.target||evt.srcElement;
			let value = target.value;
			this.$emit("change", value,this);
			this.$emit("input", value,this);
			this.setBtnState()
		},
		getInput(){
			return this.$children[0].$refs.input;
		}
	},
	created(){
		this.setBtnState.call(this,true);
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
	data(){
		return {
			_canSub:this.canSub,
			_canAdd:this.canAdd,
			selfValue:this.value
		}
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
	},
	watch:{
		value(value){
			this.setBtnState();
			this.selfValue=value;
			console.log(arguments);
		},
		max(){this.setBtnState();},
		min(){this.setBtnState();},
		canSub(value){
			this._canSub=!!value;
		},
		canAdd(value){
			this._canAdd=!!value;
		}
	}
};
</script>
