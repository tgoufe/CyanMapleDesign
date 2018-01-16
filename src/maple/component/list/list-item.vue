<template>
<div class="cmui-list-item" v-bind:style="itemStyle()">
    <div class="cmui-list-item-container" :style="itemContainerStyle">
        <slot></slot>
    </div>
</div>
</template>
<style>
    .cmui-list-item{
        float: left;
        position: relative;
        min-height: 1px;
    }
</style>
<script>
export default {
    name:'cmui-list-item',
    data:function(){
        var itemContainerStyle
        ,   parent=this.$parent
        ,   border
        ;
        if(parent.border&&parent.realSpace!=0){
            border='1px solid '+parent.borderColor
        }
        return {
            itemContainerStyle:{border}
        }
    },
    computed:{
        itemList(){
            return this.$parent.$children.filter(item=>item.$options._componentTag=="cmui-list-item");
        }
    },
    methods:{
        itemStyle(){
            var width
            ,   clear
            ,   col=this.$parent.realCol
            ,   colCount=_.isNumber(col)?col:col.length
            ,   index=_.findIndex(this.itemList,this)
            ,   paddingRight=this.$parent.realSpace+'rem'
            ,   paddingBottom=this.$parent.realSpace+'rem'
            ,   boxShadow=this.$parent.boxShadow
            ;
            if(_.isNumber(col)){
                width=100/col+'%';
                clear=index%col===0?'left':undefined;
            }else if(_.isArray(col)){
                var total=col.reduce((pre,next)=>pre+next);
                width=100*col[index%col.length]/total+'%';
                clear=index%col.length===0?'left':undefined;
            }
            return{width,clear,paddingRight,paddingBottom,boxShadow}
        }
    }
};

</script>
