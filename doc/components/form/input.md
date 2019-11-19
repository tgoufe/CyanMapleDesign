# input
## 基础结构
```html
<cmui-input></cmui-input>
```
## 设置label标签
组件默认的slot将作为label进行展示，同时你也可以使用label属性来设置标签
:::warning
label属性在初始状态下不包含任何样式，因此，如果你需要这种方式你需要自行添加对应样式
:::

<Exp>
<div slot="exp">
<Com-Form-Input1></Com-Form-Input1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input1.vue
</div>
</Exp>

## 使用align设置标签位置
为组件添加flex属性可以转换为两端对齐的结构，但是通常情况下你需要根据设计需求并使用width属性设置input的宽度

<Exp>
<div slot="exp">
<Com-Form-Input8></Com-Form-Input8>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input8.vue
</div>
</Exp>

## 禁用状态

<Exp>
<div slot="exp">
<Com-Form-Input3></Com-Form-Input3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input3.vue
</div>
</Exp>

## 可以清空

<Exp>
<div slot="exp">
<Com-Form-Input4></Com-Form-Input4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input4.vue
</div>
</Exp>

## 设置前置和后置文本
你可以使用slot或属性两种方式来设置前置和后置

<Exp>
<div slot="exp">
<Com-Form-Input2></Com-Form-Input2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input2.vue
</div>
</Exp>



## 禁用前置和后置文本
你可以使用prependDisabled和appendDisabled属性来设置前置文本和后置文本是否启用

<Exp>
<div slot="exp">
<Com-Form-Input9></Com-Form-Input9>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input9.vue
</div>
</Exp>


## 组合Cyan来设置样式
你可以使用slot或属性两种方式来设置前置和后置

<Exp>
<div slot="exp">
<Com-Form-Input5></Com-Form-Input5>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input5.vue
</div>
</Exp>


## 使用type切换类型

<Exp>
<div slot="exp">
<Com-Form-Input6></Com-Form-Input6>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input6.vue
</div>
</Exp>

## 使用flex结构
为组件添加flex属性可以转换为两端对齐的结构，但是通常情况下你需要根据设计需求并使用width属性设置input的宽度

<Exp>
<div slot="exp">
<Com-Form-Input7></Com-Form-Input7>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Input7.vue
</div>
</Exp>



