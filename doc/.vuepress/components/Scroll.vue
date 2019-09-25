<template>
    <cmui-scroll
            direction="v"
            style="height:400px"
            :pull-text="['下拉刷新','释放重置数据','上拉加载','释放加载更多数据']"
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
    import cmuiScroll from '../../../src/maple/components/scroll/main.vue';
    import cmuiScrollItem from '../../../src/maple/components/scroll-item/main.vue';
    import '../../../src/cyan/CMUI_doc.scss';
    let i=1;
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
                this.imageList=_.times(10);
                i=1;
            },
            end(){
                this.imageList.push(..._.times(10,index=>index+i*10));
                i++;
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
