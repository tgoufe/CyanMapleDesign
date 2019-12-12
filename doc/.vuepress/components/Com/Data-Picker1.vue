<template>
    <div>
        <div class="btn red" @click="showPicker"> Show DatatPicker</div>
        <cmui-date-picker @select="select" :visible.sync="visible" :border="border" :now="now" :from="from" :to="to"></cmui-date-picker>
    </div>
</template>

<script>
  export default {
    name: "Data-Picker1",
    data() {
      return {
        visible:false,
        from:2017,
        to:2020,
        now:1566285933000,
        border:'#369369'
      };
    },
    methods:{
      showPicker(){
        this.visible = true;
      },
      select(data){
        this.alert(`You have been selected ${data}`)
      }
    }
  };
</script>
