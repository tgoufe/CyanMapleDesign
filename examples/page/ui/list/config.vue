<template>
    <div>
        <div class="example tag-container">
            <cmui-list v-bind="options">
                <cmui-list-item v-for="(item,key) in blackList" :key="key" class="bg-white">
                    <div class="ratio-container">
                        <div class="img-container flex-x">
                            <img :src="item">
                        </div>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div>
        <div class="tag-container config form">
            <cmui-checkbox
                    v-model="options.border"
                    target-class="switch"
                    :flex="true"
            >
                是否显示边框
            </cmui-checkbox>
            <cmui-number v-model="options.col" />
            <cmui-slidebar v-model="options.space" :step="1" class="margint20" :range="50" />
        </div>
    </div>
</template>
<script>
import img from '@assets/img.js'
export default {
  data: function() {
    return {
      options: {
        border: true,
        col: 5,
        space: 10
      },
      blackList: img.blackList
    }
  }
}
</script>
