<template>
    <div class="form">
        <p>设置精度为1，步长为.1</p>
        <cmui-number v-model="value" :precision="1" :step=".1"></cmui-number>
    </div>
</template>
<script>
export default {
  name: "Form-Number3",
  data(){
    return{
      value:7
    }
  }
};
</script>
