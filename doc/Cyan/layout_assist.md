# 布局辅助
## 设置float


| 类名        | 作用     |
| ----------- | -------- |
| float-right | 向右浮动 |
| float-left  | 向左浮动 |
| clearfix    | 清除浮动 |



## 设置position
| 类名 | 作用 |
| ---- | ---- |
|pos-r      | 设置position为relative |
|pos-a      | 设置position为absolute |
|pos-f      | 设置position为fixed |
|pos-s      | 设置position为sticky |

## position辅助

|   类名   |   作用   |
| ---- | ---- |
|vcenter|绝对定位，水平居中|
|hcenter|绝对定位，垂直居中|
|fullcenter|绝对定位，完全居中|
|abs-{position}|在某个方向上绝对定位，你可以使用top,right,bottom,left,full,center六个值当中的任意一个代替position|
|fixed-{position}|在某个方向上固定定位，你可以使用top,right,bottom,left,full,center六个值当中的任意一个代替position|
```html
<!--使用vcenter hcenter fullcenter abs-{position}需要为外层容器增加pos-r-->
<div class="pos-r">
    <div class="vcenter"></div>
    <div class="abs-bottom"></div>
</div>
<!--使用fixed-{position}可以直接使用-->
<div class="fixed-bottom"></div>

```
<Cyan-Position></Cyan-Position>
## 设置overflow
|   类名   |   作用   |
| ---- | ---- |
|overflow-h|溢出隐藏|
|overflow-xh|水平方向上溢出隐藏|
|overflow-yh|垂直方向上溢出隐藏|
|overflow-i|溢出初始化 有些时候你需要关闭overflow:hidden的时候可以用到这个class|
```html
<body class="overflow-xh">body不会出现横向滚动条</body>
```
## 设置display
|   类名   |   作用   |
| ---- | ---- |
|dis-b|display:block|
|dis-i|display:inline|
|dis-n|display:none|
|dis-t|display:table|
|dis-it|display:inline-table|
```html
<div class="dis-n"></div>
```