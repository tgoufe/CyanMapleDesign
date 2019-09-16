# 布局容器
:::tip
Cyan提供了强大到丧心病狂（偷瞄顾俊老师一眼）的布局能力，这里展示了6个大的布局系统的使用，需要注意的是我们所有的盒模型均是border-box结构的。
:::
## 网格容器：grid-container
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

## 盒容器：box-container
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
## 图片容器：img-container
imageContainer用于放置图片并提供了多种布局方式。你需要做的就是建立一个image-container的容器，并将img标签放置在里面，如果需要其他的样式可以搭配DEMO中展示的class.
<Cyan-ImgContainer></Cyan-ImgContainer>
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

## 弹性容器：flex-container
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
### 子节点尺寸
你可以在flex-container的子节点上添加flex1~flex5的class，来修改它的宽度或高度，控制它占据剩余空间的比例

### 子节位置
为容器设置top,left等表示方向的class会整体修改所有子节点的排列，如果你只是想修改某一个子元素的位置，可以直接在该子元素上添加top,bottom,right,left四个class中的一个或多个。
```html
<div class="flex-container">
    <span>1</span>
    <span class="bottom left">该节点将位于左下角</span>
    <span>3</span>
</div>
```

## 比例容器：ratio-container
ratio-container用于创建一个比例容器，这在不确定外在容器宽度的时候尤其有用。你只需要为一个节点增加ratio-container的class即可，支持1：5到5：1的比例结构，默认为1：1,通常情况下我们只需要默认的即可；

:::danger
注意：位于ratio-container下的DOM节点会被设置为宽高百分百的绝对定位，因此你必须保证它下面至少有一个子节点用于放置你所要放置的内容；
:::

<Cyan-RatioContainer></Cyan-RatioContainer>
```html
<!--如果需要修改比例为1：2可以添加ratio-container-1x2，以此类推-->
<div class="ratio-container">
    <!--这里在比例容器中放置了图片容器，这种结构非常实用-->
    <div class="img-container flex-x">
        <img :src="imgurl" alt="">
    </div>
</div>
```
## 滚动容器：scroll-container
如果你的项目是在移动端使用，那么为一个节点添加scroll-container类即可轻松的建立一个滚动的容器，内部的所有子节点将横向排列，你只需要为每个子节点设置宽度即可。
:::tip
下面的案例请使用移动端查看效果。
:::
<Cyan-ScrollContainer></Cyan-ScrollContainer>
```html
<div class="scroll-container">
    <div style="width:100px;" v-for="(item,index) in list" :key="index">
        <div class="img-container">
            <img :src="item.imageUrl" alt="">
        </div>
    </div>
</div>
```
## 列表
* list
* list-item

除了前面介绍过的6种容器之外，Cyan还提供了一个强大的list类用于快速建立行列结构，只需要为节点添加list类，同时为列表的都每一项添加list-item类即可。

默认的情况下是一列显示的，如果你需要创建其他数量的列，直接添加list-col{num}类，num的范围为1～5。

于此同时你可以使用border类为列表增加边框，使用radius类为边框设置圆角


```html
<!--这里设置了一个三列的列表 并且添加的边框和圆角-->
<div class=“list list-col3 border radius”>
	<!--列表的每一项需要添加list-item类-->
	<div class=“list-item”>content</div>
	<div class=“list-item”>content</div>
</div>
```
<Cyan-List></Cyan-List>