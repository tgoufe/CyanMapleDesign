<template>
    <div>
        <p>下面是一个用网格建立的宽度375的容器，我们在里面放置N列，然后在每列放置一个1：1的容器用于展示图片，这种结构经常在移动端的商城里见到，在下面的案例里我们将比例容器和图片容器混合使用，来实现一个固定比例的列表</p>
        <div class="tip custom-block"><p>修改横线比例和纵向比例，然后查看DOM结构的class变化。</p></div>
        <div class="demo clearfix">
            <div class="row" style="margin-bottom:-5px">
                <div class="span4" v-for="(item,index) in list" :key="index" style="margin-bottom:5px">
                    <div class="ratio-container" :class="`ratio-container-${x}x${y}`">
                        <div class="img-container flex-x">
                            <img :src="getImage(index)" alt="">
                        </div>
                    </div>
                    <span class="fs-12">这里放置一些商品描述</span>
                </div>
            </div>
        </div>
        <cmui-number v-model="x" :min="1" :max="5" style="margin-top:10px">横向比例</cmui-number>
        <cmui-number v-model="y" :min="1" :max="5" style="margin-top:10px">纵向比例</cmui-number>
    </div>
</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiNumber from '../../../../src/maple/components/form/number.vue';
    export default {
        name: "flexContainer",
        components:{cmuiNumber},
        data(){
            return {
                list:Array.from({length:6},(item,index)=>index),
                x:1,
                y:1
            }
        },
        methods:{
            getImage(index){
                return `//zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/IMG_10${66+index}.JPG?raw=true`
            }
        }
    }
</script>

<style scoped>
    .demo{max-width:375px;border:1px solid blue;min-height:200px;}
    .ratio-container{background-color: #ee7e79}
</style>
