<template>
  <div
    class="cmui-affix-warp"
    :class="{ warpActive: affix }"
  >
    <div
      class="cmui-affix"
      :style="styles"
      :class="{ affixActive: affix }"
    >
      <slot />
    </div>
  </div>
</template>
<script>
function getScroll (target, top) {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }
  return ret
}
function getOffset (element) {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}
export default {
  name: 'cmui-affix',
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: -Infinity
    }
  },
  data () {
    return {
      affix: false,
      styles: {},
      containerHeight: null
    }
  },
  computed: {
    offsetType () {
      return this.bottom >= 0 ? 'bottom' : 'top'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false)
    window.addEventListener('resize', this.handleScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false)
    window.removeEventListener('resize', this.handleScroll, false)
  },
  methods: {
    handleScroll () {
      const affix = this.affix
      const scrollTop = getScroll(window, true)
      const elOffset = getOffset(this.$el)
      const windowHeight = window.innerHeight
      const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight
      // Fixed Top
      if (
        elOffset.top - this.top < scrollTop &&
        this.offsetType === 'top' &&
        !affix
      ) {
        this.affix = true
        this.styles = {
          top: `${this.top}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`,
          position: 'fixed'
        }
        if (!this.$el.style.height) {
          this.$el.style.height = `${elHeight}px`
        } else {
          this.containerHeight = this.$el.style.height
        }
        this.$emit('change', true)
      } else if (
        elOffset.top - this.top >= scrollTop &&
        this.offsetType === 'top' &&
        affix
      ) {
        this.affix = false
        this.styles = null
        this.$el.style.height = this.containerHeight
          ? `${this.containerHeight}px`
          : null
        this.$emit('change', false)
      }
      // Fixed Bottom
      if (
        elOffset.top + this.bottom + elHeight > scrollTop + windowHeight &&
        this.offsetType === 'bottom' &&
        !affix
      ) {
        this.affix = true
        this.styles = {
          bottom: `${this.bottom}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`,
          position: 'fixed',
          height: `${elHeight}px`
        }
        if (!this.$el.style.height) {
          this.$el.style.height = `${elHeight}px`
        } else {
          this.containerHeight = this.$el.style.height
        }
        this.$emit('change', true)
      } else if (
        elOffset.top + this.bottom + elHeight <= scrollTop + windowHeight &&
        this.offsetType === 'bottom' &&
        affix
      ) {
        this.affix = false
        this.styles = null
        this.$el.style.height = this.containerHeight
          ? `${this.containerHeight}px`
          : null
        this.$emit('change', false)
      }
    }
  }
}
</script>
