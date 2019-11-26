<template>
    <div>
        <cmui-list :col="3" border="#0a77e4">
            <cmui-list-item v-for="item in 6">
                <div class="list-item-demo">{{item}}</div>
            </cmui-list-item>
        </cmui-list>
    </div>
</template>

<script>
export default {
  name: "List2"
};
</script>

