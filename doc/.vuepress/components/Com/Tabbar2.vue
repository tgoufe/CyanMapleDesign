<template>
    <div>
        <cmui-tabbar :col="3" :active-index="1">
            <cmui-tabbar-item v-for="item in data" :title="item.title">
                {{item.content}}
            </cmui-tabbar-item>
        </cmui-tabbar>
    </div>
</template>

<script>
export default {
  name: "Tabbar2",
  data(){
    return {
      data:Array.from({length:4},(item,index)=>{
        return{
          title:`index${index}`,
          content:'content'+index
        }
      })
    }
  }
};
</script>

