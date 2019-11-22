# picker
pick组件用于创建类似于在IOS上的select原生效果。
## 默认使用

<Exp>
<div slot="exp">
    <Com-Picker-1></Com-Picker-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Picker-1.vue
</div>
</Exp>

### 属性列表
<Propsintro path="picker/main.vue"></Propsintro>
> data详细描述：传入的data必须为一个数组
> * 只有一列选项:可以传入一个一维数组，数组的每一项可以是字符串，也可以是{text,value}结构的对象
> * 有多列选项:可以传入二维数组，每一个数组项代表一列
> * 如果是有关联关系的级联选择器，如月份和日期，省份和城市等，可以将{text,value}结构修改为{text,value,children}结构,children为一个数组，代表当前项被选中后，下一列所展示的内容。
### 事件列表
|事件名称|传递的参数|说明
|---|---|---|
|select|Array|返回一个数组，表示被选择的项，数组的每一项是一个对象，包含text,value两个属性。
|cancel|无|

## 多列选择器
可以传入二维数组，每一个数组项代表一列

<Exp>
<div slot="exp">
    <Com-Picker-2></Com-Picker-2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Picker-2.vue
</div>
</Exp>

## 关联选择器
将{text,value}结构修改为{text,value,children}结构,children为一个数组,代表当前项被选中后，下一列所展示的内容.

<Exp>
<div slot="exp">
    <Com-Picker-3></Com-Picker-3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Picker-3.vue
</div>
</Exp>

## 时间选择器
时间选择器可以被当做一种特殊的关联选择器。

<Exp>
<div slot="exp">
    <Com-Picker-4></Com-Picker-4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Picker-4.vue
</div>
</Exp>

## 简洁用法
很多时候我们需要的仅仅是一种不同的展示样式，这时可以使用简洁用法
```javascript
maple.picker(data,title,rightFn,leftFn);
```
> 在实际使用的时候你也可以调换参数的顺序，实际上在我们是按照如下规则判断参数的
> * data:参数中的数组
> * title:参数中的字符串
> * rightFn:第一个函数
> * leftFn:第二个函数
