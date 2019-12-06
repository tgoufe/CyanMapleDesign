<template>
    <div >
        <cmui-form label-width="100px" :model="form" :rules="rules" ref="form">
            <cmui-form-item label="用户名" prop="name">
                <cmui-input v-model="form.name"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="密码" prop="password">
                <cmui-input v-model="form.password" type="password"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="性别">
                <cmui-select :data="form.sexData" v-model="form.sex"></cmui-select>
            </cmui-form-item>
            <cmui-form-item label="兴趣爱好" prop="interest">
                <cmui-checkbox-group v-model="form.interestValue">
                    <cmui-checkbox v-for="item in form.interest" :label="item"></cmui-checkbox>
                </cmui-checkbox-group>
            </cmui-form-item>
            <cmui-form-item label="来源">
                <cmui-radio label="互联网搜索" v-model="form.comeFrom"></cmui-radio>
                <cmui-radio label="熟人介绍" v-model="form.comeFrom"></cmui-radio>
            </cmui-form-item>
        </cmui-form>
        <div class="flex-container center">
            <button class="btn blue marginr20" @click="submitForm('ruleForm')">注册</button>
            <button class="btn reverse" @click="resetForm">重置</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "Form-Form5",
  data(){
    return {
      form:{
        name:'',
        password:'',
        sex:'',
        sexData:['男','女'],
        interest:['音乐', '电影', '球类运动', '游泳', '旅游'],
        interestValue:['音乐'],
        comeFrom:'朋友介绍'
      },
      rules:{
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        interest:[
          { required: true, type:'array',message:'请至少选择一项',trigger:'change' ,validator: (rule, value) =>value.filter(item=>item.value)},
        ]
      }
    }
  },
  methods:{
    submitForm(){
      this.$refs.form.validate(valid=>{
        console.log(valid)
      })
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
