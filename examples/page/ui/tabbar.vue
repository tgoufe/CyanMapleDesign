<template>
  <div>
    <div class="">
      <p class="title paddingv20 paddingh30">默认的滑动，当前值罚50</p>

      <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
        <div class="btn-group flex-container">
          <span class="text-white left" style="min-width: 55px;">位置</span>
          <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='flex'" :class="tabCol=='flex'?'badgeCurrent':'badgeDefault'">Flex</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='auto'" :class="tabCol=='auto'?'badgeCurrent':'badgeDefault'">Auto</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='3'" :class="tabCol=='3'?'badgeCurrent':'badgeDefault'">3</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='4'" :class="tabCol=='4'?'badgeCurrent':'badgeDefault'">4</div></div>
            <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="tabCol='5'" :class="tabCol=='5'?'badgeCurrent':'badgeDefault'">5</div></div>
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
<!--       <div class="flex-container paddingt20">
        <label for>位置</label>
        <div class="btn-group">
          <a
            href="javascript:void(0)"
            class="btn blue small reverse radius"
            @click="tabPosition='top'"
          >上</a>
          <a
            href="javascript:void(0)"
            class="btn blue small reverse radius"
            @click="tabPosition='bottom'"
          >下</a>
          <a
            href="javascript:void(0)"
            class="btn blue small reverse radius"
            @click="tabPosition='left'"
          >左</a>
          <a
            href="javascript:void(0)"
            class="btn blue small reverse radius"
            @click="tabPosition='right'"
          >右</a>
        </div>
      </div>
      <div class="paddingt20 form green flex-container">
        <label for>nav选项</label>
        <div>
          <label
            for="###"
            class="lh-28"
          >pre
            <input
              v-model="tabNav[0]"
              type="checkbox"
              class="checkbox-switch"
            /></label>
          <label
            for="###"
            class="lh-28"
          >next
            <input
              v-model="tabNav[1]"
              type="checkbox"
              class="checkbox-switch"
            /></label>
        </div>
      </div>
      <div class="paddingt20 form flex-container">
        <label for="###">展示类型</label>
        <select
          id
          v-model="tabCol"
          name
          class="flex1 marginl20"
        >
          <option value="auto">
            auto
          </option>
          <option value="flex">
            flex
          </option>
          <option
            v-for="i in [3,4,5,6,7]"
            :key="i"
            :value="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
      <a
        href="javascript:void(0)"
        class="btn green block margint20 radius"
        @click="add"
      >添加新标签</a> -->
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
        <div
          slot="content"
          class=""
        >
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
