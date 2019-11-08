<template>
    <div>
        <p>切换下方的选项，查看列表和对应代码中class的变化</p>
        <div class="bg-blue light padding20">
            <div class="list bg-white" :class="[`list-col${col}`,{border,radius,inner}]">
                <div class="list-item" v-for="i in list" :key="i" style="padding:10px">
                    item{{i+1}}
                </div>
            </div>
        </div>
        <div class="form margint20">
            <cmui-number :max="5" v-model="col" :flex="true">列数</cmui-number>
            <cmui-checkbox :flex="true" label="border" v-model="border"></cmui-checkbox>
            <cmui-checkbox :flex="true" label="radius" v-model="radius"></cmui-checkbox>
            <cmui-checkbox :flex="true" label="inner" v-model="inner"></cmui-checkbox>
        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiNumber from '../../../../src/maple/components/form/number.vue';
    import cmuiCheckbox from '../../../../src/maple/components/form/checkbox.vue';
    export default {
        name: "Position",
        components:{cmuiNumber,cmuiCheckbox},
        data(){
            return{
                list:Array.from({length:12},(k,i)=>i),
                col:1,
                border:false,
                radius:false,
                inner:false
            }
        }
    }
</script>
