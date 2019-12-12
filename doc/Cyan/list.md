# 列表
## 主体结构
列表类可以高效简洁的创建符合你需要的行列结构，最高支持10列。
```html
<div class="list">
	<div class="list-item"></div>
</div>
```
## 多列
为list容器添加list-col${num}类即可设置为多列，num的取值范围为2~9

<Exp>
<div class="list list-col3" slot="exp">
	<div class="list-item" v-for="item in 9">
    	some text
    </div>
</div>
<div slot="code">

```html
<div class="list list-col3">
	<div class="list-item" v-for="item in 9">
    	some text
    </div>
</div>
```
</div>
</Exp>


## 边框
如果你需要为所有的item添加边框，直接在list类上增加border类即可，需要注意的是这将同时对整个列表的内部和外部添加边框

<Exp>
<div class="list list-col3 border" slot="exp">
	<div class="list-item padding10" v-for="item in 9">
    	some text
    </div>
</div>
<div slot="code">

```html
<div class="list list-col3 border">
	<div class="list-item" v-for="item in 9">
    	some text
    </div>
</div>
```
</div>
</Exp>

## 内部边框
添加border类的同时再添加inner类即仅对列表内部添加边框，这种样式在电商类的广告位中非常常见

<Exp>
<div class="list list-col3 border inner" slot="exp">
	<div class="list-item padding10" v-for="item in 9">
    	some text
    </div>
</div>
<div slot="code">

```html
<div class="list list-col3 border inner">
	<div class="list-item" v-for="item in 9">
    	some text
    </div>
</div>
```
</div>
</Exp>

## 圆角
使用radius可以为列表增加圆角，即使你使用了border类也一样有效

<Exp>
<div class="list list-col3 border radius" slot="exp">
	<div class="list-item padding10" v-for="item in 9">
    	some text
    </div>
</div>
<div slot="code">

```html
<div class="list list-col3 border radius">
	<div class="list-item" v-for="item in 9">
    	some text
    </div>
</div>
```
</div>
</Exp>

