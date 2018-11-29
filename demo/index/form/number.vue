<template>
    <div class="padding20" id="selectDemo">
        <div class="example tag-container">
            <cmui-number
            v-bind="options"
            :target-class="targetClass"
            @max="maxHandle"
            @min="minHandle"
            @input="inputHandle"
            v-model="options.value">
                <span :class="(options.align==='left')?'marginr20':'marginl20'">
                    数字输入框
                </span>
            </cmui-number>
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
                    <p>target-class</p>
                    <div class="flex-container">
                        <cmui-checkbox :key="key" v-for="(item,key) in targetClassList" v-model="item.value">
                            {{item.text}}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div>
        <div class="otherExp tag-container">
            <p>带有延时的按钮，例如点击加减号的时候需要通过ajax的状态判断是否增加，下面的案例用setTimeout来模拟</p>
            <cmui-number :before-change="demoBefore" v-model="demoValue">
                <span class="marginr20">异步按钮</span>
            </cmui-number>
        </div>
        <div class="otherExp tag-container">
            <p>通过设置flex属性为true可以修改为两端对齐的样式，如果想调整输入框宽度可以使用width属性，可以是数字，也可以是字符串</p>
            <cmui-number v-model="demoValue" :flex="true" :width="100">
                <span class="marginr20">异步按钮</span>
            </cmui-number>
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
        max:5,
        min:-5,
        value:0,
        align:'left'
      },
      targetClassList:['small','big','radius','reverse'].map(item=>({text:item,value:false})),
      demoBefore:function(value,next){
        _.delay(function(){
            next();
        },1000)
      },
      demoValue:20
    };

  },
  computed:{
    targetClass(){
      return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
    }
  },
  methods:{
    maxHandle(value){
        maple.alert('最大值为'+value)
    },
    minHandle(value){
        maple.alert('最小值为'+value)
    }
  }
};
</script>
