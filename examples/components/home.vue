<template>
    <div>
        <img src="https://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/1212.png" alt="">
        <p class="text-center padding20">
            高速的描述型框架，简单不简单
        </p>
        <div class="list">
            <div class="list-item" v-for="item in list" :key="item.name">
                <router-link :to="item.path" class="padding30 flex-container text-dark">
                    <span>{{ item.name }}</span>
                    <i class="baseIcon baseIcon-right"></i>
                </router-link>
            </div>
        </div> 
    </div>
    
</template>

<script>
export default {
  name: "",
  data(){
    return {
      list:[
        {name:'UI组件',path:'uilist'},
        {name:'表单组件',path:'/'},
      ]
    }
  }
}
</script>

<style scoped>

</style>