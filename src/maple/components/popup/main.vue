<template>
  <transition name="cmui-popup">
    <div v-show="selfVisible" class="cmui-popup fixed-full">
      <!-- <transition name="fade"> -->
      <div class="cmui-popup__mask abs-full" @click="maskClick">
        <slot name="mask" />
      </div>
      <!-- </transition> -->
      <div
        class="cmui-popup__container abs-full flex-container"
        :class="[_position]"
      >
        <div
          class="cmui-popup__content"
          :style="[_contentStyle, targetStyle]"
          :class="[targetClass, { 'flex-container-col': useFlex }]"
        >
          <div class="cmui-popup__top">
            <slot name="top" />
          </div>
          <div ref="main" class="cmui-popup__main flex1 scroll-container-y">
            <slot />
          </div>
          <div class="cmui-popup__bottom">
            <slot name="bottom" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" type="text/scss" scoped>
.cmui-popup {
  z-index: 1000;
  .cmui-popup__mask {
    background-color: rgba(0, 0, 0, 0.4);
    &::before {
      display: block;
      width: 1px;
      height: 1px;
      margin-left: -10px;
      background-color: rgba(0, 0, 0, 0.1);
      content: ".";
    }
  }
  .cmui-popup__container {
    pointer-events: none;
  }
  .cmui-popup__content {
    max-width: 100%;
    max-height: 100%;
    pointer-events: auto;
  }
  .cmui-popup__top {
    width: 100%;
  }
  .cmui-popup__main {
    width: 100%;
  }
  .cmui-popup__bottom {
    width: 100%;
  }
}

/* animate */

.cmui-popup {
  transition-duration: 0.3s;
}
.cmui-popup-enter,
.cmui-popup-leave-to {
  .cmui-popup__mask {
    opacity: 0;
  }
  .cmui-popup__container {
    &.right {
      transform: translateX(100%);
    }
    &.top {
      transform: translateY(-100%);
    }
    &.bottom {
      transform: translateY(100%);
    }
    &.left {
      transform: translateX(-100%);
    }
  }
}
.cmui-popup-enter-active,
.cmui-popup-leave-active {
  .cmui-popup__mask {
    transition: opacity 0.4s;
  }
  .cmui-popup__container {
    transition: transform 0.4s;
  }
}
.cmui-popup-enter-active .cmui-popup__container.center {
  .cmui-popup__content {
    animation: dialog-zoom-in 0.4s;
  }
}
.cmui-popup-leave-active .cmui-popup__container.center {
  .cmui-popup__content {
    animation: dialog-zoom-out 0.4s;
  }
}

@keyframes dialog-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes dialog-zoom-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
<script type="text/javascript">
import { window } from '../../methods/ssr-window.js'
let scrollRec
export default {
  name: 'cmui-popup',
  props: {
    visible: { type: Boolean, default: false, intro: '弹层是否可见，需配合sync' },
    maskEvent: { type: Boolean, default: true, intro: '点击mask区域是否关闭弹层' },
    position: { type: String, default: 'right', intro: '弹出的方向，可以是top right bottom left center 中的任意一个或者多个' },
    targetStyle: { type: Object, default: null, intro: '弹层样式' },
    targetClass: { type: String, default: '', intro: '额外要加入的class用于修改样式' },
    stopPageScroll: { type: Boolean, default: true, intro: '是否阻止页面滚动' }
  },
  data: function() {
    let userAgent = window.navigator.userAgent
    let isIos = (userAgent.match(/iphone|ipad|ipad/ig) || '').length// device.os === 'ios'
    let ua = /OS\s(\d+)/.exec(userAgent)
    return {
      useFlex: !(ua && isIos && parseInt(ua[1] < 9))
    }
  },
  computed: {
    _position() {
      return this.position.match(/(top|right|left|bottom|center)\b/g)
    },
    _contentStyle() {
      let width, height
      let position = this._position.join(' ')
      switch (position) {
        case 'top':
          width = '100%'
          // height="60%";
          break
        case 'bottom':
          width = '100%'
          // height="60%";
          break
        case 'left':
          height = '100%'
          width = '80%'
          break
        case 'right':
          height = '100%'
          width = '80%'
          break
      }
      return { width, height }
    },
    selfVisible: {
      get() {
        if (this.stopPageScroll && typeof document !== 'undefined') {
          if (this.visible) {
            scrollRec = document.documentElement.scrollTop || document.body.scrollTop
            document.body.style.top = -scrollRec + 'px'
            document.body.classList.add('fixed-full')
          } else {
            document.body.style.removeProperty('top')
            document.body.classList.remove('fixed-full')
            document.documentElement.scrollTop = scrollRec
          }
        }
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
        // this.visible = value
        return value
      }
    }
  },
  mounted() {},
  methods: {
    maskClick() {
      if (this.maskEvent) {
        this.selfVisible = false
      }
    }
  }
}
</script>
