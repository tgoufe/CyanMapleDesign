<template>
    <div id="detail">
        <div class="fixed-top bg-red" style="z-index: 20000;height: 1.2rem">
            <div class="flex-container" style="z-index: 1000;width: 100%;">
                <div class="text-left text-white ly-title marginh20" style="height: 1.2rem;" @click="goHome">
                </div>
                <div class="flex1 borderl paddingl10 text-white fs-16" style="line-height: 1.2rem">
                    新闻频道
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
                    <h1 style="font-weight: bold">山东"海霸"组织扇贝养殖失败 搞海上"碰瓷"遭团灭</h1>
                </div>
                <div class="margint15 fs-14" style="color: #888">
                    <span>2019-12-10 13:55</span><span class="marginl20">澎湃新闻</span>
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
                first:'一黑社会性质组织长期披着合法经营的企业外衣，在山东省东营辖区某深海海域形成非法控制，向在此捕捞的渔民强收钱财。日前，经山东省东营市河口区检察院提起公诉，一起涉及21名被告人的黑社会性质组织案公开开庭审理。这个曾经“风光一时”的“海霸”涉黑组织最终难逃法律制裁。',
                secend:'2016年10月15日凌晨，东营某深海海域，一艘黑色的摩托艇在黑漆漆的海面上疾驰。“别动，都老实点！”正睡得迷迷糊糊的船长孟某还没反应过来怎么回事，一束强光就照在了他的脸上，同时脖子上架了一把砍刀，胸口上顶了一把猎枪。“你们是什么人？”孟某刚问了一句，身上就挨了好几棍子，他不由得心惊胆战：“坏了，遇上海盗了！”当天凌晨遭遇同样险情的还有杜某等其他三名船长，他们都在挨打后被警告：“在附近的海域里捕捞生产，要么交钱，要么滚蛋！”',
            }
        },
        methods:{
            goDetail() {
                this.$router.push('/detail2')
            },
            goHome() {
                this.$router.push('/home')
            }
        },
        watch: {
            '$router':function (to, from) {
                console.log('dsasdsa');
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
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