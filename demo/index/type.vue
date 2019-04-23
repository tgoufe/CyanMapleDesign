<template>
    <div class="padding20">
        <div class="bg-red">sffs</div>
        <cmui-list :col="3" :border="false" :space="20" class="marginv10">
            <cmui-list-item v-for="(item,key) in list " :key="key" class="bg-white">
                <div class="">
                    <cmui-list :col="3" :border="true" :space="20">
                        <cmui-list-item v-for="(item,key) in list " :key="key" class="bg-white">
                            <div class="ratio-container">

                            </div>
                        </cmui-list-item>
                    </cmui-list>
                </div>
            </cmui-list-item>
        </cmui-list>
        <div class="bg-red">sffs</div>
    </div>

</template>

<script>
    const IMGURL='http://test.img.tg-img.com/seller/201902/27/F9BB8E90-62AE-4EBC-B0C6-93D41E8FD574.jpg!y'
    export default {
        name: "type",
        data:function(){
            return {
                list:_.times(9,index=>{
                    return {
                        imageUrl:IMGURL,
                        name:index
                    }
                })
            }
        },
        created() {
            // setInterval(()=>{
            //     this.list=_.shuffle(this.list)
            // },1000)

        }
    }
</script>

<style scoped>

</style>