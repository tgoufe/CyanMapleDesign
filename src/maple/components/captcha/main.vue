<template>
  <div class="cmui-captcha">
    <div
      class="cmui-captcha__warp flex-container center"
      @click="inputStart"
    >
      <div
        v-for="(item, index) in length"
        :key="index"
        class="cmui-captcha__item ratio-container pos-r"
        :class="{ active: index === activeIndex }"
      >
        <span class="flex-container center">
          <span
            v-if="hide && index < selfValue.length"
            class="cmui-captcha__dot"
          />
          <template v-else>{{ selfValue[index] }}</template>
          <span
            v-if="index === activeIndex"
            class="cmui-captcha__line"
          />
        </span>
      </div>
    </div>
    <form action="">
      <input
        ref="input"
        v-model="selfValue"
        :type="type === 'number' ? 'tel' : 'text'"
        name=""
        class="cmui-captcha__input"
        @blur="inputBlur"
      >
    </form>
  </div>
</template>
<style type="text/css" lang="scss">
.cmui-captcha__input {
  position: absolute;
  left: -99.99rem;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.cmui-captcha__item {
  &.active {
    .cmui-captcha__line {
      height: 50%;
      width: 1px;
    }
  }
}
</style>
<script type="text/javascript">
export default {
  name: 'cmui-captcha',
  props: {
    length: { type: Number, default: 4, intro: '允许输入的最大长度' },
    type: { type: String, default: 'number', intro: '输入的类型，可选项为number|string' },
    hide: { type: Boolean, default: false, intro: '是否隐藏输入文本并用点表示' },
    value: { type: String, default: '', intro: 'v-model绑定的内容' }
  },
  data: function () {
    return {
      activeIndex: -1
    }
  },
  computed: {
    selfValue: {
      get () {
        if (this.type === 'number') {
          if (!/^\d+$/.test(this.value) && this.value.length) {
            return ''
          }
        }
        return this.value
      },
      set (value) {
        if (this.type === 'number') {
          if (!/^\d+$/.test(value) && value.length) {
            return
          }
        }
        if (value.length >= this.length) {
          this.inputEnd()
        }
        this.setActiveIndex()
        this.$emit('input', value)
      }
    }
  },
  // watch: {
  //   value: {
  //     immediate: true,
  //     handler (newValue, oldValue) {
  //       if (this.type === 'number') {
  //         if (!/^\d+$/.test(newValue) && newValue.length) {
  //           this.value = /^\d+$/.test(oldValue) ? oldValue : ''
  //           return
  //         }
  //       }
  //       if (newValue.length >= this.length) {
  //         this.inputEnd()
  //       }
  //       this.setActiveIndex()
  //     }
  //   }
  // },
  created () {
    this.setActiveIndex(-1)
  },
  methods: {
    inputStart () {
      this.$refs.input.focus()
      this.setActiveIndex()
    },
    inputEnd () {
      this.$refs.input.blur()
      this.$emit('inputEnd', this.value, this)
    },
    inputBlur () {
      this.setActiveIndex(-1)
    },
    setActiveIndex (index) {
      this.activeIndex = index ? -1 : this.value.length
    }
  }
}
</script>
