# 安装，编译和使用
## npm 安装
Cyan是CyanMaple的css部分，因此可以使用 npm 的方式安装，并且和你本地的webpack配合使用。
```
npm i cyanmaple -S
```
## CDN安装
可以通过 unpkg.com/cyanmaple 获取到最新版本的资源，在页面上css文件即可开始使用。我们提供了4个样式文件，请根据你的需要选择其中之一
```html
<!--完整的样式库，基于移动端，使用rem作为单位，包括基础样式，动画，组件样式，通常是配合maple组件使用-->
<link rel="stylesheet" href="https://unpkg.com/cyanmaple/CMUI/CMUI.css">
<!--仅包含基础样式库，基于移动端，使用rem作为单位-->
<link rel="stylesheet" href="https://unpkg.com/cyanmaple/CMUI/cmuiMobile.css">
<!--仅包含基础样式库，基于PC端，使用PX作为单位-->
<link rel="stylesheet" href="https://unpkg.com/cyanmaple/CMUI/cmuiPc.css">
<!--动画样式库-->
<link rel="stylesheet" href="https://unpkg.com/cyanmaple/CMUI/cmuiAnimate.css">

```
## 本地编译
运行下面的命令，会在根目录下生成CMUI文件夹并创建CMUI.CSS文件。
```html
npm run cyan
```
## 软件编译
你可以使用编译软件对src/cyan/cmui.scss文件进行编译，并制定生成到对应目录。推荐使用[koala](http://koala-app.com)。
:::tip
使用软件编译只会生成对应的CSS文件，你需要手动将字体文件src/cyan/font文件夹拷贝到相同的目录

使用koala的时候需要将autoprefix勾选
:::
## 移动端配合
Cyan的默认配置中$isPC为false，即面向于移动端的开发。使用rem布局，因此需要设置页面的根节点font-size。请在HTML中的head标签内引入相关的JS文件。
```html
<script src="https://unpkg.com/cyanmaple/CMUI/flexible.js"></script>
```
