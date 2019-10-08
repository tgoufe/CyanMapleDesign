# Scroll
scroll组件继承于slider组件，是基于iswiper实现的，在使用的时候需要和scroll-item一起使用，主要用于制作某个容器内的滑动列表，支持横向和纵向滑动，同时封装了下拉刷新和上拉加载以及相关事件，方便使用。
## 使用方式
```html
<cmui-scroll>
    <cmui-scroll-item></cmui-scroll-item>
</cmui-scroll>
```
## 属性列表
|属性名称|类型|默认值|说明
|---|---|---|---|
|col|String Number|auto|如果为auto则不固定列数，如果为数字类型则表示列数
|direction|String|'h'|滚动的方向，可选值是h和v
|watch|Object|null|要监控的内容，通常是在scroll-item中v-for对应的内容，当内容变化时会更新滚动容器
|pullDis|Number|50|边缘滑动距离，超过这个距离将触发对应事件
|pullEvent|Boolean|true|是否使用pull事件，如果为false，边缘滑动对应的事件不会触发
|freeMode|Bolean|true|是否使用free模式，如果为false，将以scroll-item为组进行滑动
|pullText|Array|[]|边缘滑动需要展示的文本，支持4种状态，通常写成'下拉刷新','释放刷新','上拉加载','释放加载'，你也可以替换成其他的文本或HTML
## 支持的事件
|事件名称|参数|触发条件
|---|---|---|
|pullStart|vm|顶部或左侧滑动距离超过pullDis的时候触发
|pullEnd|vm|底部或右侧滑动距离超过pullDis的时候触发
|pull|progress|滑动过程中连续触发progress进度，超过1说明滑动到了底部或右侧，小于0说明滑动到了顶部或左侧
|rendered|vm|渲染完成后触发
## demo
<<< @/doc/.vuepress/components/scroll.vue
<Scroll />