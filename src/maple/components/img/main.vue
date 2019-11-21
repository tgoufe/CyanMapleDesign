<template>
  <img
    class="cmui-img"
    :src="realSrc"
    alt=""
    @click="imgClick()"
    @error="srcError()"
  >
</template>
<script>
import imagePreView from './imagePreView'
import { ready, isInView } from 'dom'
import _ from 'lodash'
let lazyLoadList = []
let windowHeight
let checkFinish = true
const checkLazyLoadImage = _.debounce(function () {
  if (checkFinish) {
    checkFinish = false
    for (let i = 0; i < lazyLoadList.length; i++) {
      const { $el, src } = lazyLoadList[i]
      const inView = isInView($el)
      if (inView) {
        $el.src = src
        lazyLoadList.splice(i--, 1)
        continue
      } else if ($el.getBoundingClientRect().top > windowHeight) {
        break
      }
    }
    checkFinish = true
  }
}, 500)
ready(function (window) {
  if (window) {
    window.addEventListener('scroll', checkLazyLoadImage)
    window.addEventListener('resize', function () {
      windowHeight = window.innerHeight
    })

    windowHeight = window.innerHeight
  }
})
const base64Data =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
export default {
  name: 'cmui-img',
  props: {
    src: { type: String, default: base64Data },
    lazyLoad: { type: Boolean, default: false },
    lazySrc: { type: String, default: base64Data },
    errorSrc: { type: String, default: base64Data },
    preView: { type: Boolean, default: false },
    preViewList: {
      type: Array,
      default () {
        return []
      }
    },
    preViewIndex: { type: Number, default: 0 },
    preViewOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      realSrc: this.lazyLoad ? this.lazySrc : this.src
    }
  },
  created () {
    lazyLoadList.push(this)
  },
  mounted () {
    checkLazyLoadImage()
  },
  destroyed () {
    _.remove(lazyLoadList, this)
  },
  methods: {
    imgClick: function () {
      if (this.preView) {
        let list = this.preViewList.length ? this.preViewList : this.src
        let index = this.preViewIndex
        imagePreView.call(this, list, index, this.preViewOptions)
      }
    },
    srcError () {
      this[this.lazyLoad ? 'lazySrc' : 'realSrc'] = this.errorSrc
    }
  }
}
</script>
