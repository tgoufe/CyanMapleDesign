# checkbox
## 基础结构
:::tip
为了保证原生表单的可用性，Cyan的表单添加了class为form的容器限制，因此如果你需要使用CMUI的表单组件，需要将组件放置在.form中
:::
```html
<div class="form">
	<cmui-checkbox></cmui-checkbox>
</div>
```
## 设置label标签
你可以使用默认slot或者label属性两种方式来设置CheckBox的标签

<Exp>
<div slot="exp">
<Com-Form-Checkbox1></Com-Form-Checkbox1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Checkbox1.vue
</div>
</Exp>

## 禁用状态
使用disabled属性可以设置组件为禁用状态

<Exp>
<div slot="exp">
<Com-Form-Checkbox2></Com-Form-Checkbox2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Checkbox2.vue
</div>
</Exp>


## 多选
CheckBox的model需要绑定一个Boolean类型的值来表示其是否为选中状态，在大部分需求中它对应的是某个对象上的属性，如果你需要对选中的项进行对应的文本输出或展示，请使用computed来获得一个计算值。

<Exp>
<div slot="exp">
<Com-Form-Checkbox3></Com-Form-Checkbox3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Checkbox3.vue
</div>
</Exp>

## 关联选择和indeterminate 状态
为checbox的v-model绑定一个数组，即可关联数组下所有的值从而快速完成全选，反选，以及不确定状态的切换。

:::tip
如果v-model绑定了一个数组，默认状态下CheckBox会直接将每一项取布尔类型进行使用，但是通常我们绑定的都会是一个对象，因此需要使用path属性指定取值的路径
:::

<Exp>
<div slot="exp">
<Com-Form-Checkbox4></Com-Form-Checkbox4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Checkbox4.vue
</div>
</Exp>

## 组合Cyan样式
为CheckBox绑定target-class属性即可直接使用Cyan的样式组合来实现各种样式，详见[Cyan中的表单](/Cyan/form.html#checkbox)

<Exp>
<div slot="exp">
<Com-Form-Checkbox5></Com-Form-Checkbox5>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Checkbox5.vue
</div>
</Exp>
