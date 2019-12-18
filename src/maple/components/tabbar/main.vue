<script>
import cmuiTabbarNav from '../tabbar/nav.vue'
import scrollBar from '../../methods/scroll_bar.js'
import _ from 'lodash'
let contentScrollEvent = _.throttle(function() {
  if (this.stopScrollEvent) return
  let contentTop = this.$refs.content.getBoundingClientRect().top
  let findIndex = _.findIndex(this.$refs.content.childNodes, item => item.getBoundingClientRect().top > contentTop)
  if (~findIndex) this.activeIndex = findIndex - 1
}, {
  wait: 200,
  trailing: false
})
export default {
  name: 'cmui-tabbar',
  components: {
    cmuiTabbarNav
  },
  provide() {
    return {
      cmuiTabbar: this
    }
  },
  props: {
    col: { type: [String, Number], default: 'auto', intro: 'nav的列数,如果为数字则将nav分成对应的份数，如果item数量超过col则滚动显示' },
    index: { type: Number, default: 0, intro: '活动的索引' },
    nav: { type: Array, default: () => [false, false], intro: '是否显示左右导航' },
    position: { type: String, default: 'top', intro: 'nav栏的位置，你可以在top bottom right left中任选其一' },
    screen: { type: Boolean, default: false }
  },
  data: function () {
    return {
      items: [],
      activeIndex: this.index,
      stopScrollEvent: false
    }
  },
  computed: {
    itemStyle () {
      let rs = {}
      if (_.isNumber(this.col)) {
        rs[this.isVertical ? 'height' : 'width'] = 100 / this.col + '%'
      }
      return rs
    },
    isVertical () {
      return _.includes(['left', 'right'], this.position)
    },
    headContainerClass () {
      return {
        'scroll-container': !this.isVertical,
        'scroll-container-y': this.isVertical,
        'flex-container': this.col === 'flex' && !this.isVertical,
        'flex-container-col': this.col === 'flex' && this.isVertical,
        'flex-container center': this.col === 'center' && !this.isVertical,
        'flex-container-col center': this.col === 'center' && this.isVertical
      }
    },
    showPreNav () {
      return !!_.get(this.nav, '[0]')
    },
    showNextNav () {
      return !!_.get(this.nav, '[1]')
    },
    extras () {
      return this.$slots.extra || []
    }
  },
  watch: {
    activeIndex (index) {
      this.$emit('update:index', index)
    }
  },
  mounted() {
    this.update()
  },

  updated() {
    this.update()
  },
  methods: {
    scrollAcitveIntoViewIfNeeded (isStart = true) {
      const tabBar = this.$refs.nav.$el
      const activeItem = tabBar.children[this.activeIndex]
      const tabBarP = tabBar.getBoundingClientRect()
      const activeItemP = activeItem.getBoundingClientRect()
      const pos = this.isVertical ? ['top', 'bottom'] : ['left', 'right']
      if (!_.inRange(activeItemP[pos[0]], tabBarP[pos[0]], tabBarP[pos[1]])) {
        activeItem.scrollIntoView(isStart)
      }
    },
    changeToNext () {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++
        this.$nextTick(() => {
          this.scrollAcitveIntoViewIfNeeded(false)
        })
      }
    },
    changeToPre () {
      if (this.activeIndex > 0) {
        this.activeIndex--
        this.$nextTick(() => {
          this.scrollAcitveIntoViewIfNeeded(true)
        })
      }
    },
    changeToIndex (index = 0) {
      if (_.inRange(index, this.items.length)) {
        let _this = this
        let targetContent = this.$refs.content.childNodes[index]
        this.activeIndex = index
        this.stopScrollEvent = true
        scrollBar(this.$refs.content, 'top', targetContent.offsetTop, this.animate, function() {
          _this.stopScrollEvent = false
        })
        this.$nextTick(() => {
          this.scrollAcitveIntoViewIfNeeded(true)
        })
      }
    },
    changeByStep (num = 1) {
      if (_.inRange(this.activeIndex + num, this.items.length)) {
        this.activeIndex += num
      }
    },
    getItems () {
      return _.filter(
        this.$slots.default,
        item => item.tag === 'cmui-tabbar-item'
      )
    },
    extraEvent (event, item, index) {
      this.$emit('extra-click', this, item, index)
    },
    navItem () {
      this.$emit('item-click', this, ...arguments)
    },
    update(force = false) {
      if (this.$slots.default) {
        const items = _.filter(this.$slots.default, vnode => _.get(vnode, 'componentOptions.Ctor.options.name') === 'cmui-tabbar-item').map(({ componentInstance }) => componentInstance)
        const changed = !(items.length === this.items.length && items.every((pane, index) => pane === this.items[index]))
        if (force || changed) {
          this.items = items
        }
      } else {
        this.items = []
      }
    }
  },
  render (h) {
    const {
      items,
      activeIndex,
      position,
      changeToPre,
      changeToNext,
      headContainerClass,
      isVertical,
      itemStyle,
      navItem,
      extras,
      extraEvent
    } = this
    const content = h(
      'div',
      {
        class: {
          'cmui-tabbar__content pos-r': true,
          'flex1 scroll-container-y': this.screen
        },
        on: {
          scroll: contentScrollEvent.bind(this)
        },
        ref: 'content'
      },
      this.$slots.default
    )
    const pre = h(
      'div',
      {
        class: {
          'cmui-tabbar__pre': true,
          'text-center': true
        },
        on: {
          click: changeToPre
        }
      },
      [
        h('i', {
          class: `baseIcon baseIcon-${isVertical ? 'fold' : 'back'}`
        })
      ]
    )
    const next = h(
      'div',
      {
        class: {
          'cmui-tabbar__next': true,
          'text-center': true
        },
        on: {
          click: changeToNext
        }
      },
      [
        h('i', {
          class: `baseIcon baseIcon-${isVertical ? 'unfold' : 'right'}`
        })
      ]
    )
    const nav = h('cmui-tabbar-nav', {
      class: headContainerClass,
      props: {
        items,
        activeIndex,
        itemStyle
      },
      on: {
        'nav-item': navItem
      },
      ref: 'nav'
    })
    const extraList = extras.map((item, index) => {
      return h(
        'div',
        {
          class: 'cmui-tabbar__extra-item',
          key: index,
          on: {
            click: _.partialRight(extraEvent, item, index)
          }
        },
        [item]
      )
    })
    const extra = h(
      'div',
      {
        class: {
          'cmui-tabbar__extra': true,
          'flex-container': !isVertical
        }
      },
      extraList
    )
    const head = h(
      'div',
      {
        class: {
          'cmui-tabbar__head': true,
          'flex-container': !isVertical,
          'flex-container-col': isVertical
        }
      },
      [
        this.nav[0] ? pre : undefined,
        nav,
        this.nav[1] ? next : undefined,
        extraList.length ? extra : undefined
      ]
    )
    return h(
      'div',
      {
        class: [`cmui-tabbar cmui-tabbar-${this.position}`, {
          'flex-container vfull': this.isVertical,
          'flex-container-col hfull': this.screen && !this.isVertical
        }],
        style: {
          height: this.screen ? '100vh' : ''
        }
      },
      _.includes(['right', 'bottom'], position)
        ? [content, head]
        : [head, content]
    )
  }
}
</script>
