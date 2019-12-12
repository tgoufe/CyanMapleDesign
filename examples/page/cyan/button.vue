<template>
    <div>
      <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
            <!-- <div class="flex-container">
                <span class="text-white marginr30">颜色选择</span>
                <div class="ratio-container flex1 border"
                v-for="item in colors"
                :key="item"
                :class='[`bg-${item}`]'
                @click="selectColor=item"
                >
                </div>
            </div> -->
            <div class="btn-group flex-container">
              <span class="text-white left" style="min-width: 55px;">Size</span>
              <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                  <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size=''" :class="size==''?'badgeCurrent':'badgeDefault'">Default</div></div>
                  <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size='small'" :class="size=='small'?'badgeCurrent':'badgeDefault'">Small</div></div>
                  <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size='big'" :class="size=='big'?'badgeCurrent':'badgeDefault'">Big</div></div>
              </div>
            </div>
            <div class="form NewStyle">
              <div class="flex-container marginv30">
                <div class="flex1 marginr50">
                  <cmui-checkbox
                    :flex="true"
                    target-class="switch"
                    class="text-white"
                    v-model="light">Light</cmui-checkbox>
                </div>
                <div class="flex1 marginl50">
                  <cmui-checkbox
                    :flex="true"
                    target-class="switch"
                    class="text-white"
                    v-model="reverse">Reverse</cmui-checkbox>
                </div>
              </div>
              <div class="flex-container marginv30">
                <div class="flex1 marginr50">
                  <cmui-checkbox
                    :flex="true"
                    target-class="switch"
                    class="text-white"
                    v-model="radius">Radius</cmui-checkbox>
                </div>
                <div class="flex1 marginl50">
                  <cmui-checkbox
                    :flex="true"
                    target-class="switch"
                    class="text-white"
                    v-model="block">Block</cmui-checkbox>
                </div>
              </div>
            </div>
        </div>
        <div class="">
          <p class="title paddingv20 paddingh30">点击按钮切换按钮组颜色</p>
          <div class="btn margin20"
          :class="[size,item,{light,radius,reverse,block}]"
          v-for="item in colors"
          @click="selectColor=item"
          :key="item"
          >按钮</div>
          <p class="title paddingv20 paddingh30">按钮组(通常开启翻转和圆角)</p>
          <div class="padding20 flex-container center">
            <div class="btn-group">
              <div class="btn yellow"
              :class="[size,selectColor,{light,radius,reverse}]"
              v-for="(item,index) in colors"
              :key="item"
              >{{index}}</div>
            </div>
          </div>
          
          <p class="text-red margin20 fs-12">
            备注：light模式下不支持reverse
          </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'button',
  data() {
    return {
      colors: [
        'red',
        'orange',
        'yellow',
        'green',
        'coffee',
        'blue',
        'purple'
      ],
      size:'',
      light:false,
      selectColor:'',
      reverse:false,
      radius:false,
      block:false
    }
  }
}
</script>

<style>
.badgeCurrent{
    width:100%;
    border:2px solid white !important;
    padding: 5px 10px !important;
    background-color: #00BABA !important;
}
.badgeDefault{
    background: none !important;
    padding: 5px 10px !important;
}

</style>
