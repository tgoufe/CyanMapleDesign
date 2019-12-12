<template>
    <div>
        <p>设定滑动范围</p>
        <cmui-slidebar v-model="value1" :range="range1"></cmui-slidebar>
        <p>{{value1}}</p>
        <hr>
        <p>设定每次滑动最小单位</p>
        <cmui-slidebar v-model="value2" :step="step2"></cmui-slidebar>
        <p>{{value2}}</p>
        <hr>
        <p>设定change事件</p>
        <cmui-slidebar v-model="value3" :step="step3" class="marginb20" @change="changeHandle"></cmui-slidebar>
        <p>{{value3}}</p>
    </div>
</template>

<script>
	export default {
		name: "Slidebar-1",
		methods:{
			changeHandle(value){
				alert(value)
			}
        },
        data() {
			return {
				value1: 90,
				value2: 10,
				value3: 20,
				range1: 255,
                step2: 10,
                step3: 1
            }
        }
	};
</script>

