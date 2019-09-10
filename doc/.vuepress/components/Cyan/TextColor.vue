<template>
    <div>
        <p :class="[list]">点击下方的配置，查看文本的颜色变化</p>
        <div class="form">

            <cmui-radio v-for="(value,key) in list"
                        :key="key"
                        :label="key"
                        v-model="list[key]"
                        name="color"
            >
            </cmui-radio>
        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/component/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/component/form/radio.vue';
    export default {
        name: "TextColor",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            let listColor=[
                'red','orange','yellow','green','coffee','blue','purple',
                'black','darker','dark','lighter','light','white'
            ];
            let list={};
            listColor.forEach(item=>{
                list[`text-${item}`]=false
            });
            return{
                list
            }
        }
    }
</script>
