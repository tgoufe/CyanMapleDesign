<template>
    <div >
        <cmui-select :data="data" v-model="value" class="marginb20" target-class="reverse">
            <div class="marginr20" style="width:50px">reverse</div>
        </cmui-select>
        <cmui-select :data="data" v-model="value" class="marginb20" target-class="radius">
            <div class="marginr20" style="width:50px">radius</div>
        </cmui-select>
        <cmui-select :data="data" v-model="value" class="marginb20" target-class="small">
            <div class="marginr20" style="width:50px">small</div>
        </cmui-select>
        <cmui-select :data="data" v-model="value" class="marginb20" target-class="big">
            <div class="marginr20" style="width:50px">big</div>
        </cmui-select>
    </div>
</template>
<script>
export default {
  name: "Form-Number5",
  data(){
    return {
      data:Array.from({length:5},(item,index)=>index),
      value:3
    }
  }
};
</script>
