<template>
  <div>
    <div class="btn blue" @click="visible=!visible">change</div>
    <cmui-confirm :visible.sync="visible">
        <span slot="top">{{title}}</span>
        <input v-model="inputValue"/>
        <span slot="bottom" @click="visible=false">{{bottom}}</span>
    </cmui-confirm>
  </div>
</template>

<script>
export default {
  name: "Confirm-4",
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