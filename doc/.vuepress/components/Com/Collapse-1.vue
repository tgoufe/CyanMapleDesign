<template>
  <cmui-collapse  :activeIndex="activeIndex">
        <cmui-collapse-item :key="key" v-for="(item,key) in items">
            <div slot="title">
                {{item.title}}
            </div>
            <div>
                {{item.content}}
            </div>
        </cmui-collapse-item>
    </cmui-collapse>
</template>

<script>

export default {
    name:'Collapse-1',
    data(){
        return{
            items:Array.from({length:3}).map((item,index)=>{
                return{
                    title:"section",
                    content:"这里是内容"
                }
            }),
            activeIndex:3,
        }
    }
}
</script>