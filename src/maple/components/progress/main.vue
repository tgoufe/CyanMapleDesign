<template>
  <div class="cmui-progress">
    <div
      v-if="type === 'line' || type === 'top'"
      class="cmui-progress_warp"
      :style="warpStyle"
    >
      <div
        class="cmui-progress_bar"
        :style="progressStyle"
      >
        <div
          class="cmui-progress_bg"
          :style="bgStyle"
        />
        <div
          v-if="!$slots.default || text"
          class="cmui-progress_info fullcenter"
        >
          <slot />
          <template
            v-if="!$slots.default"
            class="fullcenter flex-container center"
          >
            {{ text }}
          </template>
        </div>
      </div>
    </div>
    <div
      v-if="type === 'circle'"
      class="ratio-container"
      :style="{ width: size + 'px' }"
    >
      <svg :width="size" :height="size">
        <g :transform="`matrix(0,-1,1,0,0,${size})`">
          <circle
            :cx="size / 2"
            :cy="size / 2"
            :r="(size - lineWidth) / 2"
            :stroke-width="lineWidth"
            :stroke="bgcolor"
            fill="none"
            stroke-dasharray="1069 1069"
          />
          <circle
            :cx="size / 2"
            :cy="size / 2"
            :r="(size - lineWidth) / 2"
            :stroke-width="lineWidth"
            :stroke="color.split(/\s+/g)[0]"
            fill="none"
            :stroke-dasharray="sd"
          />
        </g>
      </svg>
      <div
        v-if="!$slots.default || text"
        class="fullcenter flex-container center"
      >
        <slot />
        <template
          v-if="!$slots.default"
          class="fullcenter flex-container center"
          >
  {{ text }}
</template>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.cmui-progress_warp {
  overflow: hidden;
  .cmui-progress_bar {
    transition: width 1s;
    overflow: hidden;
    position: relative;
    .cmui-progress_bg {
      height: 100%;
    }
    .cmui-progress_info {
      color: white;
    }
  }
}
</style>
<script>
export default {
  name: 'cmui-progress',
  props: {
    value: { type: Number, default: 0 },
    color: { type: String, default: 'red' },
    bgcolor: { type: String, default: '#cccccc' },
    lineWidth: { type: Number, default: 2 },
    type: { type: String, default: 'line' }, // line top circle
    radius: { type: Boolean, default: true },
    text: { type: String, default: '' },
    size: { type: Number, default: 20 }
  },
  computed: {
    warpStyle () {
      return {
        height: this.lineWidth + 'px',
        backgroundColor: this.bgcolor,
        'border-radius': this.radius ? '100px' : 'none'
      }
    },
    progressStyle () {
      let width = Math.max(this.value, 0)
      width = Math.min(this.value, 100)
      return {
        height: this.lineWidth + 'px',
        width: width + '%',
        'border-radius': this.radius ? '100px 0 0 100px' : 'none'
      }
    },
    bgStyle () {
      let rs = {}
      rs.backgroundColor = this.color.split(/\s+/g)[0]
      rs.backgroundImage =
        'linear-gradient(to right, ' + this.color.replace(/\s+/g, ',') + ')'
      let width = Math.max(this.value, 0)
      width = Math.min(this.value, 100)
      rs.width = 10000 / width + '%'
      return rs
    },
    sd () {
      return (
        ((this.size - this.lineWidth) * Math.PI * this.value) / 100 + ' 1024'
      )
    }
  }
}
</script>
