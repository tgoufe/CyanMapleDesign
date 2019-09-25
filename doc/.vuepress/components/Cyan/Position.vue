<template>
    <div class="flex-container">
        <div class="flex1 pos-r" style="height:200px;background-color: red;">
            <div style="padding:20px;background-color: blue;"
                 :class="list"
                 :style="{
                    width:list['abs-top']||list['abs-bottom']?'auto':'50px',
                    height:list['abs-right']||list['abs-left']?'auto':'50px'
                 }"
            >
            </div>
        </div>
        <div class="flex1 form" style="padding:20px">
            <cmui-checkbox
                    target-class="switch"
                    :flex="true"
                    v-for="(value,key) in list"
                    :key="key"
                    v-model="list[key]"
            >{{key}}</cmui-checkbox>
        </div>

    </div>
</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/components/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/components/form/radio.vue';
    export default {
        name: "Position",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            return{
                list:{
                    'vcenter':false,
                    'hcenter':false,
                    'fullcenter':false,
                    'abs-top':false,
                    'abs-bottom':false,
                    'abs-left':false,
                    'abs-right':false,
                    'abs-center':false,
                }
            }
        }
    }
</script>
