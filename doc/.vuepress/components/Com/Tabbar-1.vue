<template>
    <div>
        <cmui-tabbar>
            <cmui-tabbar-item title="Exp" v-for="(item,index) in data" :title="item.title">
                content{{index}}
            </cmui-tabbar-item>
        </cmui-tabbar>
    </div>
</template>

<script>
export default {
  name: "Tabbar-1",
  data(){
    return {
      data:Array.from({length:4},(item,index)=>{
        return{
          title:`index${index}`,
          content:`content ${index}`
        }
      })
    }
  }
};
</script>

