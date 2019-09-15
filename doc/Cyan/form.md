# 表单
## 使用方式
:::tip
如果你需要使用Cyan的表单样式，只需要将表单元素包裹在form类中即可。
:::
<Cyan-Import/>
## input
为input节点添加以下class可以获得额外的展示样式
|类名|作用|
|---|---|
|focus|获取焦点样式，可手动添加class触发，也可以通过点击的方式触发|
|radius|为input增加圆角
|disabled|禁用
|reverse|翻转样式
|transparent|透明样式

```html
<div class="form">
    <label>some text
        <input type="text" class="radius red">
    </label>
</div>
```
**Demo**
<div class="form">
    <label>some text
        <input type="text" class="radius red">
    </label>
</div>

## radio
为radio节点增加以下class可以获得额外的展示样式，我们提供了三种样式供你使用，分别是默认的点样式，square方形样式，right对号样式，每种样式均可以和reverse组合进行翻转，共计6种样式
|类名|作用|
|---|---|
|disabled|禁用
|reverse|翻转样式
|square|转换为正方形样式
|right|转换为对号样式

<div class="form">
    <label>默认样式
        <input type="radio" checked name="default" class="">
        <input type="radio" name="default" class="">
    </label>
    <label>默认翻转
    <input type="radio" checked name="defaultReverse" class="reverse">
    <input type="radio" name="defaultReverse" class="reverse"></label>
</div>
<div class="form">
    <label>方形样式
    <input type="radio" checked name="square" class="square ">
    <input type="radio" name="square" class="square "></label>
    <label>方形翻转
    <input type="radio" checked name="squareReverse" class="square reverse">
    <input type="radio" name="squareReverse" class="square reverse"></label>
</div>
<div class="form">
    <label>对号样式
    <input type="radio" checked name="right" class="right">
    <input type="radio" name="right" class="right"></label>
    <label>对号翻转
    <input type="radio" checked name="rightReverse" class="rightreverse">
    <input type="radio" name="rightReverse" class="rightreverse"></label>
</div>

## checkbox
checkbox的使用和ratio几乎完全相同，为checkbox节点增加以下class可以获得额外的展示样式

同样提供了三种样式供你使用，分别是**默认样式是对号样式**，square方形样式，switch滑动样式，除switch之外均可以和reverse组合进行翻转，共计5种样式
|类名|作用|
|---|---|
|disabled|禁用
|reverse|翻转样式
|square|转换为正方形样式
|switch|转换为滑动样式

<div class="form">
    <label>默认样式
        <input type="checkbox" checked name="default" class="">
    </label>
    <label>默认翻转
    <input type="checkbox" checked name="defaultReverse" class="reverse">
    </label>
</div>
<div class="form">
    <label>方形样式
    <input type="checkbox" checked name="square" class="square ">
    </label>
    <label>方形翻转
    <input type="checkbox" checked name="squareReverse" class="square reverse">
    </label>
</div>
<div class="form">
    <label>滑动样式
    <input type="checkbox" checked name="switch" class="switch">
    </label>
</div>

## select text-area
select和text-area支持下面三种辅助class
|类名|作用|
|---|---|
|disabled|禁用
|reverse|翻转样式
|radius|增加圆角
<div class="form">
    <label>select
        <select>
            <option>1</option>
            <option>2</option>
        </select>
    </label>
    <label>textarea
        <textarea/>
    </label>
</div>

## 颜色控制
表单元素继承与色彩系统。如果你需要修改默认的颜色可以修改_variables中的$form-color-base；如果你需要修改整个表单的颜色，直接为class为form的容器增加对应的颜色即可
```html
<!--在容器上增加颜色即可，可选值默认为red orange yellow green coffee blue pupple-->
<div class="form red">
    <label>input <input type="text"></label>
</div>
```
<div class="form red">
    <p>红色表单案例</p>
    <label>input <input type="text"></label>
    <label>radio 
        <input type="radio" checked name="red">
        <input type="radio" name="red">
    </label>
    <label>checkbox 
        <input type="checkbox" checked>
        <input type="checkbox" class="switch">
    </label>
</div>

## 尺寸控制
表单元素的尺寸继承于按钮尺寸列表，如果你需要对尺寸进行修改或增加可以直接修改_variables中的$btn-size-list，注意，这也将同时修改按钮的尺寸和命名。

之所以这么做是因为再很多时候表单元素会和按钮同时使用，这样可以保持页面视觉上的美观。

如果你需要修改表单元素的尺寸，可以直接在表单元素上增加表示尺寸的class默认为big或small。
```html
<div class="form">
    <label for="btn">
        <input type="text" class="big">
    </label>
</div>
```
<div class="form">
    <label for="small">small
        <input type="checkbox" class="small">
        <input type="checkbox" class="small switch">
    </label>
    <label for="small">default
        <input type="checkbox" class="">
        <input type="checkbox" class="switch">
    </label>
    <label for="big">big
        <input type="checkbox" class="big">
        <input type="checkbox" class="big switch">
    </label>
</div>

## 表单组
```html
<div class="inputGroup">
    <div class="input_addon"></div>
    <input type="text">
    <input type="text">
    <div class="input_addon"></div>
</div>
```
<div class="form">
    <div class="inputGroup radius">
        <div class="input_addon">www</div>
        <input type="text">
        <div class="input_addon">com</div>
    </div>
</div>