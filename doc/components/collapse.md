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

<Exp>
<div slot="exp">
<Com-Collapse></Com-Collapse>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Collapse.vue
</div>
</Exp>

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

