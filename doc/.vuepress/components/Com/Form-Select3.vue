<template>
    <div >
        <cmui-select :data="data" v-model="value" :disabled="true"></cmui-select>
    </div>
</template>
<script>
export default {
  name: "Form-Number3",
  data(){
    return {
      data:Array.from({length:5},(item,index)=>index),
      value:3
    }
  }
};
</script>
