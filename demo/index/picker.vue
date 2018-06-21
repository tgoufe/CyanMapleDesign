<template>
    <div>
        <cmui-list>
            <cmui-list-item v-for="item in buttonList">
                <a href="javascript:void(0)"
                   class="btn block radius reverse"
                   @click="showPicker(`${item}Data`)">{{item}} picker</a>
            </cmui-list-item>
        </cmui-list>
        <cmui-picker :visible.sync="visible" :data="pickerData" @select="select"></cmui-picker>
    </div>

</template>
<script>
    let dataList={
      baseData:[1,2,3]
    };
    export default{
      data:function(){
        let buttonList=['base'];
        let visible=false;
        return {pickerData:[],visible,buttonList}
      },
      methods:{
        showPicker(name){
          this.visible=true;
          this.pickerData=dataList[name];
        },
        select(data){
          maple.alert(JSON.stringify(data))
        }
      }
    }
</script>