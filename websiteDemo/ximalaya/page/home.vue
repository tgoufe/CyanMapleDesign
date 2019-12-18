<template>

    <div id="home" class="paddingt220">
        <!--<div @click="$router.push('fenlei')">dsfsdfd</div>-->
        <!--header-->
        <div class="fixed-top bg-white" style="z-index: 20000;">
            <div class="padding30 paddingb10 flex-container" style="z-index: 1000;width: 100%;">
                <!--<span style="font-family: 'STKaiti';" class="fs-19">网易严选</span>-->
                <!--<span style="font-family: 'STKaiti';" class="fs-19">喜马拉雅</span>-->
                <span style="width: 70px" class="fs-19">

                    <svg id="icon-logo" viewBox="0 0 4778 1024" width="100%" height="100%"><path d="M1085.033113 217.006623c0 40.688742-6.781457 88.15894-94.940398 88.15894H0V210.225166h481.483444V135.629139H0V47.470199h481.483444V0h122.066225v47.470199H1085.033113v6.781457c0 40.688742-6.781457 81.377483-94.940398 81.377483H603.549669v67.81457l481.483444 13.562914z m0 434.013245c0 40.688742-6.781457 88.15894-94.940398 88.15894H0V644.238411h196.662252v-61.033113h-47.470199C67.81457 583.205298 6.781457 528.953642 6.781457 467.92053V352.635762h1071.470199v115.284768c0 67.81457-67.81457 115.284768-142.410596 115.284768h-81.377484v61.033113l230.569537 6.781457z m-6.781457 250.913907c0 67.81457-67.81457 115.284768-142.410596 115.284768H149.192053C67.81457 1017.218543 6.781457 962.966887 6.781457 901.933775v-115.284768h1071.470199v115.284768zM325.509934 644.238411h406.887417v-61.033113h-406.887417v61.033113zM162.754967 488.264901h759.523179c20.344371 0 33.907285-13.562914 33.907284-27.125828v-20.344371H135.629139v20.344371c0 20.344371 13.562914 27.125828 27.125828 27.125828z m0 440.794702h759.523179c20.344371 0 33.907285-13.562914 33.907284-27.125828V881.589404H135.629139v20.344371c0 13.562914 13.562914 27.125828 27.125828 27.125828zM4279.099338 339.072848h176.317881V162.754967h-176.317881V339.072848z m0 284.821192h176.317881V447.576159h-176.317881v176.317881z m0 284.821192h176.317881v-176.317881h-176.317881v176.317881zM4563.92053 0v61.033113H4747.019868V67.81457c0 47.470199-6.781457 101.721854-88.158941 101.721854h-88.15894V339.072848H4747.019868v6.781457c0 47.470199-6.781457 101.721854-88.158941 101.721854h-88.15894v176.317881H4747.019868v6.781457c0 47.470199-6.781457 101.721854-88.158941 101.721854h-88.15894v176.317881H4747.019868v6.781457c0 47.470199-6.781457 101.721854-88.158941 101.721854h-488.264901V0h108.503312v61.033113h176.317881V0h108.503311z m-535.7351 176.317881h-210.225165c-33.907285 0-61.033113-6.781457-81.377484-27.125828-27.125828-27.125828-33.907285-67.81457-33.907284-74.596027H4136.688742v773.086093c0 115.284768-33.907285 176.317881-196.662252 176.317881h-40.688742v-108.503311h40.688742c74.596026 0 81.377483-27.125828 81.377484-74.596027V522.172185h-135.62914c-169.536424 0-189.880795-94.940397-189.880794-176.31788V230.569536h108.503311v115.284769c0 54.251656 0 67.81457 81.377483 67.814569h135.62914V176.317881zM3980.715232 542.516556h20.344371l-169.536424 379.76159c-20.344371 54.251656-61.033113 81.377483-169.536424 81.377483l169.536424-372.980132c27.125828-74.596026 81.377483-88.15894 149.192053-88.158941zM1729.271523 840.900662c-33.907285-13.562914-74.596026-20.344371-115.284768-20.344371-189.880795 0-359.417219 128.847682-393.324503 155.97351v-142.410596c115.284768-81.377483 250.913907-128.847682 386.543046-128.847682 27.125828 0 47.470199 0 74.596027 6.781457 115.284768 13.562914 203.443709 67.81457 278.039735 115.284768 54.251656 33.907285 94.940397 61.033113 135.629139 61.033113 81.377483 0 81.377483-33.907285 81.377483-81.377484V644.238411c0-67.81457-20.344371-88.15894-94.940397-88.158941H1234.225166V189.880795H1356.291391v257.695364h739.178808c135.629139 0 210.225166 67.81457 210.225165 203.443709v183.099337c0 122.066225-74.596026 189.880795-196.662251 189.880795-94.940397 0-155.97351-47.470199-223.78808-94.940397-47.470199-33.907285-94.940397-67.81457-155.97351-88.158941zM1335.94702 115.284768c-94.940397 0-108.503311-81.377483-108.503311-108.503311V0h786.649006c176.317881 0 237.350993 61.033113 237.350994 237.350993v135.629139h-128.847683V264.476821c0-142.410596-20.344371-149.192053-149.192052-149.192053h-637.456954zM3092.344371 61.033113V27.125828h115.284768v27.125828H3526.357616c0 61.033113-54.251656 108.503311-115.284768 108.503311h-637.456954V61.033113h318.728477z m-495.046358 0V0h122.066225v840.900662c0 115.284768-67.81457 176.317881-189.880794 176.317881H2441.324503v-101.721854h67.81457c81.377483 0 88.15894-33.907285 88.15894-74.596027V556.07947H2441.324503c0-54.251656 47.470199-101.721854 108.503312-101.721854h47.470198V162.754967H2441.324503c0-54.251656 47.470199-101.721854 108.503312-101.721854h47.470198z m332.291391 806.993377l-108.503311-623.89404h6.781457c81.377483 0 128.847682 33.907285 142.410596 108.503312l67.814569 393.324503c6.781457 33.907285 0 67.81457-27.125828 94.940397-20.344371 13.562914-47.470199 27.125828-81.377483 27.125828z m366.198675 40.688742H3526.357616v6.781457c0 54.251656-54.251656 101.721854-115.284768 101.721854h-637.456954v-108.503311h325.509934c81.377483 0 128.847682-94.940397 162.754967-223.78808 0-13.562914 61.033113-332.291391 61.033112-339.072847 13.562914-74.596026 54.251656-108.503311 142.410596-108.503312h6.781457v6.781457L3390.728477 698.490066c-20.344371 94.940397-33.907285 142.410596-94.940398 210.225166z" fill="#FA2800"></path></svg>
                </span>

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
       <!-- <cmui-slider :loop="true" :page="true" :autoplay="true" :space="20" class="paddingt40">
            <cmui-slider-item v-for="(e, i) in banner" :key="i">
                <img :src="e" alt="">
            </cmui-slider-item>
        </cmui-slider>-->
        <!--tip-->
        <!--<div class="flex-container padding20 fs-10">
            <p v-for="(e, i) in ['网易自营品牌', '30天无忧退货', '48小时快速退款']" class="text-container lh-1" >
                <span><i class="iconfont icon-trade text-red  marginr10 fs-14"></i></span>
                <span style="color: #333;" class=" text-vcenter">{{e}}</span>
            </p>
        </div>-->
        <!--kind-->
        <!--<div class="list list-col5 margint50 marginh80">-->
        <div class="list list-col5 margint20 marginh67">
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

        <div class="padding30" v-for="(ops, idx) in bodyTitleNames" :key="idx">
            <div class="flex-container">
                <span class="fs-16 text-bolder  left">{{ops.title}}</span>
                <router-link to="more">
                    <span class="text-gray fs-12" style="font-weight: 300">更多</span>
                    <i class="iconfont icon-more text-light"></i>
                </router-link>
            </div>

            <!--<cmui-list :border="false">
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
            </cmui-list>-->

            <cmui-list :border="false">
                <cmui-list-item v-for="(item,index) in ops.bodyList" class="bg-white" :key="index">
                    <!--<div :right="item.control" @swiper="handle(index, item,$event)" >-->
                        <div class="after_border paddingv30 paddingr20 flex-container vfull" @click="goDetail">
                            <!--<div class="img-container border flex-x marginr20" style="width:70px;height:70px">-->
                                <img class="radius4 marginr20" :src="item.item.coverPath" width="70" height="70">
                            <!--</div>-->
                            <div class="flex1">
                                <p class="fs-16 text-limit1">{{item.item.title}}</p>
                                <p class="fs-12 text-gray text-limit1 marginv14 margint10">{{item.item.intro}}</p>
                                <span class="fs-12 text-gray">
                                    <i class="iconfont icon-qrcode fs-12"></i>
                                    {{item.item.tracks || 0}}
                                </span>
                                <span class="fs-12 text-gray">
                                    <i class="iconfont icon-set fs-12"></i>
                                    {{item.item.playsCounts | checkNum}}
                                </span>
                            </div>
                        </div>
                    <!--</div>-->
                </cmui-list-item>
            </cmui-list>
        </div>

        <!--footer-->
        <div class="bg-dark center flex-container-col paddingh75"
             style="height: 294px;background: url('//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/footer_bg_2b1fa03.png') no-repeat; background-size: 100% 100%;">
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
<style lang="scss" scoped>
    .logo {
        width: 50px;
        height: 50px;
    }
    .after_border:after {
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
