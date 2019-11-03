<template>
    <div class="form padding20" :class="[formColor]">
        <div class="fixed-bottom bg-black padding20" style="z-index:1">
            <div class="flex-container">
                <span class="text-white marginr30">颜色选择</span>
                <div class="ratio-container flex1 border"
                v-for="item in colors"
                :key="item"
                :class='[`bg-${item}`]'
                @click="formColor=item"
                >
                </div>
            </div>
            <div class="btn-group margint20 flex-container">
                <span class="text-white left">尺寸选择</span>
                <div class="btn blue reverse" @click="size=''">默认</div>
                <div class="btn blue reverse" @click="size='small'">small</div>
                <div class="btn blue reverse" @click="size='big'">big</div>
            </div>
        </div>
        
        
        <p>checkbox</p>
        <div class="list border">
            <div class="list-item padding20 flex-container" v-for="item in checkboxData" :key="item">
                <span class="left">{{item||'默认'}}</span>
                <input type="checkbox" :class="[item,size]" checked label="选项">
            </div>
        </div>

        <p>radio</p>
        <div class="list border">
            <div class="list-item padding20 flex-container" v-for="item in ratioData" :key="item">
                <span class="left">{{item=='0'?'默认':item}}</span>
                <input type="radio" :class="[item,size]" :name="item" class="marginr30" checked label="选项">
                <input type="radio" :class="[item,size]" :name="item" label="选项">
            </div>
        </div>
        <p>input</p>
        <input type="text" :class="size" placeholder="请输入内容">
        
        <p>input reverse</p>
        <input type="text" class="reverse" :class="size" placeholder="请输入内容">
        <p>select</p>
        <select name="" id="" :class="size" placeholder="请输入内容">
            <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
        </select>
        <p>select reverse</p>
        <select name="" id="" class="reverse" :class="size" placeholder="请输入内容">
            <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
        </select>
        <p>textarea</p>
        <textarea name="" id="" cols="30" rows="10" placeholder="请输入内容"></textarea>
        <p>textarea reverse</p>
        <textarea name="" id="" cols="30" rows="10" class="reverse" placeholder="请输入内容"></textarea>
    </div>
</template>

<script>
export default {
  name: 'form',
  data(){
    return{
        colors:[
            '','red','orange','yellow','green','coffee','blue','purple'
        ],
        formColor:'',
        checkboxData:[
            '','reverse','square','square reverse','switch','btn','btn radius','btn reverse','btn reverse radius'
        ],
        ratioData:[
            '0','reverse','square','square reverse','btn','btn radius','btn reverse','btn reverse radius'
        ],
        size:''
    }
  }
}
</script>

<style scoped>
.bg-{background-color: #00baba}
</style>
