<script>
import _ from 'lodash'
import scrollBar from '../methods/scroll_bar'
function scrollEvent() {
  // if (this.$refs.classify.getBoundingClientRect().top === this.top) {
  //   this.active = true
  // }
}
export default {
  name: 'cmui-classify',
  props: {
    position: { type: String, default: 'left' },
    top: { type: Number, default: 0 },
    animate: { type: Boolean, default: false }
  },
  data() {
    return {
      items: [],
      active: false,
      index: 0,
      stopScrollEvent: false
    }
  },
  computed: {
    isV() {
      return !(this.position === 'top' || this.position === 'bottom')
    },
    contentClass() {
      if (this.isV) {
        return [
          'flex1',
          this.active ? 'scroll-container-y' : 'overflow-h'
        ]
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
    document.addEventListener('scroll', scrollEvent.bind(this))
  },
  destroyed() {
    document.removeEventListener('scroll', scrollEvent.bind(this))
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
    let _this = this
    let renderItem = (item, index) => {
      return h('div', {
        class: ['cmui-classify__tabItem', { active: this.index === index }],
        on: {
          click() {
            _this.index = index
            let targetContent = _this.$refs.content.childNodes[index]
            _this.stopScrollEvent = true
            scrollBar(_this.$refs.content, 'top', targetContent.offsetTop, _this.animate, function() { _this.stopScrollEvent = false })
          }
        }
      }, item.$slots.title || [h('div', {}, item.$attrs.title)])
    }
    let tab = h('div', {
      class: ['cmui-classify__tab', this.isV ? 'scroll-container-y' : 'scroll-container'],
      style: this.tabStyle
    }, this.items.map(renderItem))
    let content = h('div', {
      class: ['cmui-classify__content pos-r', this.contentClass],
      ref: 'content',
      on: {
        scroll: _.throttle(function() {
          if (_this.stopScrollEvent) return
          if (_this.$refs.content.scrollTop === 0) {
            _this.active = false
          }
          let contentTop = _this.$refs.content.getBoundingClientRect().top
          _this.index = _.findIndex(_this.$refs.content.childNodes, item => item.getBoundingClientRect().top > contentTop) - 1
        }, {
          wait: 200
        })
      },
      style: this.contentStyle
    }, this.$slots.default)
    return h('div', {
      class: ['cmui-classify', this.isV ? 'flex-container top' : ''],
      ref: 'classify',
      style: {
        height: '100vh'
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
<style lang="scss" type="text/scss">
    .cmui-classify{}
    .cmui-classify__tab{}
    .cmui-classify__tabItem{
        &.active{}
    }
    .cmui-classify__content{}
    .cmui-classify-item{}

    .cmui-classify{background-color: white}
    .cmui-classify__tab{
        border-right:1px solid #cccccc;
    }
    .cmui-classify__tabItem{
        padding:20px;
        border-bottom:1px solid #cccccc;
        &.active{
            color:red
        }
    }
    .cmui-classify__content{}
    .cmui-classify-item{
        border-bottom:1px solid #cccccc;
    }
</style>
