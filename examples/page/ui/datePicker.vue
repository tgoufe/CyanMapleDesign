<template>
    <div>
        <cmui-date-picker @select="select">

        </cmui-date-picker>
    </div>
</template>

<script>
export default {
  name: 'datePicker',
  methods:{
    select(day){
      console.log(day)
    }
  }
}
</script>

<style scoped>

</style>
