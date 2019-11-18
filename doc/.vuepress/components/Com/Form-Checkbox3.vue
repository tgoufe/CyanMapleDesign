<template>
    <div class="form">
        <p>你选择了{{printList}}</p>
        <cmui-checkbox :label="item.text" v-for="item in checkList"  v-model="item.value"></cmui-checkbox>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox3",
  data(){
    return{
      checkList:[
        {text:'选项1',value:true},
        {text:'选项2',value:false},
        {text:'选项3',value:true},
      ]
    }
  },
  computed:{
    printList(){
      return this.checkList.filter(item=>item.value).map(item=>item.text)
    }
  }
};
</script>
