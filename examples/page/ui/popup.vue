<template>
<div id="popupDemo padding20" style="height:1000px">
    <div class="tag-container example form">
        <a href="javascript:void(0)" class="btn red radius block" @click="visible=!visible">show popup</a>
        <cmui-select :flex="true" :data="popupPosition" v-model="popupPositionValue">弹出方向</cmui-select>
        <cmui-checkbox :flex="true" v-model="maskEvent" target-class="switch">点击背景是否关闭</cmui-checkbox>
        <cmui-checkbox :flex="true" v-model="pageScroll" target-class="switch">是否阻止页面滚动</cmui-checkbox>
    </div>
    <cmui-popup
    :visible.sync="visible"
    :position="popupPositionValue"
    :mask-event="maskEvent"
    :stop-page-scroll="pageScroll"
    >

        <a href="javascript:void(0)" class="btn red radius" @click="visible=!visible">关闭</a>
    </cmui-popup>
</div>
</template>
<script>
    export default{
      data:function(){
        return{
          visible:false,
          popupPosition:['left','right','top','bottom','center'],
          popupPositionValue:'center',
          maskEvent:true,
          pageScroll:true,
        }
      }
    }
</script>