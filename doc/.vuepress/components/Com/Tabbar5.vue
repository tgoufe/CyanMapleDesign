<template>
<div>
    <cmui-tabbar position="bottom">
        <cmui-tabbar-item v-for="item in data" :title="item.title">
            {{item.content}}
        </cmui-tabbar-item>
    </cmui-tabbar>
</div>
</template>

<script>
export default {
  name: "Tabbar5",
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
