<template>
    <div>
        <p>彩色文本颜色</p>
        <p v-for="color in colors" :class="[`text-${color}`]" class="fs-20">text-{{color}}</p>
        <p>黑白文本颜色</p>
        <p v-for="color in grays" :class="[`text-${color}`]" class="fs-20">text-{{color}}</p>
        下面展示的文本为两种尺寸，在375的设备上他们显示效果是相同的，但是在其他尺寸上REM会缩放而PX不会
        <p>固定PX</p>
        <span v-for="size in 11" :class="[`fs-${size+9}`]">{{size+9}}px<br v-if="size===5"></span>
        <p>相对REM</p>
        <span v-for="size in 11" :class="[`frs-${size*2+18}`]">{{size*2+18}}rem<br v-if="size===5"></span>
        <p>文本排列方式</p>
        <div v-for="name in styles" class="flex-container">
            <span class="marginr20" style="width:120px">{{name}}</span>
            <p class="flex1" :class="[name]">some text</p>
        </div>
        <div class="text-container">
            <span class="fs-20 text-vcenter">vcente</span>
            <span class="fs-10 text-vcenter">vcente</span>
        </div>
        <br>
        <div class="text-container">
            <span class="fs-20 text-vtop">vtop</span>
            <span class="fs-10 text-vtop">vtop</span>
        </div>
        <br>
        <div class="text-container">
            <span class="fs-20 text-vbottom">vbottom</span>
            <span class="fs-10 text-vbottom">vbottom</span>
        </div>
        <p>文本限制下面的文本被限制到2行</p>
        <p class="text-limit2">
            朝阳初升，云蒸霞蔚，苍莽群山在重重朝雾中绵延起伏。
            姬凤瑶在冲霄峰崖顶临崖而坐，脚下是千尺绝壁、层云环绕。眼前的景色怎一个美字了得，但她的心情却有些惆怅。
            一天前，她又魂穿了。
            嗯，“又”。
        </p>
    </div>
</template>

<script>
export default {
  name: 'type',
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
      grays: [
        'black',
        'darker',
        'dark',
        'gray',
        'light',
        'lighter',
        'white'
      ],
      styles: [
        'text-left',
        'text-right',
        'text-center',
        'text-justify',
        'text-nowrap',
        'text-indent',
        'text-lowercase',
        'text-uppercase',
        'text-capitalize',
        'text-bolder',
        'text-delete'
      ]
    }
  }
}
</script>

<style scoped>

</style>
