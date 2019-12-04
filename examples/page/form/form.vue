<template>
    <div>
        <cmui-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <cmui-form-item prop="name" label="活动名称">
                <cmui-input v-model="ruleForm.name"></cmui-input>
            </cmui-form-item>
        </cmui-form>
    </div>
</template>

<script>
export default {
  name: "form",
  data(){
    return {
      ruleForm:{
        name:''
      },
      rules:{
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  }
};
</script>

<style scoped>

</style>
