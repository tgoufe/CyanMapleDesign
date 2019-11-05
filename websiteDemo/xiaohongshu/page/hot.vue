<template>
  <div class="padding20">
    <div class="list list-col2">
      <div class="list-item padding10" v-for="(item,index) in cube" :key="index">
        <div class="shadow radius">
          <img :src="item" alt="">
          <div class="padding20">
            <p>乐敦 Rohto</p>
            <p class="text-light fs-11 margint10">
              品牌·8174人在讨论
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cube } from '../data/img.json'
export default {
  name: 'hot',
  data () {
    return {
      cube
    }
  }
}
</script>
