<template>
    <div>
        <p>使用属性方式</p>
        <cmui-input v-model="value" prepend="前置文本被禁用" append="后置文本未被禁用" :prepend-disabled="true" :append-disabled="false">
            <span class="marginr20">input</span>
        </cmui-input>
    </div>
</template>

<script>
export default {
  name: "Form-Input2",
  data(){
    return{
      value:'www.CyanMaple.design'
    }
  }
};
</script>

