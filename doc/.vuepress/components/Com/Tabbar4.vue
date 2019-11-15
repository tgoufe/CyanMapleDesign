<template>
<div>
    <cmui-tabbar :nav="[true,true]">
        <cmui-tabbar-item v-for="item in data" :title="item.title">
            {{item.content}}
        </cmui-tabbar-item>
    </cmui-tabbar>
</div>
</template>

<script>
export default {
  name: "Tabbar4",
  data(){
    return {
      data:Array.from({length:3},(item,index)=>{
        return{
          title:`index${index}`,
          content:'content'+index
        }
      })
    }
  },
  methods:{
  }
};
</script>

<style scoped>

</style>
