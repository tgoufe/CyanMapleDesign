<template>
    <cmui-virtual-list height="500px" :listData="data" :estimatedItemSize="100" v-slot="slotProps">
        <div class="virtual-list-item">
            <p><span style="color:red;">{{slotProps.item.id}}：</span>{{slotProps.item.value}}</p>
        </div>
    </cmui-virtual-list>
</template>
 
<script>

// import faker from 'faker';
// import VirtualList from '../../../src/maple/components/virtualList/main.vue';

let data = [];
for (let id = 0; id < 10000; id++) {
    data.push({
        id,
        value: 123 // 长文本
    })
}

export default {
    data(){
        return {
            data
        }
    },
    components:{
        // VirtualListVirtualList
    }
    
}
</script>

<style scoped>
.virtual-list-item{
    border-bottom: 1px solid #999;
    box-sizing: border-box;
    font-size: 16px;
}
</style>