<template>
    <div>
      <div class="fixed-bottom bg-black padding20" style="z-index:1">
            <div class="flex-container">
                <span class="text-white marginr30">颜色选择</span>
                <div class="ratio-container flex1 border"
                v-for="item in colors"
                :key="item"
                :class='[`bg-${item}`]'
                @click="selectColor=item"
                >
                </div>
            </div>
            <div class="btn-group margint20 flex-container">
                <span class="text-white left">尺寸选择</span>
                <div class="btn blue reverse" @click="size=''">默认</div>
                <div class="btn blue reverse" @click="size='small'">small</div>
                <div class="btn blue reverse" @click="size='big'">big</div>
            </div>
            <div class="form">
             <cmui-checkbox
             :flex="true"
             target-class="switch"
             class="text-white"
             v-model="light">light</cmui-checkbox>
             <cmui-checkbox
             :flex="true"
             target-class="switch"
             class="text-white"
             v-model="reverse">翻转</cmui-checkbox>
             <cmui-checkbox
             :flex="true"
             target-class="switch"
             class="text-white"
             v-model="radius">圆角</cmui-checkbox>
            </div>
        </div>
        <div class="padding20">
          <div class="btn"
          :class="[size,selectColor,{light,radius,reverse}]"
          >这是一个按钮</div>
        </div>
        <p class="text-red">
          备注：light模式下不支持reverse
        </p>
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
      radius:false
    }
  }
}
</script>

<style scoped>

</style>
