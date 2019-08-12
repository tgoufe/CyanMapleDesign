<template>
  <div class="cmui-collapse-item">
    <div class="cmui-collapse-item__header flex-container" @click="itemClick"  :class="{active:isActive}">
      <div>
        <slot name="title">{{title}}</slot>
      </div>
      <i class="cmui-collapse-item__header__arrow baseIcon"
      :class="[isActive?'baseIcon-fold':'baseIcon-unfold']"
      ></i>
    </div>
    <collapse-transition>
      <div class="cmui-collapse-item__bodyWarp" v-show="isActive" :class="{active:isActive}">
        <div class="cmui-collapse-item__body">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
  import mixin from '../mixin.js';
  import CollapseTransition from './collapse-transition.js';
  import {findIndex} from 'lodash';
  export default {
    name: 'CMUICollapseItem',
    componentName: 'CMUICollapseItem',
    mixins: [mixin],
    components: {
      CollapseTransition
    },
    props: {
      title: String
    },
    data(){
      return {
        name:findIndex(this.$parent.$children,item=>item==this)
      }
    },
    computed: {
      isActive() {
        return this.$parent.activeNames.indexOf(this.name) > -1;
      }
    },
    methods: {
      itemClick() {
        this.dispatch('CMUICollapse', 'item-click', this);
      }
    }
  };
</script>