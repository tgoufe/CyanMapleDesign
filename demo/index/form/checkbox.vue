<template>
    <div class="paddingh20" id="checkboxDemo">
        <div class="example tag-container form">
            <p>热门城市</p>
            <cmui-checkbox
            v-for="(value,key) in cityList"
            :key="key"
            :label="value"
            v-bind="options"
            v-model="checkedIndex[key]"
            :target-class="targetClass"
            />
            <p>
                你的选择是{{checkedCity|json}}
            </p>
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
                    <cmui-checkbox v-model="options.switch" target-class="switch" :flex="true">
                        switch样式
                    </cmui-checkbox>
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
                        <cmui-checkbox v-for="item in targetClassList" :key="key" v-model="item.value" target-class="small">
                            {{item.text}}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div>
        <div class="example tag-container form">
            <cmui-checkbox
            label="全选"
            v-model="demoList"
            path="value"
            target-class="square reverse"
            />
            <br>
            <cmui-checkbox
                v-model="item.value"
                v-for="(item,key) in demoList"
                :key="key"
                :label="item.label"
                target-class="small square reverse"
            />
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
        data:function(){
            let cityList=['北京','上海','广州','深圳'];
            return {
                options:{
                    align:'left',
                    disabled:false,
                    value:'',
                    flex:false,
                    switch:false
                },
                cityList,
                checkedIndex:_.fill(Array(cityList.length),false),
                targetClassList:['small','big','square','reverse','switch'].map(item=>({text:item,value:false})),
                demoList:['北京','上海','广州','深圳'].map(item=>({label:item,value:true})),
            }
        },
        computed:{
          targetClass(){
            return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
          },
          checkedCity(){
            return this.cityList.filter((item,index)=>this.checkedIndex[index]===true)
          }
          
        }
    }
</script>