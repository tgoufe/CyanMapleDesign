<template>
    <div >
        <cmui-form>
            <cmui-form-item label="用户名" label-width="100px">
                <cmui-input v-model="form.name"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="密码" label-width="100px">
                <cmui-input v-model="form.password" type="password"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="登陆条款" label-width="100px">
                <div class="flex-container right">
                    <cmui-checkbox v-model="item.value" v-for="item in form.tiaokuan" target-class="square">{{item.text}}</cmui-checkbox>
                </div>
            </cmui-form-item>
            <cmui-form-item label="保持登陆状态" class="flex-container right">
                <cmui-checkbox target-class="switch" v-model="form.saveState"></cmui-checkbox>
            </cmui-form-item>
            <div class="btn block radius blue" @click="check()">登陆</div>
        </cmui-form>
    </div>
</template>
<script>
export default {
  name: "Form-Form1",
  data(){
    return {
      form:{
        name:'',
        password:'',
        saveState:true,
        tiaokuan:[{text:'条款1',value:true},{text:'条款2',value:false}]
      }
    }
  },
  methods:{
    check(){
      if(!_.every(this.form.tiaokuan,item=>item.value)){
        this.alert('请同意所有霸王条款')
        return
      }
      if(!this.form.name || !this.form.password){
        this.alert('请输入用户名或密码')
        return
      }
      this.alert('登陆成功')
    }
  }
};
</script>
