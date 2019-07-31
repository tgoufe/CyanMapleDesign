<template>
    <table>
        <thead>
            <tr>
                <th>事件名称</th>
                <th>触发时间</th>
                <th>参数</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>update</td> <td>每次时间发生更新，通常是1秒，如果设置了showMilli为true，则会更短</td> <td>无</td></tr>
            <tr><td>countdownend</td> <td>倒计时结束时触发</td> <td>vm</td></tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "event"
    }
</script>

<style scoped>

</style>