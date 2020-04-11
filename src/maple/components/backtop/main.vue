<template>
  <transition name="cmui-fade-in">
    <div
      v-if="visible"
      :style="{
        right: styleRight,
        bottom: styleBottom
      }"
      class="cmui-backtop flex-container center fs-20 pos-f bg-white"
      @click.stop="handleClick"
    >
      <slot>
        <i class="baseIcon baseIcon-fold"></i>
      </slot>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash'

const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default {
  name: 'cmui-backtop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  data() {
    return {
      el: null,
      container: null,
      visible: false
    }
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`
    },
    styleRight() {
      return `${this.right}px`
    }
  },

  mounted() {
    this.init()
    this.throttledScrollHandler = _.throttle(this.onScroll, 300)
    this.container.addEventListener('scroll', this.throttledScrollHandler)
  },

  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler)
  },

  methods: {
    init() {
      this.container = document
      this.el = document.documentElement
      if (this.target) {
        this.el = document.querySelector(this.target)
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`)
        }
        this.container = this.el
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop
      this.visible = scrollTop >= this.visibilityHeight
    },
    handleClick(e) {
      this.scrollToTop()
      this.$emit('click', e)
    },
    scrollToTop(targetValue = 0) {
      const el = this.el
      const beginTime = Date.now()
      const beginValue = el.scrollTop
      const rAF =
        window.requestAnimationFrame || (func => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          el.scrollTop =
            (beginValue - targetValue) * (1 - easeInOutCubic(progress)) +
            targetValue
          rAF(frameFunc)
        } else {
          el.scrollTop = targetValue
        }
      }
      rAF(frameFunc)
    }
  }
}
</script>
<style lang="scss" scoped>
.cmui-fade-in-linear-enter-active,
.cmui-fade-in-linear-leave-active {
  transition: opacity 200ms linear;
}
.cmui-fade-in-linear-enter,
.cmui-fade-in-linear-leave,
.cmui-fade-in-linear-leave-active {
  opacity: 0;
}

.cmui-fade-in-enter-active,
.cmui-fade-in-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.cmui-fade-in-enter,
.cmui-fade-in-leave-active {
  opacity: 0;
}
.cmui-backtop {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #678c12;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
}
</style>
