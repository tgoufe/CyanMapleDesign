<template>
    <div>
        <cmui-input v-model="value" :reset="true">
            <span class="marginr20">input</span>
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

