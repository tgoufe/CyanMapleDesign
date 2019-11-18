<template>
    <div>
        <cmui-input v-model="value" :disabled="true">
            <span class="marginr20">input</span>
        </cmui-input>
    </div>
</template>

<script>
export default {
  name: "Form-Input3",
  data(){
    return{
      value:'www.CyanMaple.design'
    }
  }
};
</script>

