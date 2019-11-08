# 列表
## css列表
列表类可以高效简洁的创建符合你需要的行列结构，最高支持10列。
```html
<div class="list">
	<div class="list-item"></div>
</div>
```
辅助class
|类名|作用|
|---|---|
|col{number}|设置列数，number的取值范围为2-9|
|border|为列表添加边框，当你直接使用该class的时候会在内外同时添加边框|
|inner|需要和border一起使用，仅在内部添加边框，在制作广告位的时候非常实用|
|radius|对整个列表项设置圆角|

```html
<!--这里设置了一个三列的列表 并且添加的边框和圆角-->
<div class=“list list-col3 border radius inner”>
	<!--列表的每一项需要添加list-item类-->
	<div class=“list-item”>content</div>
	<div class=“list-item”>content</div>
</div>
```
<Cyan-List></Cyan-List>
