<template>
    <div>
        <span class="btn blue block" @click="screen()" v-text="text"></span>
    </div>
</template>

<script>
export default {
  name: 'fullScreen',
  data() {
    return {
      tag: true
    }
  },
  computed: {
    text() {
      return this.tag ? '进入全屏' : '退出全屏'
    }
  },
  methods: {
    screen() {
      maple.fullScreen(this.tag)
      this.tag = !this.tag
    }
  }
}
</script>

<style scoped>

</style>
