<template>
    <div>
        <div style="height:100px;background-color:rgba(119,103,137,.43)"></div>
        <div class="border pos-a" style="width:100px;left:50%;top:0;margin-left:-50px;margin-top:50px">
            <img src="https://cube.elemecdn.com/1/1b/f70053874b60c4f9ad81586eeb62apng.png?x-oss-process=image/format,webp/resize,w_150" alt="">
        </div>
        <div class="margint300">
            <p class="fs-18 text-center">汤知稻融廷米面小馆</p>
            <p class="fs-12 text-center text-light margint30">评价4.8 月售444单 蜂鸟转送约30分钟</p>
        </div>
        <div class="flex-container center margint30">
            <div class="flex-container round" style="width:150px;height:30px;background-color:#ffe578;" @click="handlePopup">
                <p class="text-center">¥ 7.7</p>
                <p class="fs-12 text-light">无门槛</p>
                <p class="fs-12 text-light">领取</p>
            </div>
        </div>
       
        <div class="flex-container margint30 center">
            <span class="badge reverse red marginr20">18减14</span>
            <span class="badge reverse red marginr20">18减14</span>
            <span class="badge reverse red marginr20">18减14</span>
        </div>
        <div class="margint30 flex-container center">
            <p class="text-light fs-10">欢迎光临，用餐高峰请提前下单！</p>
        </div>
        <cmui-tabbar :col="3" :active-index="1">
          <cmui-tabbar-item title="点餐" >
              <diancan></diancan>
          </cmui-tabbar-item>
          <cmui-tabbar-item title="评价" >
              <pingjia></pingjia>
          </cmui-tabbar-item>
          <cmui-tabbar-item title="商家" >
              <shangjia></shangjia>
          </cmui-tabbar-item>
        </cmui-tabbar>
    </div>
</template>
<script>
import diancan from '../components/diancan.vue'
import pingjia from '../components/pingjia.vue'
import shangjia from '../components/shangjia.vue'
export default {
    data(){
       return {
           
        }
    },
    methods:{
        handlePopup(){
           maple.alert({
               title:"领取成功",
               content:"请在券包中查看已领取的优惠券"
            })
        },
    },
    components:{
        diancan,
        pingjia,
        shangjia
    }
}
</script>
<style lang="scss">
    
</style>