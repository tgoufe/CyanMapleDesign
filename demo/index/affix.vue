<template>
    <div style="height:1000px">
        <cmui-affix>
            <div class="bg-red padding10">123</div>
        </cmui-affix>
        <cmui-affix>
            <div class="bg-red padding10">234</div>
        </cmui-affix>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.$root.headTitle = 'affix'
        }
    }
</script>