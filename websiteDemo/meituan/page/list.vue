<template>
    <div>
        <head class="fixed-top flex-container paddingv20 paddingh20 form borderb ">
            <i class="iconfont icon-more text-cyan fs-20"></i>
            <input type="search" class="flex1 marginh20 radius20">
            <i class="iconfont icon-more text-cyan fs-20"></i>
        </head>
        <div class="padding50"></div>
        <cmui-screen  color="#06c1ae" ref="screen">
            <cmui-screen-item title="全部类目">
                <div class="scroll-container-y" style="max-height:300px;">
                    <div class="list border inner">
                        <div class="list-item flex-container padding20" v-for="item in 30">
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
                            <div class="padding20 borderb" v-for="i in 20">商圈{{i}}</div>
                        </cmui-tabbar-item>
                        <cmui-tabbar-item title="地铁">
                            <div class="padding20 borderb" v-for="i in 20">地铁{{i}}号线</div>
                        </cmui-tabbar-item>
                    </cmui-tabbar>
                </div>
            </cmui-screen-item>
            <cmui-screen-item title="智能排序">
                <div class="padding20 borderb">智能排序</div>
                <div class="padding20 borderb">好评优先</div>
                <div class="padding20 borderb">距离优先</div>
                <div class="padding20">人气最高</div>
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
                        <cmui-checkbox-group :max="1" v-model="time">
                            <cmui-checkbox target-class="btn big cyan light radius margin10" v-for="item in timeList" :label="item">

                            </cmui-checkbox>
                        </cmui-checkbox-group>
                    </cmui-form-item>
                    <cmui-form-item class="padding20 borderb">
                        <p>用餐人数</p>
                        <cmui-checkbox-group :max="1" v-model="time">
                            <cmui-checkbox target-class="btn big cyan light radius margin10" v-for="item in timeList" :label="item">

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

        <div>
            sdfsdf
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  data:()=>({
    time:[],
    timeList:['不限','早餐','午餐','下午茶','晚餐','夜宵',]
  }),
  methods:{
    ok(){
      this.$refs.screen.cancel()
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
</style>
