# CyanMaple组件概览

## 弹层类组件
:::tip
所有的弹层组件均基于[popup](./popup)实现，并全部可以通过同名的方法进行调用（为了方便你的使用我们还提供了简介调用的方式来缩减你的代码），这些方法被绑定在全局的maple对象中以及vue.prototype中，因此你可以使用maple.alert()或this.alert()两种方式进行调用，方法的返回值均是一个vue对象，你可以在后续的操作中继续使用。
:::

 [alert](./alert)
 [confirm](./confirm)
 [actions](./actions)
 [notice](./notice)
 [picker](./picker)
 [datePicker](./datePicker)
 [mask](./mask)
</div>


## 布局类组件
 [list](./list)
 [virtualList](./virtualList)
 [affix](./affix)
 [tabbar](./tabbar)
 [collapse](./collapse)
 [scroll](./scroll)

## 展示类组件
 [captcha](./captcha)
 [countdown](./countdown)
 [image](./image)
 [slider](./slider)
 [progress](./progress)
 [slidebar](./slidebar)
## 表单组件
 [input](./input)
 [number](./number)
 [checkbox](./checkbox)
 [radio](./radio)
 [select](./select)
 [textarea](./textarea)
