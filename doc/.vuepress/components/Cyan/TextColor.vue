<template>
    <div>
        <p :class="className">点击下方的配置，查看文本的颜色变化</p>
        <div class="form">
            <cmui-radio v-for="(value,key) in list"
                        :key="key"
                        :label="value"
                        v-model="className"
                        name="color"
                        class="marginr30"
            >
            </cmui-radio>
        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/components/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/components/form/radio.vue';
    export default {
        name: "TextColor",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            let list=[
                'red','orange','yellow','green','coffee','blue','purple',
                'black','darker','dark','light','lighter','white'
            ].map(item=>`text-${item}`);
            return{
                list,
                className:''
            }
        }
    }
</script>
