<template>
    <div>
        <p>三列的列表</p>
        <cmui-list :col="3" border="#234ac2">
            <cmui-list-item v-for="i in list" bgcolor="white">
                <div class="padding20 text-center">
                    {{i}}
                </div>
            </cmui-list-item>
        </cmui-list>
        <p>2:5:3的列表</p>
        <cmui-list :col="[2,5,3]" border="#234ac2">
            <cmui-list-item v-for="i in list" bgcolor="white">
                <div class="padding20 text-center">
                    {{i}}
                </div>
            </cmui-list-item>
        </cmui-list>
        <p>带有间距的列表</p>
        <cmui-list :space="50" :border="true" :col="6">
            <cmui-list-item v-for="item in list" bgcolor="white">
                <div class="ratio-container">
                    <span>{{item}}</span>
                </div>
            </cmui-list-item>
        </cmui-list>
        <p>嵌套的列表</p>
        <cmui-list :col="2">
            <cmui-list-item bgcolor="blue">
                <div class="ratio-container">
                    <span class="text-white">这里是一个独立的cmui-item，右侧是一个嵌套的cmui-item</span>
                </div>
            </cmui-list-item>
            <cmui-list-item>
                <cmui-list :col="3" border="#23ca51" :space="50">
                    <cmui-list-item v-for="i in list" bgcolor="white">
                        <div class="ratio-container">
                            <span>嵌套的列表{{i}}</span>
                        </div>
                    </cmui-list-item>
                </cmui-list>
            </cmui-list-item>
        </cmui-list>
    </div>
</template>

<script>
    import cmuiList from '../../../src/maple/component/list/list.vue';
    import cmuiListGroup from '../../../src/maple/component/list/list-group.vue';
    import cmuiListItem from '../../../src/maple/component/list/list-item.vue';
    import '../../../src/cyan/CMUI_doc.scss';
    export default {
        name: "listDemo",
        components:{cmuiList,cmuiListItem,cmuiListGroup},
        data(){
            return {
                list:Array.from({length:9}).map((item,index)=>index.toString())
            }
        }
    }
</script>