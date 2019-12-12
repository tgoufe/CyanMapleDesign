<template>
    <div>
        <div class="padding20 marginb20 shadow flex-container bg-white">
            <img src="//s.xiaohongshu.com/s/mobile-navbar/*/lib/img/logo-be88e12.png" alt="小红书" class="logo left" width="60">
            <span class="marginr20 text-light" @click="$router.push('home')">精选</span>
            <span class="marginr20 text-light" @click="$router.push('brands')">品牌</span>
        </div>
        <div v-for="item in notes" class="padding20 marginb20 bg-white">
            <div class="padding10 flex-container">
                <div class="ratio-container marginr20" style="width:36px">
                    <div class="img-container round border full" >
                        <img :src="item.image" alt="">
                    </div>
                </div>
                <span class="left">{{item.user.nickname}}</span>
                <span class="text-lighter fs-13">{{item.collects}}赞 {{item.likes}}收藏</span>
            </div>
            <cmui-list :col="3" :space="20" class="overflow-h">
                <cmui-list-item v-for="(i,index) in item.images">
                    <div class="ratio-container">
                        <cmui-img :src="i" :pre-view="true" :pre-view-list="item.images" :pre-view-index="index"></cmui-img>
                    </div>
                </cmui-list-item>
            </cmui-list>
            <p class="text-bolder paddingt20">{{item.title}}</p>
            <p class="paddingt20">{{item.desc}}</p>
        </div>
    </div>

</template>

<script>
import {data} from '../data/notes.json'
console.log(data.normal_notes)
export default {
  name: "user",
  data(){
    return {
      notes:data.normal_notes
    }
  }
};
</script>

<style type="text/scss" lang="scss">
    .cmui-image-preView{
        background-color: rgba(0,0,0,.8);
        img{width:100vw}
    }
</style>
