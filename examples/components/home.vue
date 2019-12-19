<template>
    <div style="background:#f9f9f9;">
        <div class="pos-r">
            <img :src="bannerImg" alt="">
            <dl class="fs-12 text-black pos-a bottom0 left0 right0" style="padding:30px;">
                <dt class="fs-20">CYANMAPLE</dt>
                <dd class="margint10">cyanmaple，简称CMUI，是冰山工作室前端团队基于VUE开发的UI库，主要面向移动端和C端的开发者使用。</dd>
                <dd class="margint20">版本号2.0.7 bate</dd>
            </dl>
        </div>
        
        <div class="list paddingh30">
            <div v-for="item in list" :key="item.name" class="list-item margint30 bg-white">
                <router-link :to="item.path" class="padding30 flex-container text-dark hoverIcon">
                    <div class="flex-container left text-black">
                        <svg-icon :icon-class="item.icon" style="font-size: 24px"/>
                        <span class="fs-14 marginl30">{{ item.name }}</span>
                    </div>
                    <i class="baseIcon baseIcon-right fs-10 text-light" />
                </router-link>
            </div>
        </div>
        <div class="text-center paddingb30">
            <div class="paddingv50">
                <img :src="cmui_logo" height="36" alt="">
            </div>
            <div class="fs-12" style="color:#8a8a8a">MIT Licensed | Copyright © 2019 CyanMapleDesign</div>
        </div>
    </div>
</template>

<script>
import '@cyan/cmui.scss'
import banner from '@assets/banner.png'
import cmui_logo from '@assets/cmui_logo.svg'
export default {
  name: '',
  data() {
    return {
      bannerImg:banner,
      cmui_logo:cmui_logo,
      list: [
        { name: 'cyan', path: '/cyan', icon:'brush' },
        { name: 'UI组件', path: '/ui', icon:'pantone' },
        { name: '表单组件', path: '/forms', icon:'compass' },
        // { name: '公共方法', path: '/methods', icon:'gridContainer' },
        // { name: '为何非用组件？', path: '/why', icon:'gridContainer' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
    .list-item{

    }
}
</style>
