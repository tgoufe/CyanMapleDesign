# 设备检测
device方法用于检测项目的运行环境。你可以使用多种方法进行检测

## 方法检测

```javascript
maple.device('chrome') //true
```

## 多项匹配检测

```javascript
传入多个参数共同匹配
maple.device('chrome','ipad') //true
```

## 属性检测

```javascript
maple.device.chrome //true
```

## 属性列表

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
