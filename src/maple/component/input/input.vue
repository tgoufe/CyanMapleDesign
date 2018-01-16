<template>
<div class="pos-r cmui-input form">
	<div v-if="type=='search'" class="input-search" :style="{display:type=='search'?'block':'none'}"></div>
    <input v-if="type==='search'" type="search" :name="name" v-model="value" :placeholder="placeholder" :class="{'form-radius':radius,'input-reverse':reverse}">
    <input v-else type="text" :name="name" v-model="value" :placeholder="placeholder" :class="{'form-radius':radius,'input-reverse':reverse}">
    <div class="input-reset" :style="{display:value.length?'block':'none'}" v-if="reset==true" @click="resetInput()"></div>
</div>
</template>
<script>
import vm from "../../vm.js";
export default {
	props:{
	    type:{type:String,default:'text'},
	    reset:{type:Boolean,default:true},
	    reverse:{type:Boolean,default:false},
	    placeholder:String,
	    radius:{type:Boolean,default:true},
	    target: {type:Object},
	    value:{type:String,default:''},
	    name:{type:String, default: 'name'}
	},
	methods:{
	    keyup:function(e){
	    	vm.$emit('cmui-input-change', this, this.value)
	    },
	    resetInput:function(){
	        this.value='';
	        this.$el.getElementsByTagName('input')[0].focus()
	    }
	},
	watch: {
		value: function(){
			vm.$emit('cmui-input-change', this, this.value)
		}
	}
	,
	mounted:function(){
	    if(this.reset){
	        this.$el.getElementsByTagName('input')[0].style.paddingRight='40px';
	    }
	    if(this.type==='search'){
	        this.$el.getElementsByTagName('input')[0].style.paddingLeft='40px';
	    }
	}
};
</script>
