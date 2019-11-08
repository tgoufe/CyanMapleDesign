<template>
    <div id="header">
        <div class="flex-container paddingv20 paddingh30 borderb">
            <i class="iconfont icon-warehouse-delivery left" @click="$router.push('/')"></i>
            <i style="width: 22px;" class="marginl30"></i>
            <p class="center" >
                <span class="fs-20 text-red text-bolder">发现</span>
                <span class="text-gray marginl20">甄选家</span>
            </p>
            <p class="right">
                <i class="iconfont icon-search"></i>
                <i class="iconfont icon-cart marginl30"></i>
            </p>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {}
    },
    created () {},
    methods: {},
  }
</script>
<style scoped>
    i {
        font-size: 22px;
        font-weight: 300;
        color: #909090;
    }
</style>
