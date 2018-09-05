<template>
	<div class="cmui-progress" :style="warpStyle">
		<div class="cmui-progress_bar" :style="progressStyle">
			<div class="cmui-progress_bg" :style="bgStyle">
			</div>
			<div class="cmui-progress_info fullcenter" v-text="text" v-if="text"></div>
		</div>
	</div>
</template>
<style lang="scss">
.cmui-progress{
	background-color: #cccccc;
	.cmui-progress_bar{
		transition: width 1s;
		overflow: hidden;
		position: relative;
		.cmui-progress_bg{
			height:100%;
		}
		.cmui-progress_info{
			color:white
		}
	}
}
</style>
<script>
export default {
	props:{
		value:{type:Number,default:0},
		color:{type:[String,Array],default:'red'},
		height:{type:Number,default:10},
		radius:{type:Boolean,default:true},
		text:String
	},
	computed:{
		warpStyle(){
			return {
				height:this.height+'px',
				'border-radius':this.radius?'100px':'none'
			}
		},
		progressStyle(){
			let width=Math.max(this.value,0);
			width=Math.min(this.value,100);
			return {
				height:this.height+'px',
				width:width+'%',
				'border-radius':this.radius?'100px':'none'
			}
		},
		bgStyle(){
			let rs={};
			if(_.isString(this.color)){
				rs.backgroundColor=this.color;
			}
			if(_.isArray(this.color)&&_.every(this.color,_.isString)){
				rs.backgroundColor=this.color[0];
				rs.backgroundImage='linear-gradient(to right, ' + this.color.toString() + ')';
			}
			let width=Math.max(this.value,0);
			width=Math.min(this.value,100);
			rs.width=10000/width+'%';
			return rs;
		},
	},
	mounted(){
		
	}
}
</script>