<template>
    <div>
        <cmui-input v-model="value" :reset="true" class="marginb20" type="search">
            <span class="marginr20">search</span>
        </cmui-input>
        <cmui-input v-model="value" :reset="true" class="marginb20" type="password">
            <span class="marginr20">password</span>
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

