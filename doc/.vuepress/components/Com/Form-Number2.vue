<template>
    <div >
        <cmui-number :max="10" :min="5" v-model="value"></cmui-number>
    </div>
</template>
<script>
export default {
  name: "Form-Number2",
  data(){
    return{
      value:7
    }
  }
};
</script>
