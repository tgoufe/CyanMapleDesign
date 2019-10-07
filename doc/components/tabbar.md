# tabbar
选项卡组件
## 使用方式
```html
<cmui-tabbar>
    <cmui-tabbar-item title="123">123</cmui-tabbar-item>
    <cmui-tabbar-item title="456">456</cmui-tabbar-item>
</cmui-tabbar>
```
## 属性列表
| 属性名称 | 类型   | 默认值 | 说明                               |
| -------- | ------ | ------ | ---------------------------------- |
|col|[String,Number]|'auto'|nav的列数,如果为数字则将nav分成对应的份数，如果item数量超过col则滚动显示|
|activeIndex|Number|0|活动的索引|
|nav|Array|[false,false]|是否显示左右导航|
|watch|Array|null|要监控的对象|
|position|String|'top'|nav栏的位置，你可以在top bottom right left中任选其一|
## slot
extra：额外的DOM节点，可以有多个
## 支持的事件
|事件名称|参数|触发条件
|---|---|---|
|extra-click|this,item,index|extra点击的时候触发。
|item-click|this,...arguments|item被点击的时候触发。
## 设置item的title
你可以使用两种方式设置item的title

1.设置cmui-tabbar-item的title属性

2.为cmui-tabbar-item添加slot="title"的插槽

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