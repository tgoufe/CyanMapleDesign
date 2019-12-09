<template>
    <div id="checkboxDemo">
        <p class="title paddingv20 paddingh30">热门城市</p>
        <div class="paddingh40 paddingv20">
            <div class="example tag-container form ">
                
                <cmui-checkbox class="marginr20"
                v-for="(value,key) in cityList"
                :key="value"
                v-model="checkedIndex[key]"
                :label="value"
                v-bind="options"
                :target-class="targetClass"
                @before-change="xxx"
                ></cmui-checkbox>
                <p class="paddingt20">
                    你的选择是：<span class="marginr20" v-for="item in checkedCity" v-text="item"></span>
                </p>
            </div>
        </div>
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
            <div class="btn-group flex-container">
                <span class="text-white left flex2" style="min-width: 55px;">文本位置</span>
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
                        v-model="options.disabled">Disabled</cmui-checkbox>
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
                    <cmui-checkbox v-model="options.flex" target-class="switch" :flex="true">
                        是否使用flex布局
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.disabled" target-class="switch" :flex="true">
                        disabled
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <p>target-class</p>
                    <div class="flex-container">
                        <cmui-checkbox v-for="item in targetClassList"  v-model="item.value" target-class="small">
                            {{ item.text }}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div> -->
        <p class="title paddingv20 paddingh30">全选</p>
        <div class="example tag-container form">
            <div class="paddingh40 paddingt20">
                <cmui-checkbox
                v-model="demoList"
                label="全选"
                path="value"
                target-class="square reverse"
                ></cmui-checkbox>
            </div>
            
            <div class="paddingv20 paddingh40">
                <cmui-checkbox
                    class="marginr20"
                    v-for="item in demoList"
                    v-model="item.value"
                    :label="item.label"
                    target-class="small square reverse"
                ></cmui-checkbox>
            </div>
            
        </div>
    </div>
</template>
<style lang="scss">
    #checkboxDemo{
        .form{
            .cmui-list-item-container{
                padding:1px;
            }
        }
    }
</style>
<script type="text/javascript">
export default {
  data: function() {
    let cityList = ['北京', '上海', '广州', '深圳']
    return {
      options: {
        align: 'left',
        disabled: false,
        value: '',
        flex: false,
        switch: false
      },
      cityList,
      checkedIndex: _.fill(Array(cityList.length), false),
      targetClassList: ['small', 'big', 'square', 'reverse', 'switch'].map(item => ({ text: item, value: false })),
      demoList: ['北京', '上海', '广州', '深圳'].map(item => ({ label: item, value: false }))
    }
  },
  computed: {
    targetClass() {
      return this.targetClassList.filter(item => item.value).map(item => item.text).join(' ')
    },
    checkedCity() {
      return this.cityList.filter((item, index) => this.checkedIndex[index] === true)
    }

  },
  methods: {
    xxx(value, resolve, reject) {
      _.delay(resolve, 1000)
    }
  }
}
</script>
