<template>
	<div class="padding20">
		<div class="tag-container example">
			<cmui-scroll ref="xxx" direction="v" style="height:400px" :pull-text="['下拉刷新','释放刷新','上拉加载','释放加载']" :free-mode="true" :watch="imageList" @pullStart="start" @pullEnd="end" @rendered="rendered">
				<cmui-scroll-item v-for="(k,i) in imageList" :key="i">
					<div class="flex-container padding10">
						<div class="ratio-container" style="width:100px">
							<div class="img-container border marginr10 round flex-x">
								<img :src="imageList[i]" alt="">
							</div>
						</div>
						<div class="flex1">
							this is image {{ i }}
						</div>
					</div>
				</cmui-scroll-item>
			</cmui-scroll>
		</div>
	</div>
</template>
<script type="text/javascript">
import img from '@assets/img.js'
export default {
  data: function() {
    return {
      imageList: [...img.whiteList, ...img.blackList]
    }
  },
  mounted() {

  },
  methods: {
    start() {
      maple.alert('下拉刷新事件被触发')
    },
    end() {
      this.imageList = this.imageList.concat([...img.whiteList, ...img.blackList])
    },
    rendered(vm) {
      console.log(vm.swiper)
    }
  }
}
</script>
