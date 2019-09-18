<template>
    <div>
        <p class="text-red text-bolder">下面的案例展示了一个在宽高为200的img-container内放置一张图片的情景，尝试切换下面给出的属性并查看效果</p>
        <div class="ratio-container" style="background-color: #00b3ee;max-width:200px">
            <div class="img-container" :class="{
            full,
            'flex-x':flexx,
            'flex-y':flexy,
            radius,
            round,
            border,
            top,
            bottom,
            left,
            right}">
                <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6uw84o18wj30ku0dwdjl.jpg" alt="">

            </div>
        </div>
        <div class="form">
            <cmui-checkbox v-model="full" :flex="true" target-class="switch"><span class="text-bolder text-blue">full:</span>图片撑满容器，会导致图片变形</cmui-checkbox>
            <cmui-checkbox v-model="flexx" :flex="true" target-class="switch"><span class="text-bolder text-blue">flex-x:</span>在X轴上撑满，可能导致图片被截取</cmui-checkbox>
            <cmui-checkbox v-model="flexy" :flex="true" target-class="switch"><span class="text-bolder text-blue">flex-y:</span>在Y轴上撑满，可能导致图片被截取</cmui-checkbox>
            <cmui-checkbox v-model="radius" :flex="true" target-class="switch"><span class="text-bolder text-blue">radius:</span>给容器设置圆角,默认为4像素</cmui-checkbox>
            <cmui-checkbox v-model="round" :flex="true" target-class="switch"><span class="text-bolder text-blue">round:</span>将容器制作成圆形</cmui-checkbox>
            <cmui-checkbox v-model="border" :flex="true" target-class="switch"><span class="text-bolder text-blue">border:</span>给图片添加边框</cmui-checkbox>
            <cmui-checkbox v-model="top" :flex="true" target-class="switch"><span class="text-bolder text-blue">top:</span>位于顶部</cmui-checkbox>
            <cmui-checkbox v-model="bottom" :flex="true" target-class="switch"><span class="text-bolder text-blue">bottom：</span>位于底部</cmui-checkbox>
            <cmui-checkbox v-model="left" :flex="true" target-class="switch"><span class="text-bolder text-blue">left:</span>位于左侧</cmui-checkbox>
            <cmui-checkbox v-model="right" :flex="true" target-class="switch"><span class="text-bolder text-blue">right：</span>位于右侧</cmui-checkbox>
        </div>
    </div>
</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/component/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/component/form/radio.vue';
    export default {
        name: "ImgContainer",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            return{
                'full':false,
                'flexx':false,
                'flexy':false,
                'radius':false,
                'round':false,
                'border':false,
                'top':false,
                'bottom':false,
                'left':false,
                'right':false
            }
        }
    }
</script>