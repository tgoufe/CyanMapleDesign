<template>
  <div class="cmui-countdown flex-container">
    <div
      v-for="(value, key) in contentList"
      :key="key"
      class="countdown-container"
      :class="key"
    >
      <span>{{ value }}</span>
    </div>
  </div>
</template>
<style>
.countdown-container {
  background-color: #232323;
  color: #ffffff;
  position: relative;
}
.countdown-container:not(:last-child) {
  margin-right: 10px;
}
.countdown-container:not(:last-child):after {
  content: ":";
  color: #232323;
  position: absolute;
  left: 111%;
  top: 0;
}
</style>
<script>
import _ from 'lodash'
export default {
  name: 'cmui-countdown',
  props: {
    nowTime: { type: Number, default: +new Date() },
    endTime: { type: Number, default: 0 },
    showMilli: { type: Boolean, default: false }, // 是否显示毫秒数，默认不显示
    showDay: { type: Boolean, default: false }
  },
  data () {
    return {
      contentList: { hour: '00', minute: '00', sec: '00' },
      selfTime: this.nowTime
    }
  },
  watch: {
    selfTime (value) {
      if (this.endTime && this.nowTime) {
        var countDownTime = this.endTime - value
        this.$emit('update', countDownTime, this)
        if (countDownTime < 0) {
          clearTimeout(this.timer)
          this.contentList = { hour: '00', minute: '00', sec: '00' }
          this.$emit('countdownend', this)
        } else {
          let obj = {}
          let day = Math.floor(countDownTime / 3600000 / 24)
          if (this.showDay && day) {
            obj.day = day
          }
          obj.hour =
            Math.floor((countDownTime / 3600000) % 24) +
            (this.showDay ? 0 : day * 24)
          obj.minute = Math.floor((countDownTime / 60000) % 60)
          obj.sec = Math.floor((countDownTime / 1000) % 60)
          if (this.showMilli) {
            obj.millSec = Math.floor((countDownTime / 100) % 10)
          }
          this.contentList = _.mapValues(obj, item => _.padStart(item, 2, 0))
        }
      }
    },
    endTime (value) {
      var vm = this
      var intervalTime = this.showMilli ? 100 : 1000
      if (this.endTime && this.selfTime && this.endTime > this.selfTime) {
        clearTimeout(this.timer)
        vm.selfTime += intervalTime
        this.timer = setInterval(function () {
          vm.selfTime += intervalTime
        }, intervalTime)
      }
    }
  },
  mounted () {
    var vm = this
    var intervalTime = this.showMilli ? 100 : 1000
    if (
      _.isNumber(this.endTime) &&
      _.isNumber(this.selfTime) &&
      this.endTime > this.selfTime
    ) {
      vm.selfTime += intervalTime
      this.timer = setInterval(function () {
        vm.selfTime += intervalTime
      }, intervalTime)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
