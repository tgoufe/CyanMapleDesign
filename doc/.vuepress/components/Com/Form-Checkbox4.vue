<template>
    <div class="form">
        <cmui-checkbox
                v-model="checkList"
                label="全选"
                path="value"
        ></cmui-checkbox>
        <br>
        <cmui-checkbox
                v-for="item in checkList"
                v-model="item.value"
                :label="item.text"
        ></cmui-checkbox>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox4",
  data(){
    return{
      checkList:[
        {text:'北京',value:true},
        {text:'上海',value:false},
        {text:'广州',value:true},
      ]
    }
  }
};
</script>
