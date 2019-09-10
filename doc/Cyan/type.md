# 文本
## 颜色
文本的颜色继承与色彩系统，我们提倡所想即所得的思维方式，当你需要改变文本的颜色的时候，只需要为文本节点添加text-{color}的class即可（将color）。如果你需要不同的颜色，可以直接修改_variables中的$colorList，添加或修改你需要的颜色；
<Cyan-TextColor></Cyan-TextColor>
## 尺寸

## 排列
|类名|作用|
|---|---|
|text-left|文本居左排列|   
|text-right|文本居右排列|  
|text-center|文本居中排列| 
|text-justify|文本两端对齐，仅最后一行有效，但是通常用于仅有一行的文本|
|text-nowrap|强制禁止文本换行，会对flex布局造成影响| 
|text-indent|段落预留两个字符的空白| 
## 转换
|类名|作用|
|---|---|
|text-lowercase|将文本抓换为小写|
|text-uppercase|将文本转换为大写|
|text-capitalize|将文本转换为驼峰形式|
## 类型
|类名|作用|
|---|---|
|text-bolder|文本加粗|
|text-delete|文本划线删除|
|text-vcenter|文本垂直居中|
|text-vtop|在一行文本大小不一的时候，文本垂直居顶部|
|text-vbottom|在一行文本大小不一的时候，文本垂直居底部|
## 行数限制与固定
|类名|作用|
|---|---|
|text-limit{num}|无论文本长度如何，限制文本不能超过num行，超出的部分用...显示|
|text-fixed{num}|无论文本长度如何，固定文本为num行，即使文本长度不足，依旧占用高度|
## 行高设置