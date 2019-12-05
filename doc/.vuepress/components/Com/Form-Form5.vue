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
                <cmui-checkbox v-for="item in form.interest" :label="item.text" v-model="item.value"></cmui-checkbox>
            </cmui-form-item>
            <cmui-form-item label="来源">
                <cmui-radio v-for="item in form.comeFromData" :label="item" name="comefrom" v-model="form.comeFrom"></cmui-radio>
            </cmui-form-item>



            <cmui-checkbox-group :max="3" v-model="form.interestValue">
                <cmui-checkbox v-for="item in form.interest" :label="item.text"></cmui-checkbox>
            </cmui-checkbox-group>

            <p>{{form.interestValue}}</p>

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
        interest:[
          {text:'音乐',value:false},
          {text:'电影',value:false},
          {text:'球类运动',value:false},
          {text:'游泳',value:false},
          {text:'旅游',value:false}
        ],
        interestValue:['音乐'],
        comeFrom:'朋友介绍',
        comeFromData:['朋友介绍','自行搜索']
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
