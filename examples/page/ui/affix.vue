<template>
    <div style="height:200vh">
        <cmui-affix>
            <div class="demo">
                滑动页面后，这个区域会置顶显示
            </div>
        </cmui-affix>
        <div style="height:50px"></div>
        <cmui-affix :top="50">
            <div class="demo">
                滑动页面后，这个区域会距离顶部50PX的位置显示
            </div>
        </cmui-affix>
    </div>
</template>

<script>
export default {
  name: 'affix'
}
</script>

<style scoped>
.demo{
    background-color: #9eee8e;
    padding:10px 0;
}
    /deep/ .affixActive{
        color:red;
    }
</style>
