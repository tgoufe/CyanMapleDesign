<template>
  <div>
    <div class="bg-yellow text-black flex-container text-black form padding20">
      <p>大连</p>
      <i class="iconfont icon-more"></i>
      <input type="search" class="flex1 radius8 marginh20" placeholder="请输入商家名、品类或者商圈...">
      <i class="iconfont icon-account"></i>
    </div>
    <head class="bg-black padding10 flex-container">
      <img class="marginh20" src="https://p1.meituan.net/travelcube/7264ce9c25de2e464e3acd996fe8ad362803.png" width="36" alt="">
      <div class="flex text-white left">
        <p class="fs-13">省钱利器 购物超划算</p>
        <p class="fs-11">吃喝玩乐尽在美团</p>
      </div>
      <button class="btn yellow radius text-black">下载APP</button>
    </head>

    <div class="list list-col5 paddingb10">
      <div class="list-item text-center flex-container-col paddingt20" v-for="i in nav" @click="$router.push('/list')">
        <div class="ratio-container radius40" style="width:40px" :class="[`bg-${i.color}`]">
          <i class="iconfont icon-process text-white" style="font-size:25px;line-height:40px"></i>
        </div>
        <p class="fs-12 paddingt10">{{i.name}}</p>
      </div>
    </div>

    <div class="padding10 bg-gray"></div>

    <div class="padding20 borderb">
      <p class="fs-17 paddingb20">猜你喜欢</p>
      <div v-for="item in prolist" class="bordert paddingv20 flex-container vfull" @click="$router.push('detail')">
        <div class="ratio-container marginr20" style="width:90px">
          <img :src="item.img" alt="">
        </div>
        <div class="flex1 flex-container-col hfull">
          <p class="fs-15">{{item.name}}</p>
          <p class="fs-12 top">{{item.title}}</p>
          <p class="flex-container fs-12 text-dark bottom">
            <span class="fs-18 text-orange">{{item.price}}</span>
            <span class="text-orange marginr10">元</span>
            <span class="">门市价：{{item.del}}</span>
            <span class="right ">{{item.sale}}</span>
          </p>
        </div>
      </div>
      <p class="text-orange fs-17 bordert flex-container paddingt20">
        查看全部团购
        <i class="iconfont icon-more"></i>
      </p>
    </div>

    <div class="padding20">
      <button class="orange btn radius marginr20">登录</button>
      <button class="orange btn radius marginr20">注册</button>
    </div>

  </div>
</template>

<script>
import product from '../data/product.json';
let prolist=product.name.map((item,index)=>{
  return{
    name:product.name[index],
    img:product.img[index],
    price:product.price[index],
    del:product.del[index],
    title:product.title[index],
    sale:product.sale[index],
  }
})
export default {
  name: 'home',
  components: {
  },
  data: function () {
    return {
      nav:[
        {name:'美食',color:'orange'},
        {name:'猫眼电影',color:'red'},
        {name:'酒店',color:'purple'},
        {name:'休闲娱乐',color:'yellow'},
        {name:'外卖',color:'orange'},
        {name:'KTV',color:'yellow'},
        {name:'周边游',color:'blue'},
        {name:'丽人',color:'pink'},
        {name:'小吃快餐',color:'orange'},
        {name:'全部分类',color:'cyan'},
      ],
      prolist
    }
  }
}
</script>
<style lang="scss">

</style>
