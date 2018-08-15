<template>
    <div class="padding20">
        <div class="example tag-container">
            <cmui-textarea
            v-bind="options"
            v-model="options.value"
            :target-class="targetClass"
            >
                阿斯蒂芬
            </cmui-textarea>
        </div>
        <div class="form tag-container config">
            <cmui-list :space="10">
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
                    <cmui-checkbox v-model="options.auto" target-class="switch" :flex="true">
                        是否自动高度
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox @change="limitMax" v-model="max" target-class="switch" :flex="true">
                        限制最大输入数量
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.flex" target-class="switch" :flex="true">
                        是否使用flex结构
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <p>target-class</p>
                    <div class="">
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

</style>
<script>
export default {
  data: function() {
    return {
      options: {
        auto:false,
        value:'',
        align:'left',
        flex:false,
        max:-1
      },
      targetClassList:['radius','reverse','center','bottom'].map(item=>({text:item,value:false}))
    };

  },
  computed:{
    targetClass(){
      return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
    }
  },
  methods:{
    limitMax(value){
        this.options.max=value?50:-1;
    }
  }
};
</script>
