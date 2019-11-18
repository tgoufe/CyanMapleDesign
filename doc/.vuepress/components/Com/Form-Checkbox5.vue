<template>
    <div class="form">
        <cmui-checkbox :value="true" target-class="reverse">reverse</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="square">square</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="square reverse">square reverse</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="switch">switch</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="small">small</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="big">big</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn" label="btn">btn</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn reverse" label="btn">btn reverse</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn light" label="btn">btn light</cmui-checkbox>
        <br>
        <cmui-checkbox :value="true" target-class="btn radius" label="btn">btn radius</cmui-checkbox>
        <br>
    </div>
</template>

<script>
export default {
  name: "Form-Checkbox1"
};
</script>
