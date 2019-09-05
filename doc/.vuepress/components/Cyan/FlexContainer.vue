<template>
    <div>
        <p>demo</p>
        <div class=" demo" :class="[container,{reverse,round,center,left,right,top,line,bottom,vfull,hfull}]">
            <span v-for="(item,index) in list" :key="index" class="item"> {{item}}</span>
        </div>
        <div class="form">
            <div class="form-group">
                <span>排列方向(必选)：</span>
                <cmui-radio name="align" v-model="container" label="flex-container"></cmui-radio>
                <cmui-radio name="align" v-model="container" label="flex-container-col"></cmui-radio>
            </div>
            <div class="form-group">
                <span>其他属性</span>
                <cmui-checkbox v-model="reverse" target-class="square">reverse</cmui-checkbox>
                <cmui-checkbox v-model="round" target-class="square">round</cmui-checkbox>
                <cmui-checkbox v-model="top" target-class="square">top</cmui-checkbox>
                <cmui-checkbox v-model="left" target-class="square">left</cmui-checkbox>
                <cmui-checkbox v-model="right" target-class="square">right</cmui-checkbox>
                <cmui-checkbox v-model="bottom" target-class="square">bottom</cmui-checkbox>
                <cmui-checkbox v-model="center" target-class="square">center</cmui-checkbox>
                <cmui-checkbox v-model="line" target-class="square">line</cmui-checkbox>
                <cmui-checkbox v-model="vfull" target-class="square">vfull</cmui-checkbox>
                <cmui-checkbox v-model="hfull" target-class="square">hfull</cmui-checkbox>
            </div>

        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/component/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/component/form/radio.vue';
    export default {
        name: "flexContainer",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            return{
                list:['block1','block2','block3'],
                container:'flex-container',
                reverse:false,
                round:false,
                center:false,
                left:false,
                right:false,
                top:false,
                line:false,
                bottom:false,
                vfull:false,
                hfull:false,
            }
        }
    }
</script>

<style scoped>
    .item{
        padding:10px;
        background-color: #b19eee;
    }
    .demo{
        background-color: #c7ffcf;
        min-height:200px;
    }
</style>