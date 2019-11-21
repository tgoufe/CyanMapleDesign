<template>
    <div>
        <p>使用属性方式</p>
        <cmui-input v-model="value" prepend="前置文本" append="后置文本">
            <span class="marginr20">input</span>
        </cmui-input>
        <p>使用slot方式</p>
        <cmui-input v-model="value" class="margint20">
            <select name="" id="" slot="prepend" style="width:100px">
                <option value="">http</option>
                <option value="">https</option>
            </select>
            <span class="marginr20">input</span>
            <select name="" id="" slot="append" style="width:100px">
                <option value="">.design</option>
                <option value="">.com</option>
            </select>
        </cmui-input>
        <p>{{value}}</p>
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

