<template>
    <div>
        <cmui-countdown :shouDay="true" :showMilli="true" :end-time="+new Date()+10000000"></cmui-countdown>
    </div>
</template>
<script>
export default {
    name:'Countdown-1'
}
</script>