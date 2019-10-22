<template>
    <cmui-virtual-list height="500px" :listData="data" :estimatedItemSize="100" v-slot="slotProps">
        <div class="borderb padding10 fs-16">
            <p>{{slotProps.item.value}}</p>
        </div>
    </cmui-virtual-list>
</template>

<script>
import faker from 'faker';
export default {
    data(){
        let data = [];
        for (let id = 0; id < 1000; id++) {
            data.push({
                id,
                value: faker.lorem.sentences() // 长文本
            })
        }
        return {
            data
        }
    }
}
</script>
<style lang="stylus">

</style>