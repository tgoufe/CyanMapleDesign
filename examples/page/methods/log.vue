<template>
    <div>
      <div class="btn block blue" @click="log">点击并查看控制台的log</div>
    </div>
</template>

<script>
import faker from 'faker';
export default {
  name: 'log',
  methods:{
    log(){
      maple.log(faker.lorem.sentences())
    }
  }
}
</script>

<style scoped>

</style>
