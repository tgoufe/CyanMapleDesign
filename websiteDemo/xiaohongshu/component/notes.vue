<template>
    <div class="bg-white paddingl15 fs-13">
        <div v-for="item in notes" class="borderb flex-container top paddingv20">
            <div class="ratio-container" style="width:32px">
                <div class="img-contianer round border" >
                    <img :src="item.image" alt="">
                </div>
            </div>
            <div class="marginl15 flex1">
                <p class="marginb20">
                    <span>{{item.user.nickname}}</span>
                    <span class="text-light">
                    收藏{{item.fav}}赞{{item.likes}}
                    </span>
                </p>
                <p class="marginb20 text-limit2">{{item.desc}}</p>
                <cmui-list class="paddingr20" :col="4" :space="20">
                    <cmui-list-item v-for="i in item.images.slice(0,4)">
                        <div class="ratio-container">
                            <img :src="i" alt="">
                        </div>
                    </cmui-list-item>
                </cmui-list>
                <!--<div class="scroll-container" style="width:100%">-->
                    <!--<div class="marginr20 ratio-container" v-for="i in item.images" style="width:70px">-->
                        <!--<img :src="i" alt="">-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
import {data} from '../data/notes.json'
console.log(data)
export default {
  name: "notes",
  data(){
    return {
      notes:data.normal_notes
    }
  }
};
</script>

<style scoped>

</style>
