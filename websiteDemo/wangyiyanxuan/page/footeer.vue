<template>

        <div id="footeer" class="flex-container bg-white paddingh40 paddingv20" style="height: 1.30667rem;width: 100%;">
            <div class="text-center" v-for="(e, i) in icons" :class="{'text-red': changeRed == i}" :key="i" @click="change(e.url, i)" >
                <i  :class="e.icon"></i>
                <p class="fs-10">{{e.name}}</p>
            </div>
        </div>

</template>

<script>
  export default {
    name: 'footeer',
    data () {
      return {
        icons: [
          {name: '首页', icon: 'iconfont icon-warehouse-delivery', url: '/'},
          {name: '分类', icon: 'iconfont icon-furniture', url: '/kind'},
          {name: '识物', icon: 'iconfont icon-listing-content', url: '/view'},
          {name: '活动', icon: 'iconfont icon-hot', url: '/activity'}
          ],
        changeRed: 0,
        path: ''
      }
    },
    created () {
      this.path = this.$route.path
    },
    methods: {
      change (url, index) {
        this.changeRed = index;
        this.$router.push(url)
      }
    },
  }
</script>
<style scoped>
    i {
        font-size: 18px;
    }
    .tops {
        margin-bottom: 2px;
    }
</style>
