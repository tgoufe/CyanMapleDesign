<template>
    <div class="padding30">
        <img src="https://zhang-yue.oss-cn-beijing.aliyuncs.com/bingshan/1212.png" alt="">
        <p class="text-center padding20 bg-white">
            高速的描述型框架，简单不简单
        </p>
        <div class="list">
            <div v-for="item in list" :key="item.name" class="list-item margint30 bg-white">
                <router-link :to="item.path" class="padding30 flex-container text-dark">
                    <div class="flex-container left text-black">
                        <i class="" :class="item.icon" style="font-size: 24px;line-height: 30px;"></i>
                        <span class="fs-14 marginl30">{{ item.name }}</span>
                    </div>
                    <i class="baseIcon baseIcon-right fs-10 text-light" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import '@cyan/cmui.scss'
export default {
  name: '',
  data() {
    return {
      list: [
        { name: 'cyan', path: '/cyan', icon:'uiIcon-mask' },
        { name: 'UI组件', path: '/ui', icon:'uiIcon-ui' },
        { name: '表单组件', path: '/forms', icon:'uiIcon-forms' },
        { name: '公共方法', path: '/methods', icon:'uiIcon-mask' },
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
