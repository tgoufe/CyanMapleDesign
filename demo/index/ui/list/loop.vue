<template>
	<div class="padding20">
		<p>两栏1：1，右侧继续嵌套并带有边框和间距</p>
		<cmui-list :col="2" :space="20" >
			<cmui-list-item>
				<div class="ratio-container">
					<div class="img-container flex-x">
						<img :src="list[0]" alt="">
					</div>
				</div>
			</cmui-list-item>
			<cmui-list-item>
				<cmui-list :col="2" :space="10">
					<cmui-list-item v-for="(item,index) in 4" :key="index">
						<cmui-list :col="2" border="#17c147" :space="10">
							<cmui-list-item v-for="(item,index) in 4" :key="index">
								<div class="ratio-container">
									<div class="img-container flex-x">
										<img :src="list[index+1]" alt="">
									</div>
								</div>
							</cmui-list-item>
						</cmui-list>
					</cmui-list-item>
				</cmui-list>
			</cmui-list-item>
		</cmui-list>
		<p class="paddingv20">下面展示了一个自定义比例,自定义边框，并且循环嵌套的列表，通常情况下你不会用到这么复杂的嵌套</p>
		<cmui-list :col="[3,2]" border="#17c147">
			<cmui-list-item>
				<cmui-list border="#17c147">
					<cmui-list-item >
						<div class="ratio-container-3x2">
							<div class="img-container flex-x">
								<img :src="list[0]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
				<cmui-list :col="3" border="#17c147">
					<cmui-list-item v-for="(item,index) in 3" :key="index">
						<div class="ratio-container-1x2">
							<div class="img-container flex-x">
								<img :src="list[index+5]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
			</cmui-list-item>
			<cmui-list-item>
				<cmui-list :col="2" border="#17c147">
					<cmui-list-item v-for="(item,index) in 2" :key="index">
						<div class="ratio-container">
							<div class="img-container flex-x">
								<img :src="list[index+1]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
				<cmui-list :col="[1,2]" border="#17c147">
					<cmui-list-item>
						<div class="ratio-container-1x3">
							<div class="img-container flex-x">
								<img :src="list[4]" alt="">
							</div>
						</div>
					</cmui-list-item>
					<cmui-list-item>
						<div class="ratio-container-2x3">
							<div class="img-container flex-x">
								<img :src="list[8]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
				<cmui-list :col="2" border="#17c147">
					<cmui-list-item v-for="(item,index) in 2" :key="index">
						<div class="ratio-container">
							<div class="img-container flex-x">
								<img :src="list[index+1]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
			</cmui-list-item>
		</cmui-list>
	</div>
	
</template>
<script type="text/javascript">
	export default{
		data:function(){

			return{
				list:_.times(10,i=>{
	                return location.origin+'/dist/image/black'+i+'.jpg';
	            })
			}
		}
	}
</script>