<template>
    <div>
        <cmui-form label-width="150px" :model="form" :rules="rules" ref="form">
            <cmui-form-item label="请输入手机号" prop="phone">
                <cmui-input v-model="form.phone"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="请输入密码" prop="password">
                <cmui-input v-model="form.password"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="确认密码" prop="checkPass">
                <cmui-input v-model="form.checkPass"></cmui-input>
            </cmui-form-item>
        </cmui-form>
        <div class="flex-container center">
            <button class="btn radius blue marginh20" @click="ok()">注册</button>
            <button class="btn radius blue marginh20 reverse" @click="cancel()">重置</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "Form-Form",
  data(){
    const checkphone=(rule,value,callback)=>{
      if(!/1\d{10}/.test(value))
        callback(new Error('请输入正确的手机号码'))
      else
        callback()
    }
    const checkpass=(rule,value,callback) =>{
      if(!value)
        callback(new Error('确认密码不能为空'))
      else if(value !== this.form.password)
        callback(new Error('两次输入密码不一致'))
      else
        callback()
    }
    return {
      form:{
        phone:'',
        password:'',
        checkPass:''
      },
      rules:{
        phone:[{trigger: 'blur',required:true,validator:checkphone}],
        password:[{trigger: 'blur',required:true,message:'请输入密码'}],
        checkPass:[{trigger: 'blur',required:true,validator:checkpass.bind(this)}]
      }
    }
  },
  methods:{
    ok(){
      this.$refs.form.validate(valid=>{
        if(valid)
          this.alert('注册成功')
        else
          return false
      })
    },
    cancel(){
      this.$refs.form.resetFields()
    }
  }
};
</script>
