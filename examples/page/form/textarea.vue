<template>
    <div>
        <div class="example tag-container padding40">
            <cmui-textarea
            v-model="options.value"
            v-bind="options"
            :target-class="targetClass"
            >
                <span class="marginr20">Text</span>
            </cmui-textarea>
        </div>
<!--         <div class="form tag-container config">
            <cmui-list :space="10">
                <cmui-list-item>
                    <div class="flex-container">
                        <label>文本显示位置</label>
                        <div class="">
                            <cmui-radio v-model="options.align" name="align" label="left">
                                左侧
                            </cmui-radio>
                            <cmui-radio v-model="options.align" name="align" label="right">
                                右侧
                            </cmui-radio>
                        </div>
                    </div>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.auto" target-class="switch" :flex="true">
                        是否自动高度
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item> -->
                    <!--<cmui-checkbox @change="limitMax" v-model="max" target-class="switch" :flex="true">-->
                        <!--限制最大输入数量-->
                    <!--</cmui-checkbox>-->
                <!-- </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.flex" target-class="switch" :flex="true">
                        是否使用flex结构
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <p>target-class</p>
                    <div class="">
                        <cmui-checkbox v-for="(item,key) in targetClassList" :key="key" v-model="item.value">
                            {{ item.text }}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div> -->
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
            <div class="btn-group flex-container">
                <span class="text-white left flex2" style="min-width: 55px;">位置</span>
                <div class="flex-container flex3" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="options.align='left'" :class="options.align=='left'?'badgeCurrent':'badgeDefault'">Left</div></div>
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="options.align='right'" :class="options.align=='right'?'badgeCurrent':'badgeDefault'">Right</div></div>
                </div>
            </div>
            <div class="form NewStyle">
                <div class="flex-container marginv30">
                    <div class="flex1 marginr50">
                        <cmui-checkbox
                        :flex="true"
                        target-class="switch"
                        class="text-white"
                        v-model="options.flex">flex布局</cmui-checkbox>
                    </div>
                    <div class="flex1 marginl50">
                        <cmui-checkbox
                        :flex="true"
                        target-class="switch"
                        class="text-white"
                        v-model="options.auto">自动高度</cmui-checkbox>
                    </div>
                </div>
            </div>
            <div class="form NewStyle">
                <div class="paddingv20 text-white">Target-Class</div>
                <div class="flex-container paddingv40 formNewStyle" style="margin:0 -2px;">
                    <div class="btn flex1" v-for="(item,key) in targetClassList" :class="item.value && 'current'" @click="item.value = !item.value" v-text="item.text"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      options: {
        auto: false,
        value: '',
        align: 'left',
        flex: false,
        max: -1
      },
      targetClassList: ['radius', 'reverse', 'center', 'bottom'].map(item => ({ text: item, value: false }))
    }
  },
  computed: {
    targetClass() {
      return this.targetClassList.filter(item => item.value).map(item => item.text).join(' ')
    }
  },
  methods: {
    limitMax(value) {
      // this.options.max=value?50:-1;
    }
  }
}
</script>
