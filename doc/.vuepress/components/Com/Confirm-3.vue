<template>
    <div>
        <span class="btn blue" @click="confirm3">返回值</span>
    </div>
</template>

<script>
export default {
  name: "Confirm-3",
  methods:{
    confirm3() {
      let alertVM=this.confirm('标题');
      alertVM.title='修改后的标题';//修改标题
      alertVM.content='此弹窗会在3秒后关闭';//修改内容
      alertVM.okStyle={color:'red'};//修改按钮样式
      setTimeout(function(){
        alertVM.cancel();//关闭弹窗
      },3000)
    }
  }
};
</script>
