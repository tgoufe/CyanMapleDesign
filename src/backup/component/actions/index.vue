<template>
    <cmui-popup position="bottom" :visible.sync="visible" :target-style="{height:'auto'}" class="cmui-actions" target-class="cmui-actions__container">
    	<div class="cmui-actions__title" v-html="title" v-if="title" slot="top">
    	</div>
        <div class="cmui-actions__group">
            <div class="cmui-actions__button" :class="{active:activeIndex===index}" v-for="(item,index) in items" v-html="getActionText(item,index)" @click="itemEvent(item,index)" :style="getActionStyle(item.style,itemStyle)"></div>
        </div>
        <div class="cmui-actions__cancel" slot="bottom" v-if="cancelText">
            <div class="cmui-actions__button" v-html="cancelText" :style="cancelStyle" @click="cancel"></div>
        </div>
    </cmui-popup>
</template>
<script>
import cmuiPopup from '../popup/popup.vue';
import {isFunction,isObject,defaults} from 'lodash';
export default {
    props: {
        items: { type: Array, default: [] },
        cancelText: { type: Array, default: '取消' },
        cancelFn: { type: Function, default: null },
        cancelStyle: { type: Object, default: null },
        itemStyle: { type: Object, default: null },
        selectFn: { type: Function, default: null },
        activeIndex: { type: Number, default: -1 },
        title:{type:String,default:''},
        visible:{type:Boolean,default:false}
    },
    compontents: {
        cmuiPopup
    },
    watch:{
    	visible(value){
    		this.$emit('update:visible',value);
    	}
    },
    methods: {
        cancel: function() {
            this.visible=false;
            this.$emit('cancel', this);
            isFunction(this.cancelFn) && this.cancelFn()
        },
        itemEvent: function(item, index) {
            this.visible=false;
            this.$emit('select', item, index, this);
            isFunction(this.selectFn) && this.selectFn(item, index);
        },
        getActionText(value, index) {
            if (isFunction(value)) {
                return this.getActionText(value());
            } else if (isObject(value)) {
                value.text = value.text || index;
                return String(value.text);
            } else {
                return String(value);
            }
        },
        getActionStyle(itemStyle,baseStyle){
        	return defaults(itemStyle,baseStyle)
        }
    }
}
</script>