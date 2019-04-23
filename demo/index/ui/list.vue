<template>
    <div class="example margin50 tag-container">
        <router-link to="/list/config/" class="btn block radius blue">
            基础的列表
        </router-link>
        <router-link to="/list/music" class="btn block radius blue">
            分组列表
        </router-link>
        <router-link to="/list/loop" class="btn block radius blue">
            循环嵌套列表
        </router-link>
        <p>sdfsdfd</p>
        <div class="list list-col2">
            <div class="list-item" v-for="i in [1,2,3,4,5]">
                123
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{

    }
</script>