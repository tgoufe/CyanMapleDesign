<template>
    <div>
        <cmui-countdown :showMilli="true" :end-time="+new Date()+10000"></cmui-countdown>
    </div>
</template>
<script>
export default {
    name:'Countdown-1'
}
</script>