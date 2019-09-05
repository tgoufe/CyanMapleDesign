# Layout
:::tip
Layout 主要用于配置页面的布局，通过该样式组，可以快速的搭建页面的布局，需要注意的是我们所有的盒模型均是border-box结构的。
:::
## grid-container
如果你使用过bootstrap，那么你可以直接上手grid布局了，这是经典的网格布局，支持12列和15列两种方式展示，12列使用span作为关键字，15列使用col作为关键字。

网格之间存在10像素的间距。如果你想修改这个间距，可以修改_variables.scss中的$container_padding。如果你想使用更小的间距，可以添加mini类，这样会让间距减小一半（默认是5像素）
```html
<div class="container">
    <div class="row">
        <div class="span4">some text</div>
        <div class="span4">some text</div>
        <div class="span4">some text</div>
    </div>
</div>
```
```html
<!--间距为5像素的网格容器，一共三列-->
<div class="container">
    <div class="row mini">
        <div class="span4 mini">some text</div>
        <div class="span4 mini">some text</div>
        <div class="span4 mini">some text</div>
    </div>
</div>
```
```html
<!--间距为10像素的网格容器，一共五列-->
<div class="container">
    <div class="row">
        <div class="col3">some text</div>
        <div class="col3">some text</div>
        <div class="col3">some text</div>
        <div class="col3">some text</div>
        <div class="col3">some text</div>
    </div>
</div>
```

## box-container
box container和grid container 几乎是相同的，区别在于box的网格之间是没有间距的。如果你希望使用box-container你可以在关键词前添加box-前缀即可。
```html
<!--无间距的网格结构，一共五列-->
<div class="box-container">
    <div class="box-row">
        <div class="box-span4">some text</div>
        <div class="box-span4">some text</div>
        <div class="box-span4">some text</div>
    </div>
</div>
```
```html
<!--无间距的网格结构，一共三列-->
<div class="box-container">
    <div class="box-row">
        <div class="box-col5">some text</div>
        <div class="box-col5">some text</div>
        <div class="box-col5">some text</div>
    </div>
</div>
```
## img-container
imageContainer用于放置图片并提供了多种布局方式。你需要做的就是建立一个image-container的容器，并将img标签放置在里面，如果需要其他的样式还可以配合以下属性

* full：图片撑满容器，会导致图片变形
* flex-x：图片在X轴上撑满容器，可能导致图片被截取
* flex-y：图片在Y轴上撑满容器，可能导致图片被截取
* radius：给容器设置圆角
* round：将容器制作成圆形
* border：给图片添加边框
* top bottom left right:设置图片在容器中的位置，可以组合使用
```html
<!--无论图片多大，均在容器内居中显示；-->
<div class="img-container">
    <img src="" alt="">
</div>
<!--让图片在容器的左上角显示-->
<div class="img-container top left">
    <img src="" alt="">
</div>
<!--制作一个直径为50px的圆形容器并放置图片，可用于制作头像-->
<div class="img-container round" style="width:50px">
    <img src="" alt="">
</div>
```

## flex-container
超级强大的布局组件，你几乎可以用它来创建所有的布局，而且使用非常简单，不需要你付出额外的记忆。你只需要为容器添加flex-container属性即可。

* 默认：使用between结构，即如果存在一个子元素，排列在最左边，如果存在两个子元素排列在左右两边，如果存在三个子元素以左中右的形式排列。

* round:
<Cyan-FlexContainer></Cyan-FlexContainer>

