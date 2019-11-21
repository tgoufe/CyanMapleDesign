<template>
  <div
    class="cmui-slidebar"
    :class="{ start: value === 0, end: value === range }"
  >
    <div class="cmui-slidebar__warp flex-container hfull">
      <div
        ref="bar"
        class="cmui-slidebar__bar pos-r"
      >
        <div
          class="cmui-slidebar__progress"
          :style="{ width: transDisX + 'px' }"
        />
        <div
          ref="dot"
          class="cmui-slidebar__dot"
          :style="transDis"
          @touchstart.prevent.stop="startHandle($event)"
          @touchmove.prevent.stop="moveHandle($event)"
          @touchend.prevent.stop="endHandle($event)"
        />
      </div>
    </div>
  </div>
</template>
<style type="text/css">
.cmui-slidebar__dot {
  position: absolute;
  left: 0;
  top: 50%;
}
</style>
<script type="text/javascript">
import _ from 'lodash'
function setDisFromValue (value) {
  let barInfo = this.$refs.bar.getBoundingClientRect()
  let dotInfo = this.$refs.dot.getBoundingClientRect()
  let dis = (value * (barInfo.width - dotInfo.width)) / this.range
  dis = _.max([dis, 0])
  dis = _.min([dis, barInfo.width - dotInfo.width])
  this.transDisX = dis
}
export default {
  name: 'cmui-slidebar',
  props: {
    value: { type: Number, default: 0, intro: '当前的值' },
    step: { type: Number, default: 0, intro: '每次滑动的最小单位' },
    range: { type: Number, default: 100, intro: '滑动的范围' }
  },
  data: function () {
    return {
      transDisX: 0,
      barInfo: null,
      dotInfo: null,
      selfValue: this.value
    }
  },
  computed: {
    transDis () {
      return {
        transform: `translate3d(${this.transDisX}px, -50%, 0px)`
      }
    }
  },
  watch: {
    value (value) {
      setDisFromValue.call(this, value)
    }
  },
  mounted () {
    setDisFromValue.call(this, this.value)
  },
  methods: {
    startHandle (e) {
      this.barInfo = this.$refs.bar.getBoundingClientRect()
      this.dotInfo = this.$refs.dot.getBoundingClientRect()
    },
    moveHandle (e) {
      let dis = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX
      dis -= this.barInfo.x + this.dotInfo.width / 2
      dis = _.min([dis, this.barInfo.width - this.dotInfo.width])
      dis = _.max([dis, 0])
      let value =
        (dis / (this.barInfo.width - this.dotInfo.width)) * this.range
      let step = Math.abs(this.step) % 100
      if (step) {
        let c = value % step
        if (c > step / 2) {
          value += step - c
        } else {
          value -= c
        }
      }
      this.selfValue = value
      this.$emit('input', this.selfValue)
    },
    endHandle (e) {
      this.barInfo = null
      this.dotInfo = null
      this.$emit('change', this.selfValue)
    }
  }
}
</script>
