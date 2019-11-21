# datePicker

datePicker组件用于创建倒计时效果。

### 默认使用

<Exp>
<div slot="exp">
<Com-Data-Picker1></Com-Data-Picker1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Data-Picker1.vue
</div>
</Exp>



### props

| 属性名称  |类型|默认值|说明
|---|---|---|---|
|from|Number|1970|能选择的最早的时间
|to|Number|当前年份|能选择的最晚的时间
|now|Number|当前时间|本地时间(时间戳)
|border|[Boolean,String]|true|是否显示分割线，支持颜色字符串



### event

| 事件名称  |触发时间|参数
|---|---|---|---|
| select  |点击具体日期的时候触发|moment对象

### 样式接口
<<< @/src/maple/components/date-picker/_styleInterface.scss

