<template>
    <cmui-virtual-list height="500px" :bufferScale="3" :listData="data" :estimatedItemSize="30" v-slot="slotProps">
        <div class="virtual-list-item">
            <p><span style="color:red;">{{slotProps.item.id}}：</span>{{slotProps.item.value}}</p>
        </div>
    </cmui-virtual-list>
</template>
 
<script>

let data = [];
for (let id = 0; id < 10000; id++) {
    data.push({
        id,
        value: Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2) // 长文本
    })
}

export default {
    data(){
        return {
            data
        }
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