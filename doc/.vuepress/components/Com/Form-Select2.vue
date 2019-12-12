<template>
    <div >
        <p>你当前选择的值为：{{value}}</p>
        <cmui-select :data="data" v-model="value"></cmui-select>
    </div>
</template>
<script>
export default {
  name: "Form-Number2",
  data(){
    return {
      data:Array.from({length:5},(item,index)=>({text:'选项'+index,value:index})),
      value:3
    }
  }
};
</script>
