<template>
    <cmui-popup position="bottom" :visible.sync="selfVisible" class="cmui-picker" target-class="cmui-picker__container">
        <div class="flex-container cmui-picker__head">
            <div class="cmui-picker__cancel">
                <div class="cmui-picker__btn" @click="_cancel()">
                {{ leftText }}
                </div>
            </div>
            <div class="flex1 text-center cmui-picker__title">
            {{ title }}
            </div>
            <div class="cmui-picker__ok">
                <div class="cmui-picker__btn" @click="_ok()">
                {{ rightText }}
                </div>
            </div>
        </div>
        <div class="pos-r cmui-picker__content">
            <div ref="wheelWrapper" class="cmui-picker__wrapper flex-container vfull overflow-h">
                <div v-for="(item, index) in pickerData" :key="index" class="flex1 swiper-container">
                    <ul class="cmui-picker__scroll swiper-wrapper">
                        <li
                        v-for="(inner, indexInner) in item"
                        :key="indexInner"
                        class="cmui-picker__item text-center swiper-slide text-limit1"
                        style="height:auto"
                        >
                        {{ inner.text }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cmui-picker__linet abs-top"></div>
            <div class="cmui-picker__lineb abs-bottom"></div>
        </div>
    </cmui-popup>
</template>

<style lang="scss" type="text/scss">

$pickerHeight: 200px;
$pickerItemSize: 20px;
.cmui-picker__wrapper {
  height: $pickerHeight;
}
.cmui-picker__item {
  font-size: $pickerItemSize;
  line-height: 1.5;
}
.cmui-picker__linet,
.cmui-picker__lineb {
  height: ($pickerHeight - $pickerItemSize * 1.5 - 1)/2;
  position: absolute;
  pointer-events: none;
  z-index: 9;
}
.cmui-picker__linet {
  border-bottom: 1px solid #cccccc;
  background-image: linear-gradient(
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
.cmui-picker__lineb {
  border-top: 1px solid #cccccc;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}
</style>

<script>
import cmuiPopup from '../popup/main.vue'
import _ from 'lodash'
import Swiper from 'swiper'
function formatWheelData(wheelData, lengthStore) {
  lengthStore.maxLen = _.max([lengthStore.maxLen, lengthStore.tempLen])
  return _.map(wheelData, item => {
    if (_.isPlainObject(item)) {
      if (_.isArray(item.children) && item.children.length) {
        lengthStore.tempLen++
        item.text = String(item.text)
        item.children = formatWheelData(item.children, lengthStore)
      }
      lengthStore.tempLen = 0
      return item
    } else {
      lengthStore.tempLen = 0
      return { text: item.toString(), value: item }
    }
  })
}
function formatData(data) {
  let lengthStore = { maxLen: 0 }
  return _.map(data, (whleeData, index) =>
    formatWheelData(whleeData, _.assign(lengthStore, { tempLen: index + 1 }))
  ).concat(
    _.fill(Array(lengthStore.maxLen - data.length), [
      { text: '', value: undefined }
    ])
  )
}
function getInitData(data, value) {
  console.log('innit')
  let pickerData = formatData(_.every(data, _.isArray) ? data : [data])
  let valueList = _.isArray(value) ? value : [value]
  let pickerSelectIndex = []
  let wheelStore = [pickerData[0]]
  for (let index = 0; index < pickerData.length; index++) {
    let item = pickerData[index]
    let activeIndex = _.findIndex(item, item => _.isEqual(item.value, valueList[index]))
    activeIndex = ~activeIndex ? activeIndex : 0
    pickerSelectIndex[index] = activeIndex
    let chiildrenData = _.get(item, `[${activeIndex}].children`)
    if (chiildrenData) {
      wheelStore[index + 1] = pickerData[index + 1] || []
      pickerData[index + 1] = chiildrenData
    } else if (index < pickerData.length - 1) {
      wheelStore[index + 1] = pickerData[index + 1] || []
    }
  }

  return {
    pickerData,
    pickerSelectIndex,
    wheelStore
  }
}
export default {
  name: 'cmui-picker',
  methodName: 'picker',
  argumentsRole(options, args) {
    options.title = _.find(args, _.isString)
    options.data = _.find(args, _.isArray)
    options.rightFn = _.find(args, _.isFunction)
    options.leftFn = _.filter(args, _.isFunction)[1]
  },
  components: {
    cmuiPopup
  },
  props: {
    data: { type: Array, default: () => [], intro: '要展示的数据' },
    visible: { type: Boolean, default: false, intro: '是否可见需要配合sync使用' },
    rightFn: { type: Function, default: null, intro: '点击右侧文字时的事件' },
    leftFn: { type: Function, default: null, intro: '点击左侧文字时的事件' },
    title: { type: String, default: '', intro: '标题文字' },
    leftText: { type: String, default: '取消', intro: '左侧文字' },
    rightText: { type: String, default: '确定', intro: '右侧文字' },
    value: { type: [String, Object, Number, Array], default: () => '', intro: 'v-model绑定的值' }
  },
  data: function() {
    return getInitData(this.data, this.value)
  },
  computed: {
    selfVisible: {
      get() {
        this.visible && this.setData(this.data)
        return this.visible
      },
      set(value) {
        this.wheels = this.wheels || []
        if (value && !this.wheels.length) {
          this.$nextTick(() => {
            _.forEach(this.pickerData, (item, index) => {
              this.initWheel(index)
            })
          })
        }
        this.$emit('update:visible', value)
      }
    }
  },
  watch: {
    data(value) {
      this.setData(value)
    }
  },
  methods: {
    initWheel(index = 0) {
      let _this = this
      let initialSlide = this.pickerSelectIndex[index] || 0
      let isInit = true
      let wheelWrapper = this.$refs.wheelWrapper
      _this.wheels[index] = new Swiper(wheelWrapper.children[index], {
        direction: 'vertical',
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: initialSlide,
        freeModeSticky: true, // 自动贴合
        freeMode: true,
        freeModeMomentumRatio: 0.7, // 当释放slide时的滑动时间
        freeModeMomentumVelocityRatio: 0.3, // 释放后滑动速度
        freeModeMomentumBounceRatio: 2, // 边界反弹效果
        on: {
          transitionEnd() {
            if (!isInit) {
              _this.updateData(index, this.activeIndex)
              _this.updataWheels(index + 1)
            } else {
              isInit = false
            }
          }
        }
      })
    },
    updateData(index, active) {
      if (index >= this.pickerSelectIndex.length) {
        return
      }
      // if(!_.get(this,`pickerData[${index}][${active}]`)){
      //   active=0;
      // }
      this.pickerSelectIndex[index] = active
      let children = _.get(this, `pickerData[${index}][${active}].children`)
      if (children) {
        if (!_.isEqual(this.pickerData[index + 1], children)) {
          this.pickerData.splice(index + 1, 1, children)
        } else {
          index++
        }
        this.updateData(index + 1, this.pickerSelectIndex[index + 1])
      } else {
        while (this.pickerData[++index]) {
          this.pickerData.splice(index, 1, this.wheelStore[index])
        }
      }
    },
    updataWheels(fromIndex = 0) {
      this.$nextTick(() => {
        for (let item; (item = this.wheels[fromIndex++]);) {
          item.updateSlides()
          item.slideTo(this.pickerSelectIndex[fromIndex - 1], false)
        }
      })
    },
    destroyWheels() {
      _.forEach(this.wheels, item => {
        item.destroy(false, false)
      })
      this.wheels = []
    },
    getData() {
      let _this = this
      return _.map(this.wheels, (item, index) => {
        return {
          text: _this.pickerData[index][item.activeIndex].text,
          value: _this.pickerData[index][item.activeIndex].value
        }
      })
    },
    setData(data, selectIndex = 0) {
      _.delay(() => {
        this.destroyWheels()
        _.assign(this, getInitData(data, this.value))
        this.$nextTick(() => {
          _.forEach(this.pickerData, (item, index) => {
            this.initWheel(index)
          })
        })
      })
    },
    _ok() {
      let data = this.getData()
      if (_.isFunction(this.rightFn)) {
        if (this.rightFn(data, this) !== false) {
          this.selfVisible = false
        }
      } else {
        this.selfVisible = false
      }
      this.$emit('input', _.isArray(this.value) ? data.map(item => item.value) : data.map(item => item.value)[0])
      this.$emit('select', data, this)
    },
    _cancel() {
      if (_.isFunction(this.leftFn)) {
        if (this.leftFn(this) !== false) {
          this.selfVisible = false
        }
      } else {
        this.selfVisible = false
      }
      this.$emit('cancel', this)
    }
  }
}
</script>
