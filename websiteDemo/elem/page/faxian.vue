<template>
    <div class="paddingb300">
        <div class="flex-container vfull border">
            <div class="flex1  borderr">
                <div class=" pos-r paddingb500 margint80 paddingl120">
                    <p class="text-orange  fs-18">金币商城</p>
                    <p class="fs-10 text-gray margint20">0元好物在这里</p>
                    <div class="pos-a right10 bottom10 padding15">
                        <img src="https://cube.elemecdn.com/8/38/9c9aea0e856149083d84af3444b78jpeg.jpeg?x-oss-process=image/format,webp" alt="" style="width:80px;height:80px">
                    </div>
                </div>
            </div>
            <div class="flex1 flex-container-col vfull hfull">
                <div class="flex-container flex1 borderb">
                    <div class="paddingl80">
                        <p class="text-blue fs-18">推荐有奖</p>
                        <p class="fs-10 text-gray margint20">20元现金拿不停</p>
                    </div>
                    <span class="paddingr80">
                        <img src="https://cube.elemecdn.com/5/72/7232274c3c1934861abb86ba32b7bjpeg.jpeg?x-oss-process=image/format,webp" alt="" style="width:40px;height:40px;">
                    </span>
                </div>
                <div class="flex-container flex1">
                    <div class="paddingl80">
                        <p class="text-red fs-18">周边优惠</p>
                        <p class="fs-10 text-gray margint20">领取口碑好券</p>
                    </div>
                    <span class="paddingr80">
                        <img src="https://cube.elemecdn.com/5/10/2351e989d4171479ba0d7b5c06053jpeg.jpeg?x-oss-process=image/format,webp" alt="" style="width:40px;height:40px;">
                    </span>
                </div>
            </div>
        </div>
        <div class="margint80">
            <p class="text-center line" style="font-weight:700;font-size:larger">为你推荐</p>
            <p class="text-center text-gray fs-10">你的口味我都懂得</p>
        </div>
        <div class="list list-col2 paddingl20">
            <div class="list-item" v-for="(item, index) in produces" :key="index" @click="discover">
                <div class="border margin20">
                    <img :src="item.src" alt="">
                    <p class="text-center fs-10" style="width:100%;color:white;background-color:rgba(0,0,0,.6)">您可能感兴趣的美食</p>
                    <div class="paddingl60 paddingr60">
                        <p class="fs-18 text-limit1">{{item.name}}</p>
                        <p class="fs-12 text-gray">月销516份 好评率97%</p>
                        <div class="flex-container borderb paddingb20">
                            <p class="text-red fs-10">¥<span class="fs-18"> {{item.price}}</span></p>
                            <p class="text-gray text-delete fs-10 bottom left marginl20" v-if="item.deletedPrice">{{item.deletedPrice}}</p>
                            <span class="fs-10 marginr100 radius padding5" style="color:#f66d6b;border:1px solid #f66d6b">满25减6</span>
                        </div>
                        <p class="fs-10 text-gray text-limit1 paddingv10">{{item.store}}</p>
                    </div>
                </div>
            </div>
        </div> 
        <div class="text-center text-gray fs-14 marginv60">
            <p>查看更多 ></p>
        </div>  
    </div>
         
</template>
<script>
export default {
    data(){
        return {
            produces:[
                {
                    src:"https://cube.elemecdn.com/1/fd/bab68764179ac1ef600144608c633jpeg.jpeg?x-oss-process=image/format,webp/resize,w_345,h_345,m_fixed",
                    name:"金牌炒面",
                    price:20,
                    store:"吉妈妈手擀面"
                },
                {
                    src:"https://cube.elemecdn.com/6/b9/6ec25399102622a81c7aabbfb0c08jpeg.jpeg?x-oss-process=image/format,webp/resize,w_345,h_345,m_fixed",
                    name:"水果捞中份",
                    price:17.8,
                    deletedPrice:24,
                    store:"张先生水果捞餐厅"
                },
                {
                    src:"https://cube.elemecdn.com/e/d0/53fcd9c40645cbc4b22b9074e713djpeg.jpeg?x-oss-process=image/format,webp/resize,w_345,h_345,m_fixed",
                    name:"留油的咸鸭蛋【单点不送哟】",
                    price:5.8,
                    store:"满炖(中山广场店)"
                },
                {
                    src:"https://cube.elemecdn.com/f/a4/43722173965d846f01d842a09c573jpeg.jpeg?x-oss-process=image/format,webp/resize,w_345,h_345,m_fixed",
                    name:"小碗豆腐脑",
                    price:6,
                    deletedPrice:10,
                    store:"李九堂豆腐脑(中山广场店)"
                },
                {
                    src:"https://cube.elemecdn.com/4/da/ed1667587dab995c44fe9d8769a6fjpeg.jpeg?x-oss-process=image/format,webp/resize,w_345,h_345,m_fixed",
                    name:"肥牛麻辣拌",
                    price:19,
                    store:"谷乙弘麻辣拌特色小吃(中山广场店)"
                },
                {
                    src:"https://cube.elemecdn.com/7/34/ee2546499a66ed1bb7d1d8bb6fa1fjpeg.jpeg?x-oss-process=image/format,webp/resize,w_345,h_345,m_fixed",
                    name:"照烧鸡肉（套餐）",
                    price:26.5,
                    store:"无限创作鸡肉饭（胜利店）"
                },
            ]
        }
    },
    methods:{
        discover(){
            this.$router.push('/discover')
        }
    }
}
</script>
<style  scoped>
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