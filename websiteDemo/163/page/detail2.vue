<template>
    <div id="detail">
        <div class="fixed-top bg-red" style="z-index: 20000;height: 1.2rem">
            <div class="flex-container" style="z-index: 1000;width: 100%;">
                <div class="text-left text-white ly-title marginh20" style="height: 1.2rem;" @click="goHome">
                </div>
                <div class="flex1 borderl paddingl10 text-white fs-16" style="line-height: 1.2rem">
                    体育频道
                </div>
                <div class="flex1 text-left flex-container">
                    <div>
                        <div class="border paddingh8 radius10 text-center text-white">
                            586跟帖
                        </div>
                    </div>
                    <div class="marginr20">
                        <i style="color: white" class="baseIcon fs-20 baseIcon-share"></i>
                    </div>
                </div>
            </div>

        </div>
        <div>
            <div class="margint120 paddingh20">
                <div class="text-left fs-20">
                    <h1 style="font-weight: bold">卡鲁索：我们只输了4场球 我们会努力在下场比赛争胜</h1>
                </div>
                <div class="margint15 fs-14" style="color: #888">
                    <span>2019-12-10 13:55</span><span class="marginl20">直播吧</span>
                </div>
                <div class="marginv30">
                    <img :src="src" alt="">
                </div>
                <div class="fs-20">
                    <p class="margint15" style="text-indent:2em">
                        {{first}}
                    </p>
                    <p class="margint15" style="text-indent:2em">
                        {{secend}}
                    </p>
                </div>
            </div>
        </div>
        <div class="lyborder margint20"></div>
        <div class="paddingh20 paddingv10 borderb">
            <div class="fs-20 paddingv20 text-red" style="font-weight: 300">
                相关推荐
            </div>

            <div class="margint10">
                <div v-for="(v, i) in yuanchuang.slice(0,7)" :key="i" @click="goDetail">
                    <div class="paddingb10">
                        <div class="flex-container bg-white padding10">
                            <div class=" flex1" v-if="v.src">
                                <img style="border-radius: 5px" :src="v.src" alt="">
                            </div>
                            <div class="flex2 marginl10">
                                <p class="paddingv20 fs-17">{{v.title}}</p>
                                <p style="color: #b4b4b4" class="fs-14"><span>{{v.source}}</span><span class="marginl20">{{v.pubtime}}</span><span
                                        class="marginl20">{{v.reply}}</span></p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
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
        name: "detail",
        data() {
            return {
                yuanchuang: wangyiData.yuanchuang,
                first:'直播吧12月18日讯 今天，湖人输给了步行者。赛后，卡鲁索接受了记者的采访。',
                secend:'谈到今天输掉本赛季的第一场客场比赛，他表示：“无论是在主场还是在客场，输球总是难受的，我们打球就是为了赢球，我们有很多求胜欲强的球员。没人愿意输球，不幸的是我们今晚输球了，我们会从中学习，努力变得更好。这只是82场比赛的其中一场而已，这也只是我们本赛季输的第4场球，所以我们需要调整心态，努力拿下下一场比赛的胜利。”',
                src:'http://crawl.ws.126.net/img/4765e9812ba17527e237ba135c9ad285.jpg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1'
            }
        },
        methods:{
            goDetail() {
                this.$router.push('/detail')
            },
            goHome() {
                this.$router.push('/home')
            }


        }
    }
</script>

<style lang="scss">
    .lyborder{
        height: 10px;
        background: #e6e6e6;
    }
</style>