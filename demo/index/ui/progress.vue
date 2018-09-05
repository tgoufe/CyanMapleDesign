<template>
	<div class="padding20">
		<cmui-progress
		:value="value"
		:text="text"
		:color="selfColor"
		:height="height"
		>	
		</cmui-progress>
		<div class="tag-container config">
			<cmui-number v-model="height" class="marginb20" :flex="true">
				高度
			</cmui-number>
			<cmui-number v-model="value" class="marginb20" :flex="true">
				数值
			</cmui-number>
			<cmui-input v-model="text" class="marginb20" :flex="true">
				文本
			</cmui-input>
			<cmui-input v-model="color" class="marginb20" :flex="true" placeholder="用空格分开">
				颜色
			</cmui-input>
		</div>
	</div>
</template>
<style type="text/css"></style>
<script type="text/javascript">
	export default {
		data:function(){
			return {
				height:2,
				value:20,
				text:'',
				color:'blue'
			}
		},
		computed:{
			selfColor(){
				return this.color.indexOf(' ')===-1?this.color:this.color.split(' ')
			}
		},
		mounted(){
			this.$root.headTitle="progress"
		}
	}
</script>
