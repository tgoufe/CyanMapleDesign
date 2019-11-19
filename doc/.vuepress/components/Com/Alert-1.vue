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
  .cmui-dialog__container {
    width: 100%;
    margin: 0 32px;
  }
  .cmui-dialog__content {
    padding: 32px 16px;
  }
  .cmui-dialog__title {
    font-size: 17px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 8px;
    line-height: 24px;
  }
  .cmui-dialog__warp {
    .cmui-dialog__body {
      font-size: 13px;
      text-align: center;
      input{
        width:100%;
        padding:5px;
      }
    }
  }
  .cmui-dialog__buttons {
    border-top: 1px solid #ebebeb;
    .cmui-dialog__button {
      color: $mainColor;
      & + .cmui-dialog__button {
        border-left: 1px solid #ebebeb;
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
}
</style>