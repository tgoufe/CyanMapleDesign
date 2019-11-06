<template>
  <div>
    <img src="https://ci.xiaohongshu.com/9ea6ee30-74e2-4011-80be-77e7bda0d318" alt="">
    <div class="padding30 flex-container">
      <span class="fs-15 left">热门品牌</span>
      <router-link to="/hot">
        <span class="text-light fs-13">查看更多</span>
        <i class="iconfont icon-more text-light"></i>
      </router-link>
</div>

    <div class="scroll-container bg-white paddingh30 paddingb30 marginb30">
        <div style="width:165px;" v-for="(item,i) in cube" class="marginr20" :key="i">
      <router-link to="hot">
          <div class="img-container radius">
            <img :src="item" alt="">
          </div>
          <div class="paddingh20 paddingt10">
            <p class="text-fixed1 fs-13 text-black">
肌肤之钥 clé de Peau Beauté
</p>
            <p class="text-light fs-12 margint10">
品牌·5.5万人在讨论
</p>
          </div>
      </router-link>
        </div>
    </div>

    <div class="bg-white padding30">
      <p class="fs-15 marginb30">
热门笔记
</p>
      <div class="row">
        <div v-for="(span, iout) in 2" class="span6" :key="iout">
          <div v-for="(item,index) in span==1?imgL:imgR" :key="index" class="shadow marginb20 radius">
            <img :src="item" alt="">
            <div class="padding20">
              <p class=" fs-13 marginb20">
{{ intro[(iout)*10+index] }}
</p>
              <div class="flex-container">
                <div class="img-container round full" style="width:25px">
                  <img :src="avatar[(iout)*10+index]" alt="">
                </div>
                <span class="marginl10 fs-12 text-light left text-limit1">{{ name[(iout)*10+index] }}</span>
                <i class="iconfont icon-favorites text-light"></i>
                <span class="text-light fs-11 marginl10">4224</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { index, intro, avatar, name, cube } from '../data/img.json'
export default {
  name: 'home',
  components: {
  },
  data: function () {
    return {
      imgL: index.slice(index.length / 2),
      imgR: index.slice(0, index.length / 2),
      intro,
      avatar,
      name,
      cube
    }
  }
}
</script>
<style lang="scss">

</style>
