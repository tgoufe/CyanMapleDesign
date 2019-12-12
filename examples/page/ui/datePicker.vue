<template>
    <div>
      <div class="form">
        <label for="date">
          请选择时间
          <input type="text" @focus="focus" v-model="inputValue" style="font-size:16px;" ref="input">
        </label>
      </div>
        <cmui-date-picker @select="select" :visible.sync="visible"></cmui-date-picker>
    </div>
</template>

<script>
export default {
  name: 'datePicker',
  data(){
    return {
      visible:false,
      inputValue:''
    }
  },
  methods:{
    select(day){
      this.visible=false;
      this.inputValue=day.format('YYYY-MM-DD')
    },
    focus(){
      this.visible=true;
      this.$refs.input.blur()
    }
  }
}
</script>

<style scoped>

</style>
