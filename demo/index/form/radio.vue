<template>
    <div class="paddingh20" id="radioDemo">
        <div class="example tag-container form">
            <span>请选择性别：</span>
            <cmui-radio name="sex" label="男" v-model="options.value" v-bind="options" :target-class="targetClass"/>
            <cmui-radio name="sex" label="女" v-model="options.value" v-bind="options" :target-class="targetClass"/>
            <cmui-radio name="sex" label="人妖(不可选)" v-model="options.value" v-bind="options" :target-class="targetClass" :disabled="true"/>
            <p>
                你的选择是：{{options.value}}
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
                    value:'',
                    flex:false
                },
                targetClassList:['small','big','square','reverse'].map(item=>({text:item,value:false})),
            }
        },
        computed:{
          targetClass(){
            return this.targetClassList.filter(item=>item.value).map(item=>item.text).join(' ');
          }
        },
    }
</script>