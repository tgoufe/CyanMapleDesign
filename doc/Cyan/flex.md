# 弹性容器
弹性容器是Cyan里最强大的布局容器，你几乎可以用它来创建所有的布局，而且从此你不再需要为记忆flex复杂的属性名称而烦恼，它的功能强大到让你震惊，使用上确简单到让你发指。你只需要为容器添加flex-container属性即可。

<Exp>
<div class="flex-container demo " slot="exp">
    <div class="flex-container center radius border" style="width:50px">1</div>
    <div class="flex-container center radius border" style="width:50px">2</div>
    <div class="flex-container center radius border" style="width:50px">3</div>
</div>
<div slot="code">

```html
<div class="flex-container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
</div>
</Exp>

## 纵向结构
使用flex-container-col设置容器为纵向结构

<Exp>
<div class="flex-container-col demo " style="height:200px" slot="exp">
    <div class="flex-container center radius border" style="width:50px">1</div>
    <div class="flex-container center radius border" style="width:50px">2</div>
    <div class="flex-container center radius border" style="width:50px">3</div>
</div>
<div slot="code">

```html
<div class="flex-container-col">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
</div>
</Exp>

默认的间隔为between结构，原因有两点，第一是它的排列效果比较符合常规需求，即左右（或上下）贴近边缘，其他平均分布，通常情况下直接使用就行了；第二个原因是这并不是一个好记忆和理解的单词。

## around分布
为容器添加round类可以，修改为around结构，但是通常情况下你并不需要这种结构。
:::warning
注意：这里我们使用了round而没有使用around是为了方便你的编写，请使用时注意
:::

<Exp>
<div class="flex-container demo round" slot="exp">
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">1</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">2</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">3</span></div>
</div>
<div slot="code">

```html
<div class="flex-container round">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
</div>
</Exp>

## reverse翻转
为容器添加reverse可以翻转展示顺序

<Exp>
<div class="flex-container demo reverse" slot="exp">
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">1</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">2</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">3</span></div>
</div>
<div slot="code">

```html
<div class="flex-container reverse">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
</div>
</Exp>

## 统一位置控制
为容器添加top bottom left right center中的一个或多个，可以整体调整所有子节点的位置。无论你使用横向的结构还是纵向的结构，你只需要写出你希望子节点排列的位置即可。

<Exp>
<div class="flex-container demo left bottom " slot="exp" style="height:200px;">
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">1</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">2</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">3</span></div>
</div>
<div slot="code">

```html
<div class="flex-container left bottom" style="height:200px;">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
</div>
</Exp>

## 独立位置控制
单独为子节点添加top bottom left right center中的一个或多个，可以单独调整子节点的位置，同样，无论你使用横向的结构还是纵向的结构，你只需要写出你希望子节点排列的位置即可。

<Exp>
<div class="flex-container demo left bottom " slot="exp" style="height:200px;">
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">1</span></div>
    <div class="ratio-container radius border top" style="width:50px"><span class="flex-container center">2</span></div>
    <div class="ratio-container radius border right top" style="width:50px"><span class="flex-container center">3</span></div>
</div>
<div slot="code">

```html
<div class="flex-container left bottom" style="height:200px;">
    <div>1</div>
    <div class="top">2</div>
    <div class="right top">3</div>
</div>
```
</div>
</Exp>

## 整体宽高填充
为容器添加vfull或hfull，或者同时添加两者，可以使所有子节点横向或纵向填满容器。

<Exp>
<div class="flex-container demo vfull " slot="exp" style="height:200px;">
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">1</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">2</span></div>
    <div class="ratio-container radius border" style="width:50px"><span class="flex-container center">3</span></div>
</div>
<div slot="code">

```html
<div class="flex-container vfull" style="height:200px;">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
</div>
</Exp>

## 独立调整占比
单独为子节点添加flex{number}，number的取值范围为1-5，可以控制该节点占有剩余空间的份数。

<Exp>
<div class="flex-container demo " slot="exp">
    <div class="flex-container center radius border" style="width:50px">1</div>
    <div class="flex-container center radius border flex1" style="width:50px">2</div>
    <div class="flex-container center radius border flex2" style="width:50px">3</div>
</div>
<div slot="code">

```html
<div class="flex-container">
    <div>1</div>
    <div class="flex1">2</div>
    <div class="flex2">3</div>
</div>
```
</div>
</Exp>

## 组合使用
flex-container虽然只使用了几个简单的关键字，但是由于所有关键字均可以组合，因此他的布局能力非常强大，在开发中学会灵活使用会让你的开发效率飞速提升。
:::warning

请认真尝试下面的案例，并理解使用不同的class所带来的展示效果。

:::

<Cyan-FlexContainer></Cyan-FlexContainer>
