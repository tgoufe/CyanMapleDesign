<template>
    <div style="height:200vh">
        <cmui-affix>
            <div class="demo text-white" style="background: #00BABA">
                滑动页面后，这个区域会置顶显示
            </div>
        </cmui-affix>
        <div style="height:50px"></div>
        <cmui-affix :top="50">
            <div class="demo text-white" style="background: #003E3E">
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
    padding:6px 15px;
}
    /deep/ .affixActive{
        color:red;
    }
</style>
