<template>
    <div>
        <div class="btn red" @click="showPicker"> Show picker</div>
        <cmui-picker :data="baseData" :visible.sync="visible" @select="select"></cmui-picker>
    </div>
</template>

<script>
  export default {
    name: "Picker-1",
    data() {
      return {
        baseData:_.times(10),
        visible:false
      };
    },
    methods:{
      showPicker(){
        this.visible = true;
      },
      select(data){
        this.alert(`You have been selected ${JSON.stringify(data)}`)
      }
    }
  };
</script>
