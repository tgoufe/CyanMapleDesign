<template>
  <div class="tag-container example themeAlert padding15">
    <span class="btn block" @click="simple()">
      默认
    </span>
    <span class="btn block" @click="title()">
        带有标题栏
    </span>
    <span class="btn block" @click="noCancel()">
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
<style lang="scss">
  .themeAlert{
    span{
      margin-bottom:5px;
      padding:10px 15px;
      &.btn:nth-of-type(odd){
        background: #003E3E !important;
      }
      &.btn:nth-of-type(even){
        background: #007c7c !important;
      }
    }
  }
</style>
