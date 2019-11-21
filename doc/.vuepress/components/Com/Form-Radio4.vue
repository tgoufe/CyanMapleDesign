<template>
    <div class="form">
        <cmui-radio name="demo" label="right" target-class="right"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="right reserse" target-class="right reverse"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="square" target-class="square"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="square reserse" target-class="square reverse"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="btn" target-class="btn"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="btn light" target-class="btn light"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="btn radius" target-class="btn radius"></cmui-radio>
        <br>
        <cmui-radio name="demo" label="btn reverse" target-class="btn reverse"> </cmui-radio>
        <br>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox1",
  data(){
    return {
      right:'right1'
    }
  }
};
</script>
