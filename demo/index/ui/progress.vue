<template>
	<div class="padding20">
		<cmui-progress
		:value="value"
		:text="text"
		:color="color"
		:line-width="height"
		:type="type"
		:size="size"
		>
		</cmui-progress>
		<div class="tag-container config">
			<cmui-number v-model="height" class="marginb20" :flex="true">
				线宽
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

			<cmui-select v-model="type" :data="types" class="marginb20" :flex="true" placeholder="用空格分开">
				类型
			</cmui-select>
			<cmui-number v-model="size" class="marginb20" :flex="true" v-if="type==='circle'">
				环形尺寸
			</cmui-number>
		</div>
	</div>
</template>
<style type="text/css">
	svg {
  -webkit-transform: rotate(-0.05deg);
  transform: rotate(-0.05deg);
}
circle {
    transition: stroke-dasharray 1s;
}
</style>
<script type="text/javascript">
	export default {
		data:function(){
			return {
				height:10,
				value:80,
				text:'',
				color:'#ab2c57',
				size:200,
				type:'line',
				types:['circle','line']
			}
		},
		computed:{
			sd(){
				return (this.size-this.height)*Math.PI*this.value/100+' 1024'
			}
		},
		mounted(){
			this.$root.headTitle="progress"
		}
	}
</script>
