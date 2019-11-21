# captcha
captcha组件用于创建一连续输入的区域，通常用于输入验证码，车牌号，手机号码等情景
## 纯数字输入


<Exp>
<div slot="exp">
<Com-Captcha-1></Com-Captcha-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Captcha-1.vue
</div>
</Exp>

## 可输入任何字符
设置type属性为text可以转换为任何字符的输入

<Exp>
<div slot="exp">
<Com-Captcha-2></Com-Captcha-2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Captcha-2.vue
</div>
</Exp>


## 隐藏输入
设置hide为true，转换为隐藏输入

<Exp>
<div slot="exp">
<Com-Captcha-3></Com-Captcha-3>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Captcha-3.vue
</div>
</Exp>


## 可自行设置输入字符长度

<Exp>
<div slot="exp">
<Com-Captcha-4></Com-Captcha-4>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Captcha-4.vue
</div>
</Exp>


## props属性列表

| 属性名称  |类型|默认值|说明
|---|---|---|---|
| length  |Number|4|输入内容的长度
|type|String|'number'|输入的类型，目前只支持string和number两种
|hide|Boolean|true|是否隐藏输入内容
|value|String|''|初始的内容
|activeIndex|Number|-1|当前输入的末尾索引



## 事件列表

| 事件名称  |触发时间|参数
|---|---|---|
| inputEnd  |全部内容输入完成时触发|value

## 样式接口
```scss
//层叠样式接口
.cmui-captcha{
  .cmui-captcha__warp{
    .cmui-captcha__item{
      &.active{}
      .cmui-captcha__dot{}
      .cmui-captcha__line{}
    }
  }
}
//平行样式接口
.cmui-captcha{}
.cmui-captcha__warp{}
.cmui-captcha__item{}
.cmui-captcha__item.active{}
.cmui-captcha__dot{}
.cmui-captcha__line{}
```

