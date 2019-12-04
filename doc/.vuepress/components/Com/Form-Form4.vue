<template>
    <div >
        <cmui-form>
            <cmui-form-item label="红色加粗" target-class="text-red text-bolder">
                <cmui-input v-model="form.name"></cmui-input>
            </cmui-form-item>
        </cmui-form>
    </div>
</template>
<script>
export default {
  name: "Form-Form4",
  data(){
    return {
      form:{
        name:'',
      }
    }
  }
};
</script>
