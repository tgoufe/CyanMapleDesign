<template>
    <div id="radioDemo">
        <p class="title paddingv20 paddingh30">通用样式</p>
        <div class="paddingh40 paddingv20">
          <cmui-radio-group v-model="options.value" :targetClass="targetClass">
            <cmui-radio :flex="options.flex" :disabled="options.disabled" :align="options.align" label="北京"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="上海"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="广州"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="深圳"></cmui-radio>
          </cmui-radio-group>
        </div>
        <p class="title paddingv20 paddingh30">按钮样式</p>
        <div class="paddingh40 paddingv20">
          <cmui-radio-group v-model="options.value2" :targetClass="targetClass+' btn radius4'">
            <cmui-radio :flex="options.flex" :disabled="options.disabled" :align="options.align" label="北京"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="上海"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="广州"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="深圳"></cmui-radio>
          </cmui-radio-group>
        </div>
        <p class="title paddingv20 paddingh30">按钮合并组</p>
        <div class="paddingh40 paddingv20">
          <cmui-radio-group v-model="options.value3" :targetClass="targetClass+' btn radius4'" class="group">
            <cmui-radio :flex="options.flex" :disabled="options.disabled" :align="options.align" label="北京"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="上海"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="广州"></cmui-radio>
            <cmui-radio :flex="options.flex" :align="options.align" label="深圳"></cmui-radio>
          </cmui-radio-group>
        </div>
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
            <div class="btn-group flex-container">
              <span class="text-white left flex2" style="min-width: 55px;">位置</span>
              <div class="flex-container flex3" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                  <div class="flex1 flex-container center" style="padding:3px;"><div class="badge pill blue" @click="options.align='left'" :class="options.align=='left'?'badgeCurrent':'badgeDefault'">Left</div></div>
                  <div class="flex1 flex-container center" style="padding:3px;"><div class="badge pill blue" @click="options.align='right'" :class="options.align=='right'?'badgeCurrent':'badgeDefault'">Right</div></div>
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
        
    </div>
</template>
<style lang="scss">
    #radioDemo{
        .form{
            .cmui-list-item-container{
                padding:1px;
            }
        }
    }
</style>
<script type="text/javascript">
    export default {
        data:function(){
            return {
                options:{
                    align:'left',
                    disabled:false,
                    value:'北京',
                    value2:'北京',
                    value3:'北京',
                    flex:false
                },
                targetClassList:['small','big','square','reverse','light'].map(item=>({text:item,value:false})),
            }
        },
        computed:{
          targetClass(){
            return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
          }
        },
    }
</script>