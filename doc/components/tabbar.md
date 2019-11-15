# tabbar
选项卡组件
```html
<cmui-tabbar>
	<cmui-tabbar-item :title="title">content</cmui-tabbar-item>
</cmui-tabbar>
```
## 默认使用
<Exp>
<div slot="exp">
<Com-Tabbar-1></Com-Tabbar-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Tabbar-1.vue
</div>
</Exp>

## 设置item的title
你可以使用两种方式设置item的title

1.设置cmui-tabbar-item的title属性
```html
<cmui-tabbar-item :title="title">content</cmui-tabbar-item>
```
2.为cmui-tabbar-item添加slot="title"的插槽 [查看插槽使用](#slot插槽)

## 设置nav排列方式
col属性用于设置nav的排列方式，默认为auto，如果nav的总宽度超出容器则会滚动显示，如果设置为数字，表示平分为N列，如果item数量超过col则滚动显示
:::warning
滚动的实现是基于浏览器实现的，并且隐藏了滚动条，因此仅在移动端可用
:::
下面的案例展示了三列的布局，在移动端下可横向滑动

<Exp>
<div slot="exp">
<Com-Tabbar2></Com-Tabbar2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Tabbar2.vue
</div>
</Exp>

## slot插槽
tabbar提供了两个类型的插槽

1.title：用于更细致的处理title，每个item仅可以使用一个

2.extra：用于设置额外的功能区域，每个tabbar可以使用多个。

<Exp>
<div slot="exp">
<Com-Tabbar3></Com-Tabbar3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Tabbar3.vue
</div>
</Exp>

## 导航控制
tabbar提供了nav属性用于控制标签栏的导航显示，他是有两个布尔类型的值组成的数组，分别表示左右两端的导航是否显示。

<Exp>
<div slot="exp">
<Com-Tabbar4></Com-Tabbar4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Tabbar4.vue
</div>
</Exp>

## 方向控制
tabbar提供了position属性，用于控制nav的方向，默认为top，你可以在top bottom right left中任选其一

<Exp>
<div slot="exp">
<Com-Tabbar5></Com-Tabbar5>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Tabbar5.vue
</div>
</Exp>

## 属性列表
| 属性名称 | 类型   | 默认值 | 说明                               |
| -------- | ------ | ------ | ---------------------------------- |
|col|[String,Number]|'auto'|nav的列数,如果为数字则将nav分成对应的份数，如果item数量超过col则滚动显示|
|activeIndex|Number|0|活动的索引|
|nav|Array|[false,false]|是否显示左右导航|
|watch|Array|null|要监控的对象|
|position|String|'top'|nav栏的位置，你可以在top bottom right left中任选其一|


## 支持的事件
|事件名称|参数|触发条件
|---|---|---|
|extra-click|this,item,index|extra点击的时候触发。
|item-click|this,...arguments|item被点击的时候触发。


## 样式接口
```scss
.cmui-tabbar{
	.cmui-tabbar__head{
		.cmui-tabbar__pre{}
		.cmui-tabbar__next{}
		.cmui-tabbar__nav{
			@at-root.cmui-tabbar-top#{&}{}
			@at-root.cmui-tabbar-left#{&}{}
			@at-root.cmui-tabbar-right#{&}{}
			@at-root.cmui-tabbar-bottom#{&}{}
			.cmui-tabbar__head-item{
				&.active{

				}
			}
		}
	}
	.cmui-tabbar__content{
		.cmui-tabbar__pane{
			.cmui-tabbar__pane-item{
				[slot="content"]{

				}
			}
		}
	}
}
```
