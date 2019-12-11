<template>
    <div>
        <div class="borderb" v-for="(item, index) in items" :key="index">
            <div class="flex-container">
                <div class=" margin30 marginl5ß0 top">
                    <img :src="item.frontImg" style="width:65px;height:65px;" alt="">
                </div>
                <div class="flex1 vfull paddingb20 margin20">
                    <span class="fs-15 text-limit1 text-bloder">{{item.name}}</span>
                    <div class="flex-container fs-11 vfull" style="color: #777777;">
                        <div>
                            <span>
                                <i class="iconfont icon-favoritesfilling fs-12 marginr10" style="color: lightgray;" :style="star(item.avgScore, es)" v-for="es in 5" :key="es"></i>
                            </span>
                            <span> ¥{{item.avgPrice}}/人</span>
                            <span class="marginl30 fs-10">月售{{item.number || 60}}单</span>
                            <span class="badge small blue marginl350 radius2">蜂鸟转送</span>
                        </div>
                    </div>
                    <div class="flex-container margin20 fs-11 paddingb20" style="color: #777777;">
                        <div class="left">
                            <span>¥{{item.avgPrice}}起送 | </span> 
                            <span>¥配送费{{item.avgScore}}</span>
                        </div>
                        <div class="right">
                            <span>{{item.mi || 360}}米 | </span> 
                            <span>{{item.time || 23}}分钟</span>
                        </div>
                    </div>
                    <div class="badge reverse small marginr20">蛋糕</div>
                    <div class="badge reverse small marginr20">支持自取</div>
                    <div class="badge reverse small marginr20">品质联盟</div>
                    <div class="flex-container margint30">
                        <div class="badge small" style="background-color: rgb(240, 115, 115);">减</div>
                        <span class="fs-11 text-limit1 left marginl20 text-light">满30减21，满50减31，满90减45</span>
                    </div>
                    <div class="flex-container margint30">
                        <div class="badge small" style="background-color: rgb(240, 115, 115);">特</div>
                        <span class="fs-11 text-limit1 left marginl20 text-light">折扣商品4折起</span>
                    </div>  
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import productList from '../data/product'
export default {
    data(){
        return {
            items:[]
        }
    },
    created(){
        console.log(productList)
        this.items = productList
    },
    methods:{
        star (data, es) {
            if (es < data) {
                return {color: '#f8de57'}
            }
        }
    }
};
</script>