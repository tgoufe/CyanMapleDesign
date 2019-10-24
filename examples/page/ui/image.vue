<template>
  <div>
    <div style="height:100vh"></div>
    <cmui-img :src="item" v-for="item in img.blackList" :lazy-load="true" style="height:300px" :pre-view="true">

    </cmui-img>
  </div>
</template>
<script>
import img from '@assets/img.js'
export default {
  name:'image',
  data: function() {
    return {
		  img
    }
  }
}
</script>