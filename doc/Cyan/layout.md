# Container
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
:::tip
必填class：flex-container(横向排列)或flex-container-col(纵向排列)二选一。默认使用between结构，即如果存在一个子元素，排列在最左边，如果存在两个子元素排列在左右两边，如果存在三个子元素以左中右的形式排列
:::
### 容器属性
你还可以添加下面的样式来设置不同的结构
* 表示间隔：使用round创建space-around结构，创建类似有间隔的网格结构。
* 表示顺序：使用reverse来翻转顺序。
* 表示位置：使用top bottom left right center line中的一个或多个来表示位置，你可以将flex容器想象成一个九宫格，你只需要描述你你希望的位置在哪个方向即可
* 表示尺寸：使用vfull或hfull来表示子元素在横向铺满或纵向铺满
<Cyan-FlexContainer></Cyan-FlexContainer>
### 子节点属性
你可以在flex-container的子节点上添加flex1~flex5的class，来修改它的宽度或高度，控制它占据剩余空间的比例

## ratio-container
ratio-container用于创建一个比例容器，这在不确定外在容器宽度的时候尤其有用。你只需要为一个节点增加ratio-container的class即可，支持1：5到5：1的比例结构，默认为1：1,通常情况下我们只需要默认的即可；

:::danger
注意：位于ratio-container下的DOM节点会被设置为宽高百分百的绝对定位，因此你必须保证它下面至少有一个子节点用于放置你所要放置的内容；
:::

<Cyan-RatioContainer></Cyan-RatioContainer>

## scroll-container
如果你的项目是在移动端使用，那么为一个节点添加scroll-container类即可轻松的建立一个滚动的容器，内部的所有子节点将横向排列，你只需要为每个子节点设置宽度即可。下面的案例请使用移动端查看效果。
<Cyan-ScrollContainer></Cyan-ScrollContainer>


