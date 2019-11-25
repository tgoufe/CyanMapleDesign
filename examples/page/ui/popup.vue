<template>
<div id="popupDemo" style="height:1000px;">
  <div class="fixed-bottom bg-black paddingv20 paddingh50 fs-16" style="z-index:1">
    <div class="padding20 text-white">
      弹出方向
    </div>
    <div class="btn-group flex-container paddingv20">
      <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
        <div class="flex1 flex-container center" style="padding:3px;" v-for="item in popupPosition"><div class="badge blue pill" @click="popupPositionValue=item" :class="popupPositionValue==item?'badgeCurrent':'badgeDefault'">{{item}}</div></div>

      </div>
    </div>
    <div class="form NewStyle">
      <div class="flex-container marginv20">
        <div class="flex1 marginr50">
          <cmui-checkbox
            :flex="true"
            target-class="switch"
            class="text-white"
            v-model="maskEvent">背景关闭</cmui-checkbox>
        </div>
        <div class="flex1 marginl50">
          <cmui-checkbox
            :flex="true"
            target-class="switch"
            class="text-white"
            v-model="pageScroll">阻止滚动</cmui-checkbox>
        </div>
      </div>
    </div>

  </div>
    <cmui-popup
    :visible.sync="visible"
    :position="popupPositionValue"
    :mask-event="maskEvent"
    :stop-page-scroll="pageScroll"
    >
      <a href="javascript:void(0)" class="btn red radius" @click="visible=!visible">关闭</a>
    </cmui-popup>
    <div class="pos-f top0 left0 right0 flex-container center" style="height:calc(100% - 90px)">
      <a href="javascript:void(0)" @click="visible=!visible">
        <img :src="imgUrl" alt="">
      </a>
    </div>
</div>
</template>
<script>
import img from '@assets/img-mask_test.png'
export default {
  data: function() {
    return {
      visible: false,
      popupPosition: ['left', 'right', 'top', 'bottom', 'center'],
      popupPositionValue: 'center',
      maskEvent: true,
      pageScroll: true,
      imgUrl:img
    }
  }
}
</script>
