<template>
	<div class="cmui-textarea pos-r">
		<textarea :name="name" :id="id" :placeholder="placeholder" v-model="model" :class="textareaClass" :maxlength="max" :style="style"></textarea>
		<div v-if="max>=0" class="pos-a text-light" :class="maxNumberClass" v-text="model.length+'/'+max">
		</div>
	</div>
</template>
<style>
	.cmui-textarea textarea{
		width:100%;
		height:150px;
		border:none;
	}
</style>
<script>
export default{
	props:{
		id:{type:String,default:_.uniqueId('cmui_textarea')},
		name:{type:String,default:''},
		model:{type:String,default:''},
		placeholder:{type:String,default:'please'},
		className:{type:[Array,String],default:''},
		max:{type:Number,default:-1},
		style:{type:Object,default:null},
		space:{type:Number,default:20}
	},
	data:function(){
		var space=this.space;
		var className=this.className;
		var textareaClass;
		var maxNumberClass;
		if(_.isArray(className)){
			className=className.join(' ')
		}
		if(_.inRange(space,-1,50)&&space%10==0){
			textareaClass='padding'+space+' '+className;
			maxNumberClass='right'+space+' bottom'+space;
		}else{
			textareaClass=this.className;
			maxNumberClass='right20 bottom20'
		}
		return {
			textareaClass,
			maxNumberClass
		}
	}
}
</script>