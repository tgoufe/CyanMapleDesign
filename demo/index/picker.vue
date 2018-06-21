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
    import cityData from './city.json';
    function fromatCity(data){
      return _.map(data,(value,key)=>{
        if(_.isPlainObject(value)){
          return{
            text:value.name,
            value:key,
            children:value.child?fromatCity(value.child):undefined
          }
        }
        if(_.isString(value)){
          return{
            text:value,
            value:key
          }
        }
      })
    }
    let dataList={
      baseData:_.times(10),
      aloneData:[['上午','下午'],_.times(12,index=>`${index}点`)],
      childrenData:[fromatCity(cityData)].concat([['default'],['default']])
    };
    export default{
      data:function(){
        let buttonList=['base','alone','children'];
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