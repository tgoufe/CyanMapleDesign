<template>
    <cmui-list-item
            class="cmui-list-group"
            :border="false"
    >
        <cmui-list :border="border">
            <div class="cmui-list-item-title">{{title}}</div>
            <slot></slot>
        </cmui-list>
    </cmui-list-item>
</template>
<script>
    import cmuiListItem from "@components/list-item/main.vue";
    import _ from 'lodash';
    import cmuiList from "@components/list/main.vue";
    export default{
        inject:['bus'],
        components:{
            cmuiListItem,
            cmuiList
        },
        props:{
            title:{type:String,default:''}
        },
        data:function(){
            let parent=this.bus.parent;
            return{
                border:parent.border
            }
        },
        created(){
            let parent=this.bus.parent;
            if(parent.index){
                parent.groupList.push({
                    title:this.title,
                    vm:this
                })
            }
        },
        destroyed(){
            let parent=this.bus.parent;
            if(parent.index){
                _.remove(parent.groupList,item=>item.vm===this);
            }
        }
    }
</script>
