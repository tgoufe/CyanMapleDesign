# 按钮 标签
## 按钮
<a href="###" class="btn red">红色</a>
<a href="###" class="btn orange reverse">翻转</a>
<a href="###" class="btn yellow radius">圆角</a>
<a href="###" class="btn green"><span class="badge round marginr10">1</span>标签</a>
<a href="###" class="btn coffee reverse radius">翻转圆角</a>
<a href="###" class="btn blue disabled">禁用</a>

大部分UI框架对按钮的描述都绑定了状态逻辑，如btn-success会用绿色表示一个成功的按钮，但是这种表述并不适用于C端，比如一个绿色的登陆按钮被写成btn-success，虽然在视觉上没有问题，但是在命名上存在歧义，也不利于改版需求。

Cyan采用所想即所得的方式进行组合描述，你要做的仅仅是为节点添加btn的class然后使用以下属性进行描述。
```html
<a href="###" class="btn red"> button</a>
```

|类名|作用|
|---|---|
|{color}|继承于色彩系统中的$colorList，默认可选值为red orange yellow green coffee blue purple|
|{size}|继承于尺寸系统，可以不写，默认可选值为small big|
|radius|为按钮增加圆角|
|reverse|对按钮进行翻转|
|block|默认的按钮时inline-block结构的，添加block类可以使转换为block结构，从而使按钮充满所在容器|
<Cyan-Button></Cyan-Button>

## 按钮组
如果你需要创建多个按钮并排防止的布局，你可以使用下面的结构，将多个按钮放置在一个btn-group容器内来创建按钮组。

需要注意的是按钮组内的按钮不支持block类。

点击上方案例中的切换按钮组查看效果
```html
<!--使用btn-group将按钮进行包裹即可-->

<div class="btn-group">
    <a href="" class="btn">this is a btn</a>
    <a href="" class="btn">this is a btn</a>
    <a href="" class="btn">this is a btn</a>
</div>
```
## 标签
<a href="###" class="badge red">红色</a>
<a href="###" class="badge orange reverse">翻转</a>
<a href="###" class="badge yellow radius">圆角</a>
<a href="###" class="badge coffee reverse radius">翻转圆角</a>
<a href="###" class="badge pill green">药片</a>
<a href="###" class="badge blue reverse round">团</a>
<a href="###" class="badge purple reverse pill">翻转药片</a>
<a href="###" class="badge coffee reverse square">抢</a>
<a href="###" class="badge coffee flag">优惠</a>
<a href="###" class="badge blue disabled">禁用</a>

标签的使用和按钮的使用几乎是完全相同的，只不过它的尺寸更小，支持的辅助class更多。

```html
<span class="badge red">this is a badge</span>
```
<span class="badge red">this is a badge</span>

和[按钮](/Cyan/button.html#按钮-btn)相同的辅助属性，同样的这些属性可以随意组合

|类名|作用|
|---|---|
|{color}|设置颜色👉<span class="badge blue">sdf</span>|
|{size}|默认可选值为small big<span class="badge blue small">small</span><span class="badge blue big">big</span>|
|radius|增加圆角|
|reverse|翻转|
|block|默认的标签时inline-block结构的，添加block类可以使转换为block结构，从而使标签充满所在容器|

badge除了支持btn的所有辅助class之外还支持以下属性

|类名|作用|
|---|---|
|pill|药片形状的标签👉<span class="badge blue pill">pill</span>|
|square|正方形形状的标签👉<span class="badge blue square">团</span><span class="badge blue square reverse">团</span>|
|flag|旗帜形状的标签，通常和绝对定位（pos-a）组合使用👉<span class="badge blue flag">flag</span>|

## 标签组
如果你需要使用一组标签连续显示，可以使用badge-group类将多个badge包裹起来
<div class="badge-group">
<a href="###" class="badge orange reverse radius">1</a>
<a href="###" class="badge orange reverse radius">2</a>
<a href="###" class="badge orange reverse radius">3</a>
<a href="###" class="badge orange reverse radius">4</a>
</div>