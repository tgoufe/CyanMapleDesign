# 按钮
大部分UI框架对按钮的描述都绑定了状态逻辑，如btn-success会用绿色表示一个成功的按钮，但是这种表述并不适用于C端，比如一个绿色的登陆按钮被写成btn-success，虽然在视觉上没有问题，但是在命名上存在歧义，也不利于改版需求。

Cyan采用所想即所得的方式进行组合描述，你要做的仅仅是为节点添加btn的class然后使用以下属性进行描述。
|类名|作用|
|---|---|
|{color}|继承于色彩系统中的$colorList，默认可选值为red orange yellow green coffee blue purple|
|{size}|继承于尺寸系统，可以不写，默认可选值为small big|
|radius|为按钮增加圆角|
|reverse|对按钮进行旋转|
|block|默认的按钮时inline-block结构的，添加block类可以使转换为block结构，从而使按钮充满所在容器|
<Cyan-Button></Cyan-Button>
