<template>
    <div>
        <div class="padding10">
            <cmui-collapse onlyone="true" class="doc" :activeIndex="0">
                <cmui-collapse-item title="组件结构">
					<pre>
                        &lt;cmui-tabbar&gt;
                            &lt;div slot="extra"&gt;&lt;/div&gt;
                            &lt;cmui-tabbar-item&gt;
                                &lt;div slot="content"&gt;&lt;/div&gt;
                            &lt;/cmui-tabbar-item&gt;
                        &lt;/cmui-tabbar&gt;
                    </pre>
                </cmui-collapse-item>
                <cmui-collapse-item title="使用说明">
                    <p class="marginb10">
                        1.&lt;cmui-tabbar&gt;标签可包含多个slot="extra"的标签，如果&lt;cmui-tabbar&gt;的position属性为‘top'或'bottom'，拓展内容将出现在label标签的右侧，如果&lt;cmui-tabbar&gt;的position属性为‘left'或'right'，拓展内容将出现在label标签的底部。</p>
                    <p class="marginb10">2.&lt;cmui-tabbar-item&gt;的内容将被当做每一个tabbar对应的内容并渲染。</p>
                    <p class="marginb10">
                        3.每个&lt;cmui-tabbar-item&gt;标签可包含一个slot="content"的节点，改节点的内容将作为对应标签的内容来实现。如果为&lt;cmui-tabbar-item&gt;设置了content属性，那么content属性对应的文本将作为tabbar的内容显示，并且优先级比slot高</p>
                    <p class="marginb10">
                        4.每个&lt;cmui-tabbar-item&gt;标签可包含一个slot="title"的节点，改节点的内容将作为对应标签的内容来实现。如果为&lt;cmui-tabbar-item&gt;设置了title属性，那么title属性对应的文本将作为tabbar的标签内容显示，并且优先级比slot高</p>
                </cmui-collapse-item>
                <cmui-collapse-item title="支持的属性">
                    <table class="marginb20">
                        <tr>
                            <td rowspan="4">col</td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>String,Number</td>
                        </tr>
                        <tr>
                            <td width="60px">默认值</td>
                            <td>'auto'</td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>设置tabbar的列数，如果是auto则自动排列超出部分滑动显示，如果是 flex则平均排满，如果是数字则表示1行内显示的数量，超出部分滑动显示</td>
                        </tr>

                        <tr>
                            <td rowspan="4">position</td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>String</td>
                        </tr>
                        <tr>
                            <td>默认值</td>
                            <td>'top'</td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>可选值：top left bottom right 表示tabbar所在的方向</td>
                        </tr>

                        <tr>
                            <td rowspan="4">activeIndex</td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>Number</td>
                        </tr>
                        <tr>
                            <td>默认值</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>起始活动标签的索引</td>
                        </tr>

                        <tr>
                            <td rowspan="4">nav</td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>Array</td>
                        </tr>
                        <tr>
                            <td>默认值</td>
                            <td>[false,false]</td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>是否使用前后导航</td>
                        </tr>

                        <tr>
                            <td rowspan="4">watch</td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>Object</td>
                        </tr>
                        <tr>
                            <td>默认值</td>
                            <td>null</td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>监控对象，该对象数据发生变化后tabbar将更新</td>
                        </tr>
                    </table>
                </cmui-collapse-item>
                <cmui-collapse-item title="方法列表">
                    <table>
                        <colgroup>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>方法名称</th>
                            <th>参数</th>
                            <th>作用</th>
                        </tr>
                        <tr>
                            <td colspan="1">changeToNext</td>
                            <td colspan="1">无</td>
                            <td colspan="1">切换到下一个标签</td>
                        </tr>
                        <tr>
                            <td colspan="1">changeToPre</td>
                            <td colspan="1">无</td>
                            <td colspan="1">切换到上一个标签</td>
                        </tr>
                        <tr>
                            <td colspan="1">changeToIndex</td>
                            <td colspan="1">index=0</td>
                            <td colspan="1">切换到指定的标签</td>
                        </tr>
                        <tr>
                            <td colspan="1">changeByStep</td>
                            <td colspan="1">num=1</td>
                            <td colspan="1">根据步长切换标签</td>
                        </tr>
                        <tr>
                            <td colspan="1">updata</td>
                            <td colspan="1">无</td>
                            <td colspan="1">更新</td>
                        </tr>
                        </tbody>
                    </table>
                </cmui-collapse-item>
                <cmui-collapse-item title="抛出的事件">
                    <table>
                        <colgroup>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>方法名称</th>
                            <th>参数</th>
                            <th>触发条件</th>
                        </tr>
                        <tr>
                            <td colspan="1">extra-click</td>
                            <td colspan="1"><p>this：tabbar组件的VM模型即cmui-tabbar<br>item：被点击的拓展的VM模型即slot='extra'<br>index：当前点击的拓展的索引
                            </p></td>
                            <td colspan="1">拓展按钮被点击</td>
                        </tr>
                        <tr>
                            <td colspan="1">nav-click</td>
                            <td colspan="1"><span>this：tabbar组件的VM模型即cmui-tabbar</span><br><span>item：被点击的标签的VM模型即cmui-tabbar-item</span><br><span>index：当前点击的标签的索引</span><br><span>oldIndex：点击前的活动索引</span>
                            </td>
                            <td colspan="1">标签被点击</td>
                        </tr>
                        </tbody>
                    </table>
                </cmui-collapse-item>
                <cmui-collapse-item title="scss样式接口">
					<pre>
                        $name:cmui-tabbar;//组件前缀
                        <span class="text-red">//以下是平级样式接口</span>
                        .#{$name}{
                            [slot="content"]{}
                        }
                        .#{$name}__pre{}
                        .#{$name}__next{}
                        .#{$name}__nav{}
                        .#{$name}__head{}
                        .#{$name}__head-item{
                            &.active{}
                        }
                        .#{$name}__content{}
                        .#{$name}__pane{}
                        .#{$name}__pane-item{}

                        <span class="text-red">//以下是层级样式接口</span>
                        .#{$name}{
                         .#{$name}__head{
                          .#{$name}__pre{}
                          .#{$name}__next{}
                          .#{$name}__nav{
                           .#{$name}__head-item{
                            &.active{
                            }
                           }
                          }
                         }
                         .#{$name}__content{
                          .#{$name}__pane{
                           .#{$name}__pane-item{
                            [slot="content"]{
                            }
                           }
                          }
                         }
                        }
					</pre>
                </cmui-collapse-item>
            </cmui-collapse>
        </div>
        <div class="padding50">
            <h1 class="text-center">配置选项</h1>
            <div class="flex-container paddingt20">
                <label for="">位置</label>
                <div class="btn-group">
                    <a href="javascript:void(0)" @click="tabPosition='top'" class="btn blue small reverse radius">上</a>
                    <a href="javascript:void(0)" @click="tabPosition='bottom'"
                       class="btn blue small reverse radius">下</a>
                    <a href="javascript:void(0)" @click="tabPosition='left'" class="btn blue small reverse radius">左</a>
                    <a href="javascript:void(0)" @click="tabPosition='right'"
                       class="btn blue small reverse radius">右</a>
                </div>
            </div>
            <div class="paddingt20 form green flex-container">
                <label for="">nav选项</label>
                <div>
                    <label for="###" class="lh-28">pre</label>
                    <input type="checkbox" class="checkbox-switch" v-model="tabNav[0]">
                    <label for="###" class="lh-28">next</label>
                    <input type="checkbox" class="checkbox-switch" v-model="tabNav[1]">
                </div>
            </div>
            <div class="paddingt20 form flex-container">
                <label for="###">展示类型</label>
                <select name="" id="" v-model="tabCol" class="flex1 marginl20">
                    <option value="auto">auto</option>
                    <option value="flex">flex</option>
                    <option :value="i" :key="i" v-for="i in [3,4,5,6,7]">{{i}}</option>
                </select>
            </div>
            <a href="javascript:void(0)" @click="add" class="btn green block margint20 radius">添加新标签</a>
        </div>
        <cmui-tabbar
                :col="tabCol"
                :position="tabPosition"
                ref="tab"
                :nav="tabNav"
                @extra-click="extra"
                @item-click="navItem"
                :watch="tabbarData"
                class="theme1"
        >
            <cmui-tabbar-item v-for="(item,index) in tabbarData" :key="index">
                <div slot="title" class="padding10 text-center paddingh20">
                    <span>{{item.title}}</span>
                </div>
                <div slot="content" class="padding10">
                    <span class="text-coffee">这里是标签{{item.title}}对应的内容区域</span>
                </div>
            </cmui-tabbar-item>
        </cmui-tabbar>
    </div>
</template>
<script>
    let count = 0;
    export default {
        data: function () {
            return {
                tabbarData: _.times(5, index => {
                    return {
                        title: 'tab' + index
                    }
                }),
                tabPosition: 'top',
                tabNav: [false, false],
                tabCol: 'auto'
            }
        },
        mounted() {
            this.$root.headTitle = 'tabbar'
        },
        methods: {
            add() {
                this.tabbarData.push({
                    title: 'new Tab' + (++count)
                })
            },
            extra(vm, item, index) {
                console.log(arguments)
            },
            navItem() {
                console.log(arguments)
            }
        }
    }
</script>