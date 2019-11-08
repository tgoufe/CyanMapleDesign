<template>
    <div id="kind">
        <div class="pos-r padding20 text-center">
            <i class="iconfont icon-search pos-a text-gray vcenter marginl10"></i>
            <input style="width: 95%;outline: none;border: none;background-color: #ededed;line-height: 15px; border-radius: 5px" class=" paddingv15 paddingh60" type="text" placeholder="搜索商品，共24041款好物">
        </div>
        <div class="flex-container abs-bottom top100 vfull">
            <cmui-tabbar class="top" position="left" @item-click="toogle">
                <cmui-tabbar-item v-for="(e, i) in navs" :key="i" :title="e" ></cmui-tabbar-item>
            </cmui-tabbar>
            <div class="flex1 pos-r marginb80">
                <div class="abs-full scroll-container-y top text-center padding20">
                    <img src="https://yanxuan.nosdn.127.net/fcb646136cabf0b597d41e459de631df.jpg?imageView&thumbnail=0x196" alt="">
                    <div class="list list-col3" v-if="currentNav">
                        <div class="list-item" v-for="(e, i) in kinds" :key="i">
                            <div class="padding10">
                                <div>
                                    <img style="width: 90%;" :src="e.img" alt="">
                                    <p class="fs-12" style="font-weight: 300;">{{e.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="scroll-container-y" v-else>
                        <div v-for="e in 10">
                            <p class="padding20 text-left text-bolder">精选美食</p>
                            <div class="list list-col3 borderb">
                                <div class="list-item" v-for="(e, i) in kinds.slice(0,3)" :key="i">
                                    <div class="padding10">
                                        <div>
                                            <img style="width: 90%;" :src="e.img" alt="">
                                            <p class="fs-12" style="font-weight: 300;">{{e.name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
  export default {
    name: 'kind',
    data () {
      return {
        navs: [
          '双11专区',
          '暖冬好物',
          '爆品专区',
          '新品专区',
          '居家生活',
          '服饰鞋包',
          '美食酒水',
          '个护清洁',
          '母婴亲子',
          '运动旅行',
          '数码家电',
          '全球特色',
        ],
        kinds: [
          {
            img: 'https://yanxuan.nosdn.127.net/69f9f31c999d206dac976b75af5e7128.png?imageView&quality=85&thumbnail=144x144',
            name: '精选好物15元起'
          }, {
            img: 'https://yanxuan.nosdn.127.net/2f49185f275cc3116a380d34647fa18c.png?imageView&quality=85&thumbnail=144x144',
            name: '超值好物9.9元起'
          }, {
            img: 'https://yanxuan.nosdn.127.net/c92cc71eaa73fbb0cee9c3f747715080.png?imageView&quality=85&thumbnail=144x144',
            name: '999+好评'
          }, {
            img: 'https://yanxuan.nosdn.127.net/9ec311dbefd1885e8ae461f670c5d699.png?imageView&quality=85&thumbnail=144x144',
            name: '囤货必备5折起'
          }, {
            img: 'https://yanxuan.nosdn.127.net/3a463daa697cc18132c61fe1c1672429.png?imageView&quality=85&thumbnail=144x144',
            name: '11.11特惠3折起'
          }, {
            img: 'https://yanxuan.nosdn.127.net/ac429d5e5c3a76bb14091e561caea18f.png?imageView&quality=85&thumbnail=144x144',
            name: '每日限时冰点价'
          }, {
            img: 'https://yanxuan.nosdn.127.net/0159fe01c1234d9bc414eb5448c4d7e7.png?imageView&quality=85&thumbnail=144x144',
            name: '11.11预售倒计时'
          }, {
            img: 'https://yanxuan.nosdn.127.net/0902642da38d95dc08f554e8bbbef23e.png?imageView&quality=85&thumbnail=144x144',
            name: '美食小食3.9元起'
          }, {
            img: 'https://yanxuan.nosdn.127.net/b33c730ea75bb1475d560230db368c92.png?imageView&quality=85&thumbnail=144x144',
            name: '冬季穿搭59元起'
          },
        ],
        currentNav: true
      }
    },
    created () {},
    methods: {
      toogle () {
        this.currentNav = !this.currentNav
      }
    },
  }
</script>
<style scoped></style>
