<template>
    <div class="form">
        <p>{{radio}}</p>
        <cmui-radio name="demo" v-model="radio" label="选项1"></cmui-radio>
        <cmui-radio name="demo" v-model="radio" label="选项2"></cmui-radio>
        <cmui-radio name="demo" v-model="radio" label="选项3"></cmui-radio>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox1",
  data(){
    return {
      radio:'选项1'
    }
  }
};
</script>
