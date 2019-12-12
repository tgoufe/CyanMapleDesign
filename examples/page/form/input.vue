<template>
    <div id="inputDemo">
        <div class="example tag-container padding30">
            <cmui-input v-bind="options" :target-class="targetClass">
             <span :class="options.align==='left'?'marginr20':'marginl20'">
                 slot
             </span>
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
                    <div class="text-white marginr30">前置</div>
                    <div class="themeSlidebar flex1">
                        <cmui-input v-model="options.prepend" target-class="radius" placeholder="添加文本内容">
                        </cmui-input>
                    </div>
                    <div class="marginl10">
                        <cmui-checkbox v-model="options.prependDisabled" target-class="switch" :flex="true"/>
                    </div>
                </div>
                <div class="flex-container marginv30">
                    <div class="text-white marginr30">后置</div>
                    <div class="themeSlidebar flex1">
                        <cmui-input v-model="options.append" target-class="radius" placeholder="添加文本内容">
                        </cmui-input>
                    </div>
                    <div class="marginl10">
                        <cmui-checkbox v-model="options.appendDisabled" target-class="switch" :flex="true"/>
                    </div>
                </div>
            </div>
            <div class="form NewStyle">
                <div class="flex-container marginv30">
                    <div class="flex1">
                        <cmui-checkbox
                        :flex="true"
                        target-class="switch"
                        class="text-white"
                        v-model="options.reset">重置按钮</cmui-checkbox>
                    </div>
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
<!--         <div class="form tag-container config">
            <cmui-list :space="10">
                <cmui-list-item>
                    <cmui-checkbox v-model="options.reset" target-class="switch" :flex="true">
                        是否显示重置按钮
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.prependDisabled" target-class="switch" :flex="true">
                    禁用前置文本
                    </cmui-checkbox>
                    <cmui-input v-model="options.prepend" target-class="radius">
                        <span class="marginr20">文本内容</span>
                    </cmui-input>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.appendDisabled" target-class="switch" :flex="true">
                    禁用后置文本
                    </cmui-checkbox>
                    <cmui-input v-model="options.append" target-class="radius">
                        <span class="marginr20">文本内容</span>
                    </cmui-input>
                </cmui-list-item>
                <cmui-list-item>
                    <div class="flex-container">
                        <label>文本显示位置</label>
                        <div class="">
                            <cmui-radio name="align" v-model="options.align" label="left">
                                左侧
                            </cmui-radio>
                            <cmui-radio name="align" v-model="options.align" label="right">
                                右侧
                            </cmui-radio>
                        </div>
                    </div>
                </cmui-list-item>
                <cmui-list-item>
                    <p>target-class</p>
                    <div class="flex-container">
                        <cmui-checkbox v-for="(item,key) in targetClassList" :key="key" v-model="item.value">
                            {{item.text}}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-select target-class="radius" :data="data" v-model="options.type">
                        <span class="marginr20">type</span>
                    </cmui-select>
                </cmui-list-item>
            </cmui-list>
        </div> -->
        <div class="tag-container otherExp margint20">
            <cmui-input target-class="" placeholder="www.bingshangroup.com">
                <cmui-select
                    slot="prepend"
                    :data="demo1.list"
                    v-model="demo1.value"
                    :picker="true"
                    target-class=""
                >
                </cmui-select>
                <select name="" id="" slot="append" style="width:70px">
                    <option :value="item" v-for="(item,key) in demo1.list2" :key="key" v-text="item"></option>
                </select>
            </cmui-input>
        </div>
    </div>
</template>
<style lang="scss">
    #inputDemo{
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
      targetClassList:['small','big','radius','reverse'].map(item=>({text:item,value:false})),
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
