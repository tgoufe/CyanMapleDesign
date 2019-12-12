<template>
    <div class="music" style="padding:0;">
        <cmui-list :border="true" :index="true">
            <cmui-list-group v-for="(item,key) in listData" :key="key" :title="item.name">
                <cmui-list-item v-for="(inner,key2) in item.items" :key="key2">
                    <div class="flex-container padding16 bg-white">
                        <div class="img-container round marginr16" style="width:40px">
                            <img :src="inner.avatar" alt="">
                        </div>
                        <span class="flex1">{{ inner.name }}</span>
                    </div>
                </cmui-list-item>
            </cmui-list-group>
        </cmui-list>
    </div>

</template>
<script type="text/javascript">
import listData from './music.json'
export default {
  name: 'music',
  data: function() {
    return { listData }
  }
}
</script>
<style>
    .music .cmui-list-item-title{
        color:#666;
    }
</style>