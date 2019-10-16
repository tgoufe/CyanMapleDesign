<style lang="scss"></style>
<script>
import _ from 'lodash'
export default {
  name: 'cmui-tabbar-nav',
  props: {
    items: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: 0 },
    itemStyle: { type: Object, default: () => ({}) }
  },
  methods: {
    itemEvent(event, item, index) {
      const oldIndex = this.$parent.activeIndex
      const model = _.get(item, 'data.model.value')
      this.$emit('nav-item', item, index, oldIndex, model)
      this.$parent.changeToIndex(index)
    }
  },
  render(h) {
    let { activeIndex, itemStyle, itemEvent } = this
    let items = this.items.map((item, index) => {
      return h(
        'div',
        {
          class: [
            'cmui-tabbar__head-item flex1',
            _.get(item, 'data.staticClass'),
            index === activeIndex ? 'active' : ''
          ],
          style: itemStyle,
          on: {
            click: _.partialRight(itemEvent, item, index)
          },
          key: index
        },
        _.get(item, 'data.attrs.title') ||
          _.filter(
            item.children,
            inner => _.get(inner, 'data.attrs.slot') === 'title'
          ) ||
          ''
      )
    })
    return h(
      'div',
      {
        class: {
          'cmui-tabbar__nav': true,
          flex1: true
        }
      },
      items
    )
  }
}
</script>
