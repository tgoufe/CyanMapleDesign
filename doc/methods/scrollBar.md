# 滚动条操作
读取或设置滚动条的位置。

## 读取
传入一个表示方向的字符串，可选值 top right bottom left，返回一个对象，包含px,percent,view三个属性，分别表示距离给定方向像素，百分比和屏数
```javascript
maple.scrollBar('top');
//{px: 1722, percent: 21, view: 2.6}}
```

## 写入
传入两个参数，第一个参数表示方向，第二个参数是一个表示距离的字符串，数字表示像素，数字+%表示百分比，数字+view表示屏数

```javascript
maple.scrollBar('top','20')//滚动到距离文档顶部20像素的位置
maple.scrollBar('bottom','10%')//滚动到距离文档底部10%的位置
maple.scrollBar('bottom','1view')//滚动到距离文档底部一屏的位置
