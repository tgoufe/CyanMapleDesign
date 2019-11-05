<template>
  <div>
    <div class="">
      <div class="flex-container paddingt20">
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
      >添加新标签</a>
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
          <span class="text-coffee">这里是标签{{ item.title }}对应的内容区域</span>
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
