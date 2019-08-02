# list
list组件是非常强大的布局组件，你可以用这个组件来创建任意比例的网格布局。包含两个部分cmui-list和cmui-list-item，其中cmui-list表示外部容器，cmui-list-item表示列表的每一项。
### props(cmui-list)

|属性|类型|默认值|说明|
|---|---|---|---|
|col|Number Array |1 | 如果是数字代表列表的列数，如果数组，数组的长度表示列数，数组的每一项表示改该列所占的比例，如\[1,2]表示两列，比例为1：2|
|space| Number|0 |每一列之间的间距 |
|border| Boolean String| false| 布尔类型表示每个item是否带有边框，如果space为0，则边框会自动重合，如果是string类型，表示边框的颜色值|
|target|Object |null | |
|index|Boolean |false | 是否使用索引，可以和cmui-list-group联合使用|


### props(cmui-list-item)

|属性|类型|默认值|说明|
|---|---|---|---|
|title|String |'' | 每一个item的标题|
|bgcolor| String|'' |每一个item的背景色 |
|border| Boolean String| false| 布尔类型表示每个item是否带有边框，如果space为0，则边框会自动重合，如果是string类型，表示边框的颜色值|
### demo
<list-demo></list-demo>
<<< @/doc/.vuepress/components/listDemo.vue