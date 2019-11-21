<template>
    <div >
        <p>下面的案例在移动端下预览效果更佳</p>
        <cmui-select :data="data" v-model="value" :picker="true"></cmui-select>
    </div>
</template>
<script>
export default {
  name: "Form-Number4",
  data(){
    return {
      data:Array.from({length:5},(item,index)=>index),
      value:3
    }
  }
};
</script>
