<template>
    <div>
        <span class="btn blue" @click="notice2">使用JS控制</span>
    </div>
</template>

<script>
export default {
  name: "Notice-2",
  methods:{
    notice2() {
      let vm=this.notice('some content',0)//设置时间为0，即一直显示
      vm.content='other content'//修改弹窗内容
      setTimeout(function(){
        vm.cancel();//必要的时候手动关闭。
      },3000)
    }
  }
};
</script>