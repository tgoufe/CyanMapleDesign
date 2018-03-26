<template>
	<div class="cmui-progress" :style="warpStyle">
		<div class="cmui-progress_bar" :style="progressStyle">
			<div class="cmui-progress_bg" :style="bgStyle">
				<div class="cmui-progress_info" v-text="value">
					
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.cmui-progress{
	background-color: #cccccc;
	.cmui-progress_bar{
		transition: width 1s;
		overflow: hidden;
		.cmui-progress_bg{
			width:100vw;
			.cmui-progress_info{
				
			}
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
		radius:{type:Boolean,default:true}
	},
	computed:{
		warpStyle(){
			return {
				height:this.height+'px',
				'border-radius':this.radius?'100px':'none'
			}
		},
		progressStyle(){
			let width;
			if(this.value>100 || this.value<0){
				width=0;
			}else{
				width=this.value;
			}
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
			return rs;
		},
	},
	mounted(){
		
	}
}
</script>