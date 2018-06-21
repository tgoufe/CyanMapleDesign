<template>
    <a href="###" class="btn block radius reverse" @click="showPicker('baseData')">base picker</a>
    <cmui-picker :visible.sync="visible"></cmui-picker>
</template>
<script>
    export default{
      data:function(){
        let baseData;
        let visible=false;
        return {baseData,visible}
      },
      methods:{
        showPicker(name){
          
        }
      }
    }
</script>