<template>
    <div>
        <cmui-input v-model="value" target-class="radius" class="marginb20">
            <span class="marginr20">圆角</span>
        </cmui-input>
        <cmui-input v-model="value" target-class="reverse" class="marginb20">
            <span class="marginr20">翻转</span>
        </cmui-input>
        <cmui-input v-model="value" target-class="small" class="marginb20">
            <span class="marginr20">small</span>
        </cmui-input>
        <cmui-input v-model="value" target-class="big" class="marginb20">
            <span class="marginr20">big</span>
        </cmui-input>
    </div>
</template>

<script>
export default {
  name: "Form-Input5",
  data(){
    return{
      value:'www.CyanMaple.design'
    }
  }
};
</script>

