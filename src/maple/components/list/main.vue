<template>
  <div class="cmui-list" :style="[boxShadow]">
    <div class="clearfix" :style="containerStyle">
      <!-- -->
      <div
        v-if="index"
        class="fixed-right flex-container center cmui-list-index"
        style="z-index: 21"
      >
        <div class="indexWarp flex-container-col scroll-container-y">
          <span
            v-for="(item, i) in groupList"
            :key="i"
            :class="{ active: i === activeIndex }"
            @touchstart="indexEvent($event, i)"
            @touchmove.stop.prevent="scrollOnIndex($event)"
            v-text="indexFormat(item.title)"
          ></span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import baseMixin from '../mixin.js'
import _ from 'lodash'
export default {
  name: 'cmui-list',
  mixins: [baseMixin],
  props: {
    col: { type: [Number, Array], default: 1 },
    space: { type: Number, default: 0 },
    border: { type: [Boolean, String], default: false },
    target: { type: Object, default: () => ({}) },
    index: { type: [Boolean, Function], default: false }
  },
  data: function() {
    let defaultBorderColor = '#eeeeee'
    let isColor = /^#[a-fA-F0-9]{6}$/.test(this.border)
    let borderColor = isColor ? this.border : defaultBorderColor
    return {
      borderColor,
      groupList: [],
      activeIndex: 0,
      indexItemHeight: 0,
      startIndex: 0,
      listEventStartY: 0
    }
  },
  provide() {
    return {
      bus: {
        parent: this,
        children: []
      }
    }
  },
  computed: {
    realSpace: function() {
      var value = parseInt(this.space)
      if (_.isNumber(value)) {
        if (_.inRange(value, -1, 51)) {
          return value / 75 || 0
        }
      }
      return 0
    },
    realCol() {
      var value = this.col
      if (_.isNumber(value)) {
        if (_.inRange(value, 0, 11)) {
          return parseInt(value) || 1
        } else {
          return 1
        }
      } else if (_.isArray(value) && _.every(value, _.isNumber)) {
        return value.map(item => parseInt(item) || 1)
      } else {
        return parseInt(value) || 1
      }
    },
    containerStyle() {
      return {
        margin: this.realSpace ? '-' + this.realSpace / 2 + 'rem' : undefined
      }
    },
    boxShadow() {
      if (this.border && this.realSpace === 0) {
        return '0px 0px 0px 1px ' + this.borderColor
      }
      return ''
    },
    noPaddingbFrom() {
      let itemLen = this.$slots.default.filter(
        item => _.get(item, 'componentOptions.tag') === 'cmui-list-item'
      ).length
      let col = _.isArray(this.realCol) ? this.realCol.length : this.realCol
      return itemLen - (itemLen % col || col)
    }
  },
  mounted() {
    if (!this.index) {
      return
    }
    // let parentNode = this.$el
    // let baseNode = this.$el.firstChild
    // while (parentNode.clientHeight >= baseNode.clientHeight) {
    //   if (parentNode === document.body) {
    //     parentNode = document
    //     break
    //   }
    //   parentNode = parentNode.parentNode
    // }
    let _this = this
    document.addEventListener(
      'scroll',
      _.throttle(function() {
        _this.activeIndex = _this.groupList.filter(
          item => item.vm.$el.getBoundingClientRect().top < 0
        ).length
      }, 500),
      {
        passive: true
      }
    )
  },
  methods: {
    indexFormat(value) {
      if (_.isFunction(this.index)) {
        return this.index(value)
      }
      return value.toString()[0]
    },
    scrollToGroup(i) {
      this.preventScroll = true
      this.groupList[i].vm.$el.scrollIntoView()
      this.activeIndex = i
    },
    indexEvent(event, index) {
      this.activeIndex = index
      this.startIndex = index
      this.listEventStartY = event.touches[0].clientY
      function outHeight(dom) {
        let propObj = window.getComputedStyle(dom)
        return [
          'marginTop',
          'marginBottom',
          'borderTopWidth',
          'borderBottomWidth',
          'height'
        ].reduce((rs, prop) => {
          return (rs += parseInt(propObj[prop]))
        }, 0)
      }
      this.indexItemHeight = this.indexItemHeight || outHeight(event.target)
      this.scrollToGroup(index)
    },
    scrollOnIndex(e) {
      let disY = e.touches[0].clientY - this.listEventStartY
      let disCount = parseInt(disY / this.indexItemHeight)
      let activeIndex = this.startIndex + disCount
      if (this.activeIndex !== activeIndex && this.groupList[activeIndex]) {
        this.scrollToGroup(activeIndex)
      }
    }
  }
}
</script>
