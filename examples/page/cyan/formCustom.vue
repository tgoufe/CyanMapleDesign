<template>
    <div class="form padding20" :class="[formColor]">
        <div class="fixed-bottom bg-black padding20" style="z-index:1">
          <label for="color">
            <span class="text-white">颜色选择</span><input type="color" v-model="formColor" style="height:40px;width:50px;padding:0"/>>
          </label>
            
            <div class="btn-group margint20 flex-container">
                <span class="text-white left">尺寸选择</span>
                <div class="btn blue reverse" @click="size=''">默认</div>
                <div class="btn blue reverse" @click="size='small'">small</div>
                <div class="btn blue reverse" @click="size='big'">big</div>
            </div>
        </div>
        <p>自定义色彩：请修改色彩查看变化</p>
        <div :style="{color:formColor}">

          <p>checkbox</p>
          <div class="list border">
              <div class="list-item padding20 flex-container" v-for="item in checkboxData" :key="item">
                  <span class="left">{{item||'默认'}}</span>
                  <input type="checkbox" :class="[item,size]" checked class="custom" label="选项">
              </div>
          </div>

          <p>radio</p>
          <div class="list border">
              <div class="list-item padding20 flex-container" v-for="item in ratioData" :key="item">
                  <span class="left">{{item=='0'?'默认':item}}</span>
                  <input type="radio" :class="[item,size]" :name="item" class="marginr30 custom" checked label="选项">
                  <input type="radio" :class="[item,size]" :name="item" class="custom" label="选项">
              </div>
          </div>
          <p>input</p>
          <input type="text" class="custom" :class="size" placeholder="请输入内容">
          
          <p>input reverse</p>
          <input type="text" class="reverse custom" :class="size" placeholder="请输入内容">
          <p>select</p>
          <select name="" id="" :class="size" placeholder="请输入内容" class="custom">
              <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
          </select>
          <p>select reverse</p>
          <select name="" id="" class="reverse custom" :class="size" placeholder="请输入内容">
              <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
          </select>
          <p>textarea</p>
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入内容" class="custom"></textarea>
          <p>textarea reverse</p>
          <textarea name="" id="" cols="30" rows="10" class="reverse custom" placeholder="请输入内容"></textarea>
         </div>
    </div>
</template>

<script>
export default {
  name: 'form',
  data(){
    return{
        formColor:'#50d246',
        checkboxData:[
            '','reverse','square','square reverse','switch','btn','btn radius','btn light','btn light radius','btn reverse','btn reverse radius'
        ],
        ratioData:[
            '0','reverse','square','square reverse','btn','btn radius','btn light','btn light radius','btn reverse','btn reverse radius'
        ],
        size:''
    }
  }
}
</script>

<style scoped>
.bg-{background-color: #00baba}
</style>
