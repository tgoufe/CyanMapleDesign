# virtualList

一个基于Vue2.6+的虚拟列表组件，支持动态高度。

>注意: 由于在 iOS UIWebviews 中，`scroll` 事件是在滚动停止之后触发的，所以不兼容iOS UIWebviews。[了解更多](https://developer.mozilla.org/en-US/docs/Web/Events/scroll#Browser_compatibility)

## 基本使用

```html
<template>
    <cmui-virtual-list
        :list-data="data"
        :estimated-item-size="100"
        v-slot="slotProps"
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
                value:'Est quo tempora consequatur......'
            },
            {
                value:'Excepturi magni hic deserunt......'
            }
            //.....
        ]
    }
}

```


## 下拉刷新

```html
<template>
    <cmui-virtual-list
        ref="vlist"
        :list-data="data"
        :estimated-item-size="100"
        :top-load-more="true"
        :top-method="update"
        v-slot="slotProps"
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
                value:'Est quo tempora consequatur......'
            },
            {
                value:'Excepturi magni hic deserunt......'
            }
            //.....
        ]
    },
    methods:{
        update(){
            let data = [
                {
                    value:'This is one demo~'
                },
                {
                    value:'This is tow demo~'
                }
                //.....
            ];
            this.data = data;
            this.$refs.vlist.onBottomLoaded();
        },
    }
}

```

## 属性列表

<Propsintro path="virtualList/main.vue"></Propsintro>


## 事件

|事件名称|回调参数|说明|
|:--:|:--:|:--:|
|top-status-change|顶部刷新区域状态变更时触发|提示区域状态|

## 提示区状态说明

|状态|说明|
|:--:|:--|
|pull|开始拖拽，距离未达到topDistance|
|drop|距离达到 topDistance 释放触发 topMethod|
|loading|已被释放，topMethod 已经执行|
|none|刷新完成或未触发刷新动作|

## 插槽

|名称|说明|插槽Prop|
|:--:|:--:|:--|
|default|默认插槽|item:列表项当前数据<br>row:当前项在整体中的行数<br>col:当前项在当前行中的列数|
|top|顶部提示区插槽|dargState:顶部刷新提示区的状态<br>dargDistance:顶部刷新提示区的距离|

## Demo

同时渲染10000条记录，列表项高度由内容自动撑开：

<Exp>
<div slot="exp">
<div style="border:1px solid #999;padding:10px">
    <VirtualListDemo></VirtualListDemo>
</div>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/VirtualListDemo.vue
</div>
</Exp>

