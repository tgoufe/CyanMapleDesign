<template>
    <div>
        <span class="btn red radius" @click="copy()">
            点击这个按钮复制文本
        </span>
    </div>
</template>

<script>
export default {
  name: 'copy',
  methods: {
    copy() {
      maple.copy('你已经复制了文本')
      maple.alert('你已经复制了文本，找个地方粘贴看看')
    }
  }
}
</script>

<style scoped>

</style>
