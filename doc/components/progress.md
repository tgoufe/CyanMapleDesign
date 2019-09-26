# progress

## 属性列表
|属性名称|类型|默认值|说明
|---|---|---|---|
|value|Number|0|进度条数值范围为0-100
|color|String Array|'red'|进度条颜色，如果需要使用渐变色可以使用数组，数组的每一项为一个表示颜色的字符串
|bgcolor|String|#cccccc|背景色
|lineWidth|Number|2|线宽
|type|String|line|进度条样式可选项：line top circle
|radius|Boolean|false|进度条是否使用圆角
|text|String|''|内容文字
|size|Number|20|环形进度条尺寸，仅在type为circle时生效
## 样式接口
```scss
层叠样式接口
.cmui-progress_warp{
	.cmui-progress_bar{
		.cmui-progress_bg{}
		.cmui-progress_info{}
	}
}
```
## demo
<<< @/doc/.vuepress/components/progress.vue
<Progress />
