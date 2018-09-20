<template>
    <div class="swiper-slide overflow-h" :style="itemStyle">
        <slot></slot>
    </div>
</template>
<script>
import basemixin from '../mixin.js';
export default{
  mixins:[basemixin],
  data:function(){
    let parent=this.getParent('cmui-scroll');
    let itemStyle={};
    if(_.get(parent,'direction')==='v'&&_.get(parent,'col')==='auto'){
      itemStyle.height='auto';
    }
    return {
      itemStyle
    }
  }
}
</script>