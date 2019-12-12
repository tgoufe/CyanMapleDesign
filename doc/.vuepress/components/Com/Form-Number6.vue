<template>
    <div >
        <cmui-number v-model="value" target-class="radius" class="marginb20">
            <div class="marginr20" style="width:50px">圆角</div>
        </cmui-number>
        <cmui-number v-model="value" target-class="reverse" class="marginb20">
            <div class="marginr20" style="width:50px">翻转</div>
        </cmui-number>
        <cmui-number v-model="value" target-class="small" class="marginb20">
            <div class="marginr20" style="width:50px">small</div>
        </cmui-number>
        <cmui-number v-model="value" target-class="big" class="marginb20">
            <div class="marginr20" style="width:50px">big</div>
        </cmui-number>
    </div>
</template>
<script>
export default {
  name: "Form-Number1",
  data(){
    return {
      value:7
    }
  }
};
</script>
