<script>
import cmuiRender from '../base/render'
export default {
  name: 'cmui-tabbar-nav',
  components: { cmuiRender },
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
      class: ['cmui-tabbar__head-item flex1', {
        active: index === this.cmuiTabbar.activeIndex
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
