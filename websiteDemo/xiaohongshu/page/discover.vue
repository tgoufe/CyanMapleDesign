<template>
    <div>
        <header class="shadow padding30 flex-container bg-white marginb3">
            <img src="https://ci.xiaohongshu.com/209f8cef-ad50-4299-8e5f-500fc0210353" alt="" style="width:36px">
            <div class="flex1 marginl20">
                <p class="fs-13">小红书APP</p>
                <p class="text-lighter fs-12">标记我的生活</p>
            </div>
            <span class="badge red reverse pill" @click="app">打开APP</span>
        </header>
        <div class="bg-white">
            <div class="ratio-container">
                <div class="img-container">
                    <img src="https://ci.xiaohongshu.com/64da96ba-c3a9-3153-86f7-0fa78e1efb68?imageView2/2/w/828/q/82/format/jpg" alt="">
                </div>
            </div>
            <div class="padding15 flex-container borderb">
                <div class="img-container round marginr20" style="width:42px">
                    <img src="https://img.xiaohongshu.com/avatar/5d7551e144ab4b00010af4fe.jpg@240w_240h_90q_1e_1c_1x.jpg" alt="">
                </div>
                <div class="fs-15 left">沇沇lily</div>
                <div class="badge radius red" :class="{reverse:!guanzhu}" @click="guanzhu=!guanzhu">{{guanzhu?'关注':'已关注'}}</div>
            </div>
            <div class="padding30">
                <p class="fs-18 text-bolder paddingv20">
                    少女肩颈养成🍑身体乳也要坚持哦~💕
                </p>
                <p class="marginb20">很多小仙女长期玩手机或者是不注意 站姿，导致走路驼背，肩颈的线条越来越难看，脖子上也出现了颈纹，有了颈纹看上去老气很多，我就是这样，而且我有的时候身体上还会因为过干起小皮，这个问题其实不难解决，一定要坚持用身体乳并且搭配颈部按摩。</p>
                <div v-show="show">
                    <p class="marginb20">📌先来说说颈部保养，要注意下面几点。</p>
                    <p class="marginb20">▪️1. 正确的站姿<img src="//ci.xiaohongshu.com/xy_emo_r_anzhongguancha.png?v=2" class="icon"></p>
                    <p class="marginb20">良好的站姿不仅让你体态优美,还能有益健康。想要随时随地保持优美站姿,可以先从基本的标准站姿学起。</p>
                    <p class="marginb20">日常生活中可通过三个小动作来练习优美站姿:</p>
                    <p class="marginb20">(1)提踵:脚跟提起,头向上顶,身体有被提起的感觉,保持姿态稳定,练习平衡感。</p>
                    <p class="marginb20">(2)头顶书:保持书本不掉下来,就要自然地把颈部挺直,下巴向内收,上身挺直。这也是模特必修的课程。</p>
                    <p class="marginb20">(3)背靠墙:当你觉得头顶书站立还困难时不如从背靠墙站立开始将后脑,肩,臀,脚后跟贴在墙面,呈直线。记住这种感觉,并将其用在平时站立中。</p>
                </div>
                <div class="bordert text-center text-blue padding20" v-show="!show" @click="show=true">
                    展开阅读全文
                </div>
            </div>
        </div>
        <div class="marginv20 bg-white padding30">
            <p class="borderb paddingb20">笔记评论</p>
            <div class="paddingv30 flex-container top" v-for="item in 4" @click="$router.push('user')">
                <div class="img-container round border marginr20" style="width:42px">
                    <img src="https://img.xiaohongshu.com/avatar/5d7551e144ab4b00010af4fe.jpg@80w_80h_90q_1e_1c_1x.jpg" alt="">
                </div>
                <div class="flex1">
                    <p class="flex-container">
                        <span>沇沇lily(作者)</span>
                        <span class="text-light"><i class="iconfont icon-good"></i>70 . 回复</span>
                    </p>
                    <p class="text-lighter marginb30 fs-12">10-22</p>
                    <p>
                        这两个动作纠正体态很好，瑜伽里就有这个动作，觉得没用可以不练没必要在这凸显你的智慧，如果你觉得我这个没用，大可以自己把有用的写出来分享给大家，自己不写就知道酸别人什么心理，身体乳也是我自己现在在用的，几十块钱的东西我觉得还是不错的，味道也好闻，也没逼你们谁买
                    </p>
                    <div class="radius8 padding15 margint20" style="background-color: #f5f5f5">
                        <p class="marginb10"><span class="text-bolder">兽兽：</span>小姐姐用的什么身体乳呢 求回复</p>
                        <p class="marginb10"><span class="text-bolder">兽兽：</span>小姐姐用的什么身体乳呢 求回复</p>
                        <p class="marginb10"><span class="text-bolder">ww：</span>我练瑜伽上肩颈课就经常练这个动作，现在明显感觉斜方肌小了，练完很舒服</p>
                        <p class="text-right text-blue margint20" @click="app">打开APP查看全部3条回复 <i class="iconfont icon-more"></i></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="marginv20 bg-white padding30">
            相关笔记
        </div>
        <div class="padding20">
            <biji></biji>
        </div>
    </div>
</template>

<script>
import biji from '../component/biji.vue'
export default {
  components:{biji},
  name: "discover",
  data(){
    return {
      show:false,
      guanzhu:false
    }
  },
  methods:{
    app(){
      maple.alert('想什么呢？这就是个demo')
    }
  }
};
</script>

<style scoped>

</style>
