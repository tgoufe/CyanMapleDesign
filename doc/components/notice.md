# notice
notice组件用于在页面中创建一个居中的提示层，通常用于反馈提示。
## 使用方法
```javascript
maple.notice(options)
```
### options

<Propsintro path="notice/main.vue"></Propsintro>

## 简洁用法
通常情况下我们只需要弹出提示，一定时间后自动消失，那么使用下面的代码就可以，time的默认值为300毫秒。

### Demo

<Exp>
<div slot="exp">
<Com-Notice-1></Com-Notice-1>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Notice-1.vue
</div>
</Exp>

有些时候我们需要手动控制提示框。这时我们可以将运行结果保存起来，并且在必要的时候调用cancel方法。

### Demo

<Exp>
<div slot="exp">
<Com-Notice-2></Com-Notice-2>
</div>
<div slot="code">

<<< @/doc/.vuepress/components/Com/Notice-2.vue
</div>
</Exp>

<!-- ```javascript
let vm=maple.notice('some content',0)//设置时间为0，即一直显示
vm.content='other content'//修改弹窗内容
vm.cancel()//必要的时候手动关闭。
``` -->
## 样式接口
```scss
// notice
.cmui-notice.cmui-popup{
    .cmui-popup__mask{}
    &.cmui-notice__container{
        .cmui-notice__warp{
            .cmui-notice__body{}
        }
    }
}
// 平行样式接口
.cmui-notice .cmui-popup__mask{}
.cmui-notice__container{}
.cmui-notice__warp{}
.cmui-notice__body{}
```
