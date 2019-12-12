# 偏移辅助
## 静态辅助
在开发布局的过程中经常需要对内外填充及方向位置进行调整，因此Cyan结合常用情景对这些调整进行了封装。
:::tip
在移动端数值代表750设计稿的对应尺寸，如设计稿上的外边距为10像素，可以写成margin10,PC端代表像素，以下所有的{num}取值范围为50以内10的倍数，如果你需要修改这个范围可以修改_variables中的$layoutNumber
:::
|类名|作用|
|---|---|
|margin{num}|设置margin|
|margin{pos}{num}|设置某个方向上的margin，{pos}的值为t,r,b,l,h,v六个值|
|margin{pos}-n{num}|设置某个方向上的**负**margin，{pos}的值为t,r,b,l,h,v六个值|
|padding{num}|设置padding|
|padding{pos}{num}|设置某个方向上的margin，{pos}的值为t,r,b,l,h,v六个值|
|{pos}{num}|在非相对定位时设置某个方向上的距离{pos}的值为top,right,left,bottom四个值|
|{pos}-n{num}|在非相对定位时设置某个方向上的**负**距离{pos}的值为top,right,left,bottom四个值|
```html
<div class="margin10">margin为10像素</div>
<div class="margin-n20">margin为-20像素</div>
<div class="pos-r">
    <div class="top10 left10 pos-a">距离左上角10像素</div>
</div>
```
## 动态辅助
静态辅助是提前在css中设置好诸如margint20这种结构的样式，而且取值范围是50以内10的倍数，在我们实际的使用当中发现，移动端的设计稿通常会使用10，20，30三个值，每个值在375的分辨率下的差是5PX，通常情况下是满足开发需要的，但是并不是完全适用。

比如设计师使用了16px的间距，虽然在视觉上它和margin20仅差2PX，但是在高精度还原的情况下也是不能接收的，这种情况在PC端更加明显，在PC端的设计稿下提前预制CSS几乎是不可行的。

因此除了在DOM节点上添加STYLE的方式之外，我们提供了一种动态生成辅助样式的办法，它可以根据的你的html渲染结果动态生成上方表格内所有的样式。
:::warning
如果你需要这么做，可以注销掉CMUI.SCSS中对PM.SCSS的引用，以减小生成的样式文件的体积
:::

### 使用方式
* 1.在head中引入我们的初始化文件
```html
<script src="https://unpkg.com/cyanmaple/CMUI/styleInit.js"></script>
```
* 2.执行初始化函数
```javascript
// 使用方式：initCMUI([number,step=1]) 你可以根据需要采取以下三种方式之一
//默认使用，自动监听和设置
initCMUI()
//设置范围
initCMUI(50)
//设置范围和步长
initCMUI(50,5)
```
:::tip
在不传参时候，会监听页面的DOM结构变化，当你使用了类似margint23 top45这样的class的时候自动生成对应的样式。但是在频繁切换DOM结构的时候可能带来性能的下降;
:::
:::tip
在传参的时候，第一个参数表示范围，第二个参数表示步长（默认为1），这时会一次性生成对应的样式，之后不会再监听页面。执行这一过程所需要的时间大约为number/step/10，即生成200以内的所有样式需要约20毫秒。
:::