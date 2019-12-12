<template>
    <div>
        <cmui-input v-model="value" class="marginb20">
            <span class="marginr20">input</span>
        </cmui-input>
        <cmui-input v-model="value" label="sdf"></cmui-input>
    </div>
</template>

<script>
export default {
  name: "Form-Input1",
  data(){
    return{
      value:'www.CyanMaple.design'
    }
  }
};
</script>

