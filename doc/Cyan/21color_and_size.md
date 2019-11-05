# 色彩和尺寸系统
Cyan内部定义了一个色彩系统和一个尺寸系统，储存在cyan/_variables.scss文件中。分别用变量$colorList和$btn-size-list。
## 色彩系统
初始状态下，色彩系统涵盖了赤橙黄绿咖蓝紫七种颜色，你可以根据你的需要在你的项目里随意增删或修改这些颜色，这些颜色会同时继承到文本，表单，按钮，徽标和背景中，比如你将所有的色彩全部删除并增加粉色
```scss
$colorList:(
	'pink': #ff05ab,
);
```
那么你就可以在开发中这样使用它们
```html
<div class="bg-pink">粉色的背景</div>
<div class="text-pink">粉色的文字</div>
<div class="btn pink">粉色的按钮（包括翻转样式）</div>
<div class="badge pink">粉色的徽标（包括翻转样式）</div>
<div class="form pink">所有的表单元素均展示为粉色</div>
<input type="..." class="pink"/>粉色的表单元素（包括翻转样式）
<input type="..." class="pink btn"/>按钮形粉色的表单元素（包括翻转样式）
```
:::warning
提示：所有涉及到颜色的地方都会继承自色彩系统，并进行拓展，因此每增加一个颜色都会生成约1k（非GIZP下约10k）的CSS，通常情况下经常被页面使用的色彩不会超过5种，因此请根据你的实际需要来配置这些颜色。
:::
:::tip
建议：

对于文本和背景中偶尔用到的颜色你可以使用额外的CSS或者行内样式来完成

对于按钮，徽标，表单这样相对复杂的元素你可以使用自定义色彩来完成。
:::
## 在线生成和动态色彩
如果你的设计师仅在某个页面大量用到某种颜色的按钮或表单，甚至在各种页面使用完全不同的颜色，那么你可以使用以下三种方案。
1. 找一下你周围有没有搬砖铁棍之类的东西，然后就不用往下看了
2. 使用我们的变量配置工具直接在线生成一段样式插入到你的项目中。
3. 在动态辅助中配置一个颜色变量，它会生成一段和你在色彩列表配置后完全相同的样式插入到动态样式表并在全局生效。
```javascript
initCMUI({
    colorList:{
        pink:'#ff05ab'
    }
})
```
## 尺寸系统
初始状态下，尺寸系统包括base,small,big三种尺寸，除了要保留base之外，其他的你可以随意进行增删改，尺寸系统同时作用于按钮和表单，每个尺寸对应三个值：总高度，左右padding的距离，文字大小。比如你可以增加一个large尺寸
```scss
$badge-size-list:(//$height, $padding-horizontal, $font-size
	'large':(30px,20px,13px)
);
```
那么你就可以在开发中这样使用它们
```html
<div class="btn large">更大的按钮（包括翻转样式）</div>
<input type="text" class="large"/>更高的input或select（包括翻转样式）
<input type="checkbox" class="large btn"/>更大的checkbox或radio（包括翻转样式）
```
:::tip
1. base表示默认值，你可以对它的值进行修改，但是不能将base删除。否则你将不能使用默认按钮和表单尺寸
2. 尺寸系统的修改产生的CSS较小（非GZIP下仅1K多）且仅为高度，内填充和字体，所以直接使用动态辅助添加对应的class即可修改。
```html
<div class="btn paddingh22">将左右填充改为22</div>
```
3. 如果需要对某个特殊的按钮或表单进行微调，直接使用行内样式会更加方便。
:::