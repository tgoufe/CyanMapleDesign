
<template>
    <div>
        <div class="fixed-top bg-black flex-container padding20" style="z-index: 20000">
            <img src="http://s1.xmcdn.com/lib/liveroom-index/last/css/img/logo.png" alt="" width="148">
            <a href="" class="btn red small radius4 ">下载APP</a>
        </div>

        <div class="paddingv120 paddingh20 ">
            <div class="list list-col2">
                <div class="list-item padding10" v-for="item in liveData" :key="item.chatId" @click="$router.push('detail')">
                    <div class="shadow radius">
                        <img :src="item.coverLarge" alt="">
                        <div class="padding20">
                            <p>{{item.nickname}}</p>
                            <p class="text-light fs-11 margint10 text-limit1">
                                {{item.name}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
	import data from '../data/liveData.json'
	export default {
		name: 'hot',
		data () {
			return {
				liveData: data.data.lives
			}
		},
		created() {
			console.log(data)
		}
	}
</script>
