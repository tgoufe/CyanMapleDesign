<template>
    <div>
        <p>普通进度条</p>
        <cmui-progress v-bind="props"></cmui-progress>
        <p>带有渐变的进度条</p>
        <cmui-progress v-bind="props" color="red blue green white"></cmui-progress>
        <p>环形进度条</p>
        <cmui-progress v-bind="props" type="circle" ></cmui-progress>
    </div>
</template>

<script>
    import cmuiProgress from '../../../src/maple/components/progress/main.vue';
    import '../../../src/cyan/CMUI_doc.scss';
    export default {
        name: "Progress",
        components:{cmuiProgress},
        data(){
            return{
                props:{
                    value:80,
                    style:{
                        marginBottom:'20px'
                    },
                    lineWidth:20,
                    size:200,
                    text:'80',
                    radius:true
                }

            }
        }
    }
</script>

<style scoped>

</style>
