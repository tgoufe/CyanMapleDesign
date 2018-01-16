<template>
  <div class="cmui-collapse-item">
    <div class="cmui-collapse-item__header flex-container" @click="itemClick">
      <slot name="title">{{title}}</slot>
      <i class="cmui-collapse-item__header__arrow baseIcon baseIcon-roundcheckfill"></i>
    </div>
    <collapse-transition>
      <div class="cmui-collapse-item__bodyWarp" v-show="isActive">
        <div class="cmui-collapse-item__body">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<style>
  .cmui-collapse-item__body,.cmui-collapse-item__header{
    padding:0.26666667rem;
    border: 1px solid #dfe6ec;
    margin-bottom: -1px;
  }
  .cmui-collapse-item__bodyWarp{
    will-change: height;
    overflow: hidden;
  }
  .collapse-transition {
      transition: height .3s ease-in-out;
  }
</style>
<script>
  import mixin from '../mixin.js';
  import CollapseTransition from './collapse-transition.js';
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
        name:_.findIndex(this.$parent.$children,item=>item==this)
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