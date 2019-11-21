<template>
    <div>
        <cmui-scroll
            style="height: 200px"
            direction="v"
            :watch="nameList"
            :pull-text="textList"
            :pullEvent="true"
            @pullStart="start"
            @pullEnd="end"
            @pull="pull"
            @rendered="rendered"
            :pullDis="70"
        >
            <cmui-scroll-item
                    v-for="(k,i) in nameList" :key="i"
            >
                {{k + i}}
            </cmui-scroll-item>
        </cmui-scroll>
    </div>
</template>

<script>
	export default {
		name: "Scroll-2",
		methods: {
			start() {
				this.nameList = _.times(14, (item, idx) => idx < 7 ? '向上拉' : '向下拉')

			},
			end() {
				_.times(5, () =>  `新的向下拉`).map(item => this.nameList.push(item))
			},
			pull(progress) {
				console.log(progress)
			},
			rendered(){
				console.log('rendered事件触发')
			},

		},
        data() {
            return {
                nameList: _.times(14, (item, idx) => idx < 7 ? '向上拉' : '向下拉'),
                textList: ['下拉刷新', '释放重置数据', '上拉加载', '释放加载更多数据'],
            }
        }
	};
</script>


