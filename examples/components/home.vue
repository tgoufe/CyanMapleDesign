<template>
    <div>
        <img src="https://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/1212.png" alt="">
        <p class="text-center padding20">
            高速的描述型框架，简单不简单
        </p>
        <div class="list">
            <div v-for="item in list" :key="item.name" class="list-item">
                <router-link :to="item.path" class="padding30 flex-container text-dark">
                    <span>{{ item.name }}</span>
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

<style scoped>

</style>
