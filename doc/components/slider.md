# Slider
slider组件是所有滑动组件的基础类，它是基于[Swiper](https://www.swiper.com.cn/api/index.html)实现的，具体是API可以参考对应的官方文档。
## 使用方式
```html
<cmui-slider>
    <cmui-slider-item></cmui-slider-item>
</cmui-slider>
```
## 属性列表
:::tip
你可以通过给options属性传递一个object来使用Swiper的所有API，但是对于常用的API这样使用起来比较麻烦，因此我们对比较常用的API提供了额外的接口和更简单的值方便你的使用。
:::

| 属性名称 | 类型   | 默认值 | 说明                               |
| -------- | ------ | ------ | ---------------------------------- |
| options  | object | null   | Swiper初始化传递的选项详见官方文档 |
|watch | Array|null|要监控的对象，当对象改变时slider将重新渲染|
|loop|Boolean|false |是否循环播放|
|autoplay|Boolean|false |是否自动播放|
|col|Number|1 |列数|
|page|[Boolean, String, Number]|false |是否显示page|
|direction|String|'horizontal' |水平轮播还是垂直轮播|
|height|String|'' |固定轮播的高度|
|nav|Boolean|false |是否显示左右箭头|
|space|Number|0|两个item之间的距离|
|freeMode|Boolean|false|是否使用自由模式|
|scrollbar|Boolean|false|是否显示滚动条|
|control|String|''|控制器对应的ref|

## 支持的事件
slide组件将Swiper中所有的事件都进行了封装，并且采用了相同的名称和相同的参数，你可以直接使用官方文档中所支持的事件。

```vue
<template>
    <cmui-slider @touchEnd="touchEnd">
        <cmui-slider-item>item1</cmui-slider-item>
        <cmui-slider-item>item2</cmui-slider-item>
    </cmui-slider>
</template>
<script >
export default {
    methods:{
        touchEnd(event,swiper){}
    }
}
</script>

```