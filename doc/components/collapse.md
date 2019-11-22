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
cmui-collapse属性

<Propsintro path="collapse/main.vue"></Propsintro>
cmui-collapse-item属性
<Propsintro path="collapse-item/main.vue"></Propsintro>
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

