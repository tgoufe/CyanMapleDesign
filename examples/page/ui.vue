<template>
  <cmui-list v-bind="options">
    <cmui-list-item v-for="item in list" class="bg-white flex-container vfull hfull" style="height:33.3333vw">
      <router-link :to="item.path" class="paddingt10 paddingb30 text-dark text-center flex-container-col" style="height:100%;">
        <div class="flex2 flex-container bottom">
          <i class="text-black" :class="'uiIcon-'+item.name" style="font-size: 24px;line-height: 30px;"></i>
        </div>
        <div class="flex1 flex-container bottom" style="line-height: 22px;">{{ item.name }}</div>
      </router-link>
    </cmui-list-item>
  </cmui-list>
</template>

<script>
import page from './index'
export default {
  name: 'ui',
  data() {
    return {
      options: {
        border: true,
        col: 3,
        space: 0
      },
      list: page.folder.ui
    }
  }
}
</script>

<style scoped>
.cmui-list a:hover i{
  color:#00BABA;
}
</style>
