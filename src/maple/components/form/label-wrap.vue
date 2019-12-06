<script>

export default {
  props: {
    isAutoWidth: { type: Boolean, defalut: false },
    updateAll: { type: Boolean, defalut: false }
  },
  inject: ['cmuiForm', 'cmuiFormItem'],
  data() {
    return {
      computedWidth: 0
    }
  },
  watch: {
    computedWidth(val, oldVal) {
      if (this.updateAll) {
        this.cmuiForm.registerLabelWidth(val, oldVal)
        this.cmuiFormItem.updateComputedLabelWidth(val)
      }
    }
  },
  mounted() {
    this.updateLabelWidth('update')
  },
  updated() {
    this.updateLabelWidth('update')
  },
  beforeDestroy() {
    this.updateLabelWidth('remove')
  },
  methods: {
    getLabelWidth() {
      if (this.$el && this.$el.firstElementChild) {
        const computedWidth = window.getComputedStyle(this.$el.firstElementChild).width
        return Math.ceil(parseFloat(computedWidth))
      } else {
        return 0
      }
    },
    updateLabelWidth(action = 'update') {
      if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
        if (action === 'update') {
          this.computedWidth = this.getLabelWidth()
        } else if (action === 'remove') {
          this.cmuiForm.deregisterLabelWidth(this.computedWidth)
        }
      }
    }
  },
  render(h) {
    const slots = this.$slots.default
    if (!slots) return null
    if (this.isAutoWidth) {
      const autoLabelWidth = this.cmuiForm.autoLabelWidth
      const style = {}
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px'
        }
      }
      return h('div', {
        className: 'cmui-form-item__label-wrap',
        style: style
      }, slots)
    } else {
      return slots[0]
    }
  }
}
</script>
<style>
    .cmui-form-item__label {padding-right:12px}
</style>
