<template>
    <div id="checkboxDemo" class="paddingb600">
        <p class="title paddingv20 paddingh30">热门城市</p>
        <div class="paddingh40 paddingv20">
          <cmui-checkbox-group v-model="btnValue" :targetClass="targetClass">
            <cmui-checkbox v-for="(item,index) in cityList" :flex="options.flex" :align="options.align" :key="index" :label="item"></cmui-checkbox>
          </cmui-checkbox-group>
          <p class="paddingt20">
            你的选择是：{{btnValue}}
          </p>
        </div>
        <p class="title paddingv20 paddingh30">全选</p>
        <div class="paddingh40 paddingt20 form">
            <cmui-checkbox v-model="demoList" label="全选" path="value" :targetClass="targetClass"></cmui-checkbox>
            <cmui-checkbox-group v-model="btnValue" :targetClass="targetClass">
              <cmui-checkbox v-for="(item,index) in demoList" :flex="options.flex" :align="options.align" :key="index" v-model="item.value" :label="item.label"></cmui-checkbox>
            </cmui-checkbox-group>
        </div>
        <p class="title paddingv20 paddingh30">按钮样式</p>
        <div class="paddingh40 paddingv20">
          <cmui-checkbox-group v-model="btnValue" :targetClass="targetClass+' btn radius4'">
            <cmui-checkbox v-for="(item,index) in cityList" :flex="options.flex" :align="options.align" :key="index" :label="item"></cmui-checkbox>
          </cmui-checkbox-group>  
        </div>
        <p class="title paddingv20 paddingh30">按钮合并组</p>
        <div class="paddingh40 paddingv20">
          <cmui-checkbox-group v-model="btnValue" :targetClass="targetClass+' btn radius4'" class="group">
            <cmui-checkbox v-for="(item,index) in cityList" :flex="options.flex" :align="options.align" :key="index" :label="item"></cmui-checkbox>
          </cmui-checkbox-group>
        </div>
        <p class="title paddingv20 paddingh30">switch样式</p>
        <div class="paddingh40 paddingv20">
          <cmui-checkbox-group v-model="btnValue" :targetClass="targetClass+' switch'">
            <cmui-checkbox v-for="(item,index) in cityList" :flex="options.flex" :align="options.align" :key="index" :label="item"></cmui-checkbox>
          </cmui-checkbox-group>
        </div>
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:10">
            <div class="btn-group flex-container">
                <span class="text-white left flex2" style="min-width: 55px;">文本位置</span>
                <div class="flex-container flex3" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="options.align='left'" :class="options.align=='left'?'badgeCurrent':'badgeDefault'">Left</div></div>
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="options.align='right'" :class="options.align=='right'?'badgeCurrent':'badgeDefault'">Right</div></div>
                </div>
            </div>
            <div class="form NewStyle flex-container marginv30">
              <cmui-checkbox :flex="true" target-class="switch" class="text-white flex1 marginr50" v-model="options.flex">flex布局</cmui-checkbox>
              <cmui-checkbox :flex="true" target-class="switch" class="text-white flex1 marginl50" v-model="options.disabled">Disabled</cmui-checkbox>
            </div>
            <div class="form NewStyle">
                <div class="paddingv20 text-white">Target-Class</div>
                <div class="flex-container paddingv40 formNewStyle" style="margin:0 -2px;">
                    <div class="btn flex1" v-for="(item,key) in targetClassList" :class="item.value && 'current'" @click="item.value = !item.value" v-text="item.text" :key="key"></div>
                </div>
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
      t:'',
      btnValue:[],
      options: {
        align: 'left',
        disabled: false,
        flex: false
      },
      cityList,
      targetClassList: ['small', 'big', 'square', 'reverse'].map(item => ({ text: item, value: false })),
      demoList: cityList.map(item => ({ label: item, value: false }))
    }
  },
  computed: {
    targetClass() {
      return this.targetClassList.filter(item => item.value).map(item => item.text).join(' ')
    },
  }
}
</script>
