<template>
	<div style="background: #f5f5f5;">
		<div class="tag-container example">
			<cmui-scroll ref="xxx" direction="v" style="height:600px" :pull-text="['下拉刷新','释放刷新','上拉加载','释放加载']" :free-mode="true"  @pullStart="start" @pullEnd="end">
				<cmui-scroll-item key="1">
					<div class="paddingh40 paddingb30 bg-white">
						<div class="paddingv30 fs-16">
							下拉当前列表可触发刷新
						</div>
						<div class="flex-container center" style="background: #f5f5f5;height:188px;">
							<img :src="imageList" height="32" alt="">
						</div>
					</div>
				</cmui-scroll-item>
				<cmui-scroll-item key="2">
					<div class="margint10 bg-white padding40 flex-container vfull">
						<div class="flex-container-col left">
							<div class="fs-18">下拉当前列表可触发刷新<br>上滑当前列表可触发加载</div>
							<div class="fs-12 text-light"><span class="marginr20">SHAYI</span><span class="marginr20">1075评论</span>5小时前</div>
						</div>
						<div class="flex-container center" style="background: #f5f5f5;height:100px;width:100px;">
							<img :src="imageList" style="transform: rotate(180deg);" height="32" alt="">
						</div>
					</div>
				</cmui-scroll-item>
				<cmui-scroll-item key="3">
					<div class="margint10 bg-white padding40 flex-container vfull">
						<div class="flex-container center" style="background: #f5f5f5;height:100px;width:100px;">
							<img :src="imageList" height="32" alt="">
						</div>
						<div class="flex-container-col left marginl40">
							<div class="fs-18">下拉当前列表可触发刷新<br>上滑当前列表可触发加载</div>
							<div class="fs-12 text-light"><span class="marginr20">SHAYI</span><span class="marginr20">1075评论</span>5小时前</div>
						</div>
					</div>
				</cmui-scroll-item>
				<cmui-scroll-item key="4">
					<div class="paddingh40 bg-white margint10">
						<div class="paddingv30 fs-16">
							上滑当前列表可触发加载
						</div>
						<div class="flex-container marginh-n5">
							<div class="flex-container center flex1 marginh5" v-for="item in 3" style="background: #f5f5f5;height:60px;">
								<img :src="imageList" height="32" alt="" style="transform: rotate(180deg);">
							</div>
						</div>

						<div class="fs-12 text-light paddingv20"><span class="marginr20">SHAYI</span><span class="marginr20">1075评论</span>5小时前</div>
					</div>
				</cmui-scroll-item>
			</cmui-scroll>
		</div>
	</div>
</template>
<style>

</style>
<script type="text/javascript">
import img from '@assets/scroll.png'
export default {
  data: function() {
    return {
      imageList: img
    }
  },
  methods: {
    start() {
      maple.alert('下拉刷新事件被触发')
    },
    end() {
		maple.alert('上拉加载事件被触发')
    }
  }
}
</script>
