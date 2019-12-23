<template>
    <div id="channel">

        <div class="fixed-top bg-white" style="z-index: 20000;height: 1rem">
            <div class="paddingh20 paddingt10 flex-container" style="z-index: 1000;width: 100%;">
                <div class="flex1" @click="goHome">
                    <i class="baseIcon fs-20 baseIcon-back"></i>
                </div>
                <div class="flex1 text-center text-black fs-20" style="font-weight: bold">
                    新闻频道
                </div>

                <div class="flex1 text-right">

                </div>
            </div>
        </div>

        <div class="margint70">
            <cmui-tabbar>
                <cmui-tabbar-item class="frs-40" title="首页">
                    <div class="paddingh20 paddingv20 borderb">
                        <div class="margint10">
                            <div v-for="(v, i) in yuanchuang.slice(0,7)" :key="i">
                                <div class="paddingb10">
                                    <div class="flex-container bg-white padding10">
                                        <div class="flex2">
                                            <p class="paddingv20 fs-17">{{v.title}}</p>
                                            <p style="color: #b4b4b4" class="fs-14"><span>{{v.source}}</span><span class="marginl20">{{v.pubtime}}</span><span
                                                    class="marginl20">{{v.reply}}</span></p>
                                        </div>
                                        <div class=" flex1" v-if="v.src">
                                            <img style="border-radius: 5px" :src="v.src" alt="">
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </cmui-tabbar-item>
                <cmui-tabbar-item class="frs-40" title="国内">
                    <div class="margint10">
                        <div v-for="(v, i) in tuijian" :key="i">
                            <div class="paddingh20 paddingv15">
                                <div class="flex-container bg-white">
                                    <div class="flex2">
                                        <p class="paddingv20 fs-17">{{v.title}}</p>
                                        <p style="color: #b4b4b4" class="fs-14"><span>{{v.source}}</span><span class="marginl20">{{v.pubtime}}</span><span
                                                class="marginl20">{{v.reply}}</span></p>
                                    </div>
                                    <div class=" flex1" v-if="v.src">
                                        <img :src="v.src" alt="">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </cmui-tabbar-item>
                <cmui-tabbar-item class="frs-40" title="国际">
                    <div class="margint10">
                        <div v-for="(v, i) in yuanchuang" :key="i">
                            <div>
                                <div class="bg-white paddingh20 paddingv15">
                                    <p class="paddingv20 fs-20">{{v.title}}</p>
                                    <img :src="v.src" alt="">
                                    <div class="margint10">
                                        <p style="color: #b4b4b4" class="fs-14"><span>{{v.source}}</span><span class="marginl20">{{v.pubtime}}</span><span
                                                class="marginl20">{{v.reply}}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </cmui-tabbar-item>
                <cmui-tabbar-item class="frs-40" title="要闻">
                    <div class="margint10">
                        <div v-for="(v, i) in yuanchuang" :key="i">
                            <div>
                                <div class="bg-white paddingh20 paddingv15">
                                    <p class="paddingv20 fs-20">{{v.title}}</p>
                                    <img :src="v.src" alt="">
                                    <div class="margint10">
                                        <p style="color: #b4b4b4" class="fs-14"><span>{{v.source}}</span><span class="marginl20">{{v.pubtime}}</span><span
                                                class="marginl20">{{v.reply}}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </cmui-tabbar-item>
            </cmui-tabbar>

        </div>
        <div class="flex-container text-center" style="height: 4rem;background-color:rgba(245,247,249) " >
            <div class="flex1 fs-20">
                <i class="baseIcon fs-20 baseIcon-questionfill"></i>
                反馈
            </div>
            <div class="flex1 fs-20">
                <i class="baseIcon fs-20 baseIcon-barcode"></i>
                合作
            </div>
            <div class="flex1 fs-20">
                <i class="baseIcon fs-20 baseIcon-peoplefill"></i>
                登录
            </div>
        </div>
    </div>
</template>

<script>
    import wangyiData from '../data/wangyiData'

    export default {
        name: 'home',
        components: {},
        mounted() {

        },
        data: function () {
            window.vm = this;
            return {
                yuanchuang: wangyiData.yuanchuang,
                tuijian: wangyiData.tuijian,
                isactive: false,
                activeLength: 11,
                navs: ['要闻', '推荐', '原创'],
                secondtitle: ['新闻', '娱乐', '体育', '财经', '图片', '汽车', '军事', '直播', '视频', '科技', '房产', '手机', '星闻', '数码', '本地', '网易号', '段子', '时尚', '家居', '跟帖', '游戏', '教育', '公开课', '健康', '旅游', '亲子', '艺术', '双创']

            }
        },
        computed:{
            titles(){
                return this.secondtitle.slice(0,this.activeLength);
            }
        },
        methods: {
            showDown() {
                this.isactive = !this.isactive;
                this.activeLength = this.isactive ? -1 : 11;
            },
            goHome() {
                this.$router.push('/home')
            }

        }
    }
</script>
<style lang="scss">
    .ly-title {
        background: url(https://static.ws.126.net/163/wap/f2e/milk_index/logo-site.png) no-repeat 50%;
        background-size: contain;
        height: .56rem;
        width: 1rem;
    }

    .lyresever {
        -webkit-transform: rotate(180deg);
        -webkit-transition: all .3s linear;
    }

    #channel .cmui-tabbar.cmui-tabbar-top .cmui-tabbar__head-item.active::after {
        width: 20%;
        left: 40%;
    }

</style>
