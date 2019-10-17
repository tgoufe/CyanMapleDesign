<template>
    <div class="">
        <div v-for="(value,key) in data" class="flex-container paddingv20 borderb">
            <span>{{key}}</span>
            <span>{{value}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'device',
  data() {
    let keys = Object.keys(maple.device)
    let data = {}
    keys.forEach(key => data[key] = maple.device[key])
    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
