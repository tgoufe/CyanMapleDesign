<template>
    <div id="detail" style="height: 2000px;">
        <Cheader class="fixed-top bg-white" style="z-index: 20000;"></Cheader>
        <cmui-slider :loop="true" :page="true" :autoplay="true" class="margint95">
            <cmui-slider-item v-for="(e, i) in banner" :key="i">
                <img :src="e" alt="">
            </cmui-slider-item>
        </cmui-slider>
        <div style="width: 100%; z-index: 1000;">
            <div class="flex-container text-white" style="background-color: #fa7768">
                <img  style="width: 17%;" src="https://yanxuan.nosdn.127.net/4b0ab79102ac806f3d3a81505afd3159.png" alt="">

                <div class="flex3 paddingh20">
                    <p class="fs-13  text-bolder">超级疯抢</p>
                    <p class="text-bolder"><span class="fs-13">¥</span><span class="paddingh5" style="font-size: 28px;">72</span><span class="fs-13">起</span></p>
                </div>
                <div class="flex2 text-right fs-13 paddingh20">
                    <p>11月10日22点开抢</p>
                    <p>限量1001</p>
                </div>
            </div>
        </div>
        <div style="background: #FFF0DD;color: #F48F18;" class="paddingh20 paddingv10 text-bolder fs-13">
            下方可领券，领券后再省15元，到手价73元
        </div>
        <!--介绍-->
        <div class="padding25">
            <p class="text-red text-bolder" style="font-size: 30px;">¥88</p>
            <div class="flex-container paddingh15 paddingv20" style="background:#F0E7D3 ">
                <div >
                    <p class="fs-12" style="font-weight: 300;">
                        <span class="a paddingv2 paddingh20 fs-10">专享95折</span>
                        <span>超级会员价¥83.6，可省 <span class="text-red">¥4.4</span></span>
                    </p>
                    <p class="fs-11 margint20" style="color: #BEA36E;">
                        专享价可叠券/满减，比普通会员到手价更低
                    </p>
                </div>
                <div>
                    <div class="btn small text-white radius" style="background-color: #CBB588;"> 立即开通</div>
                </div>
            </div>
            <div class="flex-container margint20">
                <div>
                    <p class="fs-16 text-bolder">全家猫粮 1.8千克</p>
                    <p class="fs-13 margint10" style="font-weight: 300;">推荐理由</p>
                </div>
                <div>
                    <p class="text-red text-bolder fs-16">99.9%</p>
                    <p class="fs-12 text-light">好评率</p>
                </div>
            </div>
            <div style="background-color: #f7f7f7;color: #333; " class="padding20 radius margint10 fs-12 lh-2 ">
                <p>1 - 41%蛋白质，高比例肉源蛋白</p>
                <p>2 - 0谷物，减少碳水摄入，减少胃肠负担</p>
                <p>3 - 7种肉源，多种优质鱼肉源搭配</p>
            </div>
            <div class="flex-container-col margint10">
                <img v-for="e in banner" :src="e" alt="">
            </div>

        </div>
        <div  class="flex-container bg-white vfull pos-f bottom0" style="width: 100%;height: 1.4rem; font-weight: 300;">
            <i class="iconfont icon-phone borderr flex1 flex-container center" style="font-size: 30px;color: gray"></i>
            <p class="flex2 flex-container center">立即购买</p>
            <p  class="flex2 bg-red text-white flex-container center">加入购物车</p>
        </div>

    </div>
</template>

<script>
    import header from './header'
  export default {
    name: 'detail',
    components: {
      Cheader: header
    },
    data () {
      return {
        banner: [
          'https://yanxuan-item.nosdn.127.net/29a3d2951704db09d031f59559516da6.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan-item.nosdn.127.net/a5f0acda72c7cf882e152ea03b3b59bf.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan-item.nosdn.127.net/794683e134d45501585c30b07141263e.jpg?imageView&quality=75&thumbnail=750x0'
        ]
      }
    },
    created () {},
    methods: {},
  }
</script>
<style  lang="scss">
    #detail {
        .swiper-pagination-bullet-active {
            opacity: 1;
            background: #dd1a21;
        }
    }
    .a {
        background-image: linear-gradient(90deg,#2C2415 0,#736140 100%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        line-height: .37333rem;
        font-size: .16667rem;
        color: #E6D6B5;
        margin-right: .10667rem;
        border-radius: .02667rem;
    }
</style>
