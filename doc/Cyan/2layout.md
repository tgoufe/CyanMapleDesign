# 布局容器
:::tip
Cyan提供了强大到丧心病狂（偷瞄顾俊老师一眼）的布局能力，这里展示了6个大的布局系统的使用，掌握这些布局的使用，几乎可以完成所有WEB端的布局需求，需要注意的是我们所有的盒模型均是border-box结构的。
:::
## 网格容器：container
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
大多数UI框架在图片的使用上提供了复杂的参数，以至于开发者在使用的时候需要不断的对照API文档，这是非常糟糕的，Cyan针对图片的展示提供了img-container，配合辅助的class即可完成所有图片展示样式。

### 使用说明

你需要做的就是建立一个img-container的容器，并将img标签放置在里面。默认情况下会以图片的最长边进行显示。

```html
<!--无论图片多大，均在容器内居中显示；-->
<div class="img-container">
    <img src="" alt="">
</div>
```

### 辅助class

我们提供了以下几个class作为辅助项，它们的名称非常简单，作用一目了然，几乎不需要过多的解释和说明。

| 拉伸 | 填充          | 边框   | 圆角         | 位置                  |
| ---- | ------------- | ------ | ------------ | --------------------- |
| full | flex-x/flex-y | border | round/radius | top/left/bottom/right |

当你需要使用这些class的时候可以直接将它放到img-container后面即可，**值得注意的是这些class可以随意组合甚至全部组合到一起。**

```html
<!--让图片在容器的左上角显示-->
<div class="img-container top left">
    <img src="" alt="">
</div>
<!--制作一个直径为50px的圆形容器并放置图片，可用于制作头像-->
<!--使用img-container并手动设置行内的width是一个常见的操作-->
<div class="img-container round" style="width:50px">
    <img src="" alt="">
</div>
```



:::tip

flex-x/flex-y是一个有待商榷的命名，如果你有更好的建议欢迎给我们提issue或PR

这个名称的来源是因为img-container是flex-container的一个子类，这一效果的实现也是通过flex布局的来实现的。

:::

### 动态Demo展示

<Cyan-ImgContainer></Cyan-ImgContainer>



## 弹性容器：flex-container
弹性容器是Cyan里最强大的布局容器，你几乎可以用它来创建所有的布局，而且从此你不再需要为记忆flex复杂的属性名称而烦恼，它的功能强大到让你震惊，使用上确简单到让你发指。你只需要为容器添加flex-container属性即可。

```html
<div class="flex-container">
  这里填写内部结构，横向排列
</div>
<div class="flex-container-col">
  这里填写内部结构，纵向排列
</div>
```

默认的间隔为between结构，原因有两点，第一是它的排列效果比较符合常规需求，即左右（或上下）贴近边缘，其他平均分布，通常情况下直接使用就行了；第二个原因是这并不是一个好记忆和理解的单词。

### 辅助class

| 间隔类型选择  | 顺序翻转 | 位置控制                     | 子节点横纵向填满 |
| ------------- | -------- | ---------------------------- | ---------------- |
| round/between | reverse  | top/left/right/bottom/center | vfull/hfull      |

:::warning

请认真尝试下面的案例，并理解使用不同的class所带来的展示效果。

:::

<Cyan-FlexContainer></Cyan-FlexContainer>

### 子节点尺寸
你可以在flex-container的子节点上添加flex1~flex5的class，来修改它的宽度或高度，控制它占据剩余空间的比例

```html
<div class="flex-container">
  <div class="flex1">
    这个节点占据了剩余空间的1份，因为剩余空间只有一个节点，所以相当于这个节点的宽度为剩余空间的100%
  </div>
  <div>
    这个节点宽度自动适应
  </div>
</div>
```



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
ratio-container用于创建一个固定比例的容器，这在不确定外在容器宽度的时候尤其有用。你只需要为一个节点增加ratio-container的class即可，支持1：5到5：1的比例结构，默认为1：1,通常情况下我们只需要默认的即可；

:::danger
注意：位于ratio-container下的DOM节点会被设置为宽高百分百的绝对定位，因此你必须保证它下面至少有一个子节点用于放置你所要放置的内容；
:::

### 应用场景

比例容器通常应用于两种场景：1.保证图片以某种比例显示，2，在不确定宽度的情况下进行比例占位。其中第一种情况居多，因此比例容器也经常和图片容器搭配使用。

### 使用DEMO

1.比例容器**混合**图片容器，此时图片自动撑满，相当于在图片容器上使用full。在下面的示例代码中img-container其实可以省略，这样写的目的一个是语义化更明确，另一个是可以继续添加img-container的辅助属性进行进一步修改，如添加border round从而形成一个头像组件。

```html
<div class="ratio-container img-container">
  <img src="imgurl"/>
</div>
```

2.比例容器嵌套图片容器，这种结构会使DOM结构增加一层，但是控制更加灵活。相当于将图片容器设置为1：1的结构。

```html
<!--如果需要修改比例为1：2可以添加ratio-container-1x2，以此类推-->
<div class="ratio-container">
    <!--这里在比例容器中放置了图片容器，这种结构非常实用-->
    <div class="img-container flex-x">
        <img :src="imgurl" alt="">
    </div>
</div>
```



1.在不确定容器宽度的商品列表中（如移动端），保证图片以正方形显示。

### 动态DEMO

<Cyan-RatioContainer></Cyan-RatioContainer>

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
