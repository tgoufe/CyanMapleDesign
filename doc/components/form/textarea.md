# textarea
## 基础结构

<Exp>
<div slot="exp">
<Com-Form-Textarea1></Com-Form-Textarea1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Textarea1.vue
</div>
</Exp>

## 自动适应高度
有时我们需要在用户输入的时候实时的调整输入框高度，而不是显示滚动条，此时可以设置将组件的auto属性设置为true

<Exp>
<div slot="exp">
<Com-Form-Textarea2></Com-Form-Textarea2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Textarea2.vue
</div>
</Exp>


## 限制最大输入
如果你需要限制用户输入的长度，可以指定组件的max属性为一个数字。

<Exp>
<div slot="exp">
<Com-Form-Textarea3></Com-Form-Textarea3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Textarea3.vue
</div>
</Exp>

## 组合Cyan来设置样式
为textarea绑定target-class属性即可直接使用Cyan的样式组合来实现各种样式，详见[Cyan中的表单](/Cyan/form.html#texarea)

<Exp>
<div slot="exp">
<Com-Form-Textarea4></Com-Form-Textarea4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Textarea4.vue
</div>
</Exp>

