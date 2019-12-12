<template>
    <div>
        <head class="fixed-top flex-container paddingv20 paddingh20 form borderb bg-white" style="z-index: 12">
            <i class="iconfont icon-back text-cyan fs-20 text-bolder" @click="$router.back()"></i>
            <input type="search" class="flex1 marginh20 radius20 text-center" placeholder="输入商家名、品类或商圈" style="background-color: #f2f2f2;">
            <i class="iconfont icon-account text-cyan fs-20 text-bolder"></i>
        </head>
        <div class="margint100 padding20 bg-white" style="position: relative;">
            <div class="list list-col4">
                <div class="list-item text-center fs-11 padding10" style="font-weight: 300;" v-for="(e, i) in navList" :key="i" >
                    <img :src="e.img" alt=""style="width: 55%;" class="marginb10">
                    <p>{{e.title}}</p>
                </div>
            </div>

        </div>
        <div></div>
        <cmui-affix :top="51" style="z-index: 1;position: relative;  ">
            <cmui-screen top="51px"  color="#06c1ae" ref="screen">
                <cmui-screen-item title="全部类目">
                    <div class="scroll-container-y" style="max-height:300px;">
                        <div class="list border inner">
                            <div class="list-item flex-container padding20" v-for="item in 30" @click="ok()">
                                分类{{item}}
                                <span class="text-light">2222</span>
                            </div>
                        </div>
                    </div>
                </cmui-screen-item>
                <cmui-screen-item title="附近商家">
                    <div class="scroll-container-y" style="max-height:300px;">
                        <cmui-tabbar col="flex">
                            <cmui-tabbar-item title="商圈">
                                <div class="padding20 borderb" v-for="i in 20" @click="ok()">商圈{{i}}</div>
                            </cmui-tabbar-item>
                            <cmui-tabbar-item title="地铁">
                                <div class="padding20 borderb" v-for="i in 20" @click="ok()">地铁{{i}}号线</div>
                            </cmui-tabbar-item>
                        </cmui-tabbar>
                    </div>
                </cmui-screen-item>
                <cmui-screen-item title="智能排序">
                    <div class="padding20 borderb" @click="ok()">智能排序</div>
                    <div class="padding20 borderb" @click="ok()">好评优先</div>
                    <div class="padding20 borderb" @click="ok()">距离优先</div>
                    <div class="padding20" @click="ok()">人气最高</div>
                </cmui-screen-item>
                <cmui-screen-item title="筛选" class="form">
                    <cmui-form itemSpace="0">
                        <cmui-form-item>
                            <cmui-checkbox :flex="true" class="borderb padding20" target-class="switch">只看可预约</cmui-checkbox>
                        </cmui-form-item>
                        <cmui-form-item>
                            <cmui-checkbox :flex="true" class="borderb padding20" target-class="switch">节假日可用</cmui-checkbox>
                        </cmui-form-item>
                        <cmui-form-item class="padding20 borderb">
                            <p>用餐时间段</p>
                            <cmui-checkbox-group :max="1" v-model="time">
                                <cmui-checkbox target-class="btn big cyan light radius margin10" v-for="item in timeList" :label="item">

                                </cmui-checkbox>
                            </cmui-checkbox-group>
                        </cmui-form-item>
                        <cmui-form-item class="padding20 borderb">
                            <p>餐厅服务</p>
                            <cmui-checkbox-group :max="1" v-model="ser">
                                <cmui-checkbox target-class="btn big cyan light radius margin10" v-for="item in timeServer" :label="item">

                                </cmui-checkbox>
                            </cmui-checkbox-group>
                        </cmui-form-item>
                        <cmui-form-item class="padding20 borderb">
                            <p>用餐人数</p>
                            <cmui-checkbox-group :max="1" v-model="peo">
                                <cmui-checkbox target-class="btn big cyan light radius margin10" v-for="item in peoples" :label="item">

                                </cmui-checkbox>
                            </cmui-checkbox-group>
                        </cmui-form-item>
                    </cmui-form>
                    <div class="bg-gray flex-container padding20">
                        <button class="radius btn">重置</button>
                        <button class="radius btn cyan " @click="ok">确定</button>
                    </div>
                </cmui-screen-item>
            </cmui-screen>
        </cmui-affix>
        <div class="padding20">
            <div class="borderb" v-for="(e, i) in prolist" :key="i" @click="$router.push('/detail')">
                <div class="flex-container">
                    <div class="flex-container vfull margin20">
                        <img :src="e.frontImg" style="width: 90px;height: 90px;" alt="">

                    </div>
                    <div class="flex1 vfull paddingb20 borderb margin20" >
                        <p class="fs-17 text-limit1 text-bolder">{{e.name}}</p>
                        <div class="flex-container fs-12 vfull" style="color: #777777;">
                            <div >
                                <span>
                                    <i class="iconfont icon-favoritesfilling fs-12 marginr10" style="color: lightgray;" :style="star(e.avgScore, es)" v-for="es in 5"></i>
                                </span>
                                <span> ¥{{e.avgPrice}}/人</span>
                            </div>
                            <p style="line-height: 23px">{{e.areaName}}</p>
                        </div>
                        <div class="overflow-h" style="height: 20px;">
                            <span class="fs-12 marginr10" style="color: #777">{{e.cateName}}</span>
                            <span class=" marginr10 fs-12" v-if="e.smartTags" v-for="label in e.smartTags" :style="{color: label.text.color, backgroundColor: label.text.backgroundColor}">{{label.text.content}}</span>
                        </div>
                        <div>
                            <span style="color: #6CBAB2" class="fs-11" v-for="(tag, tagIndex) in e.extraServiceTags" :key="tagIndex">
                                {{tag.text.content}}
                                <span v-if="tagIndex === 0 && e.extraServiceTags.length > 1"> | </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="margin10 paddingh20 text-left flex1">
                        <div class="marginb10 text-limit1" v-if="e.preferentialInfo.maidan" v-for="(intro, introIndex) in e.preferentialInfo.maidan.entries" :key="introIndex">
                            <span class="badge reverse orange marginl40">新客减{{Math.floor(Math.random()*9)}}</span>
                            <img style="width: 16px;" class="marginl40" :src="intro.icon" alt="">
                            <span class="fs-12 marginl10 " style="color: #777777">
                                {{intro.content}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import prolist from '../data/prolist'
export default {
  name: '',
  data:()=>({
    time:[],
    ser: [],
    peo: [],
    timeList:['8:00','91:00','101:00','11:00','12:00','13:00'],
    timeServer:['不限','早餐','午餐','下午茶','晚餐','夜宵'],
    peoples: ['1','2','4','5','6','7','8'],
    navList: [
      {title:'火锅',img:'https://p0.meituan.net/codeman/050ce6754d32482c75273e292407f2b312356.png'},
      {title:'甜点饮品',img:'https://p0.meituan.net/codeman/e5277d18a450c1fe51c6cda9cff6a9e016621.png'},
      {title:'自助餐',img:'https://p1.meituan.net/codeman/962b082a549e88f2939dbee2ac3d235613019.png'},
      {title:'小吃快餐',img:'https://p0.meituan.net/codeman/12ff749bd7fdf473abd59e2651a9ee1913684.png'},
      {title:'西餐',img:'https://p0.meituan.net/codeman/0fe84029cc6cf6ccf12838ce6546734a16488.png'},
      {title:'烧烤烤肉',img:'https://p0.meituan.net/codeman/2ae734d26259e6138ea61f2dcdac8fa115018.png'},
      {title:'香锅烤鱼',img:'https://p1.meituan.net/codeman/a7c360a9aeca1f972a1819465154c6b414043.png'},
      {title:'海鲜',img:'//p1.meituan.net/codeman/13a0d1537d45b237a07b665eb5a7845e17141.png'}
    ],
    prolist: []
  }),
  created () {
    this.prolist = prolist
  },
  methods:{
    ok(){
      this.$refs.screen.cancel()
    },
    star (data, es) {
      // es 当前星星index  data 得分
      if (es < data) {
        return {color: '#fa952f'}
      }
    }
  }
}
</script>

<style>
.form input[type=checkbox][label]:not(.switch):disabled::after,
.form input[type=radio][label]:not(.switch):disabled::after{
    color:#666 !important;
}
.form input.cyan[type=checkbox].btn.light:checked{
    background-color: #eafcfa;
    border:1px solid #00d3be;
}
input::-webkit-input-placeholder {
    color: #aaa;
    font-size: 12px!important;
    text-align: center;
    line-height: 14px;
}
</style>
