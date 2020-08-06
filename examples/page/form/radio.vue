<template>
    <div id="radioDemo">
        <!-- <p class="title paddingv20 paddingh30">通用样式</p>
        <cmui-radio-group v-model="options.value" :target-class="targetClass">
          <cmui-radio label="男" :flex="options.flex" :disabled="options.disabled"></cmui-radio>
          <cmui-radio label="女" :flex="options.flex" :disabled="options.disabled"></cmui-radio>
        </cmui-radio-group>
        <p class="title paddingv20 paddingh30">按钮样式</p>
        <cmui-radio-group v-model="options.value" :target-class="targetClass+' btn'">
          <cmui-radio label="男" :flex="options.flex" :disabled="options.disabled"></cmui-radio>
          <cmui-radio label="女" :flex="options.flex" :disabled="options.disabled"></cmui-radio>
        </cmui-radio-group> -->
        <p>通用类</p>
        <p>常见展示方式</p>
        <cmui-radio-group v-model="options.value">
          <cmui-radio label="默认" target-class=""></cmui-radio>
          <cmui-radio label="翻转" target-class="reverse"></cmui-radio>
          <cmui-radio label="方形" target-class="square"></cmui-radio>
          <cmui-radio label="方形翻转" target-class="square reverse"></cmui-radio>
        </cmui-radio-group>
        <p>小尺寸</p>
        <cmui-radio-group v-model="options.value" target-class="small">
          <cmui-radio label="默认" target-class=""></cmui-radio>
          <cmui-radio label="翻转" target-class="reverse"></cmui-radio>
          <cmui-radio label="方形" target-class="square"></cmui-radio>
          <cmui-radio label="方形翻转" target-class="square reverse"></cmui-radio>
        </cmui-radio-group>
        <p>右侧展示文字</p>
        <cmui-radio-group v-model="options.value">
          <cmui-radio align="right" label="默认" target-class=""></cmui-radio>
          <cmui-radio align="right" label="翻转" target-class="reverse"></cmui-radio>
          <cmui-radio align="right" label="方形" target-class="square"></cmui-radio>
          <cmui-radio align="right" label="方形翻转" target-class="square reverse"></cmui-radio>
        </cmui-radio-group>
        <p>按钮展示</p>
        <cmui-radio-group v-model="options.value" target-class="btn">
          <cmui-radio label="默认" target-class=""></cmui-radio>
          <cmui-radio label="清淡" target-class="light"></cmui-radio>
          <cmui-radio label="翻转" target-class="reverse"></cmui-radio>
          <cmui-radio label="方形翻转" target-class="square reverse"></cmui-radio>
        </cmui-radio-group>
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1;display:none">
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
    .formNewStyle{
        .cmui-radio span{
            display:none
        }
        .btn{
            border-radius:32px;
            border:2px solid #fff;
            background:none;
            padding: 1px 10px;
            margin:0 2px;
            font-size:12px;
            &.current{
                color:#fff;
                background:#00baba;
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
                    value:'默认',
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