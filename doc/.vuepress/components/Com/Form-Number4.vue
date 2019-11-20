<template>
    <div class="form">
        <p>步长为3：</p>
        <cmui-number v-model="value" :step="3"></cmui-number>
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
