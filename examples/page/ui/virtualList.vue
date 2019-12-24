<template>
  <div>
    <p class="text-bolder fs-16 padding20">下面的案例展示了一个渲染一万条数据的列表</p>
    <cmui-virtual-list height="calc(100vh - 90px)" :listData="data" :estimatedItemSize="100" v-slot="slotProps">
        <div class="borderb padding20 fs-16">
            <p><span class="text-red text-bolder">{{slotProps.item.id}}:</span>{{slotProps.item.value}}</p>
        </div>
    </cmui-virtual-list>
  </div>

</template>

<script>
import faker from 'faker';
export default {
    data(){
        let data = [];
        for (let id = 0; id < 10000; id++) {
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
