# radio
## 基础结构
:::tip
为了保证原生表单的可用性，Cyan的表单添加了class为form的容器限制，因此如果你需要使用CMUI的表单组件，需要将组件放置在.form中
:::
```html
<div class="form">
	<cmui-ratio></cmui-ratio>
</div>
```
## 设置label标签
你可以使用默认slot或者label属性两种方式来设置ratio的标签

<Exp>
<div slot="exp">
<Com-Form-Radio1></Com-Form-Radio1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Radio1.vue
</div>
</Exp>

## 禁用状态
使用disabled属性可以设置组件为禁用状态

<Exp>
<div slot="exp">
<Com-Form-Radio2></Com-Form-Radio2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Radio2.vue
</div>
</Exp>

## 分组选择
为多个radio配置相同的name，并将v-model绑定到同一个对象上即可，label属性就是对应的值。

<Exp>
<div slot="exp">
<Com-Form-Radio3></Com-Form-Radio3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Radio3.vue
</div>
</Exp>

## 组合Cyan样式
为CheckBox绑定target-class属性即可直接使用Cyan的样式组合来实现各种样式，详见[Cyan中的表单](/Cyan/form.html#radio)

<Exp>
<div slot="exp">
<Com-Form-Radio4></Com-Form-Radio4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Radio4.vue
</div>
</Exp>

## 属性列表

<Propsintro path="form/radio.vue"></Propsintro>


