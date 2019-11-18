<template>
    <div class="flex-container round text-center" style="width:100%">
        <div v-for="(item, index) in eleItems" :key="index" :class="{'text-blue':hasIndex === index }" @click="change(index,item.url)">
            <i :class="item.icon"></i>
            <p class="fs-10">{{item.name}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            eleItems:[
                {icon:'iconfont icon-lvsefenkaicankaoxianban-',name:'首页',url:'/'},
                {icon:'iconfont icon-faxian',name:'发现',url:'/faxian'},
                {icon:'iconfont icon-dingdan',name:'订单',url:'/order'},
                {icon:'iconfont icon-wode',name:'我的',url:'/wode'}
            ],
            hasIndex:0,
        }
    },
    methods:{
        change(i,url){
            this.hasIndex = i;
            this.$router.push(url)
        }
    },
}
</script>
<style lang="stylus" scoped>

</style>