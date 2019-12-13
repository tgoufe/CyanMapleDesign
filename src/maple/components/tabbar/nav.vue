<script>
export default {
  name: 'cmui-tabbar-nav',
  props: {
    items: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: 0 },
    itemStyle: { type: Object, default: () => ({}) }
  },
  inject: ['cmuiTabbar'],
  methods: {
    itemEvent(item, index) {
      const oldIndex = this.cmuiTabbar.activeIndex
      this.$emit('nav-item', item, index, oldIndex)
      this.cmuiTabbar.changeToIndex(index)
    }
  },
  render(h) {
    this.cmuiTabbar.items.forEach((item, index) => (item.index = index))
    let items = this.cmuiTabbar.items.map((item, index) => h('div', {
      class: ['cmui-tabbar__head-item', {
        active: index === this.cmuiTabbar.activeIndex,
        flex1: this.cmuiTabbar.col !== 'center'
      }],
      style: this.itemStyle,
      on: {
        click: () => {
          this.itemEvent(item, index)
        }
      }
    }, item.$slots.title || [h('div', {}, item.$attrs.title)]))
    return h('div', {
      class: 'cmui-tabbar__nav flex1'
    }, items)
  }
}
</script>
