# 动态样式操作
调用方法：maple.style(selector,[style])
当你需要为大量的节点设置动态的样式的时候这个方法非常有用，它可以动态生成一个CSS规则来设置页面样式
## 设置
```javascript
/*
相当于在页面上插入一个如下的样式表
#main {background-color:blue}
*/
maple.style('#main',{backgroundColor:'blue'})

//给伪类设置样式
maple.style('#main:before',{backgroundColor:'blue'})
```

## 读取
```javascript
maple.style('#main')//{backgroundColor:'blue'}
maple.style('#main','backgroundColor')//blue
```
