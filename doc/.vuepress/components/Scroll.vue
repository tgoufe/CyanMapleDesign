<template>
    <cmui-scroll
            direction="v"
            style="height:400px"
            :pull-text="['下拉刷新','释放刷新','上拉加载','释放加载']"
            @pullStart="start"
            @pullEnd="end"
            @pull="pull"
            :watch="imageList"
            @rendered="rendered">
        <cmui-scroll-item v-for="item in imageList" :key="item">
            <div class="border padding20">
                this is image {{item}}
            </div>
        </cmui-scroll-item>
    </cmui-scroll>
</template>

<script>
    import cmuiScroll from '../../../src/maple/component/scroll/scroll.vue';
    import cmuiScrollItem from '../../../src/maple/component/scroll/scroll-item.vue';
    import '../../../src/cyan/CMUI_doc.scss';
    export default {
        name: "Scroll",
        components:{cmuiScroll,cmuiScrollItem},
        data(){
            return{
                imageList:_.times(10)
            }
        },
        methods:{
            start(){
                console.log('start事件触发')
            },
            end(){
                console.log('end事件触发')
            },
            rendered(){
                console.log('rendered事件触发')
            },
            pull(progress){
                console.log(progress)
            }
        }
    }
</script>