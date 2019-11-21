<template>
    <div>
        <div class="btn red" @click="showPicker"> Show picker</div>
        <cmui-picker title="多级选择器" :data="baseData" :visible.sync="visible" @select="select"></cmui-picker>
    </div>
</template>

<script>
  export default {
    name: "Picker-2",
    data() {
      return {
        baseData:[['上午', '下午'], _.times(12, index => `${index}点`)],
        visible:false
      };
    },
    methods:{
      showPicker(){
        this.visible = true;
      },
      select(data){
        this.alert(`You have been selected '${data[0].value}${data[1].value}'`)
      }
    }
  };
</script>
