# virtualList

一个基于Vue2.6+的虚拟列表组件，支持动态高度。

>注意: 由于在 iOS UIWebviews 中，`scroll` 事件是在滚动停止之后触发的，所以不兼容iOS UIWebviews。[了解更多](https://developer.mozilla.org/en-US/docs/Web/Events/scroll#Browser_compatibility)

## 基本使用

```html
<template>
    <cmui-virtual-list
        :listData="data" :estimatedItemSize="100" v-slot="slotProps"
    >
        <div class="context">
            {{ slotProps.item.value }}
        </div>
    </cmui-virtual-list>
</template>
```

```javascript
export default{
    data(){
        return [
            {
                value:'This is one demo~'
            },
            {
                value:'This is tow demo~'
            }
            //.....
        ]
    }
}

```

## Prop Types

|Property|Type|Default|Required?|Description|
|:--:|:--:|:--:|:--:|:--:|
|listData|Array||✓|列表所需要的数据|
|bufferScale|Number|1||在可见区域之外的上/下方预渲染比例，避免快速滑动时出现闪烁|
|estimatedItemSize|Number|150||列表项的预估高度，用于预先计算可视区域的显示项数|
|height|String|100%||包裹元素的高度。|

## Demo

同时渲染10000条记录，列表项高度由内容自动撑开：

<div style="border:1px solid #999;padding:10px">
    <VirtualListDemo></VirtualListDemo>
</div>

