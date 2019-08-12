<template>
  <div
  class="cmui-list"
  :style="[boxShadow]"
  :class="{'overflow-h':needOverHide}"
  >
    <div class="clearfix"  :style="containerStyle"><!-- -->
      <div class="fixed-right flex-container center cmui-list-index" style="z-index: 21" v-if="index">
        <div class="indexWarp flex-container-col scroll-container-y">
          <span v-for="(item,i) in groupList"
          v-text="indexFormat(item.title)"
          :class="{active:i===activeIndex}"
          @touchstart="indexEvent($event,i)"
          @touchmove.stop.prevent="scrollOnIndex($event)"
          ></span>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import baseMixin from '../mixin.js';
import {
  isNumber,
  inRange,
  isArray,
  every,
  get,
  isFunction,
  throttle
} from 'lodash';
export default {
  name: "cmui-list",
  mixins:[baseMixin],
  props: {
    col: { type: [Number, Array], default: 1 },
    space: { type: Number, default: 0 },
    border: { type: [Boolean, String], default: false },
    target: Object,
    index: { type: [Boolean, Function], default: false }
  },
  data: function() {
    let defaultBorderColor = "#eeeeee";
    let isColor = /^#[a-fA-F0-9]{6}$/.test(this.border);
    let borderColor = isColor ? this.border : defaultBorderColor;
    let needOverHide=false;//临时设置
    return {
      borderColor,
      groupList:[],
      activeIndex:0,
      indexItemHeight:0,
      startIndex:0,
      listEventStartY:0,
      needOverHide
    };
  },
  provide(){
    return {
      bus:{
        parent:this,
        children:[]
      }
    }
  },
  computed: {
    realSpace: function() {
      var value = parseInt(this.space);
      if (isNumber(value)) {
        if (inRange(value, -1, 51)) {
          return value / 75 || 0;
        }
      }
      return 0;
    },
    realCol() {
      var value = this.col;
      if (isNumber(value)) {
        if (inRange(value, 0, 11)) {
          return parseInt(value) || 1;
        } else {
          return 1;
        }
      } else if (isArray(value) && every(value, isNumber)) {
        return value.map(item => parseInt(item) || 1);
      } else {
        return parseInt(value) || 1;
      }
    },
    containerStyle() {
      return {
        margin:this.realSpace?("-" + this.realSpace/2 + "rem"):undefined
      };
    },
    boxShadow() {
      if (this.border && this.realSpace == 0) {
        return "0px 0px 0px 1px " + this.borderColor;
      }
      return;
    },
    noPaddingbFrom(){
        let itemLen=this.$slots.default.filter(item=>get(item,'componentOptions.tag')==='cmui-list-item').length;
        let col=isArray(this.realCol)?this.realCol.length:this.realCol
        return itemLen-(itemLen%col||col);
    }
  },
  methods:{
    indexFormat(value){
      if(isFunction(this.index)){
        return this.index(value)
      }
      return value.toString()[0];
    },
    scrollToGroup(i){
      this.preventScroll=true;
      this.groupList[i].vm.$el.scrollIntoView();
      this.activeIndex=i;
    },
    indexEvent(event,index){
      this.activeIndex=index;
      this.startIndex = index;
      this.listEventStartY = event.touches[0].clientY;
      this.indexItemHeight =this.indexItemHeight || $(event.target).outerHeight();
      this.scrollToGroup(index)
    },
    scrollOnIndex(e){
      let disY = e.touches[0].clientY - this.listEventStartY;
      let disCount = parseInt(disY / this.indexItemHeight);
      let activeIndex=this.startIndex + disCount;
      if(this.activeIndex!==activeIndex&&this.groupList[activeIndex]){
        this.scrollToGroup(activeIndex);
      }
    },
  },
  mounted(){
    let parentNode = this.$el;
    let baseNode = this.$el.firstChild;
    // this.needOverHide=parentNode.offsetLeft>this.space/2;
    if (!this.index) {
      return;
    }
    while (parentNode.clientHeight >= baseNode.clientHeight) {
      if (parentNode === document.body) {
        parentNode = document;
        break;
      }
      parentNode = parentNode.parentNode;
    }
    let _this=this;
    parentNode.addEventListener('scroll',throttle(function(){
      _this.activeIndex =
        _this.groupList.filter(
          item => item.vm.$el.getBoundingClientRect().top < 0
        ).length ;
    },500),{
      passive:true
    })
  }
};
</script>
