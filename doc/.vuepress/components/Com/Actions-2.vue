<template>
  <div>
    <span class="btn blue" @click="actionsVisible = true">组件调用</span>
    <cmui-actions 
        :visible.sync="actionsVisible"
        :items="items"
        @select="selectFn"
        @cancel="cancelFn"
        cancelText="cancel"
        :cancelStyle="{color:'blue'}"
        :itemStyle="{color:'red'}"
        :activeIndex="2"
        title="this is a title"
    />
  </div>
</template>

<script>
export default{
  name: "Actions-2",
    data:function(){
        return{
            actionsVisible:false,
            items:[1,2,3]
        }
    },
    methods:{
        select(item,index){},
        cancel(){},
        selectFn(){},
        cancelFn(){}
    }
}
</script>