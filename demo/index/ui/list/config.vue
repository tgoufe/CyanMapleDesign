<template>
    <div class="padding20">
        <div class="example tag-container">
            <cmui-list v-bind="options">
                <cmui-list-item :key="key" v-for="(item,key) in list" class="bg-white">
                    <div class="ratio-container">
                        <div class="img-container flex-x">
                            <img :src="item">
                        </div>
                    </div>
                </cmui-list-item>
            </cmui-list>
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
            <cmui-slidebar v-model="options.space" :step="1" class="margint20" :range="50"></cmui-slidebar>
        </div>
    </div>
</template>
<script>
    export default{
        data:function(){
          return{
            options:{
              border:true,
              col:5,
              space:10
            },
            list:_.times(10,i=>{
                return location.origin+'/dist/image/black'+i+'.jpg';
            })
          }
        }
    }
</script>
