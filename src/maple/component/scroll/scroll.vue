<template>
    <div class="cmui-scroll overflow-h" ref="scroll">
        <div class="cmui-scroll__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data:function(){
      return {
        scroll:null
      }
    },
    props:{
      options:Object
    },
    mounted(){
      let _this=this;
      _this.scroll=new BScroll(this.$refs.scroll,this.options);
      let eventsList=[
        'beforeScrollStart',
        'scrollStart',
        'scroll',
        'scrollCancel',
        'scrollEnd',
        'touchEnd',
        'flick',
        'refresh',
        'destroy',
        'pullingDown',
        'pullingUp',
        'zoomStart',
        'zoomEnd']
      eventsList.forEach(item=>{
        _this.scroll.on(item,function(){
          _this.$emit(item,...arguments,this)
        })
      })
    }
}
</script>