# 概览
## Cyan是什么
Cyan是一套对常用的页面样式高度抽离CSS框架。内部封装了大量的class，确使用了很少的名称，通过这些class的组合即可完成绝大多数的页面布局需求。
## 核心思想
在我们日常的开发中经常为起名字而烦恼，很多时候会出现开发人员A需要起一个名字，但是又不知道如何翻译，所以使用翻译软件来获取对应的英文名，等到开发人员B在查看的时候发现这个名字不认识，再用翻译软件翻译回来的情况。这是非常痛苦的过程。
:::tip
因此在你使用Cyan之前，请先阅读下面的名词列表，这些是你在后续使用中会用到的所有关键字。
:::
<Cyan-Word/>
<Cyan-Import/>
## 便于理解和记忆
我相信在上方列出的单词列表里大部分都是你认识的，并且能瞬间理解其作用的，除了一个单词:cyan，它代表青色，这是在赤橙黄绿青蓝紫（Cyan的色彩系统）中唯一一个大部分人不认识的单词。这从侧面上反应了我们的第一个核心思想--便于理解记忆。

我们希望所有的开发者在使用Cyan的时候不需要去记忆复杂的使用方法和API以及对应的HTML结构，用尽量简单的单词让所有使用到的class对于任何开发人员来说都可以一次写对，并且另一个开发人员在阅读的时候能很好的理解，这一点非常重要。

## 组合
使用框架另一个非常大的问题在于除了你要记住复杂的命名外，你还需要记忆对应的结构。否则就会出现样式的混乱。因此Cyan解决的第二个问题就是允许开发者使用简单的单词进行组合，用于描述你需要获得的样式。你要做的仅仅是通过上面的这些class关键字，去描述你在设计稿上看到的内容。举个简单的例子：你在设计稿上看到一个红色的圆角按钮，你只需要向下面这样写。

输入
```html
<a href="###" class="btn red">按钮</a>
```
输出：<a href="###" class="btn red">按钮</a>

如果设计需要改成小一点的，翻转的，带有圆角的样式，你只需要添加一些class即可

输入:新增加了三个class--**small reverse radius**
```html
<a href="###" class="btn red reverse radius small">按钮</a>
```
输出：<a href="###" class="btn red reverse radius small">按钮</a>
:::tip
在后面的介绍中你会看到大量这种描述性组合，因此我们也将Cyan称为描述性框架。
:::
## 无业务和语义逻辑
大部分UI框架在功能上是混合业务或语义逻辑的，比如红色的按钮通常代表错误，因此命名为btn-error，但是Cyan完全剥离这些逻辑，而采用设计描述属性，就像上面的案例一样，我们的表述为btn red small reverse radius（一个小的红色的带有圆角的翻转的按钮）。

这样做的目的是可以更加灵活的控制并减少样式的书写，比如你要制作一个两列的产品列表，里面包含图片，名称，产地，价格等信息，通常情况下你需要在DOM节点中添加productList pImage pName pPrice等class并单独为这些class设置对应的样式。但是试想这样几个问题：
:::warning
1.如果页面上存在多个产品列表该如何处理？

2.如果它们的样式仅有细小差别你又不知道设计什么时候修改，该如何处理？

3.如果有一个用户展示列表和这个产品列表样式完全相同该如何处理？
:::
看一下Cyan的结构

输入：
```html
<!--list表示列表col2表示两列-->
<div class="list list-col2">
    <!--list-item表示列表项-->
    <div class="list-item">
        <!--使用比例容器保证图片为正方形，组合图片容器用于放置图片-->
        <div class="ratio-container img-container">
            <img src="图片地址" alt="">
        </div>
        <!--定位到左上角的限时抢购图标-->
        <span class=" reverse red badge square pos-a top10 left10">抢</span>
        <!--内填充辅助-->
        <div class="padding10">
            <!--文本限制到两行-->
            <span class="text-limit2 fs-13">美剧《破产姐妹花》中毒舌又性感的Max你一定有所耳闻吧，她在剧中经常使用的一款唇膏</span>
            <!--浮动容器-->
            <div class="flex-container margint10">
                <!--使用style为图片容器设置宽度，使用round做成圆形-->
                <div class="img-container round" style="width:40px">
                    <img src="图片地址" alt="">
                </div>
                <!--设置文本颜色和尺寸和划线-->
                <span class="text-delete text-light marginl10">999</span>
                <!--使用right让文本居右-->
                <span class="text-red fs-13 right">现价59</span>
            </div>
        </div>
    </div>
    <div class="list-item">
        <!--此处代码和上面的相同-->
    </div>
</div>
```
输出：

<div style="max-width:375px;background-color:#ddd;padding:5px">
<div class="list list-col2">
    <div class="list-item" style="padding:5px;">
        <div class="ratio-container img-Container">
            <img src="http://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/kouhong.jpg" alt="">
        </div>
        <div class="pos-a top10 left10">
            <span class=" reverse red badge square">抢</span>
        </div>
        <div class="padding10 bg-white">
            <span class="text-limit2 fs-13">美剧《破产姐妹花》中毒舌又性感的Max你一定有所耳闻吧，她在剧中经常使用的一款唇膏</span>
                <div class="flex-container margint10">
                    <div class="img-container round" style="width:40px"><img src="http://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/timg.jpeg" alt=""></div>
                    <span class="text-delete text-light marginl10">999</span>
                    <span class="text-red fs-13 right">现价59</span>
                </div>
        </div>
    </div>
    <div class="list-item" style="padding:5px;" >
        <div class="ratio-container img-Container"><img src="http://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/kouhong.jpg" alt=""></div>
        <div class="pos-a top10 left10">
                    <span class=" reverse red badge square">抢</span>
                </div>
        <div class="padding10 bg-white">
            <span class="text-limit2 fs-13">美剧《破产姐妹花》中毒舌又性感的Max你一定有所耳闻吧，她在剧中经常使用的一款唇膏</span>
                <div class="flex-container margint10">
                    <div class="img-container round" style="width:40px"><img src="http://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/timg.jpeg" alt=""></div>
                    <span class="text-delete text-light marginl10">999</span>
                    <span class="text-red fs-13 right">现价59</span>
                </div>
        </div>
    </div>
</div>
</div>

在上面的案例中你可以看到，我们没有为任何的DOM节点设置符合业务逻辑的名称，也几乎没有写任何额外的CSS（除了使用style调整图片容器的尺寸），就完成了列表的布局。因为抛弃了业务逻辑，因此这样的结构可以作为任何模块使用，比如用户列表，视频列表等。

从另一个角度来讲，当你阅读一段Cyan的组合结构代码的时候，你的脑海中可以清晰的浮现出它最后呈现的页面效果，但是你完全不知道它用于什么模块，如果要解决这个问题，你可以在DOM中增加类似productList这样的class来标注它的用途
## 业务逻辑命名引用
:::tip
我们并不阻止你使用包含业务的名称对DOM节点进行命名，事实上适当的业务命名会提升代码的可读性，只不过我们认为命名和重复的书写样式是一件麻烦的事情，从而提供了一种方法让你可以在不命名的情况下依旧可以高效完成工作，如果你觉得这种结构不适用你的需求，可以引用Cyan的Sass拓展包。
:::
```html
<div class="productList">
    <div class="productItem">
        <div class="productImg">
            <img src="" alt="">
        </div>
        <span class="productName"></span>
        <div class="productInfo">
            <div class="info_img"></div>
            <div class="info_oldPrice"></div>      
            <div class="info_newPrice"></div>      
        </div>
    </div>
</div>
```
```scss
@import cyan/extend;
.productList{
    @extend list;
    .productItem{@extend list-item;}
    .productImg{ @extend ratio-container img-container;}
    .productName{@extend text-limit2 fs-13;}
    .productInfo{
        @extend flex-container margint10;
        .info_img{@extend img-container round;width:40px}
        .info_oldPrice{@extend text-delete text-light marginl10}
        .info_newPrice{@extend text-red fs-13 right}
    }
}
```
## 使用建议
在使用Cyan的时候，你有下面三种方式去完成你的页面。如何使用完全取决于你的习惯和需求

1.只使用Cyan提供的class，完全不使用业务逻辑命名，在需要微调的地方使用行内样式进行调整。

    优点：1.开发速度快 2.后期修改方便 3.仅通过源码即可知道最后的呈现效果。
    缺点：1.DOM节点中的class非常多 2.通过源码无法了解该模块的用途。
2.使用业务逻辑命名，在样式文件中引用Cyan的拓展包。

    优点：1.不需要增加大量class 2.从命名可以看出业务场景。
    缺点：1.起名是个麻烦事 2.嵌套结构如果修改也比较麻烦 3.并不是所有的结构都能通过拓展包完成

3.使用Cyan提供的class，同时添加业务逻辑命名，即将两种方式混合使用。微调的地方使用业务名称对应的额外样式文件

    优点：1.开发速度快 2.主要样式修改方便 3.通过源码可以了解业务，也可以了解效果
    缺点：1.节点中的class多 2.需要起名 3.细节样式和主要样式分离，修改要查找两个地方
    