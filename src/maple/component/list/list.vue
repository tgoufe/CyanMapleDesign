<template>
<div class="cmui-list overflow-h" :style="{boxShadow}">
	<div class="clearfix" :style="containerStyle">
		<slot></slot>
	</div>
</div>
</template>
<script>
export default{
	name:'cmui-list',
	props:{
		col:{type:[Number,Array],default:1},
		space:{type:Number,default:0},
		border:{type:[Boolean,String],default:false},
		target:Object
	},
	data:function(){
		var defaultBorderColor="#eeeeee"
		,	isColor=/^#[a-fA-F0-9]{6}$/.test(this.border)
		,	borderColor=isColor?this.border:defaultBorderColor
		;
		return {
			borderColor
		}
	},
	computed:{
		realSpace:function(){
			var value=parseInt(this.space);
	        if(_.isNumber(value)){
	        	if(_.inRange(value,-1,51)){
	        		return (value/75)||0
	        	}
	        }
	        return 0;
	    },
	    realCol(){
	    	var value=this.col;
	    	if(_.isNumber(value)){
				if(_.inRange(value,0,11)){
					return parseInt(value)||1
				}else{
					return 1;
				}
			}else if(_.isArray(value)&&_.every(value,_.isNumber)){
				return value.map(item=>parseInt(item)||1);
			}else{
				return parseInt(value)||1;
			}
	    },
	    containerStyle(){
	    	return {
	    		'margin-right':'-'+this.realSpace+'rem',
	    		'margin-bottom':'-'+this.realSpace+'rem'
	    	}
	    },
	    boxShadow(){
	    	if(this.border&&this.realSpace==0){
	    		return '0px 0px 0px 1px '+this.borderColor
	    	}
	    	return
	    }
	}
}
</script>
