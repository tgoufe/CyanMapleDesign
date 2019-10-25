<template>
    <div>
        <img src="https://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/1212.png" alt="">
        <p class="text-center padding20 bg-white">
            高速的描述型框架，简单不简单
        </p>
        <div class="list">
            <div v-for="item in list" :key="item.name" class="list-item margint30 bg-white">
                <router-link :to="item.path" class="padding30 flex-container text-dark">
                    <div class="flex-container left text-black">
                        <i class="baseIcon baseIcon-home" style="font-size: 24px;line-height: 30px;"></i>
                        <span class="fs-14 marginl30">{{ item.name }}</span>
                    </div>
                    <i class="baseIcon baseIcon-right" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import '@cyan/CMUI.scss'
export default {
  name: '',
  data() {
    return {
      list: [
        { name: 'cyan', path: '/cyan' },
        { name: 'UI组件', path: '/ui' },
        { name: '表单组件', path: '/forms' },
        { name: '公共方法', path: '/methods' },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
    .list-item{

    }
}
</style>
