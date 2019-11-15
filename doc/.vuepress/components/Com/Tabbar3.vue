<template>
<div>
    <cmui-tabbar @extra-click="extraEvent" @item-click="itemEvent" :watch="data">
        <cmui-tabbar-item v-for="item in data">
            <span class="btn blue light radius" slot="title">
                {{item.title}}
            </span>
            {{item.content}}
        </cmui-tabbar-item>
        <span slot="extra" class="btn red light radius marginr10">
            add
        </span>
        <span slot="extra" class="btn red light radius">
            remove
        </span>
    </cmui-tabbar>
</div>
</template>

<script>
export default {
  name: "Tabbar3",
  data(){
    return {
      data:Array.from({length:2},(item,index)=>{
        return{
          title:`index${index}`,
          content:'content'+index
        }
      })
    }
  },
  methods:{
    itemEvent(vm,item,now,pre){
      this.alert(`你点击了第${now}个nav,前一个活动节点是第${pre}个`)
    },
    extraEvent(vm,item,index){
      switch (index) {
        case 0:
          this.data.push({
            title:'index'+this.data.length,
            content:'content'+this.data.length
          })
          break;
        case 1:
          this.data.pop()
          break;
      }
    }
  }
};
</script>

<style scoped>

</style>
