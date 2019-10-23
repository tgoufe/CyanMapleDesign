<template>
    <VirtualList height="500px" :listData="data" :estimatedItemSize="100" v-slot="slotProps">
        <div class="virtual-list-item">
            <p><span style="color:red;">{{slotProps.item.id}}：</span>{{slotProps.item.value}}</p>
        </div>
    </VirtualList>
</template>
 
<script>

import faker from 'faker';
import VirtualList from '../../../src/maple/components/virtualList/main.vue';

let data = [];
for (let id = 0; id < 10000; id++) {
    data.push({
        id,
        value: faker.lorem.sentences() // 长文本
    })
}

export default {
    name:'VirtualListDemo',
    data(){
        return {
            data
        }
    },
    components:{
        VirtualList
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