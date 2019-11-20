# confirm
## 函数调用

<Exp>
<div slot="exp">
<Com-Confirm-1></Com-Confirm-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Confirm-1.vue
</div>
</Exp>


### options选项

| 属性名称  |类型|默认值|说明
|---|---|---|---|
|title|Strirng|''|标题(支持html)
|content|String|''|内容(支持html)
|okText|String|''|确认按钮文字
|okFn|Function||点击确认按钮执行的事件
|okStyle|Object|null|确认按钮样式
|okDisable|Boolean|true|确认按钮是否可用
|okDisableStyle|Object|null|确认按钮不可用时的样式
|cancelText|String|''|取消按钮文本|
|cancelStyle|Object|null|取消按钮样式|
|cancelFn|Function||点击取消按钮触发的回调|
|cancelDisable|Boolean|false|禁用取消按钮|
|cancelDisableStyle|Object|null|禁用取消按钮时的样式|
|visible|Boolean|false|弹窗是否可见
|targetClass|String|''|为组件设置额外的class，用于修改样式
|reverse|Boolean|false|翻转取消和确定按钮位置


## 简洁调用
大部分时候你只需要弹出一个对话框，这个时候可以使用简洁方式来调用,这里提供两种简洁调用方式

maple.confirm(content,[okFn,cancelFn,callback])

maple.confirm(title,content,[okFn,cancelFn,callback])

* 如果参数中有一个简单数据类型（字符串，数字，布尔），它将转换为字符串并作为内容显示
* 如果存在两个简单数据类型，则第一个用于显示标题，第二个用于显示内容
* 参数中的第一个函数将作为点击确定按钮后的回调函数
* 参数中的第二个函数将作为点击取消按钮后的回调函数
* 参数中的第三个函数将作为弹窗渲染后的回调函数，并传入当前confirm的DOM节点作为参数。
### Demo

<Exp>
<div slot="exp">
<Com-Confirm-2></Com-Confirm-2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Confirm-2.vue
</div>
</Exp>

## 返回值
maple.confirm方法返回一个VUE实例，并包含一个cancel方法，你可以手动关闭弹窗或者对其属性进行修改
### Demo

<Exp>
<div slot="exp">
<Com-Confirm-3></Com-Confirm-3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Confirm-3.vue
</div>
</Exp>

## 组件调用
对于内容复杂的弹窗，或者需要组合使用的弹窗，你可以使用组件的方式进行调用
注意：为保持内外数据的响应，你需要在visible属性后面添加sync修饰符
### 属性支持
和options选项完全相同
### slot

| 名称  |说明|
|---|---|
|  top |title区域的内容
|default|content区域的内容
|bottom|底部按钮区域的内容
### Demo

<Exp>
<div slot="exp">
<Com-Confirm-4></Com-Confirm-4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Confirm-4.vue
</div>
</Exp>

## 样式接口
```scss
// 层叠样式接口
.cmui-confirm__container{
    .cmui-confirm__title{}
    .cmui-confirm__body{}
    .cmui-confirm__buttons{
        .cmui-confirm__button{
            &.cmui-confirm__button{
                &.ok{}
                &.cancel{}
            }
        }
    }
}
// 平行样式接口
.cmui-confirm__container{}
.cmui-confirm__title{}
.cmui-confirm__body{}
.cmui-confirm__buttons{}
.cmui-confirm__button{}
.cmui-confirm__button.ok{}
.cmui-confirm__button.cancel{}
```