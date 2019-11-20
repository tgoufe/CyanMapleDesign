# select
## 基础结构
select组件用于创建下拉菜单，它的data属性可以接受一个数组来表示option选项，默认情况下会直接将data的值同时用作显示和计算

<Exp>
<div slot="exp">
<Com-Form-Select1></Com-Form-Select1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Select1.vue
</div>
</Exp>

## 自定义value
select会将data的内容转换为{text,value}结构，如果你希望显示的值和得到的值不相同，可以自己生成对应的结构

<Exp>
<div slot="exp">
<Com-Form-Select2></Com-Form-Select2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Select2.vue
</div>
</Exp>

## 禁用状态
设置disabled属性为true可以将select修改为禁用状态

<Exp>
<div slot="exp">
<Com-Form-Select3></Com-Form-Select3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Select3.vue
</div>
</Exp>

## picker模式
设置picker属性为true可以将select修改为picker模式

<Exp>
<div slot="exp">
<Com-Form-Select4></Com-Form-Select4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Select4.vue
</div>
</Exp>

## 组合Cyan来设置样式
为number绑定target-class属性即可直接使用Cyan的样式组合来实现各种样式，详见[Cyan中的表单](/Cyan/form.html#select)

<Exp>
<div slot="exp">
<Com-Form-Select5></Com-Form-Select5>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Select5.vue
</div>
</Exp>
