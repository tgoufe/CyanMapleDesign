# 偏移辅助
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