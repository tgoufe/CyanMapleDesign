<template>
	<div class="padding20">
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
					<img :src="item">
				</cmui-slider-item>
			</cmui-slider>
		</div>
		<div class="tag-container config form">
			<cmui-number class="marginb20" :flex="true" v-model="number" :width="100">数量</cmui-number>
			<cmui-select class="marginb20" :flex="true" v-model="optionsPage" :data="optionsPageList" width="164">page</cmui-select>
			<cmui-checkbox class="marginb20" target-class="switch" :flex="true" v-model="optionsNav">nav</cmui-checkbox>
			<cmui-checkbox class="marginb20" target-class="switch" :flex="true" v-model="optionsAutoplay">autoplay</cmui-checkbox>
			<cmui-checkbox class="marginb20" target-class="switch" :flex="true" v-model="optionsLoop">loop</cmui-checkbox>
		</div>
	</div>
</template>
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
				optionsNav:true,
				optionsSpace:0,
				optionsPage:false,
				optionsPageList:[
				'number',true,false,{text:'2',value:[1,2,2,2]},3,4,
				],
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