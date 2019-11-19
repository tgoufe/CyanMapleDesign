<template>
    <div>
        <span class="btn blue" @click="confirm2">简洁调用</span>
    </div>
</template>

<script>
export default {
  name: "Confirm-2",
  methods:{
    confirm2() {
      this.confirm('我是内容区域',()=>{
          console.log('确定按钮被点击了')
      },el=>{
          console.log('弹窗弹出，当前节点为');
          console.log(el);
      })
    }
  }
};
</script>
