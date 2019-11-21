<template>
    <div>
        <cmui-slidebar v-model="value1" :step="step"></cmui-slidebar>
    </div>
</template>

<script>
	export default {
		name: "Slidebar-1",
		methods:{

        },
        data() {
			return {
				value1: 90,
                step: 10
            }
        }
	};
</script>

