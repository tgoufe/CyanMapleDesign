<template>
    <div>
        <div class="ratio-container bg-blue"></div>
        <cmui-classify>
            <cmui-classify-item v-for="(item,index) in 10">
                <div slot="title">分类{{index}}</div>
                <div v-for="(i,k) in 20" class="padding20 ">
                    分类{{index}}-{{k}}
                </div>
            </cmui-classify-item>
        </cmui-classify>
    </div>
</template>

<script>
export default {
  name: "classify"
};
</script>

<style scoped>

</style>
