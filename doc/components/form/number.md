# number
number组件是用于创建数字输入框
## 基础结构

<Exp>
<div slot="exp">
<Com-Form-Number1></Com-Form-Number1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Number1.vue
</div>
</Exp>

## 设置范围
使用max 和 min 属性可以配置允许输入的最大值和最小值

<Exp>
<div slot="exp">
<Com-Form-Number2></Com-Form-Number2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Number2.vue
</div>
</Exp>

## 动态控制按钮状态
有些时候我们需要在组件外根据某些情况来设置是否可以使用左右按钮，此时可以使用canAdd和canSub属性进行控制。

<Exp>
<div slot="exp">
<Com-Form-Number3></Com-Form-Number3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Number3.vue
</div>
</Exp>

## 步长控制
默认情况下点击加减按钮会进行步长为1的变换，你可以使用setp属性来修改步长

<Exp>
<div slot="exp">
<Com-Form-Number4></Com-Form-Number4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Number4.vue
</div>
</Exp>

## 精度控制
默认的精度为0，即只保留正数，你可以使用precision属性来对精度进行修改

<Exp>
<div slot="exp">
<Com-Form-Number5></Com-Form-Number5>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Number5.vue
</div>
</Exp>

## 组合Cyan来设置样式
为number绑定target-class属性即可直接使用Cyan的样式组合来实现各种样式，详见[Cyan中的表单](/Cyan/form.html#input)

<Exp>
<div slot="exp">
<Com-Form-Number6></Com-Form-Number6>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Number6.vue
</div>
</Exp>

## 属性列表

<Propsintro path="form/number.vue"></Propsintro>
