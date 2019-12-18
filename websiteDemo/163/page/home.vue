<template>
    <div id="home">
        <div class="fixed-top bg-red" style="z-index: 20000;height: 1rem">
            <div class="paddingh20 paddingt10 flex-container top" style="z-index: 1000;width: 100%;">
                <div class="flex1">
                    <i class="baseIcon fs-20 baseIcon-people" style="color: white"></i>
                </div>
                <div class="flex1 text-center text-white ly-title"></div>

                <div class="flex1 text-right pos-r" >
                    <div @click="showOrhide">
                        <i class="iconfont fs-16 icon-emailfilling text-white"></i>
                        <span class="marginl5 frs-30 text-white">邮箱</span>
                        <i class="baseIcon fs-10 baseIcon-unfold text-white"></i>
                    </div>
                    <div class="por-a" v-if="show">
                        <div class="list lybox margint20">
                            <div class="list-item flex-container bg-white text-left paddingv20 paddingh10" v-for="(v,i) in popover" style="z-index: 50">
                                <div class="flex1">
                                    <img :src="v.img" alt="" style="width:30px;height: 30px">
                                </div>
                                <div class="flex2">{{v.text}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="margint70">
            <cmui-tabbar :col="3">
                <cmui-tabbar-item class="frs-40" title="要闻">

                    <div class="list list-col6 paddingh20 paddingv20 pos-r overflow-h lydiv">
                        <div class="list-item fs-16 padding10 text-center " style="font-weight: 300;" v-for="(v, i) in titles" :key="i">
                            <p>{{v}}</p>
                        </div>
                        <span @click="showDown" class="text-center pos-a bottom0 right0 paddingr60 paddingb20 bg-white ">
                            <i class="baseIcon fs-20 baseIcon-unfold" :class="{'lyresever':isactive}"></i>
                        </span>
                    </div>
                    <div class="paddingh20 paddingv20 borderb">
                        <div class="fs-20 paddingv20" style="font-weight: 300">
                            今日要闻
                        </div>

                        <div class="margint10">
                            <div v-for="(v, i) in yuanchuang.slice(0,7)" :key="i" @click="goDetail">
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

                        <div class="flex-container text-center fs-16 text-red paddingv20">
                            <div class="flex1">
                                换一换
                                <i class="baseIcon baseIcon-refresh"></i>
                            </div>
                            <div class="flex1" @click="goChannel">
                                进入今日要闻
                                <i class="baseIcon baseIcon-right"></i>
                            </div>
                        </div>
                    </div>


                    <div class="paddingh20 paddingv20 borderb">
                        <div class="fs-20 paddingv20" style="font-weight: 300">
                            体育
                        </div>

                        <div class="margint10">
                            <div v-for="(v, i) in yuanchuang.slice(0,7)" :key="i" @click="goDetail">
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

                        <div class="flex-container text-center fs-16 text-red paddingv20">
                            <div class="flex1" @click="goChannel">
                                进入体育频道
                                <i class="baseIcon baseIcon-right"></i>
                            </div>
                        </div>
                    </div>

                </cmui-tabbar-item>
                <cmui-tabbar-item class="frs-40" title="推荐">
                    <div class="margint10">
                        <div v-for="(v, i) in tuijian" :key="i" @click="goDetail">
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
                <cmui-tabbar-item class="frs-40" title="原创">
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
                popover:[
                    {text:'网易邮箱',img:"https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-mail.png"},
                    {text:'网易公开课',img:"https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-open.png"},
                    {text:'网易云阅读',img:"https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-read.png"}
                ],
                show:false,
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
            },
        },
        methods: {
            showDown() {
                this.isactive = !this.isactive;
                this.activeLength = this.isactive ? -1 : 11;
            },
            goChannel() {
                this.$router.push('/channel')
            },
            goDetail() {
                this.$router.push('/detail')
            },
            showOrhide(){
                this.show = !this.show;
            }
        }
    }
</script>
<style lang="scss">
    .ly-title {
        background: url(https://static.ws.126.net/163/wap/f2e/milk_index/logo-site.png) no-repeat 50%;
        background-size: contain;
        height: .56rem;
    }

    .lyresever {
        -webkit-transform: rotate(180deg);
        -webkit-transition: all .3s linear;
    }

    #home .cmui-tabbar.cmui-tabbar-top .cmui-tabbar__head-item.active::after {
        width: 20%;
        left: 40%;
    }
    .lybox{
        box-shadow:0 0.05rem 0.2rem 0.05rem rgba(0,0,0,.2);
        -webkit-box-shadow:0 0.05rem 0.2rem 0.05rem rgba(0,0,0,.2);
        border-radius: 5px;
    }
</style>
