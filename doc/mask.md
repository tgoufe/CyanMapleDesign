# mask
## 使用方法
```javascript
maple.mask(options)
```
### options

|属性名称|类型|默认值|说明
|---|---|---|---|
| position|String|center|内容的位置，继承于flex-container，可以使用top，left，bottom，right，center，between中的任意一项或两项配合
| content|HTML|空|遮罩内部的内容
| closeFn|Function|空|关闭遮罩时的事件
| callback|function|空|遮罩渲染完成后的回调
| contentStyle|Object|null|内容样式
## 简洁用法
```javascript
maple.mask(content,[position,callback,options])
```
> 注：实际上你可以任意颠倒参数的位置，参数中包含top，left，bottom，right，center，between中的任意一项的字符串将作为position参数被识别，比如maple.mask('top center','this is a text')