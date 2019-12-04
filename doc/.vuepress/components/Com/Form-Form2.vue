<template>
    <div >
        <cmui-form class="flex-container" item-space="0">
            <cmui-form-item label="用户名">
                <cmui-input v-model="form.name"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="密码" class="left">
                <cmui-input v-model="form.password" type="password"></cmui-input>
            </cmui-form-item>
            <div class="btn block radius blue">登陆</div>
        </cmui-form>
    </div>
</template>
<script>
export default {
  name: "Form-Form2",
  data(){
    return {
      form:{
        name:'',
        password:''
      }
    }
  }
};
</script>
