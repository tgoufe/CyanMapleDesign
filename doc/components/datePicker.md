# dataPicker

dataPicker组件用于创建倒计时效果。

### props

| 属性名称  |类型|默认值|说明
|---|---|---|---|
|from|Number|1970年|能选择的最早的时间
|to|Number|当前年份|能选择的最晚的时间
|now|[String,Number]|当前时间|本地时间
|border|[Boolean,String]|true|是否显示分割线，如果是字符串标识分割线颜色

### Demo
<<< @/demo/docDemo/dataPicker.vue
### event

| 事件名称  |触发时间|参数
|---|---|---|---|
| select  |点击具体日期的时候触发|moment对象

### 样式接口
<<< @/src/maple/component/datePicker/_styleInterface.scss

