<template>
    <div id="inputDemo">
      <p class="title paddingv20 paddingh30">默认input</p>
      <div class="paddingh40 paddingv20">
        <cmui-input v-bind="options" :target-class="targetClass+' radius3'">
          <span class="marginh20">slot文本</span>
        </cmui-input>
      </div>
      <p class="title paddingv20 paddingh30">使用CMUI设置append</p>
      <div class="paddingh40 paddingv20">
        <cmui-input placeholder="www.bingshangroup.com"  target-class="radius4">
          <!-- <template v-slot:prepend>123</template> -->
            <cmui-select slot="prepend" :data="demo1.list" v-model="demo1.value" :picker="true"> </cmui-select>
        </cmui-input>
      </div>
      <p class="title paddingv20 paddingh30">使用原生设置prepend</p>
      <div class="paddingh40 paddingv20">
        <cmui-input placeholder="www.bingshangroup.com" target-class="radius5">
            <select name="" id="" slot="append" style="width:70px;margin:-4px -13px">
                <option :value="item" v-for="(item,key) in demo1.list2" :key="key" v-text="item"></option>
            </select>
        </cmui-input>
      </div>
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
                    <cmui-checkbox class="flex1" v-model="options.prependDisabled" target-class="switch" ><span class="text-white">前置</span></cmui-checkbox>
                    <cmui-checkbox class="flex1" v-model="options.appendDisabled" target-class="switch" ><span class="text-white">后置</span></cmui-checkbox>
                    <cmui-checkbox class="flex1" v-model="options.reset" target-class="switch" ><span class="text-white">重置</span></cmui-checkbox>
                </div>
            </div>
            <div class="form NewStyle">
                <div class="flex-container marginv30">
                    <div class="text-white marginr30">Type</div>
                    <div class="themeSlidebar flex1">
                        <cmui-select target-class="radius" :data="data" v-model="options.type">
                        </cmui-select>
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
    #inputDemo{
      padding-bottom:400px;
        .form{
            .cmui-list-item-container{
                padding:1px;
            }
        }
    }
    .NewStyle{
        select{
            background: rgba(102,102,102,0.60);
            border-radius: 16px;
            font-size: 12px;
            color: #00baba;
            letter-spacing: 0;
            line-height: 32px;
            border: 0;
            padding: 0 20px;
        }
        .cmui-select__main{
            position: relative;
            &:after{
                content:'';
                position: absolute;
                width: 0; 
                height: 0;
                top:13px;
                right:20px;
                border-width: 4px;
                border-style: solid;
                border-color: #00baba transparent transparent transparent;
            }
        }
    }
</style>
<script>
export default {
  data: function() {
    return {
      options: {
        type: "text",
        value: "input输入框",
        reset: true,
        prepend: "前置",
        append: "后置",
        prependDisabled: false,
        appendDisabled: false,
        placeholder: "请输入内容",
        label: "",
        align: "left",
      },
      targetClassList:['small','big','reverse'].map(item=>({text:item,value:false})),
      data:['color','date','datetime-local','datetime','email','month','number','password','search','tel','text','time','url','week'],
      demo1:{
        list:['http://','https://'],
        value:'http://',
        list2:['.cn','.com','.net','.org']
      }
    };
  },
  computed:{
    targetClass(){
      return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
    }
  }
};
</script>
