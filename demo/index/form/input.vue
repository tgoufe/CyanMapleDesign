<template>
    <div class="padding20" id="inputDemo">
        <div class="example tag-container">
            <cmui-input v-bind="options" :target-class="targetClass">
             <span :class="options.align==='left'?'marginr20':'marginl20'">
                 slot
             </span>
            </cmui-input>
        </div>
        <div class="form tag-container config">
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
        </div>
        <div class="tag-container otherExp">
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
