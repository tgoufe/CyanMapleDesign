<template>
    <div>
        <p class="text-white fs-18 paddingh50 paddingv30 bg-black">文字颜色与尺寸</p>
        <p class="title paddingv20 paddingh30">彩色文本颜色</p>
        <div class="row">
            <div class="span4 fs-16 text-center" v-for="color in colors" :class="[`text-${color}`]">
                <div class="paddingv30">text-{{color}}</div>
            </div>
        </div>
        <p class="title paddingv20 paddingh30">黑白文本颜色</p>
        <div class="row">
            <div class="span4 fs-16 text-center" v-for="color in grays" :class="[`text-${color}`]">
                <div class="paddingv30">text-{{color}}</div>
            </div>
        </div>
        <p class="text-white fs-18 paddingh50 paddingv30 bg-black">下面展示的文本为两种尺寸，在375的设备上他们显示效果是相同的，但是在其他尺寸上REM会缩放而PX不会</p>
        <p class="title paddingv20 paddingh30">固定PX</p>
        <div class="row">
            <div class="col3 text-center" v-for="size in 11" :class="[`fs-${size+9}`]">
                <div class="flex-container center" style="line-height: 56px;">{{size+9}}px</div>
            </div>
        </div>
        <p class="title paddingv20 paddingh30">相对REM</p>
        <div class="row">
            <div class="col3 text-center"  v-for="size in 11" :class="[`frs-${size*2+18}`]">
                <div class="flex-container center" style="line-height: 56px;">{{size*2+18}}rem</div>
            </div>
        </div>
        <p class="text-white fs-18 paddingh50 paddingv30 bg-black">文本排列方式</p>
        <div v-for="name in styles">
            <p class="title paddingv20 paddingh30">{{name.replace("-", " ")}}</p>
            <div class="fs-16 paddingv30 paddingh50" :class="[name]">some text</div>
        </div>
        <div>
            <p class="title paddingv20 paddingh30">vcente</p>
            <div class="fs-16 paddingh50 text-vcenter"" style="height: 60px;">vcente</div>
        </div>
        <div>
            <p class="title paddingv20 paddingh30">vtop</p>
            <div class="fs-16 paddingh50 text-vtop" style="height: 60px;">vtop</div>
        </div>
        <div>
            <p class="title paddingv20 paddingh30">vbottom</p>
            <div class="fs-16 paddingh50 text-vbottom" style="height: 60px;">vbottom</div>
        </div>
        <p class="text-white fs-18 paddingh50 paddingv30 bg-black">文本限制</p>
        <p class="title paddingv20 paddingh30">文本限制到两行</p>
        <div class="paddingv20 paddingh50">
            <p class="text-limit2">
                朝阳初升，云蒸霞蔚，苍莽群山在重重朝雾中绵延起伏。
                姬凤瑶在冲霄峰崖顶临崖而坐，脚下是千尺绝壁、层云环绕。眼前的景色怎一个美字了得，但她的心情却有些惆怅。
                一天前，她又魂穿了。
                嗯，“又”。
            </p>
        </div>
        
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
