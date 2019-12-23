<template>
  <div>
    <div class="">
      <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
        <div class="btn-group flex-container">
          <span class="text-white left" style="min-width: 55px;">位置</span>
          <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='flex'" :class="tabCol=='flex'?'badgeCurrent':'badgeDefault'">Flex</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='auto'" :class="tabCol=='auto'?'badgeCurrent':'badgeDefault'">Auto</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol=3" :class="tabCol=='3'?'badgeCurrent':'badgeDefault'">3</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol=4" :class="tabCol=='4'?'badgeCurrent':'badgeDefault'">4</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='center'" :class="tabCol=='center'?'badgeCurrent':'badgeDefault'">center</div></div>
          </div>
        </div>
        <div class="btn-group flex-container marginv30">
          <span class="text-white left" style="min-width: 55px;">位置</span>
          <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabPosition='left'" :class="tabPosition=='left'?'badgeCurrent':'badgeDefault'">Left</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabPosition='right'" :class="tabPosition=='right'?'badgeCurrent':'badgeDefault'">Right</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabPosition='top'" :class="tabPosition=='top'?'badgeCurrent':'badgeDefault'">Top</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabPosition='bottom'" :class="tabPosition=='bottom'?'badgeCurrent':'badgeDefault'">Bottom</div></div>
          </div>
        </div>
        <div class="form NewStyle">
          <div class="flex-container marginv30">
              <div class="flex1 marginr50">
                  <cmui-checkbox
                  :flex="true"
                  target-class="switch"
                  class="text-white"
                  v-model="tabNav[0]">Pre</cmui-checkbox>
              </div>
              <div class="flex1 marginl50">
                  <cmui-checkbox
                  :flex="true"
                  target-class="switch"
                  class="text-white"
                  v-model="tabNav[1]">Next</cmui-checkbox>
              </div>
          </div>
      </div>
      </div>
    </div>
    <cmui-tabbar
      ref="tab"
      :col="tabCol"
      :position="tabPosition"
      :nav="tabNav"
      :watch="tabbarData"
      class="theme1"
      @extra-click="extra"
      @item-click="navItem"
    >
      <cmui-tabbar-item
        v-for="(item,index) in tabbarData"
        :key="index"
      >
        <div
          slot="title"
          class=""
        >
          <span>{{ item.title }}</span>
        </div>
        <div>
          <p class="text-coffee padding40">这里是标签{{ item.title }}对应的内容区域</p>
        </div>
      </cmui-tabbar-item>
    </cmui-tabbar>
  </div>
</template>
<script>
let count = 0
export default {
  data: function () {
    return {
      tabbarData: _.times(5, index => {
        return {
          title: 'tab' + index
        }
      }),
      tabPosition: 'top',
      tabNav: [false, false],
      tabCol: 'auto'
    }
  },
  mounted () {
    this.$root.headTitle = 'tabbar'
  },
  methods: {
    add () {
      this.tabbarData.push({
        title: 'new Tab' + ++count
      })
    },
    extra (vm, item, index) {
      console.log(arguments)
    },
    navItem () {
      console.log(arguments)
    }
  }
}
</script>
