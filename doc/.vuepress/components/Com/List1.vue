<template>
    <div>
        <p>平均分成三列</p>
        <cmui-list :col="3">
            <cmui-list-item v-for="item in 6">
                <div class="list-item-demo">{{item}}</div>
            </cmui-list-item>
        </cmui-list>
        <p>分成2：3：4的三列</p>
        <cmui-list :col="[2,3,4]">
            <cmui-list-item v-for="item in 6">
                <div class="list-item-demo">{{item}}</div>
            </cmui-list-item>
        </cmui-list>
    </div>

</template>

<script>
export default {
  name: "List1"
};
</script>

