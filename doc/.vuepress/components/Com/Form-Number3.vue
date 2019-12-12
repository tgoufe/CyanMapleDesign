<template>
    <div class="form">
        <cmui-checkbox v-model="canAdd">can add</cmui-checkbox>
        <cmui-checkbox v-model="canSub">can sub</cmui-checkbox>
        <cmui-number :max="10" :min="5" v-model="value" :canAdd="canAdd" :canSub="canSub"></cmui-number>
    </div>
</template>
<script>
export default {
  name: "Form-Number3",
  data(){
    return{
      value:7,
      canAdd:true,
      canSub:true,
    }
  }
};
</script>
