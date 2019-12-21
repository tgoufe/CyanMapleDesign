<template>
    <div>
        <div class="bg-blue ratio-container">
            <div class="flex-container center">
                占位空间
            </div>
        </div>
        <cmui-tabbar :screen="true" position="left">
            <cmui-tabbar-item v-for="item in data" :title="item.title">
                <div class="list border">
                    <div class="list-item padding20" v-for="i in item.content">
                        {{i}}
                    </div>
                </div>
            </cmui-tabbar-item>
        </cmui-tabbar>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "v",
  data:()=>({
    data:_.times(10,index=>({
      title:'分类'+['一','二','三','四','五','六','七','八', '九','十'][index],
      content:_.times(10,k=>`分类${index+1}.${k}`)
    }))
  })
};
</script>
