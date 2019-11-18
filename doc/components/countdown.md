# countdown

countdown组件用于创建倒计时效果。
:::tip
需要注意的是该组件的分隔符使用CSS伪类的content来控制，默认是冒号，如果你需要其他的展示形式可以重写对应的CSS
:::
### props

| 属性名称  |类型|默认值|说明
|---|---|---|---|
|nowTime|Number|new Date|用于设置当前的时间，通常取服务器时间，默认取本地时间
|endTime|Number|0|倒计时的结束时间
|showDay|Boolean|false|是否显示天
|showMilli|Boolean|false|是否显示毫米

### Demo

<Exp>
<div slot="exp">
<Com-Countdown-1></Com-Countdown-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Countdown-1.vue
</div>
</Exp>


### event

| 事件名称  |触发时间|参数
|---|---|---|---|
| update  |每次时间发生更新，如果设置了showMilli为true，则每100毫秒触发一次，否则每秒触发一次|time,vm
|countdownend|倒计时结束时触发|vm

### 样式接口

:::tip
说明：通常情况下你可能需要xxx天xxx小时xxx分这样的展示形式，那么你可以采用下面的这种样式
  <pre style="color:white">
  .countdown-container{
        &.day:after{content:'天'}
        &.hour:after{content:'小时'}
        &.minute:after{content:'分'}
        &.sec:after{content:'秒'}
        &.millSec:after{content:'毫秒'}
  }
</pre>
  
:::
