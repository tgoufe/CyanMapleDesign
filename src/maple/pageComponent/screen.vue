<template>
    <div class="cmui-screen" :style="{minHeight:navMinHeight}" :class="{active:actived}">
        <div v-if="actived" class="mask" style="z-index: auto" @click="cancel()"></div>
        <div ref="nav" class="flex-container cmui-screen__nav" :class="{'fixed-top':actived}"
             :style="{top:top}"
        >
            <div
                v-for="(child,i) in children"
                :key="i"
                class="cmui-screen__title"
                :class="{active:i===index}"
                :style="{color:i===index?color:undefined}"
                @click="titleEvent(i)"
            >
                {{ child.title }}
                <span class="cmui-screen__arrow" :style="{borderBottomColor:i===index?color:undefined}"></span>
            </div>
            <div v-show="actived" class="abs-top cmui-screen_warp" :style="{top:navMinHeight}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'cmuiScreen',
  props: {
    top: { type: String, default: '0px' },
    color: { type: String, default: 'blue' }
  },
  data: () => ({
    children: [],
    navMinHeight: '0',
    actived: false,
    index: null
  }),
  provide() {
    return {
      cmuiScreen: this
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.navMinHeight = this.$refs.nav.offsetHeight + 'px'
    })
  },
  methods: {
    titleEvent(index) {
      this.active(index)
    },
    active(index) {
      this.actived = true
      this.index = index
      this.children.forEach(item => item.cancel())
      this.children[index].active()
    },
    cancel() {
      this.actived = false
      this.index = null
    }
  }

}
</script>

<style lang="scss" type="text/scss">
.cmui-screen{
    color:#666;
    background: white;
}
.cmui-screen__nav{
    background-color: white;
    border-bottom:1px solid #ccc;
    &.active{
        position: fixed;
        top:0;
    }
}
.cmui-screen_warp{
    background-color: white;
}
.cmui-screen__arrow{

}
.cmui-screen__title{
    padding:0.266666rem;
    position: relative;
    .cmui-screen__arrow{
        display: inline-block;
        border-top: 7px solid #b7b7b7;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 0;
        margin-left: 6px;
    }
    &.active{
        .cmui-screen__arrow{
            border-top:0;
            border-bottom: 7px solid transparent;
            transform: translateY(-50%);
        }
    }
}
</style>
