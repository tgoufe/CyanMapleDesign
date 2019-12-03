# Scroll
scroll组件继承于slider组件，是基于iswiper实现的，在使用的时候需要和scroll-item一起使用，主要用于制作某个容器内的滑动列表，支持横向和纵向滑动，同时封装了下拉刷新和上拉加载以及相关事件，方便使用。
## 使用方式
```html
<cmui-scroll>
    <cmui-scroll-item></cmui-scroll-item>
</cmui-scroll>
```
## 横向展示及属性绑定
<Exp>
<div slot="exp">
    <Com-Scroll-1/>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Scroll-1.vue
</div>
</Exp>

## 纵向展示及事件绑定
<Exp>
<div slot="exp">
    <Com-Scroll-2/>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Scroll-2.vue
</div>
</Exp>

## 属性列表

<Propsintro path="scroll/main.vue"></Propsintro>

## 支持的事件
|事件名称|参数|触发条件
|---|---|---|
|pullStart|vm|顶部或左侧滑动距离超过pullDis的时候触发
|pullEnd|vm|底部或右侧滑动距离超过pullDis的时候触发
|pull|progress|滑动过程中连续触发progress进度，超过1说明滑动到了底部或右侧，小于0说明滑动到了顶部或左侧
|rendered|vm|渲染完成后触发

