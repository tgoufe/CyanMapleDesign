<template>
    <div>
        <div class="scroll-container">
            <div style="width:100px;" v-for="(item,index) in list" :key="index">
                <div class="img-container">
                    <img :src="getImage(index)" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiNumber from '../../../../src/maple/component/form/number.vue';
    export default {
        name: "ScrollContainer",
        data(){
            return {
                list:Array.from({length:6},(item,index)=>index),
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