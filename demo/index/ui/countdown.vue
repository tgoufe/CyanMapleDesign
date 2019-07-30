<template>
    <div class="padding10">
        <blockquote class="margin10">countdown组件用于创建倒计时效果，需要注意的是该组件的分隔符使用CSS伪类的content来控制，默认是冒号，如果你需要其他的展示形式可以重写对应的CSS</blockquote>
        <p class="margint20">默认样式</p>
        <div class="tag-container example">

            <cmui-countdown
                    :end-time="endTime1"
            />
        </div>
        <p class="margint20">显示天和毫秒</p>
        <div class="tag-container example">
            <cmui-countdown
                    :end-time="endTime1"
                    :show-day="true"
                    :show-milli="true"
            />
        </div>
        <p class="margint20">通过样式修改显示</p>
        <div class="tag-container example">
            <cmui-countdown
                    class="showDay"
                    :end-time="endTime1"
                    :show-day="true"
                    :show-milli="true"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "countdown",
        data:function(){
            return{
                endTime1:+new Date + 100000000,
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
.showDay /deep/{
    color:red;
    .countdown-container{
        color:red
    }
}
</style>