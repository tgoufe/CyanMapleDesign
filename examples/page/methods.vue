<template>
    <div class="list">
        <div v-for="item in list" :key="item.name" class="list-item">
            <router-link :to="item.path" class="padding30 flex-container text-dark">
                <span>{{ item.name }}</span>
                <i class="baseIcon baseIcon-right" />
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'methods',
  data() {
    return {
      list: [
        { name: 'copy', path: 'methods/copy' },
        { name: 'device', path: 'methods/device' },
        { name: 'fullScreen', path: 'methods/fullScreen' },
        { name: 'log', path: 'methods/log' },
        { name: 'shake', path: 'methods/shake' },
        { name: 'time', path: 'methods/time' },
        { name: 'url', path: 'methods/url' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
