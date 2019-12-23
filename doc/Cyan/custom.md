# 自定义主题
Cyan使用SCSS文件编写，你可以在你的项目里新建一个var.scss文件，重置scss变量来修改主题，并在文件的结尾引入cyan的主文件。
```scss
//变量内容
@import "cyanmaple/src/cyan/cmui.scss";
```
变量表
|变量名|默认值|说明|
|---|---|---|
|$colorList|('red': #ff4c48,...)|色彩列表，用于文本，按钮，徽标，表单，背景的显示，建议使用表示颜色的单词来作为key|
|$grayList|('black': #000,...)|灰度色彩列表，用于文本和背景的显示，建议使用表示颜色的单词来作为key|
|$container_padding|.133333333rem|映射到750的设计稿为10PX，网格默认间距
|$container_width|10rem|网格容器默认宽度
|$layoutNumber|水电费|
|$padding-base-vertical|水电费|
|$padding-base-horizontal|水电费|
|$font-family-base|水电费|
|$font-size-base|水电费|
|$line-height-base|水电费|
|$border-radius-base|水电费|
|$border-color-default|水电费|
|$btn-size-list|水电费|
|$badge-size-list|水电费|
|$form-color-base|水电费|
