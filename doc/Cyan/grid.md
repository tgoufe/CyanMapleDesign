# 网格容器
如果你使用过bootstrap，那么你可以直接上手grid布局了，这是经典的网格布局，支持12列和15列两种方式展示，12列使用span作为关键字，15列使用col作为关键字。
## 基础网格
<Exp>
<div slot="exp">
    <div class="demo paddingv10">
        <div class="row">
            <div class="span4 marginb20" v-for="item in 3">
                <div class="grid">span4</div>
            </div>
            <div class="span3 marginb20" v-for="item in 4">
                <div class="grid">span3</div>
            </div>
            <div class="col3" v-for="item in 5">
                <div class="grid">col3</div>
            </div>
        </div>
    </div>
</div>
<div slot="code">

```html

<div class="row">
    <div class="span4" v-for="item in 3">
        <div>span4</div>
    </div>
    <div class="span3" v-for="item in 4">
        <div>span3</div>
    </div>
    <div class="col3" v-for="item in 5">
        <div>col3</div>
    </div>
</div>

```
</div>
</Exp>

## mini网格
在行列容器上添加mini即可将间距调整到初始的一半，转换为迷你网格

<Exp>
<div slot="exp">
    <div class="demo paddingv10">
        <div class="row mini">
            <div class="span4 marginb10 mini" v-for="item in 3">
                <div class="grid">span4 mini</div>
            </div>
            <div class="span3 marginb10 mini" v-for="item in 4">
                <div class="grid">span3 mini</div>
            </div>
            <div class="col3 mini" v-for="item in 5">
                <div class="grid">col3 mini</div>
            </div>
        </div>
    </div>
</div>
<div slot="code">

```html
<div class="row mini">
    <div class="span4 mini" v-for="item in 3">
        <div>span4</div>
    </div>
    <div class="span3 mini" v-for="item in 4">
        <div>span3</div>
    </div>
    <div class="col3 mini" v-for="item in 5">
        <div>col3</div>
    </div>
</div>
```
</div>
</Exp>

## box网格
在行列结构上添加box，即可删除间距，转换为box网格。


<Exp>
<div slot="exp">
    <div class="demo paddingv10">
        <div class="box-row">
            <div class="box-span4 marginb10" v-for="item in 3">
                <div class="grid">span4</div>
            </div>
            <div class="box-span3 marginb10" v-for="item in 4">
                <div class="grid">span3</div>
            </div>
            <div class="box-col3" v-for="item in 5">
                <div class="grid">col3</div>
            </div>
        </div>
    </div>
</div>
<div slot="code">

```html
<div class="box-row">
    <div class="box-span4" v-for="item in 3">
        <div>span4</div>
    </div>
    <div class="box-span3" v-for="item in 4">
        <div>span3</div>
    </div>
    <div class="box-col3" v-for="item in 5">
        <div>col3</div>
    </div>
</div>
```
</div>
</Exp>
