<template>
    <div class="example tag-container themeAlert padding15">
        <router-link to="list/config/" class="btn block">
            基础的列表
        </router-link>
        <router-link to="list/music" class="btn block">
            分组列表
        </router-link>
        <router-link to="list/loop" class="btn block">
            循环嵌套列表
        </router-link>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'list'
}
</script>