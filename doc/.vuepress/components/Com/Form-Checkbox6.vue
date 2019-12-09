<template>
    <div class="form">
        <p>你选择了{{checkList}}</p>
        <cmui-checkbox-group v-model="checkList">
            <cmui-checkbox label="选项1"></cmui-checkbox>
            <cmui-checkbox label="选项2"></cmui-checkbox>
            <cmui-checkbox label="选项3"></cmui-checkbox>
        </cmui-checkbox-group>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox",
  data(){
    return{
      checkList:[]
    }
  }
};
</script>
