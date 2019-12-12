<template>
    <div>
        <head class=" flex-container paddingv20 paddingh20 form  bg-cyan" style="z-index: 12">
            <i class="iconfont icon-back text-white fs-20 text-bolder" @click="$router.back()"></i>
            <span class="text-white fs-20 ">团购详情</span>
            <div class="flex-container">
                <div class="text-center">
                    <i class="iconfont icon-favorite text-white fs20"></i>
                    <p class="fs-10 text-white">收藏</p>
                </div>
                <div class="text-center marginl40">
                    <i class="iconfont icon-navlist text-white fs20"></i>
                    <p class="fs-10 text-white">导航</p>
                </div>
            </div>

        </head>
        <div class="ratio-container" ratio="5/3">
            <img src="http://p0.meituan.net/deal/35085f540e4296045fc89d1945fa39da25763.jpg" alt="">
            <div class="text-white padding20" style="top:auto">
                <p class="fs-19 paddingv10">歪嘴香重庆鸡公煲</p>
                <p>超值套餐，建议1-2人使用</p>
            </div>
        </div>
        <div class="padding20 flex-container">
            <span class="text-cyan" style="font-size: 33px">39.9</span>
            <span class="text-cyan">元</span>
            <span class="left marginl10 text-light">门市价：40元</span>
            <button class="btn orange bigger radius6">立即抢购</button>
        </div>
        <div class="padding20 bordert">
            <div class="list list-col2">
                <div class="list-item text-green padding10">
                    <i class="iconfont icon-clock"></i>
                    支持随时退款
                </div>
                <div class="list-item text-green padding10">
                    <i class="iconfont icon-smile"></i>
                    支持过期自动退
                </div>
                <div class="list-item text-dark padding10">
                    <i class="iconfont icon-smile"></i>
                    已售254
                </div>
            </div>
        </div>
        <div style="width: 100%;background-color: #f3f3f3;height: 12px;"></div>
        <div>
            <div class="padding10  flex-container borderb">
                <span class="padding20">
                    <i class="iconfont icon-favoritesfilling marginr5" style="color:#fa952f;" v-for="i in 5"></i>
                    <span style="color: #fa952f;" class="marginl10">5</span>
                </span>
                <span class="text-dark">5376人评价<i class="iconfont icon-more"></i></span>
            </div>
        </div>
        <div class="flex-container wrap left padding20">
            <div class="badge reverse orange big radius3 marginl10 margint20" v-for="i in tags">{{i}}</div>
        </div>
        <div style="width: 100%;background-color: #f3f3f3;height: 12px;"></div>
        <div>
            <div class="borderb padding20">
                <span class="fs-18">商家信息</span>
            </div>
            <div class="paddingh20 paddingv40 borderr flex-container borderb">
                <div class="borderr flex4">
                    <div class="fs-16 text-bolder">歪嘴香重庆鸡公煲（金州安盛店）</div>
                    <div class="text-dark marginv15">金州区斯大林路安盛购物广场6楼中厅</div>
                    <div><i class="iconfont icon-map"></i> <span style="color: #fa952f;" class="marginl20">离我最近</span></div>
                </div>
                <div class="flex1 text-center">
                    <i class="iconfont icon-phone text-cyan"></i>
                </div>

            </div>
        </div>
        <div class="padding20 borderb">
            <div class="flex-container">
                <span class="text-cyan fs-15">查看全部8家适用分店</span>
                <i class="iconfont icon-more text-cyan text-bolder"></i>
            </div>
        </div>
        <div style="width: 100%;background-color: #f3f3f3;height: 12px;"></div>
        <div>
            <p class="padding20 fs-18 borderb">套餐</p>
            <div class="flex-container borderb">
                <span class="flex3 borderr padding20">代金券</span>
                <span class="flex2 borderr padding20">1张</span>
                <span class="flex1 padding20">60元</span>
            </div>
            <div style="width: 100%;background-color: #f7f7f7;" class="text-center padding20">备注</div>
            <ul class="padding20 fs-15 borderb">
                <li> 1 - 店内人均消费参考价：25元</li>
                <li> 2 - 店内部分菜品价格参考：鸡公煲（中煲）（ 30.00 元/份）鲜虾煲（中煲）（ 50.00 元/份）茄汁沙丁鱼（ 18.00 元/份）排骨煲（中煲）（ 40.00 元/份）酸梅汁（ 12.00 元/份）</li>
            </ul>
            <div class="padding20">
                <div class="flex-container">
                    <span class="text-cyan fs-15">查看图文详情</span>
                    <i class="iconfont icon-more text-cyan text-bolder"></i>
                </div>
            </div>
            <div style="width: 100%;background-color: #f3f3f3;height: 12px;"></div>
            <p class="fs-18 borderb padding20">购买须知</p>
            <p class="text-orange margint20 paddingh20">有效期</p>
            <p class="margint20 padding20">2014.3.23 至 2019.12.26 23:59</p>
            <p class="text-orange margint20 paddingh20">不可用日期</p>
            <p class="margint20 padding20">天津街店，佳兆业店，东财锦辉店2019年2月4日至2019年2月8日不可用</p>
        </div>
        <div style="width: 100%;background-color: #f3f3f3;height: 12px;"></div>
        <div class="flex-container padding20 borderb">
            <div class="text-dark  fs-18">评价</div>
            <div class="flex-container">
                <span>
                    <i class="iconfont icon-favoritesfilling marginr5" style="color:#fa952f;" v-for="i in 5"></i>
                    <span style="color: #fa952f;" class="marginl10">5</span>
                </span>
            </div>
        </div>
        <div class="borderb" v-for="i in 4">
            <div class="flex-container left padding20 ">
                <img src="http://www.dpfile.com/ugc/user/anonymous.png" alt="" style="width: 30px;height: 30px;">
                <div class="marginl10">
                    <p class="fs-12 text-dark">匿名用户</p>
                    <i class="iconfont icon-favoritesfilling marginr5 fs-12" style="color:#fa952f;" v-for="i in 5"></i>
                    <span class="text-dark fs-12 marginl20">2019-11-27</span>
                </div>
            </div>
            <div class="paddingh20">
                歪嘴香鸡公煲的味道很好，跟同事经常去吃。 #鸡公煲# #宽粉# #油豆皮#
            </div>
            <div class="flex-container padding20 left">
                <img style="width: 50px;" class="marginr10" src="//p0.meituan.net/shaitu/c47317edf9881a66912fca49464fe29d2250224.jpg@220w_220h_1e_1c" alt="">
                <img style="width: 50px;" class="marginr10" src="//p0.meituan.net/shaitu/dac2145c86e6a8da4b3bd88fa5fb23d62282659.jpg@220w_220h_1e_1c" alt="">
                <img style="width: 50px;" src="//p0.meituan.net/shaitu/a4e56a79dc0ae9944c5a274a2cdc135e3273643.jpg@220w_220h_1e_1c" alt="">
            </div>
            <p class="padding20 text-dark">歪嘴香重庆鸡公煲（福佳新天地店）</p>
        </div>
        <div class="padding20 borderb">
            <div class="flex-container">
                <span class="text-cyan fs-15">查看全部评价</span>
                <i class="iconfont icon-more text-cyan text-bolder"></i>
            </div>
        </div>
        <div style="" class="padding20">
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
  name: '',
  data () {
    return {
      tags: ['回头客300','上菜快132','菜品精致89','肉类好78','主食赞43','朋友聚餐31','工作餐18','现做现卖6','海鲜棒6','闺蜜聚会3'],
      foot: ['首页','订单','客户端','电脑版','帮助']
    }
  }
}
</script>
