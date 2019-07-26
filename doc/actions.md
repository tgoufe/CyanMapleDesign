# actions组件
## 使用方式
~~~
maple.actions(options)
~~~

options说明

| 参数          | 说明                | 类型       | 默认值  |    |
|:------------|:------------------|:---------|:-----|:---|
| items       | 表示内容的数组           | array    | 空    |    |
| cancelText  | 取消按钮的文本           | string   | 取消   |    |
| cancelFn    | 点击取消按钮要运行的函数      | function | null |    |
| cancelStyle | 取消按钮的样式           | object   | null |    |
| itemStyle   | 每一个Item的样式        | object   | null |    |
| itemFn      | 点击item时触发的函数      | function | null |    |
| activeIndex | 添加active类的item的索引 | number   | -1   |    |

### items结构:

如果数组的每一项为基础数据类型，则将转换为字符串显示，如果是对象，需要包含text属性作为显示内容，如果有style属性则设置为该item的样式，否则使用itemStyle属性对应的样式

|  属性  |  说明  | 类型  | 说明
| --- | --- | --- | --- |
|   text|  显示的内容  | string   |  
|  style  |  显示的样式  | object  |   为单独的某个item设置样式可以用到改属性

## 简洁用法
```javascript
/*
参数中的基本数据类型将作为内容展示到每个item上
参数中的第一个函数将作为回调函数在item点击的时候被调用同时接受两个参数，被点击的item及其索引
参数中的第二个函数将作为回调函数在取消按钮被点击的时候调用
*/
maple.actions(1,2,3,4,5,(item,index)=>{
	maple.alert(`你点击了${item.text}，索引为${index}`)
},()=>{
	maple.alert('你点击了取消')
})
```

```javascript
/*
如果传递一个数组作为参数，则将数组做为items属性来是使用
如果传入了对象作为参数，则将对象作为props
*/
maple.actions(_.times(10,index=>({
    text:index,
    style:{fontSize:index+10+'px'}
})),{
    itemStyle:{
        color:'red'
    }
})
```

```javascript
/*
如果传入的对象是一个表示样式的对象，则可以直接作为通用样式显示
*/
maple(1,2,3,{color:'blue'})
//虽然你可以这样使用，但是为了保证视觉统一，我们还是建议你使用样式接口来生成通用样式
//这种使用方式仅用在覆盖通用样式的时候才会用到，比如所有的页面字体均是红色，但是只有一个页面或者一种情况字体为蓝色
```