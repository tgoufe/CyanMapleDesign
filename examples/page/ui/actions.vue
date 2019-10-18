<template>
    <div>
        <span class="btn blue block radius" @click="simple()">
            默认
        </span>
        <span class="btn blue block radius" @click="title()">
            带有标题栏
        </span>
        <span class="btn blue block radius" @click="noCancel()">
            隐藏取消按钮
        </span>
    </div>
</template>
<script type="text/javascript">
import _ from 'lodash'
export default {
  name: 'actions',
  methods: {
    simple() {
      this.actions(
        ['拍照', '从相册选择'],
        item => this.alert(`你点击了${item}`)
      )
    },
    title() {
      this.actions({
        items: _.times(10, index => `测试文本${index}`),
        title: '这里是标题'
      }, data => {
        this.alert(data)
      })
    },
    noCancel() {
      this.actions('拍照', '从相册选择', { cancelText: '' })
    }
  }
}
</script>
