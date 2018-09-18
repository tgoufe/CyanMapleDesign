<template>
	<cmui-list :border="true" :index="true">
        <cmui-list-group v-for="item in listData" :title="item.name">
            <cmui-list-item v-for="inner in item.items">
                <div class="flex-container padding20">
                    <div class="img-container round marginr20" style="width:50px">
                        <img :src="inner.avatar" alt="">
                    </div>
                    <span class="flex1">{{inner.name}}</span>
                </div>
            </cmui-list-item>
        </cmui-list-group>
    </cmui-list> 
</template>
<script type="text/javascript">
	import listData from '../../demoData/music.json';
	export default{
		data:function(){
			return {listData}
		}
	}
</script>