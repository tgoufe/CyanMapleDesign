<template>
  <div class="cmui-collapse-item">
    <div
      class="cmui-collapse-item__header flex-container"
      :class="{ active: isActive }"
      @click="itemClick"
    >
      <div>
        <slot name="title">
{{ title }}
</slot>
      </div>
      <i
        class="cmui-collapse-item__header__arrow baseIcon"
        :class="[isActive ? 'baseIcon-fold' : 'baseIcon-unfold']"
      />
    </div>
    <collapse-transition>
      <div
        v-show="isActive"
        class="cmui-collapse-item__bodyWarp"
        :class="{ active: isActive }"
      >
        <div class="cmui-collapse-item__body">
          <slot />
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import mixin from '../mixin.js'
import CollapseTransition from './collapse-transition.js'
import _ from 'lodash'
export default {
  name: 'cmui-collapse-item',
  componentName: 'CMUICollapseItem',
  components: {
    CollapseTransition
  },
  mixins: [mixin],
  props: {
    title: { type: String, default: '', intro: '标题文本' }
  },
  data() {
    return {
      name: _.findIndex(this.$parent.$children, item => item === this)
    }
  },
  computed: {
    isActive() {
      return this.$parent.activeNames.indexOf(this.name) > -1
    }
  },
  methods: {
    itemClick() {
      this.dispatch('CMUICollapse', 'item-click', this)
    }
  }
}
</script>
