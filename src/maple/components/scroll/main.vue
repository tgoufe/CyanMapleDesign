<template>
  <div
    ref="scroll"
    class="cmui-scroll swiper-container"
  >
    <div
      v-if="pullEvent"
      ref="pullStart"
      class="abs-top flex-container hfull"
      :style="pullStartStyle"
    >
      <slot
        v-if="$slots.pullStart"
        name="pullStart"
      />
      <p
        class="text-center"
        v-text="pullStartText"
      ></p>
    </div>
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div
      ref="pullEnd"
      class="abs-bottom flex-container hfull"
      :style="pullEndStyle"
    >
      <slot
        v-if="$slots.pullEnd"
        name="pullEnd"
      />
      <p
        class="text-center"
        v-text="pullEndText"
      ></p>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import _ from 'lodash'
export default {
  name: 'cmui-scroll',
  props: {
    col: { type: [String, Number], default: 'auto', intro: '如果为auto则不固定列数，如果为数字类型则表示列数' },
    direction: { type: String, default: 'h', intro: '滚动的方向，可选值是h和v' },
    watch: { type: [Array, Object], default: () => null, intro: '要监控的内容，通常是在scroll-item中v-for对应的内容，当内容变化时会更新滚动容器' },
    pullDis: { type: Number, default: 50, intro: '边缘滑动距离，超过这个距离将触发对应事件' },
    pullEvent: { type: Boolean, default: true, intro: '是否使用pull事件，如果为false，边缘滑动对应的事件不会触发' },
    freeMode: { type: Boolean, default: true, intro: '是否使用free模式，如果为false，将以scroll-item为组进行滑动' },
    pullText: { type: Array, default: () => ([]), intro: '边缘滑动需要展示的文本，支持4种状态，通常写成下拉刷新,释放刷新,上拉加载,释放加载，你也可以替换成其他的文本或HTML' }
  },
  data: function () {
    return {
      swiper: null,
      pullStartStyle: {
        transform: ''
      },
      pullEndStyle: {
        transform: ''
      },
      pullStartText: '',
      pullEndText: ''
    }
  },
  watch: {
    watch () {
      if (this.swiper) {
        this.$nextTick(() => {
          this.swiper.update()
        })
      }
    }
  },
  mounted () {
    let container = this.$refs.scroll
    let _this = this
    this.$nextTick(function () {
      _this.swiper = new Swiper(container, {
        direction: _this.direction === 'v' ? 'vertical' : 'horizontal',
        slidesPerView: +_this.col || 'auto',
        freeMode: _this.freeMode,
        on: {
          progress (value) {
            _this.updatePull(value, this.translate)
          },
          touchEnd () {
            _this.updatePull(this.progress, this.translate, true)
            _.delay(_this.resetPull)
          }
        }
      })
      _this.$emit('rendered', this)
    })
  },
  destroyed () {
    this.swiper.destroy()
  },
  methods: {
    updatePull (progress, translate, endHandel) {
      if (!this.pullEvent) {
        return
      }
      if (progress < 0) {
        if (translate > this.pullDis) {
          this.pullStartText = _.get(this.pullText, 1)
          endHandel && this.$emit('pullStart', this)
        } else {
          this.pullStartText = _.get(this.pullText, 0)
        }
        let dis = parseInt(_.min([translate - 20, 10]))
        if (this.direction === 'v') {
          this.pullStartStyle.transform = 'translate(0,' + dis + 'px)'
        } else {
          this.pullStartStyle.transform = 'translate(' + dis + 'px,0)'
        }
      } else if (progress > 1) {
        /**
         * todo 位置计算
         * 现在滑动到底部时的距离计算有误差，需要改正
         * */
        if (translate * (progress - 1) * -1 - 20 > this.pullDis) {
          this.pullEndText = _.get(this.pullText, 3)
          endHandel && this.$emit('pullEnd', this)
        } else {
          this.pullEndText = _.get(this.pullText, 2)
        }
        let dis = _.min([translate * (progress - 1) * -1 - 20, 10]) * -1
        if (this.direction === 'v') {
          this.pullEndStyle.transform = 'translate(0,' + dis + 'px)'
        } else {
          this.pullEndStyle.transform = 'translate(' + dis + 'px,0)'
        }
      }
      this.$emit('pull', progress, this)
    },
    resetPull () {
      this.pullStartStyle.transform = 'translate(-100%)'
      this.pullEndStyle.transform = 'translate(-100%)'
    }
  }
}
</script>
