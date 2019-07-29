# captcha

captcha组件用于创建一连续输入的区域，通常用于输入验证码，车牌号，手机号码等情景
### props

| 属性名称  |类型|默认值|说明
|---|---|---|---|
| length  |Number|4|输入内容的长度
|type|String|'number'|输入的类型，目前只支持string和number两种
|hide|Boolean|true|是否隐藏输入内容
|value|String|''|初始的内容
|activeIndex|Number|-1|当前输入的末尾索引

### Demo
```html

<!--默认的输入，只能输入数字，在移动端弹起数字键盘并且不可切换-->
<cmui-captcha></cmui-captcha>

<!--设置type为text可输入任何字符，在移动端弹起默认键盘-->
<cmui-captcha type="text"></cmui-captcha>

<!--设置hide为true，转换为隐藏输入-->
<cmui-captcha :hide="true"></cmui-captcha>

<!--调节length属性控制输入数量-->
<cmui-captcha :length="6"></cmui-captcha>

```
### event

| 事件名称  |触发时间|参数
|---|---|---|
| inputEnd  |全部内容输入完成时触发|value
