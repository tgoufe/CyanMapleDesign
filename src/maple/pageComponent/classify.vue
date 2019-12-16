<script>
export default {
  name: 'cmui-classify',
  props: {
    position: { type: String, default: 'left' },
    height: { type: String, default: '100vh' }
  },
  data() {
    return {
      items: []
    }
  },
  computed: {
    isV() {
      return !(this.position === 'top' || this.position === 'bottom')
    },
    contentClass() {
      if (this.isV) {
        return 'flex1 scroll-container-y'
      } else {
        return ''
      }
    },
    contentStyle() {
      if (this.isV) {
        return { height: '100%' }
      } else {
        return {}
      }
    },
    tabStyle() {
      if (this.isV) {
        return { height: '100%' }
      } else {
        return {}
      }
    }
  },
  mounted() {
    this.setTitle()
  },
  updated() {
    this.setTitle()
  },
  methods: {
    setTitle(force = false) {
      if (this.$slots.default) {
        const items = _.filter(this.$slots.default, vnode => _.get(vnode, 'componentOptions.Ctor.options.name') === 'cmui-classify-item').map(({ componentInstance }) => componentInstance)
        const changed = !(items.length === this.items.length && items.every((pane, index) => pane === this.items[index]))
        if (force || changed) {
          this.items = items
        }
      } else {
        this.items = []
      }
    }
  },
  render(h) {
    let renderItem = item => {
      return h('div', {
        class: 'cmui-classify__tabItem'
      }, item.$slots.title || [h('div', {}, item.$attrs.title)])
    }
    let tab = h('div', {
      class: ['cmui-classify__tab', this.isV ? 'scroll-container-y' : 'scroll-container'],
      style: this.tabStyle
    }, this.items.map(renderItem))
    let content = h('div', {
      class: ['cmui-classify__content', this.contentClass],
      style: this.contentStyle
    }, this.$slots.default)
    return h('div', {
      class: ['cmui-classify', this.isV ? 'flex-container top' : ''],
      style: {
        height: this.height
      }
    }, [
      tab,
      content
    ])
  },
  provide() {
    return {
      cmuiClassify: this
    }
  }
}
</script>
