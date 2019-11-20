<template>
  <div>
    <span class="btn blue" @click="visible=!visible">样式接口</span>
    <cmui-alert :visible.sync="visible">
      <span slot="top">{{title}}</span>
      <input v-model="inputValue"/>
      <span slot="bottom" @click="visible=false">{{bottom}}</span>
    </cmui-alert>
  </div>
</template>

<script>
export default {
  name: "Alert-4",
  data:function(){
    return{
      visible:false,
      title:'这是一个标题',
      inputValue:'input内容',
      bottom:'自定义底部按钮'
    }
  }
};
</script>
<style lang="scss">

</style>