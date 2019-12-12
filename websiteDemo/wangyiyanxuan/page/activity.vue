<template>
  <div class="bg-red">
    <!--一堆图-->
    <div class="flex-container-col">
      <img src="../images/home1.jpeg" alt="">
      <img src="../images/home2.jpeg" alt="">
      <img src="../images/card1.jpeg" alt="">
      <img src="../images/card2.jpeg" alt="">
      <img src="../images/card3.png" alt="">
    </div>
    <!--左/右-->
    <div class="padding20">
      <div class="flex-container  marginb20 bg-white" v-for="(e, i) in recommends" :key="i" :class="isEven(i)" @click="go">
        <div class="flex1">
          <img :src="e.img" alt="">
        </div>
        <div class="flex1">
          <div class="padding15">
            <span class="badge orange small">新人特价包邮</span>
            <span class="badge gold small" v-if="e.isNew">新品</span>
            <p class="text-limit2 fs-12" style="color: #555555">{{e.name}}</p>
            <p class="marginb10">
              <span class="text-red fs-15">¥</span>
              <span class="text-red fs-18 marginl5">69</span>
              <span class="text-delete text-light fs-10 marginl10">169</span>
            </p>
            <div class="badge pill red big" style="width: 91px;">马上抢</div>
            <img style="width: 30px;height: 30px;" class="marginl15" src="../images/cart.png" alt="">
            <div class="text-center margint15">
              <img :src="e.img_small" style="width:70%" alt="">
            </div>
          </div>
          </div>
      </div>
    </div>
    <img src="../images/home3.png"  style="margin-top: -10px;" alt="">
    <!--两列-->
    <div class="padding10">
      <div class="list list-col2">
        <div class="list-item padding5 " v-for="(e, i) in productList" :key="i" @click="go">
          <div class=" text-center  bg-white">
            <div>
              <img :src="e.img" alt="">
              <div v-if="e.isHappy" style="background: url('https://yanxuan.nosdn.127.net/fcbdabc043727fc9cb01bd52112e9d77.png');margin-top: -20px;position: relative;z-index: 1000;height: 20px;">
                <div class="text-white fs-10" style="background: url('https://yanxuan.nosdn.127.net/6a8c9ca3b4e91e4933441833e5385e63.png');width: 60px;position: absolute;bottom: 0;transform: rotateY(180deg)">
                  <p style="transform: rotateY(180deg)">11月10日</p>
                  <p style="transform: rotateY(180deg)">22点生效</p>
                </div>
                <span class="marginl65 text-white fs-12">抢全场券8折</span>

              </div>
            </div>
            <div class="padding15">
              <span class="badge orange small" v-if="e.isHappy">狂欢特惠</span>
              <span class="badge gold small fs-14" v-if="e.isLow">超值价</span>
              <p class="text-limit1 marginb10">{{e.name}}</p>
              <p>
                <span class="text-red">¥14.9</span>
                <span class="text-delete text-gray fs-10 marginl10">¥16.9</span>
              </p>
              <div class="badge big red radius" style="width: 90px;">立即购买</div>
              <img src="../images/cart.png" class="marginl20" style="width: 27px;" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      recommends: [
        {
          name: '女式咖啡碳+5℃保暖内衣（上衣/裤子）,保暖黑科技，温暖入肤不臃肿',
          img: require('../images/p1-1.png'),
          img_small: require('../images/p1-2.png'),
          isNew: false
        },
        {
          name: '男式咖啡碳+5℃保暖内衣（上衣/裤子）,保暖黑科技，温暖入肤不臃肿',
          img: require('../images/p2-1.png'),
          img_small: require('../images/p2-2.png'),
          isNew: false
        },
        {
          name: '新人专享 蜡笔唇膏套盒, 一笔顺滑，三色礼遇惊艳雾感',
          img: require('../images/p3-1.jpg'),
          img_small: require('../images/p3-2.png'),
          isNew: true
        },
        {
          name: '网易智造北欧极简落地灯 有格调的灯 精致极简',
          img: require('../images/p4-1.jpg'),
          img_small: require('../images/p4-2.png'),
          isNew: true
        },
        {
          name: '红油面皮 87克*6杯,地道川香，油润爽滑',
          img: require('../images/p5-1.jpg'),
          img_small: require('../images/p5-2.png'),
          isNew: true
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
          name: '轻弹云朵居家拖鞋',
          isHappy: false,
          isLow: true
        },
        {
          img:'https://yanxuan-item.nosdn.127.net/0bcb514d17fabe7b4c23035b4b2a80fb.png?imageView&thumbnail=358y328&quality=95',
          name: '轻弹云朵居家拖鞋',
          isHappy: false,
          isLow: true
        },
        {
          img: 'https://yanxuan-item.nosdn.127.net/12b0958ddd092403f0a8e87819ec9d67.png?imageView&thumbnail=358y328&quality=95',
          name: '轻弹云朵居家拖鞋',
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
          name: '日本电热暖水袋',
          isHappy: true,
          isLow: false
        },
        {
          img: 'https://yanxuan-item.nosdn.127.net/b84efaabc6c60e27975b6dff597dc907.png?imageView&thumbnail=358y328&quality=95',
          name: '轻弹云朵居家拖鞋',
          isHappy: false,
          isLow: true
        },
        {
          img:'https://yanxuan-item.nosdn.127.net/0bcb514d17fabe7b4c23035b4b2a80fb.png?imageView&thumbnail=358y328&quality=95',
          name: '轻弹云朵居家拖鞋',
          isHappy: false,
          isLow: true
        },
      ]
    }
  },
  methods: {
    isEven (index) {
      if ((index += 1) % 2 === 0) {
        return 'reverse'
      }
    },
    go () {
      this.$router.push(`/detail`)
    }
  }
}
</script>
<style lang="scss">

</style>
