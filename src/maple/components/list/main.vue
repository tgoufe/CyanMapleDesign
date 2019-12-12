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
import { window } from '../../methods/ssr-window.js'
export default {
  name: 'cmui-list',
  mixins: [baseMixin],
  props: {
    col: { type: [Number, Array], default: 1, intro: '如果是数字代表列表的列数，如果数组，数组的长度表示列数，数组的每一项表示改该列所占的比例，如[1,2]表示两列，比例为1：2' },
    space: { type: Number, default: 0, intro: '每一列之间的间距' },
    border: { type: [Boolean, String], default: false, intro: '布尔类型表示每个item是否带有边框，如果space为0，则边框会自动重合，如果是string类型，表示边框的颜色值' },
    target: { type: Object, default: () => ({}), intro: '用于存放后续需要的暂存对象' },
    index: { type: [Boolean, Function], default: false, intro: '是否使用索引，可以和cmui-list-group联合使用' }
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
      listEventStartY: 0,
      useRem: !!/iphone|ipad|android|micromessenger/i.test(window.navigator.userAgent)
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
      let value = parseInt(this.space) / (this.useRem ? 150 : 2) || 0
      return value ? (value + (this.useRem ? 'rem' : 'px')) : 0
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
        margin: this.realSpace ? `-${this.realSpace}` : undefined
      }
    },
    boxShadow() {
      if (this.border && !this.realSpace) {
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
