<template>
  <div class="marginb300">
    <div class="bg-blue form paddingt100 paddingh50">
      <p class="text-white fs-24 paddingv20 text-limit1">中国邮政储蓄银行(大连分行营业部)</p>
    </div>
    <cmui-affix >
      <div class="bg-blue paddingh50  paddingv50 pos-r" style="z-index:99">
        <i class="iconfont icon-faxian pos-a text-gray marginl200"></i>
        <a href class="bg-white paddingv40 paddingh300 text-light">搜索饿了么商家，商品名称</a>
      </div>
    </cmui-affix>
    <cmui-slider>
      <cmui-slider-item>
        <div class="list list-col5 paddingb100">
          <div v-for="(item,i) in elemSlider1" :key="i" class="list-item text-center">
            <img :src="item.src" width="45" class="margint50" />
            <p class="text-dark fs-12 margint20">{{ item.name }}</p>
          </div>
        </div>
      </cmui-slider-item>
    </cmui-slider>
    <div class="flex-container  marginh30 padding30" style="background:#f9f9f9">
      <div class="flex-container-col">
        <p class="text-black fw-20 fs-16">品质套餐</p>
        <p class="text-light fs-12 paddingt10">搭配齐全吃的好</p>
        <router-link to="/login">
          <p class="text-gloden fs-11 padding10">立即抢购 ></p>
        </router-link>
      </div>
        <img
          style="width:120px"
          src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?x-oss-process=image/format,webp/resize,w_282,h_188,m_fixed"
          alt
        />
    </div>
    <div class="flex-container marginh30 radius4 padding30 margint30" style="background-color:#f3dda0;color:#644f1b">
      <i class="iconfont icon-gifts"></i>
      <p class="marginl30">超级会员</p>
      <p class="fs-10 marginl30 left">每月领取20元红包</p>
      <div class="flex-container fs-10">
        <p>立即开通</p>
        <i class="iconfont icon-more"></i>
      </div>
    </div>
    <div class="flex-container round margint30 pos-r">
      <p class="text-black line">推荐商家</p>
      <!-- <i class="iconfont icon-faxian"></i> -->
    </div>
    <cmui-affix :top="37">
      <div class="flex-container round marginv30 padding50 text-light fs-14 bg-white">
        <div v-for="(item, index) in items" :key="index" @click="Tanchuang(item,index)">
          {{item}}
          <i class="iconfont icon-more" v-if="index === 0"></i>
        </div>
      </div>
    </cmui-affix>
    <product></product>

    <cmui-popup position="top" :visible.sync="visible">
      <div style="height:500px">
        <cmui-affix class="bg-blue padding50 pos-r">
          <i class="iconfont icon-faxian pos-a text-gray marginl280"></i>
          <a href class="bg-white paddingv40 paddingh300 marginl80 text-light">搜索饿了么商家，商品名称</a>
        </cmui-affix>
        <cmui-tabbar @item-click="checkFirst">
          <cmui-tabbar-item :title="item" v-for="(item, index) in items2" :key="index"></cmui-tabbar-item>
        </cmui-tabbar>
        <ul class="flex-container-col left marginl100">
          <li
            :class="{'text-blue':index === colorBlue}"
            class="pos-r"
            v-for="(item, index) in items3"
            :key="index"
            @click="check(index)"
          >{{item}}</li>
        </ul>
      </div>
    </cmui-popup>
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
} from "../data/img.json";

import "../../../src/cyan/CMUI_doc.scss";
import product from "../components/product.vue";

export default {
  name: "home",
  components: {},
  data: function() {
    return {
      top: 20,
      visible: false,
      zonghe: true,
      colorBlue: "",
      props: {
        value: 80,
        style: {
          marginBottom: "20"
        },
        lineWidth: 20,
        size: 200,
        text: "80",
        radius: true
      },
      index,
      intro,
      avatar,
      name,
      cube,
      elemSlider1,
      names: [
        "美食",
        "大牌实惠",
        "超市便利",
        "水果",
        "医药健康",
        "浪漫鲜花",
        "跑腿代购",
        "汉堡披萨",
        "厨房生鲜",
        "甜品饮品"
      ],
      items: ["综合排序", "距离最近", "品质联盟", "筛选"],
      items2: ["综合排序", "距离最近", "品质联盟", "筛选"],
      items3: [
        "综合排序",
        "好评优先",
        "销量最高",
        "起送价最低",
        "配送最快",
        "配送费最低",
        "人均从高到低",
        "人均从低到高",
        "通用排序"
      ]
    };
  },
  methods: {
    Tanchuang(item, index) {
      if (index === 0) {
        this.visible = true;
      }
    },
    checkFirst(vm, item, index) {
      if (index === 0) {
        this.zonghe = true;
      } else {
        this.zonghe = false;
      }
    },
    check(i) {
      this.colorBlue = i;
      this.visible = false;
    }
  },
  components: {
    product
  }
};
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
ul {
  li {
    padding-top: 20px;
    color: #333;
    font-size: 14px;
  }
}
</style>
