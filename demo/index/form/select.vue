<template>
    <div class="padding20" id="selectDemo">
        <div class="example tag-container">
            <cmui-select v-bind="options" :target-class="targetClass" v-model="options.value">
             <span :class="options.align==='left'?'marginr20':'marginl20'">
                 slot
             </span>
            </cmui-select>
        </div>
        <div class="form tag-container config">
            <cmui-list :space="10">
                <cmui-list-item>
                    <cmui-checkbox v-model="options.picker" target-class="switch" :flex="true">
                        是否使用picker方式
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
                        <cmui-checkbox v-for="item in targetClassList" v-model="item.value">
                            {{item.text}}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div>
    </div>
</template>
<style lang="scss">
    #selectDemo{
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
        data:_.times(10,index=>'选项'+index),
        value:`选项1`,
        prepend: "前置",
        append: "后置",
        prependDisabled: false,
        appendDisabled: false,
        placeholder: "请输入内容",
        label: "",
        align: "left",
      },
      targetClassList:['small','big','radius','reverse'].map(item=>({text:item,value:false})),
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
