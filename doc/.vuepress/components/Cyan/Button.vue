<template>
    <div>
        <p :class="className">点击下方的配置，查看文本的颜色变化</p>
        <span class="btn" :class="[className,{reverse,radius,block}]">this is a btn</span>
        <div class="form">
            <cmui-radio v-for="(value,key) in list"
                        :key="key"
                        :label="value"
                        v-model="className"
                        name="color"
            >
            </cmui-radio>
            <div>
                <cmui-radio v-for="(value,key) in list"
                            :key="key"
                            :label="value"
                            v-model="className"
                            name="color"
                >
                </cmui-radio>
            </div>
        </div>
        <div class="form">
            <cmui-checkbox :flex="true" v-model="reverse" target-class="switch">reverse</cmui-checkbox>
            <cmui-checkbox :flex="true" v-model="radius" target-class="switch">radius</cmui-checkbox>
            <cmui-checkbox :flex="true" v-model="block" target-class="switch">block</cmui-checkbox>
        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/component/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/component/form/radio.vue';
    export default {
        name: "Button",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            let list=[
                'red','orange','yellow','green','coffee','blue','purple',
                'black','white'
            ];
            return{
                list,
                size:'',
                className:'',
                reverse:false,
                radius:false,
                block:false
            }
        }
    }
</script>
