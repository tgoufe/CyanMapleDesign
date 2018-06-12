<template>
    <div class="cmui-scroll overflow-h" ref="scroll">
        <div class="cmui-scroll__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data:function(){
      return {
        scroll:null
      }
    },
    props:{
      options:Object
    }
}
</script>