<template>
    <div>
        <cmui-input v-model="value" :flex="true" width="200">
            <span>两端对齐的flex结构</span>
        </cmui-input>
    </div>
</template>

<script>
export default {
  name: "Form-Input4",
  data(){
    return{
      value:'www.CyanMaple.design'
    }
  }
};
</script>

