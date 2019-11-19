<template>
    <div>
        <span class="btn blue" @click="alert1">简单的案例</span>
    </div>
</template>

<script>
export default {
  name: "Alert-1",
  methods:{
    alert1() {
      this.alert({
          title:'alert Demo',
          content:'this is a content you can use html code here'
      })
    }
  }
};
</script>
<style lang="scss">
  $mainColor:#00baba;
.cmui-dialog {
  .cmui-dialog__body {
    input{
      width:100%;
      padding:5px;
    }
  }
  span{
    color: $mainColor;
    text-align:center;
    display:block;
    padding:13px;
    font-size:16px;
  }
}
</style>