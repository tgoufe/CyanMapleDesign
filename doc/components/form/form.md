# form表单
## 基础结构
```html
<cmui-form>
	<cmui-form-item></cmui-form-item>
</cmui-form>
```

## 基础表单

<Exp>
<div slot="exp">
<Com-Form-Form1></Com-Form-Form1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Form1.vue
</div>
</Exp>


## 行内样式
借助Cyan的布局结构，只要为表单组件增加flex-container的class就可以轻松实现行内样式，实际上你可以通过布局的组合来实现各种位置的样式

<Exp>
<div slot="exp">
<Com-Form-Form2></Com-Form-Form2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Form2.vue
</div>
</Exp>

## label对齐方式
使用labelPosition属性设置label标签的位置，可选项有top left right , 默认为right

<Exp>
<div slot="exp">
<Com-Form-Form3></Com-Form-Form3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Form3.vue
</div>
</Exp>

## label自定义class
form-item的target-class属性指向label标签，你可以再次套用Cyan的样式

<Exp>
<div slot="exp">
<Com-Form-Form4></Com-Form-Form4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Form4.vue
</div>
</Exp>


## 表单验证
Form组件的表单验证功能基于[async-validator](https://github.com/yiminghe/async-validator)插件，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可

<Exp>
<div slot="exp">
<Com-Form-Form5></Com-Form-Form5>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Form5.vue
</div>
</Exp>

## 自定义校验
你可以根据需求需要，依据进行自定义的校验

:::tip
自定义校验 callback 必须被调用。 用法可参考[async-validator](https://github.com/yiminghe/async-validator)。
:::

<Exp>
<div slot="exp">
<Com-Form-Form6></Com-Form-Form6>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Form-Form6.vue
</div>
</Exp>


## form属性列表

<Propsintro path="form/form.vue"></Propsintro>

## form-item属性列表

<Propsintro path="form/form-item.vue"></Propsintro>
