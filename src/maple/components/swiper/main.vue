<template>
    <div ref="swiper"
    class="cmui-swiper pos-r"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    >
        <div class="cmui-swiper__content pos-r" :style="transDis">
            <slot>
            </slot>
            <slot name="right"></slot>
        </div>
        <div ref="left" class="cmui-swiper__left abs-left flex-container">
            <div v-for="(item,index) in left" :key="index" class="cmui-swiper__control flex-container center" :style="transDis" @click="controlHandle('left',index,item)" v-text="item"></div>
        </div>
        <div ref="right" class="cmui-swiper__right abs-right flex-container">
            <div v-for="(item,index) in right" :key="index" class="cmui-swiper__control flex-container center" :style="transDis" @click="controlHandle('right',index,item)" v-text="item"></div>
        </div>
    </div>
</template>
<style lang="scss">
.cmui-swiper {
  transform-style: preserve-3d;
  overflow: hidden;
  &.translating {
    .cmui-swiper__content,
    .cmui-swiper__control {
      transition: 300ms;
    }
  }
}
.cmui-swiper__control {
  height: 100%;
  padding: 20px;
}
.cmui-swiper__right {
  transform: translateX(100%);
}
.cmui-swiper__left {
  transform: translateX(-100%);
}
.cmui-swiper__left{
    .cmui-swiper__control{
        &:nth-child(1){
            background-color: #857e7f;
        }
        &:nth-child(2){
            background-color: #ff9827;
        }
        &:nth-child(3){
            background-color: #fffe43;
        }
    }
}
.cmui-swiper__right{
    .cmui-swiper__control{
        &:nth-last-child(1){
            background-color: #ff3a3c;
        }
        &:nth-last-child(2){
            background-color: #ff9827;
        }
        &:nth-last-child(3){
            background-color: #fffe43;
        }
    }
}
</style>
<script>
import { ready } from '../../methods/dom'
import _ from 'lodash'
const touchesStart = {}
let isTouched
let isScrolling
let openedList = []
ready(function() {
  window.addEventListener('scroll', () => {
    openedList.forEach(item => item.close())
  })
})
export default {
  name: 'cmui-swiper',
  props: {
    right: {
      type: Array,
      default: () => []
    },
    left: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      leftDis: 0,
      rightDis: 0,
      handleData: {
        currentTrans: 0,
        dis: 0
      },
      transDis: { transform: 'translate3d(0px, 0px, 0px)' },
      hasOpened: false
    }
  },
  watch: {
    right: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.rightDis = this.$refs.right.getBoundingClientRect().width
        })
      }
    },
    left: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.leftDis = this.$refs.left.getBoundingClientRect().width
        })
      }
    }
  },
  methods: {
    handleTouchStart(e) {
      _.forEach(openedList, item => (item !== this) && item.close())
      touchesStart.x =
        e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX
      touchesStart.y =
        e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY
      isTouched = true
      isScrolling = undefined
    },
    handleTouchMove(e) {
      if (!isTouched) return
      const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY
      const disX = pageX - touchesStart.x
      const disY = pageY - touchesStart.y
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(disX) < Math.abs(disY))
      }
      if (isScrolling) {
        isTouched = false
        return
      }
      e.preventDefault()
      let dis = disX + this.handleData.currentTrans
      if (dis > 0) {
        dis = Math.min(Math.abs(dis), this.leftDis)
      }
      if (dis < 0) {
        dis = Math.min(Math.abs(dis), this.rightDis) * -1
      }
      this.transDis.transform = `translate3d(${dis}px, 0px, 0px)`
      this.handleData.dis = dis
    },
    handleTouchEnd() {
      this.$el.classList.add('translating')
      let dis = this.handleData.dis
      if (dis > 0 && dis > this.leftDis / 2) {
        dis = this.leftDis
      } else if (dis < 0 && Math.abs(dis) > this.rightDis / 2) {
        dis = this.rightDis * -1
      } else {
        dis = 0
      }
      this.handleData.dis = this.handleData.currentTrans = dis
      if (dis && !this.hasOpened) {
        openedList.push(this)
        this.hasOpened = true
      }
      this.transDis.transform = `translate3d(${dis}px, 0px, 0px)`
      _.delay(() => {
        this.$el.classList.remove('translating')
      }, 300)
    },
    controlHandle(pos, index, text) {
      this.$emit('swiper', { pos, index, text, vm: this })
    },
    close(callback = function() {}) {
      this.hasOpened = false
      this.handleData.currentTrans = 0
      this.handleData.dis = 0
      this.$el.classList.add('translating')
      this.transDis.transform = `translate3d(0px, 0px, 0px)`
      _.delay(() => {
        this.$el.classList.remove('translating')
        callback()
      }, 300)
      _.remove(openedList, item => item === this)
    }
  }
}
</script>
