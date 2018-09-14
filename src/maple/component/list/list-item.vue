<template>
<div class="cmui-list-item bg-white"
     v-bind:style="itemStyle()"
     ref="listItem"
>
    <div class="cmui-list-item-title" v-if="$slots.title||title">
        <slot name="title"></slot>
        <template v-if="!$slots.title">{{title}}</template>
    </div>
    <div class="cmui-list-item-container" :style="itemContainerStyle">
        <slot></slot>
    </div>
</div>
</template>
<style lang="scss">
    .cmui-list-item{
        float: left;
        position: relative;
        min-height: 1px;
    }
    .cmui-list-item-title{
        position: -webkit-sticky;
        position: sticky;
        top:0px;
        z-index: 20;
    }
</style>
<script>
export default {
    name:'cmui-list-item',
    props:{
        title:{type:String,default:''},
        bgcolor:{type:String,default:''}
    },
    data:function(){

        let parent=this.$parent
        ,   border
        ,   boxShadow
        ;
        if(parent.border&&parent.realSpace!==0){
            // border='1px solid '+parent.borderColor;
          boxShadow='0px 0px 0px 1px '+parent.borderColor
        }
        return {
            itemContainerStyle:{
              border,
              boxShadow,
            },
            position:{}
        }
    },
    computed:{
        itemList(){
            return this.$parent.$children.filter(item=>item.$options._componentTag==="cmui-list-item");
        }
    },
    methods:{
        itemStyle(){
            let width
            ,   clear
            ,   col=this.$parent.realCol
            ,   index=_.findIndex(this.itemList,this)
            ,   paddingRight=this.$parent.realSpace+'rem'
            ,   paddingBottom=this.$parent.realSpace+'rem'
            ,   boxShadow=this.$parent.boxShadow
            ,   backgroundColor
            ;
            if(_.isNumber(col)){
                width=100/col+'%';
                clear=index%col===0?'left':undefined;
            }else if(_.isArray(col)){
                let total=col.reduce((pre,next)=>pre+next);
                width=100*col[index%col.length]/total+'%';
                clear=index%col.length===0?'left':undefined;
            }
            if(this.bgcolor){
              backgroundColor=this.bgcolor;
            }
            return{width,clear,paddingRight,paddingBottom,boxShadow,backgroundColor}
        }
    }
};

</script>
