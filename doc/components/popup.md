# popup
popup是所有弹出层的基础类，alert confirm notice message pick等组件均继承于popup组件，如果你用到popup组件，通常情况下是要实现相对复杂的功能和布局，因此该组件仅提供组件式的调用。

### 调用方式
注意：为保持内外数据的响应，你需要在visible属性后面添加sync修饰符
```html
<cmui-popup>
    <!--some code-->
</cmui-popup>
```
### props选项

<Propsintro path="popup/main.vue"></Propsintro>


### slot

| 名称  |说明|
|---|---|
|mask|遮罩层
|  top |title区域的内容
|default|content区域的内容
|bottom|底部按钮区域的内容
### Demo
```javascript
<template>
<cmui-popup :visible.sync="visible">
    <span slot="top" class="fs-20">自定义标题</span>
    <div style="height:1000px">很高的容器</div>
    <div slot="bottom" class="flex-container">
        <span class="btn red flex1">确定</span>
        <span class="btn orange flex1" @click="visible=false">取消</span>
    </div>
</cmui-popup>
</template>
<javascript>
export default {
    data:function(){
        return{
            visible:false
        }
    }
}
</javascript>
```
## 样式接口
```scss
// 层叠样式接口
.cmui-popup{
	.cmui-popup__mask{}
	.cmui-popup__container{
		.cmui-popup__content{
			.cmui-popup__top{}
			.cmui-popup__main{}
			.cmui-popup__bottom{}
		}
	}
}
// 平行样式接口
.cmui-popup{}
.cmui-popup__mask{}
.cmui-popup__container{}
.cmui-popup__content{}
.cmui-popup__top{}
.cmui-popup__main{}
.cmui-popup__bottom{}
```
