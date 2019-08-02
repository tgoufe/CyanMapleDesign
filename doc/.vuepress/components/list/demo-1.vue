<template>
    <div>
        <p>三列的列表</p>
        <cmui-list :col="3" border="#234ac2">
            <cmui-list-item v-for="i in 9" bgcolor="white">
                <div class="padding20 text-center">
                    {{i}}
                </div>
            </cmui-list-item>
        </cmui-list>
    </div>
</template>

<script>
    import cmuiList from '../../../../src/maple/component/list/list.vue';
    import cmuiListItem from '../../../../src/maple/component/list/list-item.vue';
    import '../../../../src/cyan/CMUI_doc.scss';
    export default {
        name: "demo-1"
    }
</script>

<style scoped>

</style>