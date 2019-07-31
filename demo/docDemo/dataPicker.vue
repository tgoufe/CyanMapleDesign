<template>
    <div>
        <cmui-date-picker @select="select" :from="2012">

        </cmui-date-picker>
    </div>
</template>

<script>
    export default {
        name: "dataPicker",
        methods:{
            select(value){
                console.log(value)
            }
        }
    }
</script>

<style scoped>

</style>