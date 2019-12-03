<template>
  <div class="row">
            <div v-for="(span, iout) in 2" :key="iout" class="span6">
              <div v-for="(item,index) in span==1?imgL:imgR" :key="index" class="shadow marginb20 radius" @click="change()">
                <img :src="item" alt="">
                <div class="padding20">
                  <p class=" fs-13 marginb20">
      {{ intro[(iout)*10+index] }}
      </p>
                  <div class="flex-container">
                    <div class="img-container round full" style="width:25px">
                      <img :src="avatar[(iout)*10+index]" alt="">
                    </div>
                    <span class="marginl10 fs-12 text-light left text-limit1">{{ name[(iout)*10+index] }}</span>
                    <i class="iconfont icon-favorites text-light"></i>
                    <span class="text-light fs-11 marginl10">4224</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>
<script>
import { index, intro, avatar, name, cube, imageGrid } from '../data/img.json'
export default {
  name: 'biji',
  data() {
    return {
      imgL: index.slice(index.length / 2),
      imgR: index.slice(0, index.length / 2),
      index,
      intro,
      avatar,
      name,
      cube,
      imageGrid
    }
  },
  methods:{
    change(){
      if(this.$route.name==='discover'){
        maple.alert('Demo页面，仅有一个详情页面，点击确定回到顶部',()=>window.scrollTo(0,0))
      }else{
        this.$router.push('discover')
      }
    }
  }
}
</script>
