<template>
    <div>
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
<!--             <div class="flex-container paddingb20">
                <span class="text-white marginr30">Color</span>
                <div class="flex1 flex-container">
                    <div class="colorSelect" v-for="item in colors"
                    :key="item"
                    :class="'bg-'+item+' '+(selectColor==item ? 'current' : '')"
                    @click="selectColor=item"
                    ></div>
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
                    v-model="radius">Radius</cmui-checkbox>
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
                    v-model="round">Round</cmui-checkbox>
                </div>
                <div class="flex1 marginl50">
                  <cmui-checkbox
                    :flex="true"
                    target-class="switch"
                    class="text-white"
                    v-model="square">Square</cmui-checkbox>
                </div>
              </div>
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
                    v-model="pill">Pill</cmui-checkbox>
                </div>
              </div>
              <div class="flex-container marginv30">
                <div class="flex1 marginr50">
                  <cmui-checkbox
                    :flex="true"
                    target-class="switch"
                    class="text-white"
                    v-model="flag">Flag</cmui-checkbox>
                </div>
                <div class="flex1 marginl50">
                </div>
              </div>
            </div>
        </div>
        <p class="title paddingv20 paddingh30">默认</p>
        <div class="padding10 themeBadge">
            <div class="badge margin20"
            :class="[size,item,{round,light,radius,reverse,square,pill,flag}]"
            v-for="item in colors"
            @click="selectColor=item"
            :key="item"
            >badge</div>
        </div>
        



        <!-- <p class="title paddingv20 paddingh30">圆角</p>
        <div v-for="color in colors" class="badge margin20 radius" :class="[color]">badge radius</div>
        <p class="title paddingv20 paddingh30">翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse" :class="[color]">badge reverse</div>
        <p class="title paddingv20 paddingh30">圆角+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse radius" :class="[color]">radius reverse</div>
        <p class="title paddingv20 paddingh30">圆</p>
        <div v-for="color in colors" class="badge margin20  round" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">圆+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse  round" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">方块</p>
        <div v-for="color in colors" class="badge margin20  square" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">方块+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse square" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">药片</p>
        <div v-for="color in colors" class="badge margin20  pill" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">药片+翻转</p>
        <div v-for="color in colors" class="badge margin20 reverse pill" :class="[color]">B</div>
        <p class="title paddingv20 paddingh30">旗帜</p>
        <div class="paddingb20">
            <div v-for="color in colors" class="badge margin20 flag" :class="[color]">B</div>
        </div>
        <p class="title paddingv20 paddingh30">尺寸</p>
        <div class="margin20 badge small">small</div>
        <div class="margin20 badge">default</div>
        <div class="margin20 badge big">big</div> -->
        <p class="title paddingv20 paddingh30">组</p>
        <div class="badge-group paddingh30 padding20">
            <div class="badge yellow" :class="[size,selectColor,{light,radius,reverse}]">上一页</div>
            <div class="badge yellow" v-for="i in 3" :class="[size,selectColor,{light,radius,reverse}]"
              :key="item"
              >{{i}}</div>
            <div class="badge yellow" :class="[size,selectColor,{light,radius,reverse}]">下一页</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'badge',
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
      round:false,
      light:false,
      selectColor:'',
      reverse:false,
      radius:false,
      pill:false,
      square:false,
      flag:false
    }
  }
}
</script>

<style scoped>
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
.colorSelect{
    width:32px;
    height: 32px;
    border-radius: 50%;
    border:2px solid #fff;
    position: relative;
    text-align:center;
    line-height: 26px;
}
.colorSelect.current:after{
    content: '\e645';
    font-family:"iconfont" !important;
    font-size:18px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: bolder;
    color:#fff;
    
}
.themeBadge .badge.round,.themeBadge .badge.square{
    text-indent: -9999px;
    position: relative;
}
.themeBadge .badge.round:after,.themeBadge .badge.square:after{
    text-indent:0;
    content:'B';
    position: absolute;
    width: 100%;
    height: 100%;
    left:0;
}
</style>