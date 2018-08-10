<template>
    <div class="swiper-slide overflow-h" :style="itemStyle">
        <slot></slot>
    </div>
</template>
<script>
    export default{
      data:function(){
        // function getparent(obj){
        //   if(!obj){
        //     return
        //   }
        //   let parent=_.get(obj,'$parent');
        //   if(_.get(parent,'$options._componentTag')==='cmui-scroll'){
        //     return parent;
        //   }else{
        //     return getparent(parent)
        //   }
        // }
        // let parent=getparent(this);
        let parent=this.$parent;
        while(_.get(parent,'$options._componentTag')!=='cmui-scroll'){
          if(!parent){
            parent=null;
            break;
          }
          parent=parent.$parent;
        }
        let itemStyle={};
        if(_.get(parent,'direction')==='v'&&_.get(parent,'col')==='auto'){
          itemStyle.height='auto';
        }
        return {
          itemStyle
        }
      },
      methods:{

      }
    }
</script>