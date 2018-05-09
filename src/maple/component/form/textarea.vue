<template>
	<div class="cmui-textarea pos-r form">
		<textarea
		:maxlength="max"
		ref="textarea"
		:name="name"
        :value="value"
        :readonly="readonly"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[{'form-radius':radius,'input-reverse':reverse},size,className,'hide-scrollBar',textareaClass]"
        @input="handleInput"
    	@focus="handleFocus"
    	@blur="handleBlur"
    	@change="handleChange"
		></textarea>
		<div
		v-if="max>=0"
		class="pos-a text-light"
		:class="maxNumberClass" v-text="value.length+'/'+max">
		</div>
	</div>
</template>
<style>
	.cmui-textarea textarea{
		min-height:100px;
	}
</style>
<script>
import mixin from "./mixin.js";
let textareaAdd;
let hideTextareaStyle;
export default{
	props:{
		auto:{type:Boolean,default:false},
		max:{type:Number,default:-1},
		space:{type:Number,default:20}
	},
	mixins: [mixin],
	data:function(){
		var space=this.space;
		var className=this.className;
		var textareaClass;
		var maxNumberClass;
		if(_.isArray(className)){
			className=className.join(' ')
		}
		if(_.inRange(space,-1,50)&&space%10==0){
			textareaClass='padding'+space;
			maxNumberClass='right'+space+' bottom'+space;
		}else{
			textareaClass=this.className;
			maxNumberClass='right20 bottom20'
		}
		return {
			textareaClass,
			maxNumberClass
		}
	},
	methods:{
		rendered(){
			this.setTextAreaHeight()
	    },
	    setTextAreaHeight(){
			if(this.auto){
				const target=this.$refs.textarea;
				let dom=$('<textarea/>');
				dom.css({
					fontSize:hideTextareaStyle.getPropertyValue('font-size'),
					lineHeight:hideTextareaStyle.getPropertyValue('line-height'),
				})
				dom.val(target.value).appendTo('body');
				target.style.height=dom[0].scrollHeight+textareaAdd+'px';
				dom.remove();
			}
	    },
	    handlePaste(e){
	    	const target=this.$refs.textarea;
	    	if(this.max){
	    		target.value=target.value.slice(0,this.max)
	    	}
	    }
	},
	mounted(){
		const target=this.$refs.textarea;
		hideTextareaStyle=window.getComputedStyle(target);
		textareaAdd=parseFloat(hideTextareaStyle.getPropertyValue('padding-bottom'))
		+parseFloat(hideTextareaStyle.getPropertyValue('padding-top'))
		+parseFloat(hideTextareaStyle.getPropertyValue('border-bottom-width'))
		+parseFloat(hideTextareaStyle.getPropertyValue('border-top-width'));
		this.setTextAreaHeight();
	}
}
</script>