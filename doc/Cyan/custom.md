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
|$layoutNumber|5|基数范围，用于flex,text-limit,text-fixed等
|$padding-base-horizontal|12px|基础水平内填充用于表单元素
|$font-family-base|"Helvetica Neue","Helvetica","PingFang SC","Hiragino Sans GB","Microsoft YaHei"|文字样式
|$font-size-base|14px|默认文本大小
|$line-height-base|20/14|默认行高
|$border-radius-base|基础圆角大小|4px默认，用于按钮和表单的圆角
|$border-color-default|#eee|基础边框颜色
|$btn-size-list|('base':(36px,15px,16px),...)|按钮尺寸列表，对应的三个值为按钮高度，左右填充距离，文本尺寸，建议使用samll,big等表示尺寸的key,注意必须保证base有值
|$badge-size-list|('base':(20px,10px,12px),...)|徽标尺寸列表，对应的三个值为按钮高度，左右填充距离，文本尺寸，建议使用samll,big等表示尺寸的key,注意必须保证base有值
|$form-color-base|#00baba|表单的默认激活颜色
