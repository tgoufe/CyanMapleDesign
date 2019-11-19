<template>
    <div class="form">
        <cmui-checkbox :value="true" target-class="reverse" label="reverse"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="square" label="square"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="square reverse" label="square reverse"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="switch" label="switch"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="small" label="small"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="big" label="big"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn" label="btn"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn reverse" label="btn reverse"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn light" label="btn light"></cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn radius" label="btn radius"></cmui-checkbox>
        <br>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox1"
};
</script>
<style scoped type="text/scss" lang="scss">
    /deep/ .cmui-check__label{
        width:130px;
        display: inline-block;
        text-align: right;
        margin-right:30px;
        margin-bottom:10px;
    }
</style>
