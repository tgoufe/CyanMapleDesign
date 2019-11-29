<template>
    <div class="text-darker">
        <cmui-slider page="number">
            <cmui-slider-item v-for="i in images">
                <img :src="i" alt="">
            </cmui-slider-item>
        </cmui-slider>
        <div class="bg-white paddingh30 paddingv20">
            <span class="fs-20 text-red">￥328</span>
            <span class="badge reverse red small radius2 marginl10">包税</span>
            <div class="flex-container margint10">
                <div class="flex1">
                    <span class="badge reverse red small radius2 marginr10">直邮</span>
                    <span class="fs-16">clé de Peau Beauté肌肤之钥七夕福袋唇芯109+302+唇盒</span>
                </div>
                <div class="text-center text-light">
                    <i class="iconfont icon-bags"></i>
                    <p class="text-center">心愿单</p>
                </div>
            </div>
            <div class="fs-16 margint20">
                <span>品牌来自日本</span>
                <span class="text-blue marginl10">肌肤之钥 clé de Peau Beauté</span>
            </div>
        </div>

        <div class="margint10 bg-white flex-container paddingh18 paddingv12" @click="pei=true">
            <div class="flex1">
                <i class="iconfont icon-selected text-red"></i>
                一贵就赔
                <i class="iconfont icon-selected text-red"></i>
                7天保价
                <i class="iconfont icon-selected text-red"></i>
                小红书物流
                <p class="text-light">
                    日本直邮  满358包邮  包税  不支持无理由退换
                </p>

            </div>
            <i class="iconfont icon-more"></i>
            <cmui-popup :visible.sync="pei" position="bottom">
                <div class="padding20 text-light lh-20 pos-r">
                    <i class="iconfont icon-close pos-a top20 right20" @click="pei=false"></i>
                    <p>一贵就赔</p>
                    <p>本商品小红书承诺一贵就赔。</p>
                    <p>查看详情</p>
                    <p>7天保价</p>
                    <p>本商品小红书承诺7天保价。</p>
                    <p>查看详情</p>
                    <p>小红书物流</p>
                    <p>小红书物流是小红书提供给第三方商家的国际物流解决方案。小红书海外仓分布于日本、韩国、洛杉矶、纽约、芝加哥、法兰克福等主要地区，致力于帮助全球商家更快更安全的将商品送到小红薯手中。</p>
                    <p>日本直邮</p>
                    <p>本商品由日本直邮，约4-9天到货</p>
                    <p>满358包邮</p>
                    <p>实付满58元包邮。</p>
                    <p>包税</p>
                    <p>本商品价格已包税，无需再额外缴纳税费。</p>
                    <p>不支持无理由退换</p>
                </div>

            </cmui-popup>
        </div>

        <div class="padding15 margint10 bg-white">
            <p class="fs-25 borderb paddingb20 text-darker">CPB家的东西真的精致，唇膏都是内芯和壳子分开的，可以替换不同的颜色。“钻石一般的立体切面太好看了，很贵气”。3开头的色号上嘴是哑光丝绒质感的，喜欢润一点的小红薯可以打个底再用。302是“玫瑰调的粉红色，提气色显白，黄黑皮都可以用”，“显得肤色健康有元气”。109是清透的浆果色，黄皮和深唇都是能轻松驾驭的
            </p>
            <div class="flex-container margint20">
                <div class="img-container round border ratio-container marginr20" style="width:50px">
                    <img src="http://img.xiaohongshu.com/seller/6edf17a31406b9f16b7bf2a8ffc602cd" alt="">
                </div>
                <div class="flex1">
                    <p>玲奈美妆集合店</p>
                    <p>在售商品61件</p>
                </div>
                <span>
                    进店逛逛 <i class="iconfont icon-more"></i>
                </span>
            </div>
        </div>

        <div class="padding15 margint10 bg-white flex-container">
            参数规格
            <i class="iconfont icon-more"></i>
        </div>
        <div class="padding15 margint10 bg-white flex-container">
            图文详情
        </div>
    </div>
</template>

<script>
export default {
  name: "detail",
  data(){
    return{
      images:[
        'https://qimg.xiaohongshu.com/9e893cb0-a6e0-11e9-ac39-e7bc1f1cc4b7/fa4bc0aad2439e94cd8f16229b17567.jpg?imageView2/2/w/800/q/90.jpg',
        'https://qimg.xiaohongshu.com/303bf940-a6e1-11e9-9e91-ad0996d224bf/733ab8e691aae2dba77dc011dd034cfd_bellepouch_4514254577790_1.jpg?imageView2/2/w/800/q/90.jpg',
        'https://qimg.xiaohongshu.com/303e1c20-a6e1-11e9-ac39-e7bc1f1cc4b7/12cd129009b510eb8434aa5772d0bc82_bellepouch_4514254577790_2.jpg?imageView2/2/w/800/q/90.jpg',
        'https://qimg.xiaohongshu.com/305bb640-a6e1-11e9-9e91-ad0996d224bf/633ef1597dd5c209e26f776b8197649d_bellepouch_4514254577790.jpg?imageView2/2/w/800/q/90.jpg',
        'https://qimg.xiaohongshu.com/357b8290-a6e1-11e9-ac39-e7bc1f1cc4b7/58caa997074fe8b83b481c5d2657deb7_2017032716305410028.jpg?imageView2/2/w/800/q/90.jpg'
      ],
      pei:false
    }
  }
};
</script>

<style scoped>

</style>
