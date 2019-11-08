<template>
    <div class="form" style="padding-bottom: 120px;" :class="[formColor]">
        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
            <div class="flex-container">
                <span class="text-white" style="min-width: 55px;">Color</span>
                <div class="flex-container flex1">
                    <div
                    v-for="item in colors"
                    :key="item"
                    @click="formColor=item"
                    class="baseIcon text-white text-center text-bolder fs-20" :class='[`bg-${item}`+` `+(formColor==item && `baseIcon-check`)]' style="width:32px;height:32px;border-radius:50%;border:2px solid #fff;"></div>
                </div>
                
            </div>
            <div class="btn-group margint20 flex-container">
                <span class="text-white left" style="min-width: 55px;">Size</span>
                <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size=''" :class="size==''?'badgeCurrent':'badgeDefault'">Default</div></div>
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size='small'" :class="size=='small'?'badgeCurrent':'badgeDefault'">Small</div></div>
                    <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="size='big'" :class="size=='big'?'badgeCurrent':'badgeDefault'">Big</div></div>
                    
                    
                    
                </div>
            </div>
        </div>
        <p class="title paddingv20 paddingh30">checkbox</p>
        <div class="list border">
            <div class="list-item paddingv30 paddingh50 flex-container" v-for="item in checkboxData" :key="item">
                <span class="left">{{item||'默认'}}</span>
                <input type="checkbox" :class="[item,size]" checked label="选项">
            </div>
        </div>

        <p class="title paddingv20 paddingh30">radio</p>
        <div class="list border">
            <div class="list-item paddingv30 paddingh50 flex-container" v-for="item in ratioData" :key="item">
                <span class="left">{{item=='0'?'默认':item}}</span>
                <input type="radio" :class="[item,size]" :name="item" class="marginr30" checked label="选项">
                <input type="radio" :class="[item,size]" :name="item" label="选项">
            </div>
        </div>
        <p class="title paddingv20 paddingh30">input</p>
        <div class="paddingv5 paddingh50">
            <div class="fs-16 paddingv10">input</div>
            <input type="text" class="borderBlack" :class="size" placeholder="请输入内容">
            <div class="fs-16 paddingv10 margint20">input reverse</div>
            <input type="text" class="borderBlackReverse reverse" :class="size" placeholder="请输入内容">
        </div>
        <p class="title paddingv20 paddingh30">select</p>
        <div class="paddingv5 paddingh50">
            <div class="fs-16 paddingv10">select</div>
            <select class="borderBlack" name="" id="" :class="size" placeholder="请输入内容">
                <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
            </select>
            <div class="fs-16 paddingv10">select reverse</div>
            <select name="" id="" class="reverse borderBlackReverse" :class="size" placeholder="请输入内容">
                <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
            </select>
        </div>
        <p class="title paddingv20 paddingh30">textarea</p>
        <div class="paddingv5 paddingh50">
            <div class="fs-16 paddingv10">textarea</div>
            <textarea class="borderBlack" name="" id="" cols="30" rows="10" placeholder="请输入内容"></textarea>
            <div class="fs-16 paddingv10">textarea reverse</div>
            <textarea name="" id="" cols="30" rows="10" class="reverse borderBlackReverse" placeholder="请输入内容"></textarea>
        </div>
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
