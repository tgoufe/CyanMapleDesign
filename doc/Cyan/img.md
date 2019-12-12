# 图片容器
大多数UI框架在图片的使用上提供了复杂的参数，以至于开发者在使用的时候需要不断的对照API文档，这是非常糟糕的，Cyan针对图片的展示提供了img-container，配合辅助的class即可完成所有图片展示样式。

## 默认结构
你需要做的就是建立一个img-container的容器，并将img标签放置在里面。默认情况下无论图片多大，均在容器内居中显示，如果图片的宽高超过容器，会以图片的最长边进行显示。

<Exp>
<div slot="exp">
    <div class="demo img-container">
        <img src="https://via.placeholder.com/150"/>
    </div>
</div>
<div slot="code">

```html
<div class=" img-container">
    <img src="https://via.placeholder.com/150"/>
</div>
```
</div>
</Exp>

## 定位
在容器上添加top left bottom right center中的一个或多个，可以设置图片在容器内的位置

<Exp>
<div slot="exp">
    <div class="demo img-container left">
        <img src="https://via.placeholder.com/150"/>
    </div>
</div>
<div slot="code">

```html
<div class=" img-container left">
    <img src="https://via.placeholder.com/150"/>
</div>
```
</div>
</Exp>

## 拉伸
为容器添加full可以使，图片拉伸到和容器相同的尺寸，但是这可能引起图片的变形

<Exp>
<div slot="exp">
    <div class="demo img-container full" style="height:200px">
        <img src="https://via.placeholder.com/150"/>
    </div>
</div>
<div slot="code">

```html
<div class=" img-container" style="height:200px">
    <img src="https://via.placeholder.com/150"/>
</div>
```
</div>
</Exp>

## 填充
当图片的比例和容器的比例不相符时，使用flex-x,flex-y可以使图片在容器内以某个方向进行填充，这不会产生图片的变形，但是图片会被剪裁。

<Exp>
<div slot="exp">
    <div class="demo img-container flex-x" style="height:200px;width:200px">
        <img src="https://via.placeholder.com/350x200"/>
    </div>
</div>
<div slot="code">

```html
<div class=" img-container flex-x" style="height:200px;width:200px">
    <img src="https://via.placeholder.com/350x200"/>
</div>
```
</div>
</Exp>


:::tip

flex-x/flex-y是一个有待商榷的命名，如果你有更好的建议欢迎给我们提issue或PR

这个名称的来源是因为img-container是flex-container的一个子类，这一效果的实现也是通过flex布局的来实现的。

:::

## 填充位移

你可以继续在填充之后使用top left bottom right center中的一个或多个，修改图片填充后的位移

<Exp>
<div slot="exp">
    <div class="demo img-container flex-x right" style="height:200px;width:200px">
        <img src="https://via.placeholder.com/350x200"/>
    </div>
</div>
<div slot="code">

```html
<div class=" img-container flex-x right" style="height:200px;width:200px">
    <img src="https://via.placeholder.com/350x200"/>
</div>
```
</div>
</Exp>


## 边框
使用border可以为图片增加边框，如需修改边框颜色，请修改src/cyan/_variables.scss中的$border-color-default

<Exp>
<div slot="exp">
    <div class="img-container border" style="height:200px;width:200px">
        <img src="https://via.placeholder.com/150/FFFFFF/"/>
    </div>
</div>
<div slot="code">

```html
<div class="img-container border" style="height:200px;width:200px">
    <img src="https://via.placeholder.com/150/FFFFFF/"/>
</div>
```
</div>
</Exp>

## 圆角

使用radius可以为图片增加边框，如需修改圆角尺寸，请修改src/cyan/_variables.scss中的$border-radius-base

<Exp>
<div slot="exp" class="radius">
    <div class="img-container radius" style="height:200px;width:200px">
        <img src="https://via.placeholder.com/200/"/>
    </div>
</div>
<div slot="code">

```html
<div class="img-container radius" style="height:200px;width:200px">
    <img src="https://via.placeholder.com/200/"/>
</div>
```
</div>
</Exp>

## 圆形
使用round类可以将图片容器修改为圆形，这非常适合制作头像

<Exp>
<div slot="exp" class="radius">
    <div class="img-container round" style="height:200px;width:200px">
        <img src="https://via.placeholder.com/200/"/>
    </div>
</div>
<div slot="code">

```html
<div class="img-container round" style="height:200px;width:200px">
    <img src="https://via.placeholder.com/200/"/>
</div>
```
</div>
</Exp>

## 组合使用
图片容器的所有class都可以随意组合，创造出更加强大的图片结构
<Cyan-ImgContainer></Cyan-ImgContainer>
