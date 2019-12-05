
<template>
    <div>
        <div class="fixed-top bg-black flex-container padding20" style="z-index: 20000">
            <img src="http://s1.xmcdn.com/lib/liveroom-index/last/css/img/logo.png" alt="" width="148">
            <a href="" class="btn red small radius4 ">下载APP</a>
        </div>

        <div class="paddingv120 paddingh20 ">
            <div class="list list-col2">
                <div class="list-item padding10" v-for="item in data" :key="item.page_id" @click="$router.push('brands')">
                    <div class="shadow radius">
                        <img :src="item.page_info.banner" alt="">
                        <div class="padding20">
                            <p>{{item.page_info.name}}</p>
                            <p class="text-light fs-11 margint10">
                                品牌·{{item.page_info.discuss_num}}人在讨论
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
	import {data} from '../data/hot.json'
	export default {
		name: 'hot',
		data () {
			return {
				data
			}
		}
	}
</script>
