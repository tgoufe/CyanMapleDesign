<template>
    <div >
        <div class="btn-group form marginb20">
            <cmui-radio name="position" label="left" v-model="labelPosition" target-class="btn"></cmui-radio>
            <cmui-radio name="position" label="top" v-model="labelPosition" target-class="btn"></cmui-radio>
            <cmui-radio name="position" label="right" v-model="labelPosition" target-class="btn"></cmui-radio>
        </div>
        <cmui-form :label-position="labelPosition">
            <cmui-form-item label="用户名" label-width="100px" class="marginb20">
                <cmui-input v-model="form.name"></cmui-input>
            </cmui-form-item>
            <cmui-form-item label="密码" label-width="100px" class="marginb20">
                <cmui-input v-model="form.password" type="password"></cmui-input>
            </cmui-form-item>
        </cmui-form>
    </div>
</template>
<script>
export default {
  name: "Form-Form3",
  data(){
    return {
      labelPosition:'left',
      form:{
        name:'',
        password:''
      }
    }
  }
};
</script>
