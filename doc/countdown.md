# countdown

countdown组件用于创建倒计时效果，需要注意的是该组件的分隔符使用CSS伪类的content来控制，默认是冒号，如果你需要其他的展示形式可以重写对应的CSS
### props

| 属性名称  |类型|默认值|说明
|---|---|---|---|
|nowTime|Number|new Date|用于设置当前的时间，通常取服务器时间，默认取本地时间
|endTime|Number|0|倒计时的结束时间
|showDay|Boolean|false|是否显示天
|showMilli|Boolean|false|是否显示毫米

### Demo
```html

<template>
<cmui-countdown
        :end-time="endTime1"
        :show-day="showDay"
        :show-milli="showMilli"
        @countdownend="countdownend"
/>
</template>

<script>
    export default {
        name: "countdown",
        data:function(){
            return{
                endTime1:+new Date + 100000000,
                showDay:false,
                showMilli:true
            }
        },
        methods:{
            countdownend(){
                console.log('倒计时结束了')
            }
        }
    }
</script>
```
### event

| 事件名称  |触发时间|参数
|---|---|---|
| update  |每次时间发生更新，通常是1秒，如果设置了showMilli为true，则会更短|无
|countdownend|倒计时结束时触发|vm

### 样式接口
```scss
//层叠样式接口
.cmui-countdown{
  .countdown-container{
    &:not(:last-child){
      &:after{}//这里默认的content是冒号，如果需要其他样式可以进行覆盖
    }
    &.day{}
    &.hour{}
    &.minute{}
    &.sec{}
    &.millSec{}
  }
}
//平行样式接口
.cmui-countdown{}
.countdown-container{}
.countdown-container:not(:last-child){}
.countdown-container:not(:last-child):after{}
.countdown-container.day{}
.countdown-container.hour{}
.countdown-container.minute{}
.countdown-container.sec{}
.countdown-container.millSec{}
/*
说明：通常情况下你可能需要xxx天xxx小时xxx分这样的展示形式，那么你可以采用下面的这种样式
  .countdown-container{
    &.day:after{content:'天'}
    &.hour:after{content:'小时'}
    &.minute:after{content:'分'}
    &.sec:after{content:'秒'}
    &.millSec:after{content:'毫秒'}
  }
*/
```

