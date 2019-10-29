# 设备晃动控制
:::warning
注意，由于系统的限制，shake方法仅在HTTPS下生效
:::
调用系统的陀螺仪实现摇一摇功能
## 快捷调用
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
## 对象调用
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

## 混合调用
将快捷调用和对象调用混合使用，对象的优先级更高，会覆盖前面的参数
```javascript
maple.shake(function(){console.log('begin')},{interval:2000})
