<template>
	<div>
		<cmui-list :border="true">
			<cmui-list-item v-for="(item,index) in imgList" class="bg-white">
				<cmui-swiper :right="item.control" @swiper="handle(index, item,$event)">
					<div class="paddingv10 flex-container vfull">
						<div class="img-container border flex-x marginh20" style="width:70px;height:70px">
							<img :src="item.src">
						</div>
						<div class="flex1">
							<p>adfdsfdsfdsafasdfdsafsdafasdfas{{index}}</p>
						</div>
					</div>
				</cmui-swiper>
			</cmui-list-item>
		</cmui-list>
	</div>
</template>
<script type="text/javascript">
	export default{
		data:function(){
			let imgList=_.times(20,index=>{
				return {
					src:`${location.origin}/image/${index<10?'white':'black'}${index%10}.jpg`,
					control:['删除','收藏']
				}
			})
			return {imgList}
		},
		methods:{
			handle(index,item,arg){
				switch(arg.text){
					case '删除':{
						maple.confirm('是否确认删除',()=>{
							arg.vm.close(()=>{
								this.imgList.splice(index,1);
							});
						},()=>{
							arg.vm.close();
						})
						
						break;
					};
					case '收藏':{
						let timer;
						let count=3;
						let alertvm=maple.alert({
							content:'正在收藏（这是个假的异步操作）',
							okText:count,
							okDisable:true,
							okFn(){
								arg.vm.close();
							}
						})
						timer=setInterval(()=>{
							alertvm.okText=--count;
							if(alertvm.okText===0){
								alertvm.content='收藏成功';
								item.control.splice(1,1,'取消收藏')
								alertvm.okText='确定';
								alertvm.okDisable=false;
								clearInterval(timer)
							}
						},1000)
						break;
					};
					case '取消收藏':{
						arg.vm.close();
						item.control.splice(1,1,'收藏')
						break;
					};
				}
			}
		}
	}
</script>