<template>
    <div>
        <cmui-countdown
                :end-time="endTime"
                @update="updateSec"
                @countdownend="endEvent"
        />
        <p>显示天数(25小时倒计时)</p>
        <cmui-countdown
                :end-time="endTime2"
                :show-day="true"
        />
        <p>用样式修改显示</p>
        <cmui-countdown class="showDay"
                :end-time="endTime2"
                :show-day="true"
                :show-milli="true"
                @update="updateMilli"
        />
    </div>
</template>

<script>
    export default {
        name: "countdown",
        data(){
            return{
                endTime:+new Date + 10*60*1000,
                endTime2:+new Date + 25*60*60*1000,
            }
        },
        methods:{
            updateSec(time,vm){//每秒触发一次
                console.log(`时间发生了更新，当前时间为${time}`)
            },
            updateMilli(time,vm){//每100毫秒触发一次
                console.log(`时间发生了更新，当前时间为${time}`)
            },
            endEvent(){
                console.log('倒计时结束')
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .showDay /deep/{
        .countdown-container{
            &:after{right:-17px;}
            &.day:after{content:'天'}
            &.hour:after{content:'时'}
            &.minute:after{content:'分'}
            &.sec:after{content:'秒'}
        }
    }
</style>