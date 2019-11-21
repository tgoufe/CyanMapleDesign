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
<Propsintro path="slidebar/main.vue"></Propsintro>

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
