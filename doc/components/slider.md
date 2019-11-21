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

<Propsintro path="slider/main.vue"></Propsintro>

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
