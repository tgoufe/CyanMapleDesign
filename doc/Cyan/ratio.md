# 比例容器
ratio-container用于创建一个固定比例的容器，这在不确定外在容器宽度的时候尤其有用。你只需要为一个节点增加ratio-container的class即可，默认创建一比一的容器
##  默认结构
```html
<div class="ratio">
	<!--some code-->
</div>
```
<Exp>
<div slot="exp">
<div class="ratio-container bg-red" style="width:200px" >
<div>some code</div>
</div>
</div>
<div slot="code">

```html
<div class="ratio-container bg-red" style="width:200px" >
 <div>some code</div>
</div>
```

</div>
</Exp>
 
 ## 自定义比例
 为比例容器添加ratio属性可以进行自定义比例的创建，使用 数字/数字 的结构表示比例。
 
<Exp>
<div slot="exp">
<div class="ratio-container bg-red" ratio="2/3" style="width:200px" >
 <div>some code</div>
</div>
</div>
<div slot="code">

```html
 <div class="ratio-container bg-red" ratio="2/3" style="width:200px" >
  <div>some code</div>
 </div>
 ```
 
 </div>
</Exp>
  
:::tip
自定义比例是动态生成的，因此在这里你可以书写任意的数字，但是需要保证/左右两侧均为正数。
:::
  
  
## 注意事项
比例容器的作用是让其内部的节点以某个比例显示，因此你需要保证内容被至少一个节点包裹
```html
错误的案例，文本将不显示
<div class="ratio-container">
some text
</div>

正确的使用方式
<div class="ratio-container">
	<span>some text</span>
</div>
```
 
## 比例容器妙用
比例容器的实现是借助padding创建一个区域，并将内部所有子节点进行四周为0的绝对定位，因此，如果过在比例容器中放置多个子节点会相互遮盖，借助这个特性我们可以创建很多常见布局。

<Exp>
<div slot="exp">
<p>在移动端可以进行滑动操作</p>
<div class="scroll-container">
	<div class="ratio-container marginr10" v-for="item in 10" style="width:200px">
		<img src="https://via.placeholder.com/200" alt="">
		<div class="mask text-white padding10" style="top:auto">
			图片介绍
		</div>
	</div>
</div>
</div>
<div slot="code">

```html
<div class="scroll-container">
	<div class="ratio-container marginr10" v-for="item in 10" style="width:200px">
		<img src="https://via.placeholder.com/200" alt="">
		<div class="mask text-white padding10" style="top:auto">
			图片介绍
		</div>
	</div>
</div>
 ```
 
 </div>
</Exp>
