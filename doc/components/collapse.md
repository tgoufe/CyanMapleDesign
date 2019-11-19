# collapse

collapse组件用于创建折叠面板和手风琴效果

## 创建折叠面板 

<Exp>
<div slot="exp">
<Com-Collapse-1></Com-Collapse-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Collapse-1.vue
</div>
</Exp>

## 创建手风琴效果
通过onlyone属性可控制面板是否可以同时打开，为true时，只能单个打开，相反，为false时可同时打开多个面板

<Exp>
<div slot="exp">
<Com-Collapse-2></Com-Collapse-2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Collapse-2.vue
</div>
</Exp>

## props属性列表

| 属性名称  |类型|默认值|说明
|---|---|---|---|
| onlyone  |Boolean|false|是否只能打开一个选项
|activeIndex|Number,Array|[]|需要打开的索引，使用数组可以打开多个
## slot说明

| name  |说明
|---|---|
| title  |每一项的标题
|default|每项的内容


## 样式接口
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

