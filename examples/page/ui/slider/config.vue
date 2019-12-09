<template>
	<div>
		<div class="tag-container example">
			<cmui-slider :watch="imgList" ref="slider"
				:loop="optionsLoop"
				:autoplay="optionsAutoplay"
				:col="optionsCol"
				:nav="optionsNav"
				:space="optionsSpace"
				:page="optionsPage"
			>
				<cmui-slider-item :key="key" v-for="(item,key) in imgList">
					<!-- <img :src="item"> -->
					<div class="sliderImg"></div>
				</cmui-slider-item>
			</cmui-slider>
		</div>
<!-- 		<div class="tag-container config form">
			<cmui-number class="marginb20" :flex="true" v-model="number" :width="100">数量</cmui-number>
			<cmui-select class="marginb20" :flex="true" v-model="optionsPage" :data="optionsPageList" width="164">page</cmui-select>
			<cmui-checkbox class="marginb20" target-class="switch" :flex="true" v-model="optionsNav">nav</cmui-checkbox>
			<cmui-checkbox class="marginb20" target-class="switch" :flex="true" v-model="optionsAutoplay">autoplay</cmui-checkbox>
			<cmui-checkbox class="marginb20" target-class="switch" :flex="true" v-model="optionsLoop">loop</cmui-checkbox>
		</div> -->
		<div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
            <div class="btn-group flex-container">
                <span class="text-white left" style="min-width: 55px;">Page</span>
                <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                    <div class="flex1 flex-container center" style="padding:3px;" v-for="item in optionsPageList"><div class="badge blue pill" @click="optionsPage=item" :class="optionsPage==item?'badgeCurrent':'badgeDefault'" style="text-transform:capitalize">{{item}}</div></div>
                </div>
            </div>
            <div class="flex-container marginv30 form text-white NewStyle">
                <span class="left flex1">数量</span>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-number v-model="number" :flex="true">
					</cmui-number>
                </div>
            </div>
            <div class="form NewStyle">
                <div class="flex-container marginv30">
                    <div class="flex1 marginr50">
                        <cmui-checkbox
                        :flex="true"
                        target-class="switch"
                        class="text-white"
                        v-model="optionsNav">Nav</cmui-checkbox>
                    </div>
                    <div class="flex1 marginl50">
                        <cmui-checkbox
                        :flex="true"
                        target-class="switch"
                        class="text-white"
                        v-model="optionsAutoplay">Autoplay</cmui-checkbox>
                    </div>
                </div>
            </div>
            <div class="form NewStyle">
                <div class="flex-container marginv30">
                    <div class="flex1 marginr50">
                        <cmui-checkbox
                        :flex="true"
                        target-class="switch"
                        class="text-white"
                        v-model="optionsLoop">Loop</cmui-checkbox>
                    </div>
                    <div class="flex1 marginl50">
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<style>
	.sliderImg{
		background: #f5f5f5;
		height:200px;
		width: 100%;
	}
	.swiper-pagination-bullet-active {
	    background: #00baba;
	}
</style>
<script type="text/javascript">
	let imageSrc='http://img0.imgtn.bdimg.com/it/u=2469962442,1331893164&fm=27&gp=0.jpg'
	export default{
		data:function(){
			return {
				data:[],
				number:5,
				optionsLoop:false,
				optionsAutoplay:false,
				optionsCol:1,
				optionsNav:false,
				optionsSpace:0,
				optionsPage:true,
				optionsPageList:[
				'number',true,false
				],
				// optionsPageList:[
				// 'number',true,false,{text:'2',value:[1,2,2,2]},3,4,
				// ],
				testValue:111,
				testValue2:[{text:'123',value:{name:123}}]
			}
		},
		watch:{
			optionsPage(value){console.log(typeof value);this.$refs.slider.resetSwiper()},
			optionsLoop(){this.$refs.slider.resetSwiper()},
			optionsAutoplay(){this.$refs.slider.resetSwiper()},
			optionsCol(){this.$refs.slider.resetSwiper()},
			optionsNav(){this.$refs.slider.resetSwiper()},
			optionsSpace(){this.$refs.slider.resetSwiper()}
		},
		computed:{
			imgList(){
				return _.times(this.number,index=>imageSrc)
			}
		},
		methods:{
			loadData(){
				this.data=_.times(5,index=>imageSrc);
			}
		}
	}
</script>