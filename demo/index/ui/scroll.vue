<template>
	<div class="padding20">
		<div class="tag-container example">
			<cmui-scroll direction="v" style="height:400px" :pull-text="['下拉刷新','释放刷新','上拉加载','释放加载']" ref="xxx" :free-mode="true" @pullStart="start" @pullEnd="end" :watch="imageList" @rendered="rendered">
				<cmui-scroll-item v-for="(k,i) in imageList">
					<div class="flex-container padding10">
						<div class="ratio-container" style="width:100px">
							<div class="img-container border marginr10 round flex-x">
								<img :src="imageList[i]" alt="">
							</div>
						</div>
						<div class="flex1">
							this is image {{i}}
						</div>
					</div>
				</cmui-scroll-item>
			</cmui-scroll>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data:function(){
			return {
				imageList:_.times(20,i=>{
					if(i<10){
						return location.origin+'/image/white'+i+'.jpg'
					}else{
						return location.origin+'/image/black'+(i-10)+'.jpg'
					}
				})
			}
		},
		methods:{
			start(){
				maple.alert('下拉刷新事件被触发')
			},
			end(){
				this.imageList=this.imageList.concat(_.times(20,i=>{
					if(i<10){
						return location.origin+'/image/white'+i+'.jpg'
					}else{
						return location.origin+'/image/black'+(i-10)+'.jpg'
					}
				}))
			},
			rendered(vm){
				console.log(vm.swiper)
			}
		},
		mounted(){
			
		}
	}
</script>