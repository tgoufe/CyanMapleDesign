<template>
    <div style="height:500px;overflow: scroll">
        <cmui-list>
            <cmui-list-group v-for="item in 6" :title="`分组${item}`">
                <cmui-list-item v-for="i in 6">
                    <div class="padding10">分组{{item}}下的第{{i}}个内容</div>
                </cmui-list-item>
            </cmui-list-group>
        </cmui-list>
    </div>
</template>

<script>
export default {
  name: "List4"
};
</script>

