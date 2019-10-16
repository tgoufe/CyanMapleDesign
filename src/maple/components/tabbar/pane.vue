<style lang="scss"></style>
<script>
import _ from 'lodash'
export default {
  name: 'cmui-tabbar-pane',
  props: {
    items: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: 0 }
  },
  render(h) {
    let { activeIndex } = this
    let items = this.items.map((item, index) => {
      return h(
        'div',
        {
          class: [
            'cmui-tabbar__pane-item',
            index === activeIndex ? 'active' : ''
          ],
          style: {
            display: index === activeIndex ? 'block' : 'none'
          },
          key: index
        },
        _.get(item, 'data.attrs.content') ||
          _.filter(
            item.children,
            inner => _.get(inner, 'data.attrs.slot') !== 'title'
          ) ||
          ''
      )
    })
    return h(
      'div',
      {
        class: {
          'cmui-tabbar__pane': true
        }
      },
      items
    )
  }
}
</script>
