<template>
<div class="cmui-list-item"
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
        width:100%;
    }
    .cmui-list-item-title{
        position: -webkit-sticky;
        position: sticky;
        top:0px;
        z-index: 20;
    }
</style>
<script>
import baseMixin from '../mixin.js';
export default {
    name:'cmui-list-item',
    mixins:[baseMixin],
    props:{
        title:{type:String,default:''},
        bgcolor:{type:String,default:''},
        border:{type:Boolean,default:true}
    },
    data:function(){
        return {
            position:{}
        }
    },
    computed:{
        itemList(){
            return this.$parent.$children.filter(item=>item.$options._componentTag==="cmui-list-item");
        },
        itemContainerStyle(){
            let parent=this.getParent('cmui-list')
            ,   border
            ,   boxShadow
            ;
            if(this.border&&parent.border&&parent.realSpace!==0){
              boxShadow='0px 0px 0px 1px '+parent.borderColor;
            }
            return {
              border,
              boxShadow,
            }
        }
    },
    methods:{
        itemStyle(){
            let width
            ,   parent=this.getParent('cmui-list')
            ,   col=parent.realCol
            ,   colCount=(_.isArray(col)?col.length:col)||1
            ,   index=_.findIndex(this.itemList,this)
            ,   clear=index%colCount===0?'left':undefined
            ,   nopaddingBFrom=parent.noPaddingbFrom
            ,   paddingRight
            ,   paddingLeft
            ,   paddingBottom
            ,   boxShadow=parent.boxShadow
            ,   backgroundColor
            ;
            if(parent.realSpace){
                // TODO 动态修改内部数量的时候会判断错误需要增加watch感觉使用起来可能会麻烦，暂时去掉
                // if(index<nopaddingBFrom){
                    paddingBottom=parent.realSpace+'rem';
                // }
                paddingRight=parent.realSpace+'rem';
            }
            if(_.isNumber(col)&&col!==1){
                width=100/col+'%';
            }else if(_.isArray(col)){
                let total=col.reduce((pre,next)=>pre+next);
                width=100*col[index%col.length]/total+'%';
            }
            if(this.bgcolor){
              backgroundColor=this.bgcolor;
            }
            return{width,clear,paddingRight,paddingLeft,paddingBottom,boxShadow,backgroundColor}
        }
    }
};

</script>
