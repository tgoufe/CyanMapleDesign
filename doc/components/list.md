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

### props(cmui-list)

<Propsintro path="list/main.vue"></Propsintro>


### props(cmui-list-item)

<Propsintro path="list-item/main.vue"></Propsintro>

### props(cmui-list-group)

<Propsintro path="list-group/main.vue"></Propsintro>

### listGroup的使用
cmui-list组件支持分组操作，并提供索引功能，借助这一特性，你可以很方便的创建诸如音乐播放列表，手机通讯录，城市选择等形式的列表，并在屏幕右侧提供索引，下面的案例请在移动端使用

<<< @/doc/.vuepress/components/listGroup.vue
