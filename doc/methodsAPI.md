


# maple方法

## device

device方法用于检测项目的运行环境。你可以使用多种方法进行检测

### 方法检测

```javascript
maple.device('chrome') //true
```

### 多项匹配检测

```javascript
传入多个参数共同匹配
maple.device('chrome','ipad') //true
```

### 属性检测

```javascript
maple.device.chrome //true
```

### 属性列表

你可以使用一些这些属性进行环境的检测，对于匹配的环境会自动在html根节点上添加以 “device\_”为前缀的class，如device_chrome
可检测的属性：
* chrome 
* androidChrome
* ipad
* iphone
* android
* ios
* webView
* statusBar
* weixin
* wechat/wx
* uc

##  load
load方法用于异步加载image js css iframe，你可以使用以下两种方式传入type和url，返回一个promise对象，加载成功后得到的resolve的数据是一个DOM节点，可供使用的type类型有
* image/img
* iframe
* css
* js/javascript
```javascript
maple.load(type,url).then(dom=>{....})
maple.load({
  type:'img',
  url:'.....'
}).then(dom=>{....})
```

## log
输出方便浏览的日志
```javascript
/*仅包含内容共*/
maple.log('this is content');
/*输出标题和内容*/
maple.log('title','content')
/*多个内容*/
maple.log('title','content1','content2','content3')
```

## scrollBar
读取或设置滚动条的位置。

### 读取
传入一个表示方向的字符串，可选值 top right bottom left，返回一个对象，包含px,percent,view三个属性，分别表示距离给定方向像素，百分比和屏数
```javascript
maple.scrollBar('top');
//{px: 1722, percent: 21, view: 2.6}}
```

### 写入
传入两个参数，第一个参数表示方向，第二个参数是一个表示距离的字符串，数字表示像素，数字+%表示百分比，数字+view表示屏数

```javascript
maple.scrollBar('top','20')//滚动到距离文档顶部20像素的位置
maple.scrollBar('bottom','10%')//滚动到距离文档底部10%的位置
maple.scrollBar('bottom','1view')//滚动到距离文档底部一屏的位置
```

## shake
调用系统的陀螺仪实现摇一摇功能
### 快捷调用
maple.shake(startFn,[endFn,interval,eontinuEvent])

* 参数中的第一个函数[startFn]     => 摇动时要执行的函数 
* 参数中的第二个函数[endFn]       => 摇动结束执行的函数 
* 参数中的数字类型[interval]      => 连续两次触发事件的时间间隔，默认没有延时，默认为0
 * 参数中的布尔类型[continueEvent] => 连续摇动时是否连续触发事件，默认true

```javascript
EXP:摇动时每2秒在的控制台打印一下，停止摇动时打印一下
maple.shake(()=>{
  console.log('begin')
},()=>{
  console.log('end')
},2000)
```
### 对象调用
maple.shake(options)
```javascript
传入一个如下结构的对象
maple.shake({
  startFn(){},
  endFn(){},
  interval:2000,
  continueEvent:false
})
```

### 混合调用
将快捷调用和对象调用混合使用，对象的优先级更高，会覆盖前面的参数
```javascript
maple.shake(function(){console.log('begin')},{interval:2000})
```

## style
调用方法：maple.style(selector,[style])
当你需要为大量的节点设置动态的样式的时候这个方法非常有用，它可以动态生成一个CSS规则来设置页面样式
### 设置
```javascript
/*
相当于在页面上插入一个如下的样式表
#main {background-color:blue}
*/
maple.style('#main',{backgroundColor:'blue'})

//给伪类设置样式
maple.style('#main:before',{backgroundColor:'blue'})
```

### 读取
```javascript
maple.style('#main')//{backgroundColor:'blue'}
maple.style('#main','backgroundColor')//blue
```

## url
url相关操作合集
### 读取
传入一个URL字符串，不传则取当前页面地址，返回一个包含URL信息的对象，包含以下属性
* source
* protocol
* host
* port
* query
* params
* file
* hash
* path
* relative
* segments
* isUrl
* route
```javascript
//exp：当前URL为www.xxx.com/index.html?name=123
//获取当前URL中name的值
let {name}=maple.url().params;
//name的值为'123'
```
### url 方法
replace：接收任意数量的参数用于修改或删除URL参数，如果接收的参数是字符串，则删除URL中对应的参数，如果是对象，则进行添加和修改。==不会触发页面跳转==
```javascript
maple.url().replace({name:456})//修改或增加参数
maple.url().replace('name')//删除参数
maple.url().replace('name','age')//删除多个参数
maple.url().replace('name',{age:123})//混合使用
```
replaceHash：接收任意数量的参数用于修改或删除hash参数，如果接收的参数是字符串，则删除URL中对应的参数，如果是对象，则进行添加和修改。==不会触发页面跳转==
```javascript
maple.url().replaceHash({name:456})//修改或增加参数
maple.url().replaceHash('name')//删除参数
maple.url().replaceHash('name','age')//删除多个参数
maple.url().replaceHash('name',{age:123})//混合使用
```
push：使用方法和replace完全相同，区别在于==会触发页面跳转==
```javascript
maple.url().push({name:456})//修改或增加参数
maple.url().push('name')//删除参数
maple.url().push('name','age')//删除多个参数
maple.url().push('name',{age:123})//混合使用
```


