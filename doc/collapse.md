# collapse

collapse组件用于创建折叠面板和手风琴效果
### props

| 属性名称  |类型|默认值|说明
|---|---|---|---|
| onlyone  |Boolean|false|是否只能打开一个选项
|activeIndex|Number,Array|[]|需要打开的索引，使用数组可以打开多个
### slot

| name  |说明
|---|---|
| title  |每一项的标题
|default|每项的内容

### Demo
```html
<template>
<cmui-collapse :onlyone="true" :activeIndex="activeIndex">
    <cmui-collapse-item :key="key" v-for="(item,key) in items">
        <div slot="title">
            {{item.title}}
        </div>
        <div>
            {{item.content}}
        </div>
    </cmui-collapse-item>
</cmui-collapse>
</template>
<script>
export default {
    data: function () {
        return {
            items: _.times(5, index => {
                return {
                    title: index,
                    content: `content ${index}`
                }
            }),
            activeIndex: 0
        }
    }
}
</script>

```

### 样式接口
```scss
//层叠样式接口
.cmui-collapse{
  .cmui-collapse-item{
    .cmui-collapse-item__header{
      .cmui-collapse-item__header__arrow{
      }
    }
    .cmui-collapse-item__bodyWarp{
      .cmui-collapse-item__body{
      }
    }
  }
}
//平行样式接口
.cmui-collapse{}
.cmui-collapse-item{}
.cmui-collapse-item__header{}
.cmui-collapse-item__header__arrow{}
.cmui-collapse-item__bodyWarp{}
.cmui-collapse-item__body{}
```

