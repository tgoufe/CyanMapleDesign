<template>
  <cmui-list v-bind="options">
    <cmui-list-item v-for="item in list"  class="bg-white flex-container vfull hfull" style="height:33.3333vw">
      <router-link :to="item.path" class="paddingt10 paddingb30 text-dark text-center flex-container-col" style="height:100%;">
        <div class="flex2 flex-container bottom">
          <svg-icon :icon-class="item.name" style="font-size: 24px;"/>
        </div>
        <div class="flex1 flex-container bottom" style="line-height: 22px;">{{ item.name }}</div>
      </router-link>
    </cmui-list-item>
  </cmui-list>
</template>

<script>
export default {
  name: 'methods',
  data() {
    return {
      options: {
        border: true,
        col: 3,
        space: 0
      },
      list: [
        { name: 'copy', path: 'methods/copy' },
        { name: 'device', path: 'methods/device' },
        { name: 'fullScreen', path: 'methods/fullScreen' },
        { name: 'log', path: 'methods/log' }
      ]
    }
  }
}
</script>

<style scoped>
.cmui-list a:hover i{
  color:#00BABA;
}
</style>
