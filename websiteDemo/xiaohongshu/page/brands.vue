<template>
  <div class="">
    <div class="ratio-container ratio-container-2x1">
      <div class="img-container flex-y">
        <img src="https://ci.xiaohongshu.com/0285c6ad-e8c8-400d-865f-02b233d87d55?imageView2/2/w/1200/q/90" alt="">
      </div>
      <div class="mask" style="z-index:auto;position:absolute"></div>
      <div style="top:auto" class="flex-container padding30">
        <div class="ratio-container img-container radius marginr20" style="width:70px">
          <img src="https://ci.xiaohongshu.com/479e47ac-6135-47c1-9394-a7feade1b3f8?imageView2/3/w/420/h/600/format/jpg/q/90" alt="">
        </div>
        <div class="flex1">
          <p class="text-white fs-18">
          珂莱欧
          </p>
          <div class="fs-12 text-lighter">
            <p>CLIO</p>
            <p>9315篇笔记</p>
          </div>
        </div>
        <div class="badge big red bottom pill">
        关注
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="padding30 borderb flex-container">
        <i class="iconfont icon-account marginr10"></i>
        <span class="left">CLIO珂莱欧</span>
        <span class="text-light">2601个粉丝</span>
        <div class="iconfont icon-more text-light"></div>
      </div>

      <div class="padding30 pos-r text-dark borderb">
        <p :class="{'text-limit2':showmore}" @click="showmore=!showmore">
          来自韩国的品牌。珂莱欧将多年专业的彩妆经验，创新性的融入高品质的产品中，让各肤质类型和各年龄段的人群都能轻松搞定如专业彩妆师级别精致妆容，打造更时髦的都市女性；菲丽菲拉针对妙龄少女，提供更具时尚潮流、个性化需求的魅力彩妆；果达儿专注寻找对肌肤有益的自然原料，研究改善肌肤的配方让皮肤更活力健康。
        </p>
      </div>
    </div>
    <div class="">
      <cmui-tabbar class="" col="flex">
        <cmui-tabbar-item title="首页">
          <div class="padding20">
            <biji></biji>
          </div>
        </cmui-tabbar-item>
        <cmui-tabbar-item title="图集">
          <div class="list list-col3">
            <div v-for="item in imageGrid" class="list-item padding2">
              <div class="ratio-container">
                <img :src="item" alt="">
              </div>
            </div>
          </div>
        </cmui-tabbar-item>
        <cmui-tabbar-item title="笔记">
          <div class="padding20">
            <biji></biji>
          </div>
        </cmui-tabbar-item>
        <cmui-tabbar-item title="商品">
          <div class="list list-col2 padding10">
            <div v-for="item in good" :key="item.id" class="list-item padding6">
              <div class="bg-white shadow radius">
                <div class="ratio-container img-container">
                  <img :src="item.image" alt="">
                </div>
                <div class="padding20">
                  <p class="text-darker marginb10 fs-13">{{item.title}}</p>
                  <p class="text-light marginb10 fs-13 text-limit2">{{item.desc}}</p>
                  <template v-if="item.tags.length" >
                    <div v-for="tag in item.tags" :key="tag.index" class="badge red small">{{tag.name}}</div>
                  </template>
                  <div v-else style="visibility: hidden"><div class="badge">0</div></div>
                  <div>
                    <span class="text-red">￥{{item.itemPrice[0].price}}</span>
                    <span class="text-delete text-light marginl20 fs-12" v-if="item.itemPrice[1]">￥{{item.itemPrice[1].price}}</span>
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
import _ from 'lodash'
import biji from '../component/biji'
import goodData from '../data/goods.json'
let good=_.uniqWith(goodData.data,(a,b)=>a.title===b.title)
console.log(good)
import { imageGrid } from '../data/img.json'
export default {
  name: 'brands',
  components: { biji },
  data() {
    return {
      showmore: true,
      imageGrid,
      good
    }
  }
}
</script>
<style type="text/scss" lang="scss">
  .cmui-tabbar__head{background-color: white;position: sticky;top:0;z-index: 1}
</style>
