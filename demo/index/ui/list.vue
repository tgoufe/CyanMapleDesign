<template>
    <div class="padding20">
        <div class="example tag-container">
            <div class="border">
                <cmui-list v-bind="options">
                    <cmui-list-item v-for="item in list" class="bg-white">
                        123
                    </cmui-list-item>
                </cmui-list>
            </div>
            <div class="border margint20">
                <cmui-list :col="[2,3]" :border="true">
                    <cmui-list-item v-for="item in list" class="bg-white">
                        123
                    </cmui-list-item>
                </cmui-list>
            </div>
        </div>
        <div class="tag-container config form">
            <cmui-checkbox
            target-class="switch"
            v-model="options.border"
            :flex="true"
            >
            是否显示边框
            </cmui-checkbox>
            <cmui-number v-model="options.col">

            </cmui-number>
            <cmui-number v-model="options.space">

            </cmui-number>
        </div>
        <div class="otherExp tag-container">
            <cmui-list :border="true">
                <cmui-list-item v-for="item in 10" class="bg-white">
                    <cmui-swiper :right="['删除','加入黑名单','测试']" :left="['标记为未读']">
                        <div class="padding20">
                            <div class="img-container" style="width:50px">
                                <img src="https://avatars1.githubusercontent.com/u/3068804?s=40&v=4" alt="">
                            </div>
                        </div>
                    </cmui-swiper>
                </cmui-list-item>
            </cmui-list>
        </div>
    </div>
</template>
<script>
    export default{
        data:function(){
          return{
            options:{
              border:true,
              col:2,
              space:30
            },
            list:_.times(10,i=>i)
          }
        }
    }
</script>