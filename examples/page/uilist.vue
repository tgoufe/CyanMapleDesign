<template>
    <div>
        <div class="list">
            <div class="list-item" v-for="(item,index) in list" :key="index">
                <router-link :to="item.name" class="padding30 flex-container text-dark">
                    <span>{{ item.name }}</span>
                    <i class="baseIcon baseIcon-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config'
export default {
  name: "",
  data(){
    return {
      list:config.pageList
    }
  }
}
</script>

<style scoped>

</style>