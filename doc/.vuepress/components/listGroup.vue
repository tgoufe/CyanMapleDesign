<template>
    <cmui-list :index="true">
        <cmui-list-group v-for="item in data" :title="item" :key="item.id">
            <cmui-list-item v-for="inner in item.children" :title="inner.name" :key="inner.name">
                <span>this is {{inner.name}}</span>
            </cmui-list-item>
        </cmui-list-group>
    </cmui-list>
</template>
<script>
    export default {
        name: "listGroup",
        data(){
            return{
                data:_.times(10,index=>({
                    id:index,
                    children:_.times(10,key=>({
                        name:`${index}-${key}`
                    }))
                }))
            }
        }
    }
</script>
