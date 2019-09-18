# 边框和阴影
## 边框
|类名|作用|
|---|---|
|border|为该元素添加宽度为1像素的边框，如果你需要更改边框颜色，可以修改_variables中的$border-color-default。|
|border{pos}|为元素的某个方向添加边框，pos的取值为l(左) r(右) t(上) b(下) v(上下两侧) h(左右两侧)六个值，可以和light组合使用来设置0.5像素的边框|
```html
<div class="border">该节点四周都有边框</div>
<div class="bordert">该节点仅有顶部边框</div>
<div class="borderh">该节点仅有左右边框</div>
```
## 辅助属性
可以在添加border类的同时额外的添加以下class，来获得其他的效果
|类名|作用|
|---|---|
|item|为所有的子元素添加边框|
|itemv|为所有的子元素添加上下边框，第一个子元素除外，通常用于纵向列表|
|itemh|为所有的子元素添加左右边框，第一个子元素除外，通常用于横向列表|
|radius|添加边框的同时添加圆角,可以和item,light组合使用为所有子节点添加圆角|
|round|圆形边框，适合做头像,可以和item,light组合使用为所有子节点添加圆形边框|
|light|0.5像素的边框，通常用于移动端的列表，可以和item,itemv,itemh,border{pos}组合使用|

```html
<!--同时使用border和item使得所有子节点均带有边框-->
<div class="border item">
    <div>这些节点均包含边框</div>
    <div>这些节点均包含边框</div>
    ...
</div>
<div class="border item">
    <div>这些节点均包含边框</div>
    <div>这些节点均包含边框</div>
    ...
</div>
<div class="border radius">带圆角的边框</div>
<div class="border round">圆形边框</div>
```
:::tip  
Cyan中的大部分class都是可以相互组合的，比如这里可以将边框和图片容器混合到一起[点击查看](./layout.html#图片容器：img-container)
:::
## 阴影
为节点增加shadow类即可