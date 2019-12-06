<template>

    <div id="home" class="paddingt170">
        <!--<div @click="$router.push('fenlei')">dsfsdfd</div>-->
        <!--header-->
        <div class="fixed-top bg-white" style="z-index: 20000;">
            <div class="padding30 paddingb10 flex-container" style="z-index: 1000;width: 100%;">
                <!--<span style="font-family: 'STKaiti';" class="fs-19">网易严选</span>-->
                <span style="font-family: 'STKaiti';" class="fs-19">喜马拉雅</span>

                <div class="flex1 pos-r paddingh20">
                    <i class="iconfont icon-search pos-a text-gray vcenter marginh16"></i>
                    <input style="width: 100%;outline: none;border: none;background-color: rgb(239, 241, 244);"
                           class=" small radius30  paddingv15  paddingl60" type="text" placeholder="搜索">
                </div>
                <div class="btn badge red reverse mini radius30 paddingh16 paddingv20 fs-16">打开APP</div>
            </div>
            <!--nav-->
            <cmui-tabbar>
                <cmui-tabbar-item v-for="(e, i) in navs" :key="i" :title="e" class="fs-12"></cmui-tabbar-item>
            </cmui-tabbar>
        </div>
        <!--banner-->
        <cmui-slider :loop="true" :page="true" :autoplay="true" :space="20" class="paddingt40">
            <cmui-slider-item v-for="(e, i) in banner" :key="i">
                <img :src="e" alt="">
            </cmui-slider-item>
        </cmui-slider>
        <!--tip-->
        <!--<div class="flex-container padding20 fs-10">
            <p v-for="(e, i) in ['网易自营品牌', '30天无忧退货', '48小时快速退款']" class="text-container lh-1" >
                <span><i class="iconfont icon-trade text-red  marginr10 fs-14"></i></span>
                <span style="color: #333;" class=" text-vcenter">{{e}}</span>
            </p>
        </div>-->
        <!--kind-->
        <div class="list list-col5 margint50 marginh80">
            <div class="list-item text-center fs-11 padding10" style="font-weight: 300;" v-for="(e, i) in kinds"
                 :key="i" @click="goLive">
                <img :src="e.img" alt="" style="width: 34px;" class="marginb10">
                <p>{{e.name}}</p>
            </div>
        </div>

        <!--推荐位-->
        <div class=" margint18 marginb16">
            <img src="//imagev2.xmcdn.com/group61/M0A/CD/B2/wKgMZl0W1legiUgkAACPrBBFcJ4381.png" alt="">
        </div>

        <div class="padding15" v-for="(ops, idx) in bodyTitleNames" :key="idx">
            <div class="flex-container padding30">
                <span class="fs-16 text-bolder  left">{{ops.title}}</span>
                <router-link to="more">
                    <span class="text-gray fs-12" style="font-weight: 300">更多</span>
                    <i class="iconfont icon-more text-light"></i>
                </router-link>
            </div>

            <cmui-list :border="false">
                <cmui-list-item v-for="(item,index) in ops.bodyList" class="bg-white" :key="index">
                    <cmui-swiper :right="item.control" @swiper="handle(index, item,$event)" >
                        <div class="paddingv10 flex-container vfull" @click="goDetail">
                            <div class="img-container border flex-x marginh20" style="width:70px;height:70px">
                                <img :src="item.item.coverPath">
                            </div>
                            <div class="flex1">
                                <p class="fs-16 text-limit1">{{item.item.title}}</p>
                                <p class="fs-12 text-gray text-limit1 marginv14 margint10">{{item.item.intro}}</p>
                                <span>
                                <i class="iconfont icon-qrcode"></i>
                                {{item.item.tracks || 0}}
                            </span>
                                <span>
                                <i class="iconfont icon-set"></i>
                                {{item.item.playsCounts | checkNum}}
                            </span>
                            </div>
                        </div>
                    </cmui-swiper>
                </cmui-list-item>
            </cmui-list>
        </div>

        <!--footer-->
        <div class="bg-dark center flex-container-col paddingh75" style="width: 375px;height: 294px;background: url('//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/footer_bg_2b1fa03.png') no-repeat; background-size: 100% 100%;">
            <div class="flex-container">
                <div class="flex-container-col img-container" style="height: 40px;">
                    <img src="//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/footer_logo_f90f028.png" alt="">
                </div>
            </div>

            <div class="flex-container-col vfull border radius40 paddingv20 paddingh50 margint40 marginb20" style="width: 100%; border: 1px solid red">
                <span class="fs-20 text-red">打开APP，听更多声音<i class="iconfont icon-more fs-20 text-red"></i></span>
            </div>
            <div class="fs-12 text-gray text-center margint30 paddingb20">
                <p class="text-center">Copyright © 2014-2019 www.ximalaya.com </p>
                <p class="text-center">lnc.ALL Rights Reserved</p>
            </div>

            <div>
                <span>全部分类  |</span>
                <span>  海外版  |</span>
                <span>  联系我们</span>
            </div>
            <!--<div class="fs-12">
                <span class="btn small reverse"  style="font-weight: 300;background-color: #666;border-color: white; color: white">下载APP</span>
                <span class="btn small reverse marginl40"  style="font-weight: 300;background-color: #666;border-color: white; color: white">电脑版</span>
            </div>
            <div class="margint50 fs-12 text-light text-center">
                <p> 网易公司版权所有 © 1997- 2019</p>
                <p>食品经营许可证：JY13301080111719</p>
            </div>-->
        </div>

    </div>
</template>

<script>
	import dataList from '../data/index.json';
	export default {
		name: 'home',
		components: {},
		data () {
			return {
				dataList,
				logoSrc: '',
				navs: ['推荐', '有声书', '相声', '音乐', '儿童', '人文', '情感', '历史', '科技', '更多'],
				kinds: [
					{
						img: 'http://fdfs.xmcdn.com/group56/M09/3B/BD/wKgLgFyQujLCAVYRAAAuwA7DZMg198.png',
						name: '排行榜'
					},
					{
						img: 'http://fdfs.xmcdn.com/group57/M0A/3B/D0/wKgLgVyQuqWRZsJtAAAnr8tg4rs307.png',
						name: '听单'
					},
					{
						img: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png',
						name: '易烊千玺'
					},
					{
						img: 'http://fdfs.xmcdn.com/group55/M02/74/56/wKgLf1yTMFaR9K9mAAAqjJZfJvA183.png',
						name: '直播'
					},
					{
						img: 'http://fdfs.xmcdn.com/group60/M02/18/F4/wKgLeVziZxHRlc-lAAAO9ZkPU-I489.png',
						name: '分类'
					}
				],
				banner: [
					'http://fdfs.xmcdn.com/group68/M04/D4/7D/wKgMeF3iWD_QmhDDAAImWh6UzPA853.jpg',
					'http://fdfs.xmcdn.com/group67/M00/6D/68/wKgMbV3czZ-i4OqtAAEqbyyOp6w497.jpg',
					'http://fdfs.xmcdn.com/group68/M04/D4/7D/wKgMeF3iWD_QmhDDAAImWh6UzPA853.jpg',
					'http://fdfs.xmcdn.com/group67/M00/6D/68/wKgMbV3czZ-i4OqtAAEqbyyOp6w497.jpg'
                    /*'https://yanxuan.nosdn.127.net/a2e0f844d3b10277d18ac81544f0086c.jpg?imageView&quality=75&thumbnail=750x0',
                     'https://yanxuan.nosdn.127.net/f1683e8ec39b6ff8ef121265269af6c0.jpg?imageView&quality=75&thumbnail=750x0',
                     'https://yanxuan.nosdn.127.net/aa860e44fbd468a7804c1a84796c4827.jpg?imageView&quality=75&thumbnail=750x0',
                     'https://yanxuan.nosdn.127.net/28664331571785592305895daed76aa8.jpg?imageView&quality=75&thumbnail=750x0',
                     'https://yanxuan.nosdn.127.net/6962cab6a909ac395f4af647be0a41a2.jpg?imageView&quality=75&thumbnail=750x0',
                     'https://yanxuan.nosdn.127.net/9d3c05ef9249ab4b13ce900587136b28.jpg?imageView&quality=75&thumbnail=750x0',
                     'https://yanxuan.nosdn.127.net/6609c5631a05c2a2590466d20776f46e.jpg?imageView&quality=75&thumbnail=750x0'*/
				],
				bodyTitleNames: [
					{
						title: '最新专辑',
						routeURL: '',
						bodyList: []
					},
					{
						title: '有声书',
						routeURL: '',
						bodyList: []
					},
					{
						title: '相声',
						routeURL: '',
						bodyList: []
					},
					{
						title: '音乐',
						routeURL: '',
						bodyList: []
					},
					{
						title: 'IT科技',
						routeURL: '',
						bodyList: []
					}
				],
                footerUrl: '//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/footer_logo_f90f028.png'
			}
		},
		filters: {
			checkNum: function (num) {
				const numMap = {
					5: '万',
					9: '亿'
				};
				let len = num > 99999999 ? 9 : 5;
				num = len === 9 ? num / 100000000 : num / 10000;
				let resNum = num.toFixed(1) + numMap[len];
				return resNum
			}
		},
		created () {
            let _this = this;
			this.dataList.body.map((item, idx) => {
				if (idx < 3) return _this.bodyTitleNames[0].bodyList.push(item)
				if (idx < 6) return _this.bodyTitleNames[1].bodyList.push(item)
				if (idx < 9) return _this.bodyTitleNames[2].bodyList.push(item)
				if (idx < 12) return _this.bodyTitleNames[3].bodyList.push(item)
				if (idx < 15) return _this.bodyTitleNames[4].bodyList.push(item)
			})
        },
		methods: {
			goLive () {
				this.$router.push(`/live`)
			},
			goDetail () {
				this.$router.push(`/detail`)
			}
		}
	}
</script>
<style lang="scss">
    .logo {
        width: 50px;
        height: 50px;
        background: url('../data/logo.svg');
    }
</style>
