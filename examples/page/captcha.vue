<template>
	<div class="padding20">
		<div class="tag-container example">
			默认的输入，只能输入数字，在移动端弹起数字键盘并且不可切换
			<cmui-captcha></cmui-captcha>
		</div>
		<div class="tag-container example">
			设置type为text可输入任何字符，在移动端弹起默认键盘
			<cmui-captcha type="text"></cmui-captcha>
		</div>
		<div class="tag-container example">
			设置hide为true，转换为隐藏输入
			<cmui-captcha :hide="true"></cmui-captcha>
		</div>
		<div class="tag-container example">
			调节length属性控制输入数量
			<cmui-captcha :length="6"></cmui-captcha>
		</div>
	</div>
</template>
<script type="text/javascript">
	import vue from 'vue'
	import captcha from '../../src/maple/components/captcha/index'
	vue.use(captcha)
	export default{
		mounted(){
			this.$root.headTitle="captcha"
		}
	}
</script>