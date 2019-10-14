<template>
  <div class="cmui-captcha">
    <div class="cmui-captcha__warp flex-container center" @click="inputStart">
      <div
        v-for="(item, index) in length"
        class="cmui-captcha__item ratio-container pos-r"
        :class="{ active: index === activeIndex }"
      >
        <span class="flex-container center">
          <span
            v-if="hide && index < value.length"
            class="cmui-captcha__dot"
          />
          <template v-else>{{ value[index] }}</template>
          <span v-if="index === activeIndex" class="cmui-captcha__line" />
        </span>
      </div>
    </div>
    <form action="">
      <input
        ref="input"
        v-model="value"
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
    length: { type: Number, default: 4 },
    type: { type: String, default: 'number' },
    hide: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },
  data: function() {
    return {
      activeIndex: -1
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (this.type === 'number') {
          if (!/^\d+$/.test(newValue) && newValue.length) {
            this.value = /^\d+$/.test(oldValue) ? oldValue : ''
            return
          }
        }
        if (newValue.length >= this.length) {
          this.inputEnd()
        }
        this.setActiveIndex()
      }
    }
  },
  methods: {
    inputStart() {
      this.$refs.input.focus()
      this.setActiveIndex()
    },
    inputEnd() {
      this.$refs.input.blur()
      this.$emit('inputEnd', this.value, this)
    },
    inputBlur() {
      this.setActiveIndex(-1)
    },
    setActiveIndex(index) {
      this.activeIndex = index ? -1 : this.value.length
    }
  }
}
</script>
