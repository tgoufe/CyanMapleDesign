<template>
    <div>

        <!--info-->
        <div class="pos-r">
            <div class="pos-r overflow-h" style="z-index: 22 ">
                <div class=" bg-black flex-container padding20" style="height: 56px;">
                    <img src="http://s1.xmcdn.com/lib/liveroom-index/last/css/img/logo.png" alt="" width="148">
                    <span class="text-white left">想听啥都有</span>
                    <a href="" class="btn red small radius4 ">打开</a>
                </div>

                <div class=" paddingv60 paddingh40 text-white flex-container ">
                    <div class="flex2">
                        <img width="95" height="95"
                             src="//imagev2.xmcdn.com/group62/M08/57/04/wKgMZ1z7asCSSAR8AAFp44juMnc336.jpg" alt="">
                    </div>

                    <div class="flex4">
                        <p class="fs-17 text-bolder ">郭德纲21年相声精选</p>
                        <a class="flex-container img-container round paddingv20 pos-r title_name left">
                            <img alt="德云社郭德纲相声VIP"
                                 src="//imagev2.xmcdn.com/group1/M00/0B/3D/wKgDrlESHqyTqakZAADewk1yMt8360.jpg!op_type=5&amp;device_type=ios&amp;name=web_meduim&amp;upload_type=cover&amp;magick=webp"
                                 style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle;">
                            <span class="marginl20">德云社郭德纲相声VIP</span>
                        </a>
                        <div class="flex-container paddingt20">
                            <p class="">
                                <span class="margint20 marginb40">已订阅296.02万人</span>
                            </p>
                            <div class="paddingh20 btn radius14 reverse text-bloder padding0"
                                 style="height: 28px;line-height: 28px;font-family: PingFangSC-Medium; font-size: 14px;font-weight:500;border:none">
                                + 免费订阅
                            </div>
                        </div>

                    </div>
                </div>
                <div class="pos-a"
                     style="top:0;width:100%;height:300px;z-index:-22;background: url(//imagev2.xmcdn.com/group31/M07/0E/5B/wKgJX1mAQgyi9-IfAAAw0CICWi8961.jpg) no-repeat;background-size: 100% 100%;background-position:center center;filter: blur(10px)"></div>
            </div>
        </div>

        <h3 class="paddingt40 paddingh30 fs-14 text-center" @click="deTextShow()">
            爆料不断的历年经典相声
            <i class="iconfont icon-more"></i>
        </h3>
        <div class="paddingt20 paddingh30" :class="[isTextShow ? 'dis-b': 'dis-n']">
            <p>持续收录郭德纲先生历年经典相声，高清无噪，敬请收听。</p>
        </div>

        <div class="paddingtv20 marginh140 margint40 text-center">
            <span class="btn radius40 orangetitle" style="width: 235px;">打开APP，完整收听 <i class="iconfont icon-more"></i></span>
        </div>

        <!--节目-->
        <div class="paddingh30 paddingt30">
            <div class="flex-container">
                <span class="fs-18 text-bolder">节目({{153}})</span>
                <span class="text-orangespan">批量下载<i class="iconfont icon-more"></i></span>
            </div>

            <div class="list list-col1">
                <div class="list-item" v-for="item in data" :key="item.page_id"
                     @click="$router.push('brands')">
                    <div class="shadow radius">

                        <div class="padding20">
                            <p>{{item.page_info.name}}</p>
                            <p class="text-light fs-11 margint10">
                                品牌·{{item.page_info.discuss_num}}人在讨论
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fs-15 paddingv34 text-center text-orangespan text-bolder">加载更多<i class="iconfont icon-more"></i></div>
        </div>

        <!--大咖来了-->
        <div class="paddingv30 paddingh30">
            <span class="fs-18 text-bolder">大咖来了</span>
            <div>
                <img src="http://fdfs.xmcdn.com/group64/M06/51/FF/wKgMaV1RIOmBe1xiAAGp904KYAY259.png" alt="">
            </div>
        </div>

        <!--相似专辑-->
        <div class="paddingv40 paddingh30 marginb20">
            <span class="fs-18 text-bolder">相似专辑</span>
            <div class="paddingt40 paddingb2">
                <div class="badge light radius10 paddingv8 paddingl24 marginr16 fs-14" style="font-size: 14px;" v-for="i in tips">{{i}} <i class="iconfont icon-more"></i></div>
            </div>

            <div class="list list-col3">
                <div class="list-item padding10" v-for="item in data" :key="item.page_id"
                     @click="$router.push('brands')">
                    <div class="paddingv12 img-container" style="width: 103px;height: 103px;">
                        <img class="radius5" width="103" :src="item.page_info.banner" alt="">
                    </div>
                    <p class="text-limit2 fs-13">{{item.page_info.name}}</p>
                </div>
            </div>


            <div class="text-center margiint20">
                <span class="btn orangespan radius44" style="font-size: 12px;padding: 1px 10px;"><i
                        class="iconfont icon-refresh fs-12 marginr10"></i>换一批</span>
            </div>
        </div>

        <!--主播信息-->
        <div class="padding30 marginv20">
            <span class="fs-18 text-bolder">主播信息</span>
            <div class="paddingt20 flex-container">
                <img class="radius54 " width="54"
                        src="//imagev2.xmcdn.com/group1/M00/0B/3D/wKgDrlESHqyTqakZAADewk1yMt8360.jpg!op_type=5&device_type=ios&name=web_meduim&upload_type=cover&magick=webp" alt="">
                <div class="flex3 paddingl20 paddingr40">
                    <h4 class="marginb4 fs-16">德云社郭德纲相声VIP</h4>
                    <p class="paddingr11 text-limit1 text-gray fs-12">郭德纲领衔德云社唯一授权音频平台。郭德纲相声，包括其著名的君臣斗、马寿出世、宋金刚押宝、解学士等。</p>
                    <p class="paddingt2 text-gray fs-12"><i class="iconfont icon-search fs-12"></i>1242.22万</p>
                </div>
                <div style="width: 40px;" class="text-center text-orangespan">
                    <i class="iconfont icon-home"></i><br>
                    <span class="fs-12">加关注</span>
                </div>
            </div>
            <div class="flex-container paddingt56 paddingb22">
                <div>
                    <img width="91" src="//imagev2.xmcdn.com/group68/M07/FD/8F/wKgMbl3WPWCTUMRBAAJGX3kaaLY681.jpg!op_type=3&columns=144&rows=144&magick=webp" alt="">
                    <img width="11" height="64" src="//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/album_disc_bg@2x_71be49d.png" alt="">
                    <span class="text-limit2 paddingt12 paddingr44">2019郭德纲从艺30周年相声专场</span>
                </div>
                <div>
                    <img  width="91" src="//imagev2.xmcdn.com/group68/M07/FD/8F/wKgMbl3WPWCTUMRBAAJGX3kaaLY681.jpg!op_type=3&columns=144&rows=144&magick=webp" alt="">
                    <img  width="11" height="64" src="//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/album_disc_bg@2x_71be49d.png" alt="">
                    <span class="text-limit2 paddingt12 paddingr44">2019郭德纲从艺30周年相声专场</span>
                </div>
                <div>
                    <img width="91" src="//imagev2.xmcdn.com/group68/M07/FD/8F/wKgMbl3WPWCTUMRBAAJGX3kaaLY681.jpg!op_type=3&columns=144&rows=144&magick=webp" alt="">
                    <img width="11" height="64" src="//s1.xmcdn.com/yx/ximalaya-mobile-resource/last/dist/images/album_disc_bg@2x_71be49d.png" alt="">
                    <span class="text-limit2 paddingt12 paddingr44">2019郭德纲从艺30周年相声专场</span>
                </div>
            </div>
            <div class="text-center paddingt20">
                进入主页 >
            </div>
        </div>


        <!--喜马拉雅经典必听-->
        <div class="paddingv40 paddingh30 marginb20">
            <span class="fs-18 text-bolder">喜马拉雅经典必听</span>
            <div class="paddingt40 paddingb2">
                <div class="badge graybage radius10 padding8 marginr16" v-for="i in tips">{{i}} <i class="iconfont icon-more"></i></div>
            </div>

            <div>
                <cmui-list :border="false">
                    <cmui-list-item v-for="(ops,index) in opsList.body" class="bg-white" :key="index">

                        <div class="after_border paddingv30 paddingr20 flex-container vfull">

                            <img class="radius4 marginr20" :src="ops.item.coverPath" width="70" height="70">

                            <div class="flex1">
                                <p class="fs-16 text-limit1">{{ops.item.title}}</p>
                                <p class="fs-12 text-gray text-limit1 marginv14 margint10">{{ops.item.intro}}</p>
                                <span class="fs-12 text-gray">
                                    <i class="iconfont icon-qrcode fs-12"></i>
                                    {{ops.item.tracks || 0}}
                                </span>
                                <span class="fs-12 text-gray">
                                    <i class="iconfont icon-set fs-12"></i>
                                    {{ops.item.playsCounts || 0}}
                                </span>
                            </div>
                        </div>

                    </cmui-list-item>
                </cmui-list>
            </div>
        </div>

        <div class="title_name pos-r flex-container paddingv34 marginv30 center fs-15 text-orangespan text-bolder">
            查看更多<i class="iconfont icon-more fs-15 text-orangespan text-bolder"></i>
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
	import {data} from '../data/hot.json'
	import dataList from '../data/index.json';
	export default {
		data () {
			return {
				data,
				opsList: dataList,
                tips: ['相声', '于谦', '郭德纲', '专辑'],
				isTextShow: false
			}
		},
        created() {
		    console.log(this.opsList)
        },
		methods: {
	        deTextShow() {
	        	this.isTextShow = !this.isTextShow;
            }
        }
	}
</script>

<style lang="scss" scoped>
    .title_name:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid rgba(220, 220, 220, .4);
        -webkit-transform: scaleY(.5);
        -ms-transform: scaleY(.5);
        transform: scaleY(.5);
        -webkit-transform-origin: 50% 100%;
        -ms-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
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

    #s4 .buttonWrapper {
        position: relative;
        z-index: 10;
        margin: 0 auto 18px;
        width: 280px;
        height: 55px;
        line-height: 55px;
        background-image: -webkit-gradient(linear,left top,right top,from(#fa2800),to(#ff001b));
        background-image: -o-linear-gradient(left,#fa2800 0,#ff001b 100%);
        background-image: linear-gradient(90deg,#fa2800 0,#ff001b 100%);
        -webkit-box-shadow: 0 6px 6px 0 rgba(55,14,26,.38),inset 4px 5px 20px 0 rgba(255,246,148,.73);
        box-shadow: 0 6px 6px 0 rgba(55,14,26,.38),inset 4px 5px 20px 0 rgba(255,246,148,.73);
        border-radius: 27.6px;
        overflow: hidden;
        text-align: center;
        font-size: 18px
    }

</style>
