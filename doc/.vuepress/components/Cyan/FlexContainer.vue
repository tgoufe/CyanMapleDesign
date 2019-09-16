<template>
    <div>
        <p class="text-red text-bolder">下面的案例展示了flex-container支持的布局结构，尝试添加不同的属性看看效果。</p>
        <div class=" demo" :class="[container,{reverse,round,center,left,right,top,line,bottom,vfull,hfull}]">
            <span v-for="(item,index) in list" :key="index" class="item" :class="[classList[index]]"> {{item}}</span>
        </div>
        <div class="form">
            <div class="form-group">
                <span>排列方向(必选)：</span>
                <cmui-radio name="align" v-model="container" label="flex-container"></cmui-radio>
                <cmui-radio name="align" v-model="container" label="flex-container-col"></cmui-radio>
            </div>
            <div class="form-group">
                <span>其他属性</span>
                <cmui-checkbox class="marginr30" v-model="reverse" target-class="square">reverse</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="round" target-class="square">round</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="top" target-class="square">top</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="left" target-class="square">left</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="right" target-class="square">right</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="bottom" target-class="square">bottom</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="center" target-class="square">center</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="line" target-class="square">line</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="vfull" target-class="square">vfull</cmui-checkbox>
                <cmui-checkbox class="marginr30" v-model="hfull" target-class="square">hfull</cmui-checkbox>
            </div>
            <div class="form-group">
                <label for=""><span class="marginr10">为</span>
                    <select name=""  style="width:auto" class="marginr10" v-model="blockControl">
                        <option value="0">block1</option>
                        <option value="1">block2</option>
                        <option value="2">block3</option>
                    </select>
                </label>
                <label for="">
                    设置top
                    <input type="checkbox" class="marginr30" v-model="controlTop" @change="setItemClass('top',controlTop)">
                    bottom
                    <input type="checkbox" class="marginr30" v-model="controlBottom"  @change="setItemClass('bottom',controlBottom)">
                    right
                    <input type="checkbox" class="marginr30" v-model="controlRight" @change="setItemClass('right',controlRight)">
                    left
                    <input type="checkbox" class="marginr30" v-model="controlLeft" @change="setItemClass('left',controlLeft)">
                    控制占用比例
                    <select name=""  style="width:auto" class="marginh10" v-model="controlFlex" @change="setItemClass(controlFlex)">
                        <option value="">无</option>
                        <option value="1">flex1</option>
                        <option value="2">flex2</option>
                        <option value="3">flex3</option>
                        <option value="4">flex4</option>
                        <option value="5">flex5</option>
                    </select>
                </label>
            </div>
        </div>
    </div>

</template>

<script>
    import '../../../../src/cyan/CMUI_doc.scss';
    import cmuiCheckbox from '../../../../src/maple/component/form/checkbox.vue';
    import cmuiRadio from '../../../../src/maple/component/form/radio.vue';
    export default {
        name: "flexContainer",
        components:{cmuiCheckbox,cmuiRadio},
        data(){
            return{
                list:['block1','block2','block3'],
                container:'flex-container',
                reverse:false,
                round:false,
                center:false,
                left:false,
                right:false,
                top:false,
                line:false,
                bottom:false,
                vfull:false,
                hfull:false,
                blockControl:'0',
                controlTop:false,
                controlBottom:false,
                controlLeft:false,
                controlRight:false,
                controlFlex:'',
                classList:[{},{},{}]
            }
        },
        methods:{
            setItemClass(key,value){
                if(value!==undefined){
                    this.classList[this.blockControl][key]=value;
                }else{
                    for(let i=1;i<6;i++){
                        this.classList[this.blockControl]['flex'+i]=i==key;
                    }
                }

            }
        },
        watch:{
            blockControl(index){
                this.controlTop=this.classList[index].top||false;
                this.controlBottom=this.classList[index].bottom||false;
                this.controlLeft=this.classList[index].left||false;
                this.controlRight=this.classList[index].right||false;
                this.controlFlex=''
                for(let key in this.classList[index]){
                    if(this.classList[index][key]){
                        this.controlFlex=key.replace('flex','');
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .item{
        padding:10px;
    }
    .item:nth-child(1){
        background-color: #ee352c;
    }
    .item:nth-child(2){
        background-color: #46eee1;
    }
    .item:nth-child(3){
        background-color: #eee43b;
    }
    .demo{
        background-color: #c7ffcf;
        min-height:200px;
    }
</style>