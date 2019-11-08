<template>
    <div>
        <div class="bg-blue light padding20">
            <div class="list bg-white" :class="[`list-col${col}`,{border,radius,inner}]">
                <div class="list-item" v-for="i in list" :key="i" style="padding:10px">
                    {{text}}
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
    import faker from 'faker';
    export default {
        name: "Position",
        components:{cmuiNumber,cmuiCheckbox},
        data(){
            return{
                text:faker.lorem.words(),
                list:Array.from({length:12},(k,i)=>i),
                col:3,
                border:false,
                radius:false,
                inner:false
            }
        }
    }
</script>
