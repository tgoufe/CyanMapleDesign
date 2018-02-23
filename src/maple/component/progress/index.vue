<template>
	<div class="cmui-progress">
		<div class="cmui-progress_outer">
			<div class="cmui-progress_inner">
				<div class="cmui-progress_bg">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:{
		value:{type:Number,default:0},
		color:{type:String,default:'#ccc'}
	}
}
</script>