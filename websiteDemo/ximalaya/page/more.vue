<template>
    <div>
        <div class="fixed-top bg-white" style="z-index: 20000;">
            <div class="padding30 paddingb10 flex-container" style="z-index: 1000;width: 100%;">
                <span style="font-family: 'STKaiti';" class="fs-19">喜马拉雅</span>

                <div class="flex1 pos-r paddingh20">
                    <i class="iconfont icon-search pos-a text-gray vcenter marginh16"></i>
                    <input style="width: 100%;outline: none;border: none;background-color: rgb(239, 241, 244);"
                           class=" small radius30  paddingv15  paddingl60" type="text" placeholder="搜索">
                </div>
                <div class="btn badge red reverse mini radius30 paddingh16 paddingv20 fs-16">打开APP</div>
            </div>

        </div>

        <div class="flex-container paddingt110 text-ligthgray">

            <div class="fixed-left scroll-container-y paddingt110" style="z-index:999;">
                <div class="" v-for="(item, idx) in titleList" :key="idx">
                    <div class="list_item pos-r flex-x text-center text-vcenter"
                         style="width: 90px;height: 50px;"
                         :class="{'active': item.isActive}"
                         @click="activeItem(item, idx)"
                    >
                        <a class="fs-14">{{item.title}}</a>
                    </div>
                </div>
            </div>

            <div class="paddingl180 row" style="width: 98%">
                <div class="row" v-for="(item, idx) in titleList" :key="idx">
                    <div class="flex-container left marginl30">
                        <div class="flex-container left text-red" style="height: 50px;">
                            <span class="text-bolder">{{item.title}} </span>
                            <span class="fs-12 ">&nbsp;&nbsp;/共{{item.count}}张专辑</span>

                        </div>
                        <i class="paddingh40 iconfont icon-more text-light"></i>
                    </div>

                    <div class="row paddingh30 text-ligthgray" style="display:flex;flex-wrap:wrap">
                        <a class="flex-container center padding15" v-for="label in item.childrenLabels">{{label.name}}</a>
                    </div>
                </div>



                <!--<div class="flex-container-col" v-for="(item, idx) in titleList" :key="idx">
                    <div class="flex-x text-center text-vcenter"
                         style="width: 100%;"
                    >
                        <div class=" center text-vcenter" style="width:100%;height: 50px;">
                            <span>{{item.title}} /</span>
                            <span>{{item.count}}张专辑</span>
                            <i class="iconfont icon-more text-light"></i>
                        </div>
                        <div class="row">
                            &lt;!&ndash;<div class="flex-container center" style="line-height: 56px;">{{size*2+18}}rem</div>&ndash;&gt;
                            <div class="col3 text-center">
                                <a class="flex-container center"
                                   style="width: 28px;height: 20px;" href=""
                                   v-for="label in item.childrenLabels"
                                >
                                    {{label.name}}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>

    </div>

</template>
<script>
	export default {
		data () {
			return {
				titleList: [
					{
						isActive: true,
						title: '有声书',
						count: 496195,
						childrenLabels: [
							{url: 'wenxue', name: '文学'},
							{url: 'wenxue', name: '生活'},
							{url: 'wenxue', name: '教材'},
							{url: 'wenxue', name: '经典'},
							{url: 'wenxue', name: '童书'},
							{url: 'wenxue', name: '成长'},
							{url: 'wenxue', name: '社科'},
							{url: 'wenxue', name: '商业'},
							{url: 'wenxue', name: '外文原版'},
							{url: 'wenxue', name: ''},
							{url: 'wenxue', name: '期刊杂志'},
							{url: 'wenxue', name: '言情'},
							{url: 'wenxue', name: '悬疑'},
							{url: 'wenxue', name: '都市'},
							{url: 'wenxue', name: '幻想'},
							{url: 'wenxue', name: '武侠'},
							{url: 'wenxue', name: '历史'},
							{url: 'wenxue', name: '女生最爱'},
							{url: 'wenxue', name: '男生最爱'},
							{url: 'wenxue', name: 'QQ阅读'},
							{url: 'wenxue', name: '中信书院'},
							{url: 'wenxue', name: '博集新媒'},
							{url: 'wenxue', name: '磨铁阅读'},
							{url: 'wenxue', name: '蓝狮子'},
							{url: 'wenxue', name: '华章图书'},
							{url: 'wenxue', name: '大剧必听榜'},
							{url: 'wenxue', name: '小说'},
							{url: 'wenxue', name: '言情女生'},
							{url: 'wenxue', name: '都市重生'},
							{url: 'wenxue', name: '悬疑推理'},
							{url: 'wenxue', name: '历史纵横'},
							{url: 'wenxue', name: '仙侠幻想'},
						]
					}, {
						isActive: false,
						title: '相声评书',
						count: 496195,
						childrenLabels: [
							{url: 'wenxue', name: '文学'},
							{url: 'wenxue', name: '生活'},
							{url: 'wenxue', name: '教材'},
							{url: 'wenxue', name: '经典'},
							{url: 'wenxue', name: '童书'},
							{url: 'wenxue', name: '成长'},
							{url: 'wenxue', name: '社科'},
							{url: 'wenxue', name: '商业'},
							{url: 'wenxue', name: '外文原版'},
							{url: 'wenxue', name: ''},
							{url: 'wenxue', name: '期刊杂志'},
							{url: 'wenxue', name: '言情'},
							{url: 'wenxue', name: '悬疑'},
							{url: 'wenxue', name: '都市'},
							{url: 'wenxue', name: '幻想'},
							{url: 'wenxue', name: '武侠'},
							{url: 'wenxue', name: '历史'},
							{url: 'wenxue', name: '女生最爱'},
							{url: 'wenxue', name: '男生最爱'},
							{url: 'wenxue', name: 'QQ阅读'},
							{url: 'wenxue', name: '中信书院'},
							{url: 'wenxue', name: '博集新媒'},
							{url: 'wenxue', name: '磨铁阅读'},
							{url: 'wenxue', name: '蓝狮子'},
							{url: 'wenxue', name: '华章图书'},
							{url: 'wenxue', name: '大剧必听榜'},
							{url: 'wenxue', name: '小说'},
							{url: 'wenxue', name: '言情女生'},
							{url: 'wenxue', name: '都市重生'},
							{url: 'wenxue', name: '悬疑推理'},
							{url: 'wenxue', name: '历史纵横'},
							{url: 'wenxue', name: '仙侠幻想'},
						]
					}, {
						isActive: false,
						title: '段子'
					}, {
						isActive: false,
						title: '情感生活'
					}, {
						isActive: false,
						title: '娱乐'
					}, {
						isActive: false,
						title: '影视'
					}, {
						isActive: false,
						title: '儿童'
					}, {
						isActive: false,
						title: '历史'
					}, {
						isActive: false,
						title: '商业财经'
					}, {
						isActive: false,
						title: '人文'
					}, {
						isActive: false,
						title: '教育培训'
					}, {
						isActive: false,
						title: 'IT科技'
					}, {
						isActive: false,
						title: '外语'
					}, {
						isActive: false,
						title: '头条'
					}, {
						isActive: false,
						title: '二次元'
					}, {
						isActive: false,
						title: '戏曲'
					}, {
						isActive: false,
						title: '旅游'
					}, {
						isActive: false,
						title: '健康养生'
					}, {
						isActive: false,
						title: '时尚生活'
					}, {
						isActive: false,
						title: '广播剧'
					}, {
						isActive: false,
						title: '粤语'
					}, {
						isActive: false,
						title: '法律课堂'
					}, {
						isActive: false,
						title: '电台'
					}, {
						isActive: false,
						title: '党团课'
					}, {
						isActive: false,
						title: '品牌之声'
					}, {
						isActive: false,
						title: '汽车'
					}
				],
			}
		},
		methods: {
			activeItem(item, idx) {

				this.titleList.map(item => item.isActive = false);
				item.isActive = true
				console.log(item)
			}
		}
	}
</script>
<style lang="scss" scoped>


    .active {

    }

    .active:before {
        width: 100%;
        height: 100%;
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        border-left: 5px solid rgb(254, 121, 89) !important;
    }

    .list_item:after {
        width: 100%;
        height: 1px;
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        right: 0;
        border-bottom: 1px solid rgb(114, 114, 123) !important;
        opacity: 0.2;
        -webkit-transform: scaleY(.5);
        -webkit-transform-origin: 0 0;
    }
</style>