<template>
    <div id="view" >
        <div class="fixed-top bg-white" style="z-index: 20000;">
            <cheader ></cheader>
            <!--nav-->
            <cmui-tabbar>
                <cmui-tabbar-item v-for="(e, i) in navs" :key="i" :title="e"></cmui-tabbar-item>
            </cmui-tabbar>
        </div>
        <div class="margint190" >
            <div  v-for="(e, i) in articles" :key="i" @click="$router.push('/activity')">
                <div class="paddingv10 " style="background-color: #f2f2f2;">
                    <div class="bg-white padding30">
                        <p>
                            <img style="border-radius: 50%;width: 30px;" src="https://yanxuan.nosdn.127.net/df63520ec927ac17a5c1f6bf1702408a.jpg?imageView&quality=65&thumbnail=56y56" alt="">
                            <span class="marginl20 text-gray">选妹</span>
                        </p>
                        <p class="paddingv20 fs-17">{{e.name}}</p>
                        <img style="border-radius: 5px" :src="e.img" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import header from './header'
  export default {
    name: 'view',
    components: {
      Cheader: header
    },
    data () {
      return {
        navs: ['推荐','居家生活','服饰鞋包','美食酒水','个护清洁','母婴亲子','运动旅行','数码家电'],
        articles: [
          {
            img: 'https://yanxuan.nosdn.127.net/cb5fbb47aedfa26416ad86644fd58668.jpg?imageView&quality=65&thumbnail=690y376',
            name: ''
          },{
            img: 'https://yanxuan.nosdn.127.net/602ce4ac685a02279b6671753c342ba5.jpg?imageView&quality=65&thumbnail=690y376',
            name: '双11、黑五有哪些不能错过的好东西？一定要看的购物季必买清单！'
          },{
            img: 'https://yanxuan.nosdn.127.net/2092a41717482b036032bea4cf9c3f0a.jpg?imageView&quality=65&thumbnail=690y376',
            name: '百款重磅新品来袭！现在付定金，更有超值折扣！'
          },{
          img: 'https://yanxuan.nosdn.127.net/23b8dd23046812be79b26296965af9e2.jpg?imageView&quality=65&thumbnail=690y376',
            name: '6大严选新态度，6个重启生活的新选择'
          },{
            img: 'https://yanxuan.nosdn.127.net/602ce4ac685a02279b6671753c342ba5.jpg?imageView&quality=65&thumbnail=690y376',
            name: '双11、黑五有哪些不能错过的好东西？一定要看的购物季必买清单！'
          },{
            img: 'https://yanxuan.nosdn.127.net/2092a41717482b036032bea4cf9c3f0a.jpg?imageView&quality=65&thumbnail=690y376',
            name: '百款重磅新品来袭！现在付定金，更有超值折扣！'
          },{
          img: 'https://yanxuan.nosdn.127.net/23b8dd23046812be79b26296965af9e2.jpg?imageView&quality=65&thumbnail=690y376',
            name: '6大严选新态度，6个重启生活的新选择'
          }
        ]
      }
    },
    created () {},
    methods: {},
  }
</script>
<style scoped></style>
