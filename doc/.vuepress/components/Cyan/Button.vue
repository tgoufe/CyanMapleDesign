<template>
    <div>
        <p>点击下方的配置，查看按钮变化</p>
        <span class="btn" :class="[colorName,sizeName,{reverse,radius,block}]" v-if="!group">this is a btn</span>
        <div class="btn-group" v-else>
            <span class="btn" :class="[colorName,sizeName,{reverse,radius}]">this is a btn</span>
            <span class="btn" :class="[colorName,sizeName,{reverse,radius}]">this is a btn</span>
            <span class="btn" :class="[colorName,sizeName,{reverse,radius}]">this is a btn</span>
        </div>
        <div class="form">
            <span>设置按钮颜色</span>
            <cmui-radio v-for="(value,key) in list"
                        :key="key"
                        :label="value"
                        v-model="colorName"
                        name="color"
                        class="marginr30"
            >
            </cmui-radio>
            <div>
                <span>设置按钮尺寸</span>
                <cmui-radio v-for="(value,key) in size"
                            :key="key"
                            :label="value||'default'"
                            v-model="sizeName"
                            name="size"
                >
                </cmui-radio>
            </div>
        </div>
        <div class="form">
            <cmui-checkbox :flex="true" v-model="reverse" target-class="switch">reverse</cmui-checkbox>
            <cmui-checkbox :flex="true" v-model="radius" target-class="switch">radius</cmui-checkbox>
            <cmui-checkbox :flex="true" v-model="block" target-class="switch">block</cmui-checkbox>
            <cmui-checkbox :flex="true" v-model="group" target-class="switch">查看按钮组效果</cmui-checkbox>
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
                size:['','big','small'],
                colorName:'',
                sizeName:'',
                reverse:false,
                radius:false,
                block:false,
                group:false
            }
        }
    }
</script>
