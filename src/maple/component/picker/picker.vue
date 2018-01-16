<template>
  <div class="cmui-picker">
    <div class="flex-container">
      <div class="flex1" v-for="(one,index) in data">
        <div class="cmui-picker-item" :id="'cmui-picker-' + uuid + '-' + index"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroller from './scroller'
import Manager from './chain'
import vm from "../../vm.js";
export default {
  created () {
    if (this.col !== 0) {
      const length = this.col
      this.store = new Manager(this.data, length)
      this.data = this.store.getColumns(this.value)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.render(this.data, this.value)
    })
  },
  props: {
    data: {
      type: Array
    },
    col: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      twoWay: true
    },
    itemClass: {
      type: String,
      default: 'scroller-item'
    },
    target:{
      type:Object
    }
  },
  methods: {
    getId (i) {
      return `#cmui-picker-${this.uuid}-${i}`
    },
    render (data, value) {
      this.count = this.data.length
      const _this = this
      if (!data || !data.length) {
        return
      }
      let count = this.data.length
      // set first item as value
      if (value.length < count) {
        for (let i = 0; i < count; i++) {
          // _this.value.$set(i, data[i][0].value || data[i][0])
          Vue.set(_this.value[i],data[i][0].value || data[i][0])
        }
      }
      for (let i = 0; i < data.length; i++) {
        _this.scroller[i] && _this.scroller[i].destroy()
        _this.scroller[i] = new Scroller(_this.getId(i), {
          data: data[i],
          defaultValue: value[i] || data[i][0].value,
          itemClass: _this.item_class,
          onSelect (value) {
            // _this.value.$set(i, value)
            // _this.value[i]=value
            Vue.set(_this.value[i],value)
            vm.$emit('on-change', _this.getValue())
            if (_this.col !== 0) {
              _this.renderChain(i + 1)
            }
          }
        })
        if (_this.value) {
          _this.scroller[i].select(value[i])
        }
      }
    },
    renderChain (i) {
      if (this.col === 0) {
        return
      }

      // do not render for last scroller
      if (i > this.count - 1) {
        return
      }

      const _this = this
      let ID = this.getId(i)
      // destroy old one
      this.scroller[i].destroy()
      let list = this.store.getChildren(_this.getValue()[i - 1])
      this.scroller[i] = new Scroller(ID, {
        data: list,
        itemClass: _this.item_class,
        onSelect (value) {
          // _this.value.$set(i, value)
          Vue.set(_this.value[i],value)
          vm.$emit('on-change', _this.getValue())
          _this.renderChain(i + 1)
        }
      })
      // this.value.$set(i, list[0].value)
      Vue.set(this.value[i],list[0].value)
      this.renderChain(i + 1)
    },
    getValue () {
      let data = []
      for (var i = 0; i < this.data.length; i++) {
        data.push(this.scroller[i].value)
      }
      return data
    }
  },
  data () {
    return {
      scroller: [],
      count: 0,
      uuid: Math.random().toString(36).substring(3, 8)
    }
  },
  watch: {
    value (val, oldVal) {
      // render all the scroller for chain datas
      if (this.col !== 0) {
        if (val !== oldVal) {
          this.data = this.store.getColumns(val)
          this.$nextTick(function () {
            this.render(this.data, val)
          })
        }
      } else {
        for (let i = 0; i < val.length; i++) {
          if (this.scroller[i].value !== val[i]) {
            this.scroller[i].select(val[i])
          }
        }
      }
    },
    data (newData) {
      if (Object.prototype.toString.call(newData[0]) === '[object Array]') {
        this.$nextTick(() => {
          this.render(newData, this.value)
          // emit on-change after rerender
          this.$nextTick(() => {
            vm.$emit('on-change', this.getValue())
          })
        })
      } else {
        if (this.col !== 0) {
          const length = this.col
          this.store = new Manager(newData, length)
          this.data = this.store.getColumns(this.value)
        }
      }
    }
  },
  beforeDestroy () {
    for (let i = 0; i < this.count; i++) {
      this.scroller[i].destroy()
      this.scroller[i] = null
    }
  }
}
</script>

<style>
@import './scroller.css';
</style>

