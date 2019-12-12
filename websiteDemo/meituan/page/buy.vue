<template>
    <div id="buy" class="pos-a bottom0 top0 left0 right0 " style="background-color: #f3f3f3;">
        <head class=" flex-container paddingv20 paddingh20 form  bg-cyan" style="z-index: 12">
            <i class="iconfont icon-back text-white fs-20 text-bolder" @click="$router.back()"></i>
            <span class="text-white fs-20 ">提交订单</span>
            <div></div>
        </head>
        <div class="padding20 bg-gray fs-18 flex-container left bottom" style="height: 70px; font-weight: 300;">
            牛排自主全天接待
        </div>

        <div class=" bg-white">
            <div class="flex-container paddingh20 paddingv30 borderb">
                <span>单价：</span>
                <span>73元</span>
            </div>
            <div class=" paddingh20 paddingv30 borderb">
               <cmui-number :flex="true" v-model="value">
                   数量：
               </cmui-number>
            </div>
            <div class="flex-container paddingh20 paddingv30 borderb">
                <span>总价：</span>
                <span class="text-orange text-bolder">{{value * 73}}元</span>
            </div>
        </div>
        <div class="padding20">
            <div class="btn radius cyan bigger marginb20" style="width: 100%;" @click="joke">提交订单</div>
            请登录后进行购买，去 <span class="text-cyan" @click="joke">登录</span>
        </div>



        <div style="" class="padding20 fixed-bottom">
            <p class="fs-10 text-cyan paddingv20">当前位置：大连团购 > 歪嘴香重庆鸡公煲团购</p>
            <div class="flex-container margint10">
                <div>
                    <button class="btn big reverse cyan radius5">登录</button>
                    <button class="btn big reverse cyan radius5 marginl10">注册</button>
                </div>
                <p>城市： <button class="btn big reverse cyan radius5">大连</button></p>
            </div>
            <div class="flex-container margint40">
                <p class="fs-10 text-cyan flex1 text-center borderr" v-for="i in foot">{{i}}</p>
            </div>
            <p class="text-center fs-11 paddingv40">
                <span class="text-dark">友情链接：</span>
                <span class="text-cyan">猫眼电影</span>
            </p>

            <div class=" marginb40 text-center fs-10 line"  style="color: #b4b4b4">
                @2016 美团网 京ICP证070791号
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'buy',
    data () {
      return {
        foot: ['首页','订单','客户端','电脑版','帮助'],
        value: 1
      }
    },
    created () {},
    methods: {
      joke () {
        maple.alert('想什么呢？这就是个demo')
      }
    },
  }
</script>
<style scoped></style>
