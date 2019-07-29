# alert
## 函数调用
maple.alert(options)
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
|visible|Boolean|false|弹窗是否可见
|targetClass|String|''|为组件设置额外的class，用于修改样式

### Demo
```javascript
maple.alert({
    title:'alert Demo',
    content:'this is a content you can use html code here'
})
```

## 简洁调用
大部分时候你只需要弹出一个对话框，这个时候可以使用简洁方式来调用,这里提供两种简洁调用方式

maple.alert(content,[okFn,callback])

maple.alert(title,content,[okFn,callback])

* 如果参数中有一个简单数据类型（字符串，数字，布尔），它将转换为字符串并作为内容显示
* 如果存在两个简单数据类型，则第一个用于显示标题，第二个用于显示内容
* 参数中的第一个函数将作为点击确定按钮后的回调函数
* 第二个函数将作为弹窗渲染后的回调函数，并传入当前alert的DOM节点作为参数。
### Demo
```javascript
maple.alert('我是内容区域',()=>{
    console.log('确定按钮被点击了')
},el=>{
    console.log('弹窗弹出，当前节点为');
    console.log(el);
})
```

## 返回值
maple.alert方法返回一个VUE实例，并包含一个cancel方法，你可以手动关闭弹窗或者对其属性进行修改
### Demo
```javascript
let alertVM=maple.alert('title');
alertVM.title='new title';//修改标题
alertVM.content='new Content';//修改内容
alertVM.okStyle={color:'red'}//修改按钮样式
alertVM.cancel();//关闭弹窗
```

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
```javascript
<template>
    <div class="btn" @click="visible=!visible">change</div>
    <cmui-alert :visible.sync="visible">
        <span slot="top">{{title}}</span>
       <input v-model="inputValue"/>
        <span slot="bottom">{{bottom}}</span>
    </cmui-alert>
</template>
<javascript>
    export default {
        data:function(){
            return{
                visible:false,
                title:'这是一个标题',
                inputValue:'input内容',
                bottom:'自定义底部按钮'
            }
        }
    }
</javascript>
```
## 样式接口
```scss
.cmui-alert__container{
    .cmui-alert__title{}
    .cmui-alert__body{}
    .cmui-alert__buttons{
        .cmui-alert__button{}
    }
}
```