<template>
<div class="pos-r cmui-input form flex-container">
	<!-- 前置 -->
	<div class="cmui-input-prepend flex-container" :class="size" v-if="$slots.prepend">
		<slot name="prepend"></slot>
	</div>
	<!-- 主体 -->
	<div class="cmui-input-main pos-r flex1">
		<div v-if="type=='search'"
		class="input-search"
		:style="{display:type=='search'?'block':'none'}"></div>

	    <input
	    :type="type"
	    ref="input"
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
	    <div
	    class="input-reset"
	    :style="{display:value.length?'block':'none'}"
	    v-if="reset==true&&!disabled"
	    @click="resetInput()"
	    ></div>
	</div>
	<!-- 后置 -->
    <div class="cmui-input-append flex-container" :class="size" v-if="$slots.append">
		<slot name="append"></slot>
    </div>
</div>
</template>
<style type="text/css" lang="scss">
@import "../../../cyan/variables";
.cmui-input{
	.cmui-input-prepend,.cmui-input-append{
		background-color: $border-color-default;
		border:1px solid map-get($grayList,'lighter');
		&>*{
			line-height: 26px;
			padding: (nth(map-get($btn-size-list,'base'),1) - 26px - 2) / 2 $padding-base-horizontal;
			&:not(:first-child){
				border-left: 1px solid map-get($grayList,'lighter');
			    padding-left: 10px;
			}
		}
		&>select{
			border:none;
		}
		@each $btnSizeName,$btnSizeValue in $btn-size-list{
		  @if(#{$btnSizeName}!='base'){
			  &.#{$btnSizeName}>*{
				padding: (nth($btnSizeValue,1) - 26px - 2) / 2 $padding-base-horizontal;
			  }
		  }
		}
	}
	.cmui-input-prepend{
		border-radius:$border-radius-base 0 0 $border-radius-base;
		margin-right:-1px;
	}
	.cmui-input-append{
		margin-left:-1px;
		border-radius:0 $border-radius-base  $border-radius-base 0;
	}
}
</style>
<script>
import vm from "../../vm.js";
import mixin from "./mixin.js";
export default {
	props:{
	    type:{type:String,default:'text'},
	    size:String,
	    reset:{type:Boolean,default:true}
	},
	mixins: [mixin],
	methods:{
	    resetInput:function(){
	    	const target=this.$refs.input;
	    	target.value=this.value='';
	        target.focus();
	        this.$emit('reset',target,this);
	        this.$emit('input','',target,this);
	    }
	},
	mounted:function(){
	    if(this.reset){
	        this.$refs.input.style.paddingRight='40px';
	    }
	    if(this.type==='search'){
	        this.$refs.input.style.paddingLeft='40px';
	    }
	    if(this.$slots.prepend||this.reverse){
	    	this.$refs.input.style.borderTopLeftRadius="0px"
	    	this.$refs.input.style.borderBottomLeftRadius="0px"
	    }
	    if(this.$slots.prepend||this.reverse){
	    	this.$refs.input.style.borderTopRightRadius="0px"
	    	this.$refs.input.style.borderBottomRightRadius="0px"
	    }
	}
};
</script>
