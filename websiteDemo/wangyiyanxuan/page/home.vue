<template>
    <div id="home">
        <!--header-->
        <div class="fixed-top bg-white" style="z-index: 20000;">
            <div class="paddingh20 paddingt10 flex-container" style="z-index: 1000;width: 100%;">
                <span style="font-family: 'STKaiti';" class="fs-19">网易严选</span>
                <div class="flex1 pos-r paddingh20 ">
                    <i class="iconfont icon-search pos-a text-gray vcenter marginl10"></i>
                    <input style="width: 100%;outline: none;border: none;background-color: #ededed;line-height: 15px;" class="radius paddingv15 paddingh45" type="text" placeholder="搜索商品，共24041款好物">
                </div>
                <div class="badge red reverse mini radius">登录</div>
            </div>
            <!--nav-->
            <cmui-tabbar>
                <cmui-tabbar-item v-for="(e, i) in navs" :key="i" :title="e"></cmui-tabbar-item>
            </cmui-tabbar>
        </div>
        <!--banner-->
        <cmui-slider :loop="true" :page="true" :autoplay="true" class="margint170" >
            <cmui-slider-item v-for="(e, i) in banner" :key="i">
                <img :src="e" alt="">
            </cmui-slider-item>
        </cmui-slider>
        <!--tip-->
        <div class="flex-container padding20 fs-10">
            <p v-for="(e, i) in ['网易自营品牌', '30天无忧退货', '48小时快速退款']" class="text-container lh-1" >
                <span><i class="iconfont icon-trade text-red  marginr10 fs-14"></i></span>
                <span style="color: #333;" class=" text-vcenter">{{e}}</span>
            </p>
        </div>
        <!--kind-->
        <div class="list list-col5">
            <div class="list-item text-center fs-11 padding10" style="font-weight: 300;" v-for="(e, i) in kinds" :key="i" @click="go">
                <img :src="e.img" alt=""style="width: 85%;" class="marginb10">
                <p>{{e.name}}</p>
            </div>
        </div>
        <!--推荐位-->
        <div class="pos-r margint20" style="background: url('https://yanxuan.nosdn.127.net/fc8295e7aeeae94abe23c5710221231c.gif?imageView&quality=75');background-size: 100% 100%; height: 140px;">
            <img src="https://yanxuan-item.nosdn.127.net/2bd9d01c8b4a56d3cb8d2a1b06b24d29.png?imageView&thumbnail=168x0&quality=75" style="width: 20%;" alt="" class="pos-a left80 top30">
            <div class="badge orange pill small pos-a left80 top160" style="width: 80px;">¥99</div>
        </div>
        <!--时间表-->
        <div style="background-color: #9383e4;" class="padding20">
            <img src="https://yanxuan.nosdn.127.net/95ee1720e4d8d6d3992a7b5699512336.png?imageView&thumbnail=750x0&quality=75" alt="">
            <div class="list list-col2 margint5">
                <div class="list-item padding5 pos-r">
                    <img src="https://yanxuan.nosdn.127.net/e09682e055ffac88d9cf221457bdf76a.png?imageView&thumbnail=375x0&quality=75" alt="">
                    <div class="flex-container center padding20 pos-a top-n10">
                        <div class="flex13 text-center">
                            <p class="fs-15" style="font-weight: bold;">性价比大赏</p>
                            <p class="fs-12 text-gray">尖货亲民价</p>
                        </div>
                        <div class="flex5 center">
                            <img style="width: 100%"  src="https://yanxuan-item.nosdn.127.net/d82be6b363e282825bf858696ce40ee3.png?imageView&thumbnail=160x160&quality=75" alt="">
                        </div>
                    </div>
                </div>
                <div class="list-item padding5 pos-r">
                    <img src="https://yanxuan.nosdn.127.net/79ea3e50ba24d6b7890b20e0b6ad6323.png?imageView&thumbnail=375x0&quality=75" alt="">
                    <div class="flex-container center padding20 pos-a top-n20">
                        <div class="flex13 text-center">
                            <p class="fs-15" style="font-weight: bold;">秋冬好物</p>
                            <p class="fs-12 text-gray">必买TOP10</p>
                        </div>
                        <div class="flex5 center">
                            <img style="width: 100%"  src="https://yanxuan-item.nosdn.127.net/f28c5db21c4d8aef33176e628ea3c4e2.png?imageView&thumbnail=160x160&quality=75" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--品牌商品列表-->
        <div class="flex-container padding30">
            <span class="fs-15 left">品牌制造商直供</span>
            <router-link to="/">
                <span class="text-gray fs-14" style="font-weight: 300">更多</span>
                <i class="iconfont icon-more text-light"></i>
            </router-link>
        </div>
        <div class="list list-col2 paddingh20">
            <div v-for="(e, i) in brand" :key="i" class="list-item" @click="go">
                <div class="padding3 pos-r" >
                    <img class="" style="" :src="e.img" alt="">
                    <div class="pos-a top20 text-center" style="width: 100%;">
                        <p class="fs-14">{{e.name}}</p>
                        <p class="fs-12 text-light">9.9元起 <span class="badge radius gold mini" v-if="i === 0">上新</span></p>
                    </div>
                </div>
            </div>
        </div>


        <!--类目热销榜-->
        <div class="flex-container padding30">
            <span class="fs-15 left">类目热销榜</span>
        </div>
        <div class="list list-col2 paddingh20">
            <div class="list-item text-center">
                <div class="padding5">
                    <div style="background-color: #F9F3E4;">
                        <span class="text-bolder">热销榜</span>
                        <span><img style="width: 50%;"  src="https://yanxuan-item.nosdn.127.net/f961b628a67e5a95150b962a48963b6d.png?imageView&quality=65&thumbnail=200x200" alt=""></span>
                    </div>
                </div>
            </div>
            <div class="list-item text-center">
                <div class="padding5">
                    <div  style="background-color: #EBEFF6;">
                        <span class="text-bolder">好评榜</span>
                        <span><img style="width: 50%;"  src="https://yanxuan-item.nosdn.127.net/6fd807743e8e25472aca8b6b0b8f3039.png?imageView&quality=65&thumbnail=200x200" alt=""></span>
                    </div>
                </div>
            </div>

        </div>
        <div class="list list-col4 bg-white paddingh20">
            <div v-for="(e, i) in kindSale" :key="i" class="list-item  text-center" @click="go">
                <div class="padding5">
                    <div class="padding10" style="background-color: #f5f5f5;">
                        <p class="fs-12">{{e.name}}</p>
                        <img :src="e.img" style="width: 80%;" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!--广告 活动-->
        <div class="paddingv20">
            <img src="https://yanxuan.nosdn.127.net/56ba53679b99c816de0ea6d36c995eb0.jpg?imageView&thumbnail=750x0&quality=75" alt="">
            <div class="scroll-container top  bg-white">
                <div v-for="(e, i) in productList" :key="i" style="width: 100px;" class=" paddingv20 paddingh10" @click="go">
                    <img style="width: 100%;" :src="e.img" alt="">
                    <p class=" text-limit2 fs-10 padding5">{{e.name}}</p>
                    <p class="fs-10"><span class="text-red">¥2309</span><span class="text-delete text-light marginl10">¥9999</span></p>
                    <p class="badge pill red reverse small" v-if="e.isLow">限时购</p>
                </div>
            </div>
        </div>
        <div>
            <img src="https://yanxuan.nosdn.127.net/4e76055d88abf3809c764d8e26656876.jpg?imageView&thumbnail=750x0&quality=75" alt="">
            <div class="scroll-container top  bg-white">
                <div v-for="(e, i) in productList" :key="i" style="width: 100px;" class=" paddingv20 paddingh10" @click="go">
                    <img style="width: 100%;" :src="e.img" alt="">
                    <p class=" text-limit2 fs-10 padding5">{{e.name}}</p>
                    <p class="fs-10"><span class="text-red">¥2309</span><span class="text-delete text-light marginl10">¥9999</span></p>
                    <p class="badge pill red reverse small" v-if="e.isLow">狂欢抢购</p>
                </div>
            </div>
        </div>

        <!--底部-->
        <div class="bg-dark flex-container-col center" style="height: 140px;">
            <div class="fs-12">
                <span class="btn small reverse"  style="font-weight: 300;background-color: #666;border-color: white; color: white">下载APP</span>
                <span class="btn small reverse marginl40"  style="font-weight: 300;background-color: #666;border-color: white; color: white">电脑版</span>
            </div>
            <div class="margint50 fs-12 text-light text-center">
                <p> 网易公司版权所有 © 1997- 2019</p>
                <p>食品经营许可证：JY13301080111719</p>
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        navs: ['推荐','居家生活','服饰鞋包','美食酒水','个护清洁','母婴亲子','运动旅行','数码家电'],
        banner: [
          'https://yanxuan.nosdn.127.net/a2e0f844d3b10277d18ac81544f0086c.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan.nosdn.127.net/f1683e8ec39b6ff8ef121265269af6c0.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan.nosdn.127.net/aa860e44fbd468a7804c1a84796c4827.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan.nosdn.127.net/28664331571785592305895daed76aa8.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan.nosdn.127.net/6962cab6a909ac395f4af647be0a41a2.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan.nosdn.127.net/9d3c05ef9249ab4b13ce900587136b28.jpg?imageView&quality=75&thumbnail=750x0',
          'https://yanxuan.nosdn.127.net/6609c5631a05c2a2590466d20776f46e.jpg?imageView&quality=75&thumbnail=750x0'
        ],
        kinds: [
          {
            img: 'http://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png',
            name: '新品首发'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png',
            name: '居家生活'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/896a3beac514ae8f40aafe028e5fec56.png',
            name: '服饰鞋包'
          },
          {
            img: 'http://yanxuan.nosdn.127.net/37520d1204a0c55474021b43dac2a69e.png',
            name: '美食酒水'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/6c3bd9d885c818b1f73e497335a68b47.png',
            name: '个护清洁'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/559d2a240ec20b096590a902217009ff.png',
            name: '母婴亲子'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/5c088559ebcc3f0ffcda663f04dfbeb2.png',
            name: '运动旅行'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/fbca8e1f2948f0c09fc7672c2c125384.png',
            name: '数码家电'
          },
          {
            img: 'https://yanxuan.nosdn.127.net/f7281169d4e82d5d8d52aa1fec83fe01.png',
            name: '全球特色'
          },
          {
            img: 'http://yanxuan.nosdn.127.net/12e8efd15b9b210ab156a7ee9b340548.gif',
            name: '好货抄底'
          },
        ],
        brand: [
          {
            name: '海外制造商',
            img: 'http://yanxuan.nosdn.127.net/74e2ea8f81004d0a60f90fc8e4649058.png?imageView&thumbnail=343y260&enlarge=1'
          },
          {
            name: 'CK制造商',
            img: 'http://yanxuan.nosdn.127.net/c097be14110f769d58245cdad73e15c3.png?imageView&thumbnail=343y260&enlarge=1'
          },
          {
            name: '新秀丽制造商',
            img: 'http://yanxuan.nosdn.127.net/66a23d776f41cba70d00803a5231124b.png?imageView&thumbnail=343y260&enlarge=1'
          },
          {
            name: '松下制造商',
            img: 'http://yanxuan.nosdn.127.net/2696f71b5212cfabab8c90af7d06a927.png?imageView&thumbnail=343y260&enlarge=1'
          },
        ],
        kindSale: [
          {
            name:'美食酒水榜',
            img:'https://yanxuan-item.nosdn.127.net/9cdae54c3c2434ed1f6f2fa6d5fa270d.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'服饰鞋包榜',
            img:'https://yanxuan-item.nosdn.127.net/e9de2a3b586c3cbed7fd621d7810d2f4.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'居家生活榜',
            img:'https://yanxuan-item.nosdn.127.net/6cdb3da46a4b95b36dea89d6d47d3bd9.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'个护清洁榜',
            img:'https://yanxuan-item.nosdn.127.net/1547946fa7c422e88dcc6950ffa7586a.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'数码家电榜',
            img:'https://yanxuan-item.nosdn.127.net/eed2ed6e83189517ba35f3781271f773.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'母婴亲子榜',
            img:'https://yanxuan-item.nosdn.127.net/f444ac11115a8249a92dc95dccad6e07.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'运动旅行榜',
            img:'https://yanxuan-item.nosdn.127.net/63967eb40b0af505f1fd066442952bab.png?imageView&quality=65&thumbnail=200x200'
          },{
            name:'全球特色榜',
            img:'https://yanxuan-item.nosdn.127.net/72eb76506fb94adce584c74b930a6a92.png?imageView&quality=65&thumbnail=200x200'
          },
        ],
        productList: [
          {
            img: 'https://yanxuan-item.nosdn.127.net/85824fffc0fc2042b3d068a1a20b560f.png?imageView&thumbnail=358y328&quality=95',
            name: '谷风一木3层软抽面巾纸 6包',
            isHappy: true,
            isLow: false
          },
          {
            img: 'https://yanxuan-item.nosdn.127.net/b84efaabc6c60e27975b6dff597dc907.png?imageView&thumbnail=358y328&quality=95',
            name: '轻弹云朵居家拖鞋居家拖鞋',
            isHappy: false,
            isLow: true
          },
          {
            img:'https://yanxuan-item.nosdn.127.net/0bcb514d17fabe7b4c23035b4b2a80fb.png?imageView&thumbnail=358y328&quality=95',
            name: '轻弹云朵居家拖鞋居家拖鞋',
            isHappy: false,
            isLow: true
          },
          {
            img: 'https://yanxuan-item.nosdn.127.net/12b0958ddd092403f0a8e87819ec9d67.png?imageView&thumbnail=358y328&quality=95',
            name: '轻弹云朵居家拖鞋居家拖鞋',
            isHappy: false,
            isLow: true
          },
          {
            img: 'https://yanxuan-item.nosdn.127.net/de56de3bb034ffd1427880999652f106.png?imageView&thumbnail=358y328&quality=95',
            name: '轻弹云朵居家拖鞋',
            isHappy: true,
            isLow: false
          },
          {
            img: 'https://yanxuan-item.nosdn.127.net/0b3d842ef539efd4d5418fc1ecd157aa.png?imageView&thumbnail=358y328&quality=95',
            name: '轻弹云朵居家拖鞋',
            isHappy: false,
            isLow: true
          },
          {
            img: 'https://yanxuan-item.nosdn.127.net/2a61d94da92edfed6662257ec617b8a7.png?imageView&thumbnail=358y328&quality=95',
            name: '轻弹云朵居家拖鞋',
            isHappy: true,
            isLow: false
          },
          {
            img: 'https://yanxuan-item.nosdn.127.net/98a65ae2cf4a9c4aa9e03d2661d377ee.png?imageView&thumbnail=358y328&quality=95',
            name: '日本电热暖水袋 精装',
            isHappy: true,
            isLow: false
          }
        ]

      }
    },
    created () {},
    methods: {
      go () {
        this.$router.push(`/detail`)
      }
    },
  }
</script>
<style lang="scss">
    #home {
        .swiper-pagination-bullet-active {
            opacity: 1;
            background: #dd1a21;
        }
    }
</style>

