<template>
    <div class="list list-col2">
        <div v-for="item in good" :key="item.id" class="list-item padding6" @click="change">
            <div class="bg-white shadow radius">
                <div class="ratio-container img-container">
                    <img :src="item.image" alt="">
                </div>
                <div class="padding20">
                    <p class="text-darker marginb10 fs-13">{{item.title}}</p>
                    <p class="text-light marginb10 fs-13 text-limit2">{{item.desc}}</p>
                    <template v-if="item.tags.length" >
                        <div v-for="tag in item.tags" :key="tag.index" class="badge red small">{{tag.name}}</div>
                    </template>
                    <div v-else style="visibility: hidden"><div class="badge">0</div></div>
                    <div>
                        <span class="text-red">￥{{item.itemPrice[0].price}}</span>
                        <span class="text-delete text-light marginl20 fs-12" v-if="item.itemPrice[1]">￥{{item.itemPrice[1].price}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import goodData from '../data/goods.json'
let good=_.uniqWith(goodData.data,(a,b)=>a.title===b.title)
export default {
  name: "product",
  data(){
    return {
      good
    }
  },
  methods:{
    change(){
      if(this.$route.name==='detail'){
        maple.alert('当前为demo页面，仅存在一个商品页面，点击确定回到顶部',()=>{
          window.scrollTo(0,0)
        })
      }else{
        this.$router.push('detail')
      }
    }
  }
};
</script>

<style scoped>

</style>
