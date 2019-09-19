<template>
    <div>
        <p>切换下方的选项，查看列表和对应代码中class的变化</p>
        <div class="list" :class="[`list-col${col}`,{border,radius,light}]">
            <div class="list-item" v-for="i in list" :key="i" style="padding:10px">
                item{{i+1}}
            </div>
        </div>
        <div class="form">
            <cmui-number :max="5" v-model="col" :flex="true">列数</cmui-number>
            <cmui-checkbox :flex="true" label="border" v-model="border"></cmui-checkbox>
            <cmui-checkbox :flex="true" label="radius" v-model="radius"></cmui-checkbox>
        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiNumber from '../../../../src/maple/component/form/number.vue';
    import cmuiCheckbox from '../../../../src/maple/component/form/checkbox.vue';
    export default {
        name: "Position",
        components:{cmuiNumber,cmuiCheckbox},
        data(){
            return{
                list:Array.from({length:12},(k,i)=>i),
                col:1,
                border:false,
                radius:false,
                light:false
            }
        }
    }
</script>