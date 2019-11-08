<template>
  <div>
    <div class="bg-blue form paddingh150 paddingt150 paddingb50">
      <p class="text-white fs-24 paddingv20 text-limit1">
中国邮政储蓄银行(大连分行营业部)
</p>
      <input type="text"
             placeholder="搜索饿了么商家、商品名称"
/>
    </div>
    <cmui-slider>
      <cmui-slider-item>
        <div class="list list-col5">
          <div v-for="(item,i) in elemSlider1"
               :key="i"
               class="list-item text-center paddingh50"
>
            <img :src="item.src"
                 alt
/>
            <p class="text-dark fs-12">
{{ item.name }}
</p>
          </div>
        </div>
      </cmui-slider-item>
      <cmui-slider-item>
        <div class="list list-col5">
          <div v-for="i in 10"
               :key="i"
               class="list-item text-center paddingh30"
>
            <img src="https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed" />
            <p class="text-light fs-14"
               style="width:45px"
>
美食
</p>
          </div>
        </div>
      </cmui-slider-item>
    </cmui-slider>
    <div class="flex-container round"
         style="background:linear-gradient(0deg,#c3a2a2 5%,#fafafa 95%)"
>
      <div class="margin20">
        <p class="text-black fw-20 fs-16">
品质套餐
</p>
        <p class="text-light fs-12 paddingt10">
搭配齐全吃的好
</p>
        <router-link to="/login">
          <p class="text-gloden fs-11 padding10">
立即抢购 >
</p>
        </router-link>
      </div>
      <div>
        <img style="width:120px"
             src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?x-oss-process=image/format,webp/resize,w_282,h_188,m_fixed"
             alt
/>
      </div>
    </div>
    <div class="flex-container round margint30 pos-r">
      <p class="text-black line">
推荐商家
</p>
    </div>
    <cmui-tabbar class="list list-col4 paddingl120 margint10">
      <cmui-tabbar-item title="综合排序"
                        class="list-item"
>
123
</cmui-tabbar-item>
      <cmui-tabbar-item title="距离最近"
                        class="list-item"
>
456
</cmui-tabbar-item>
      <cmui-tabbar-item title="品质联盟"
                        class="list-item"
>
789
</cmui-tabbar-item>
      <cmui-tabbar-item title="筛选"
                        class="list-item"
>
abc
</cmui-tabbar-item>
    </cmui-tabbar>

    <!-- <div class="btn-group flex-container round ">
      <a href class="btn">a</a>
      <a href class="btn">b</a>
      <a href class="btn">c</a>
      <a href class="btn">d</a>
    </div>-->
  </div>
</template>

<script>
import {
  index,
  intro,
  avatar,
  name,
  cube,
  elemSlider1
} from '../data/img.json'
// import cmuiProgress from '../../../src/maple/components/progress/main.vue'
import '../../../src/cyan/CMUI_doc.scss'
export default {
  name: 'home',
  components: {},
  data: function () {
    return {
      props: {
        value: 80,
        style: {
          marginBottom: '20'
        },
        lineWidth: 20,
        size: 200,
        text: '80',
        radius: true
      },
      index,
      intro,
      avatar,
      name,
      cube,
      elemSlider1,
      names: [
        '美食',
        '大牌实惠',
        '超市便利',
        '水果',
        '医药健康',
        '浪漫鲜花',
        '跑腿代购',
        '汉堡披萨',
        '厨房生鲜',
        '甜品饮品'
      ]
    }
  }
}
</script>
<style lang="scss">
.line::before {
  content: "";
  width: 40px;
  height: 1px;
  border-bottom: 1px solid #ccc;
  display: inline-block;
  margin-right: 24px;
  margin-bottom: 6px;
}
.line::after {
  content: "";
  width: 40px;
  height: 1px;
  border-bottom: 1px solid #ccc;
  display: inline-block;
  margin-left: 24px;
  margin-bottom: 6px;
}
</style>
