<template>
    <div >
        <cmui-textarea v-model="value" target-class="radius" class="marginb20">
            <div class="marginr20" style="width:50px">radius</div>
        </cmui-textarea>
        <cmui-textarea v-model="value" target-class="center" class="marginb20">
            <div class="marginr20" style="width:50px">center</div>
        </cmui-textarea>
        <cmui-textarea v-model="value" target-class="bottom" class="marginb20">
            <div class="marginr20" style="width:50px">bottom</div>
        </cmui-textarea>
        <cmui-textarea v-model="value" target-class="reverse" class="marginb20">
            <div class="marginr20" style="width:50px">reverse</div>
        </cmui-textarea>
    </div>
</template>
<script>
export default {
  name: "Form-Textarea4",
  data(){
    return {
      value:'some text'
    }
  }
};
</script>
