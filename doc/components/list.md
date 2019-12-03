# list
list组件是非常强大的布局组件，你可以用这个组件来创建任意比例的网格布局。包含三个部分
1. cmui-list:外部容器
2. cmui-list-group:内容分组
3. cmui-list-item:内容项
## 基础结构
```html
<cmui-list>
	<cmui-list-item></cmui-list-item>
</cmui-list>
```

## 创建N列的列表
使用col属性可以设置列表的列数，它支持数字和数组两种形式，如果为数字，表示列数，所有列宽度平均分配，如果是数组，数组的长度表示列数，数组中的每个数字表示对应列所比例，即【2，3】表示以2：3的宽度分成两列

<Exp>
<div slot="exp">
<Com-List1></Com-List1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/List1.vue
</div>
</Exp>

## 调整间距

<Exp>
<div slot="exp">
<Com-List2></Com-List2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/List2.vue
</div>
</Exp>

## 设置边框
设置border属性可以为每个单元格设置边框，如果是布尔类型则使用默认边框颜色，如果是字符串，则使用字符串对应的颜色。

<Exp>
<div slot="exp">
<Com-List3></Com-List3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/List3.vue
</div>
</Exp>


## 分组显示
套用cmui-list-group可以进行分组显示

<Exp>
<div slot="exp">
<Com-List4></Com-List4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/List4.vue
</div>
</Exp>

## 分组索引
设置list组件的index属性为true可以生成group的索引，你一扫描下面的二维码查看效果。
```html
<cmui-list :index="true">
	<cmui-list-group>
		<cmui-list-item></cmui-list-item>
	</cmui-list-group>
</cmui-list>
```
![](http://image.cyanmaple.design/1574754067.png)

### props(cmui-list)

<Propsintro path="list/main.vue"></Propsintro>


### props(cmui-list-item)

<Propsintro path="list-item/main.vue"></Propsintro>

### props(cmui-list-group)

<Propsintro path="list-group/main.vue"></Propsintro>

