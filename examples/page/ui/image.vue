<template>
  <div>
    <div style="height:100vh" class="padding20">
      滚动页面查看下方图片的延时加载，点击图片查看图片预览效果
    </div>
    <cmui-img
            :src="item"
            v-for="(item,index) in img.blackList"
            :lazy-load="true"
            style="height:300px"
            :pre-view="true"
            :pre-view-list="img.blackList"
            :pre-view-index="index"
            lazy-src="http://iph.href.lu/375x300?text=%E5%9B%BE%E7%89%87%E5%8D%A0%E4%BD%8D">
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
