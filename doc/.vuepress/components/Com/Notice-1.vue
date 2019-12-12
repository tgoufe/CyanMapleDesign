<template>
    <div>
        <span class="btn blue" @click="notice1">简单的案例</span>
    </div>
</template>

<script>
export default {
  name: "Notice-1",
  methods:{
    notice1() {
      this.notice({
          content:'这是一个notice,默认三秒消失'
      })
    }
  }
};
</script>