# affix 组件
affix组件用于固定内容，使其不随页面滚动，如果是简单的效果，你也可以使用class="pos-s"，粘性布局代替。
## 使用方式
```javascript
<template>
    <cmui-affix :top='top' @change="onChange">
        <span> this is a affix title</span>
    </cmui-affix>
</template>
<javascript>
    export default {
        data:function(){
            return {
                top:20
            }
        },
        methods:{
            onChange(state){
                console.log(state?'affix触发了':'affix取消了')
            }
        }
    }
</javascript>
```
## 支持的属性

<Propsintro path="affix/main.vue"></Propsintro>

## 抛出的事件
change：affix状态改变的时候触发，传递一个布尔类型的参数，表示affix的状态，与此同时，当affix被触发的时候，在对应的DOM节点上增加两个class，warpActive
affixActive，以方便你进行样式的调整

## 样式接口
```scss
.cmui-affix-warp{
  &.warpActive{}
  .cmui-affix{
    &.affixActive{}
  }
}
```
