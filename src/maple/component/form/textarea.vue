<template>
	<div class="cmui-textarea pos-r form flex-container" :class="positionClass">
		<span :class="{checked:slefValue}" class="cmui-input__label cmui-form__label" v-if="align==='left'&&(label||$slots.default)">
	    <slot></slot>
	    <template v-if="!$slots.default">{{label}}</template>
	    </span>
	    <div class="pos-r" :class="{'flex1':!flex}">
			<textarea
			:maxlength="max"
			ref="textarea"
			:name="name"
	        v-model="value"
	        :readonly="readonly"
	        :placeholder="placeholder"
	        :disabled="disabled"
	        :class="[targetClass,'hide-scrollBar']"
	        @input="handleInput"
	    	@focus="handleFocus"
	    	@blur="handleBlur"
	    	@change="handleChange"
	    	:style="targetStyle"
			></textarea>
			<div
			v-if="max>=0"
			class="pos-a text-light"
			style="right:12px;bottom:4px;"
			v-text="value.length+'/'+max">
			</div>
	    </div>
		<span :class="{checked:slefValue}" class="cmui-input__label cmui-form__label" v-if="align==='right'&&(label||$slots.default)">
		<slot></slot>
		<template v-if="!$slots.default">{{label}}</template>
		</span>
	</div>
</template>
<style>
	.cmui-textarea textarea{
		min-height:100px;
	}
</style>
<script>
import mixin from "./mixin.js";
export default{
	props:{
		auto:{type:Boolean,default:false},
		max:{type:Number,default:-1},
		space:{type:Number,default:20},
		width:[Number,String]
	},
	mixins: [mixin],
	data:function(){
	},
	methods:{
		rendered(){
			this.setTextAreaHeight()
	    },
	    setTextAreaHeight(){
			if(this.auto){
				const target=this.$refs.textarea
				const $target=$(target);
				let dom=$('<textarea/>');
				let style={};
				['fontSize','lineHeight','width','border','padding'].forEach(item=>{
					style[item]=$target.css(item)
				})
				dom.css(style);
				dom.val(target.value).appendTo('body');
				target.style.height=dom[0].scrollHeight+'px';
				dom.remove();
			}
	    },
	    handlePaste(e){
	    	const target=this.$refs.textarea;
	    	if(this.max){
	    		target.value=target.value.slice(0,this.max)
	    	}
	      	this.$emit("input", target.value, target, this);
	    }
	},
	computed:{
		targetStyle(){
			let style={};
			if(this.width){
				style.width=parseInt(this.width)+'px';
			}
			return style
		},
		positionClass(){
			if(_.includes(this.targetClass.split(' '),'center')){
				return ''
			}else if(_.includes(this.targetClass.split(' '),'bottom')){
				return 'bottom'
			}else{
				return 'top'
			}
		}
	}
}
</script>