<template>
    <div class="form">
        <p>你选择了{{checkList}}，最多选择2项，至少选一项</p>
        <cmui-checkbox-group v-model="checkList" :max="2" :min="1">
            <cmui-checkbox label="选项1"></cmui-checkbox>
            <cmui-checkbox label="选项2"></cmui-checkbox>
            <cmui-checkbox label="选项3"></cmui-checkbox>
        </cmui-checkbox-group>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox3",
  data(){
    return{
      checkList:[]
    }
  }
};
</script>
