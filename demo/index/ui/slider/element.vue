<template>
	<div style="height:calc(100vh - 44px)" class="flex-container vfull">
		<cmui-slider direction="vertical" :col="0" :free-mode="true" height="600px" control="content" ref="nav" :options="{centeredSlides: true,slideToClickedSlide: true}" id="nav">
			<cmui-slider-item v-for="(item,index) in 20" :key="index">
				<div class="padding10">
					<div class="btn block red marginv20">
						分类{{index}}
					</div>
				</div>
			</cmui-slider-item>
		</cmui-slider>
		<cmui-slider height="600px" direction="vertical" :col="0" :free-mode="true" control="nav" ref="content">
			<cmui-slider-item v-for="(item,index) in 20" :key="index">
				<div class="padding10 flex-container vfull borderb" v-for="(inner,key) in 10">
					<div class="ratio-container img-container marginr20" style="width: 80px">
						<img src="//test.img.tg-img.com/seller/201808/06/7FC09A14-80A2-47BF-9D8D-4B43E53A4ACC.jpg!y">
					</div>
					<div class="flex1">
						<p class="fs-15">分类{{index}}的第{{key}}个</p>
						<p class="text-limit2 text-light fs-12">
							意大利面，也被称为意粉，是西餐正餐中最接近中国人饮食习惯的面点。
						</p>
					</div>
				</div>
			</cmui-slider-item>
		</cmui-slider>
	</div>
</template>
<style type="text/css">
	#nav .swiper-slide-active .red{
		background-color: blue;
	}
</style>
<script type="text/javascript">
	export default {

	}
</script>