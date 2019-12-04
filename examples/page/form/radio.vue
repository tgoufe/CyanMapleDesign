<template>
    <div id="radioDemo">
        <p class="title paddingv20 paddingh30">请选择性别</p>
        <div class="example tag-container form">
            <div class="paddingt30 paddingb10 paddingh40 flex-container formNewStyle">
                <div class="fs-16">男</div>
                <cmui-radio name="sex" label="男" v-model="options.value" v-bind="options" :target-class="targetClass"/>
            </div>
            <div class="paddingt30 paddingb10 paddingh40 flex-container formNewStyle">
                <div class="fs-16">女</div>
                <cmui-radio name="sex" label="女" v-model="options.value" v-bind="options" :target-class="targetClass"/>
            </div>
<!--             <cmui-radio name="sex" label="人妖(不可选)" v-model="options.value" v-bind="options" :target-class="targetClass" :disabled="true"/>
            <p>
                你的选择是：{{options.value}}
            </p> -->
        </div>
<!--         <div class="form tag-container config">
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
                        <cmui-checkbox :key="key" v-for="(item,key) in targetClassList" v-model="item.value">
                            {{item.text}}
                        </cmui-checkbox>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div> -->
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
            padding: 1px 15px;
            margin:0 2px;
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