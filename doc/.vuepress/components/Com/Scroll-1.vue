<template>
    <div>
        <cmui-scroll
            style="height: 100px"
            col="4"
            direction="h"
            :watch="nameList"
            :freeMode="false"
        >
            <cmui-scroll-item
                    v-for="(k,i) in nameList" :key="i"
            >
                {{k}}
            </cmui-scroll-item>
        </cmui-scroll>

        <button class="btn radius red" @click="hShowList">改变list数据</button>
    </div>
</template>

<script>
	export default {
		name: "Scroll-1",
		methods:{
			hShowList() {
                this.nameList = ['万岚王国', '明楚民主联盟', '青武联邦', '金平共和国', '血光自由联邦', '战天共和国', '紫龙合众国', '伟岚酋长国',]
			}
		},
		data() {
			return {
				nameList:['沃舒鸦巢', '巨槌峡谷', '幽影哈营地', '希尔斯布莱德之地', '荆棘森林', '塔哈玛特石林', '古拉巴什沼泽', '雷姆洛斯港', '奥蕾莉亚之海', '刀塔哨塔', '火刃林地', '战歌坟场', '尼耶尔的磨坊']
			}
		}
	};
</script>


