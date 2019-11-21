# Slidebar
slidebar组件用于创建一个滑动条
## 使用方式

<Exp>
<div slot="exp">
<Com-Slidebar-1></Com-Slidebar-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Slidebar-1.vue
</div>
</Exp>

```html
<cmui-slidebar></cmui-slidebar>
```
## 属性列表
|属性名称|类型|默认值|说明
|---|---|---|---|
|value|Number|0|当前的值
|step|Number|0|每次滑动的最小单位
|range|Number|100|滑动的范围
## 支持的事件
|事件名称|参数|触发条件
|---|---|---|
|change|value|滑动的时候出发
## 样式接口
```scss
.cmui-slidebar{
  .cmui-slidebar__warp{
    .cmui-slidebar__bar{
      .cmui-slidebar__progress{}
      .cmui-slidebar__dot{}
    }
  }
}
```