<template>
<div>
	<p class="title paddingv20 paddingh30">两栏1：1，右侧继续嵌套并带有边框和间距</p>
	<div class="padding30">
		<cmui-list :col="2" :space="20">
			<cmui-list-item>
				<div class="ratio-container">
					<div class="img-container flex-x">
						<img :src="img.cmList[0]" alt="">
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
										<img :src="img.cmList[index+1]" alt="">
									</div>
								</div>
							</cmui-list-item>
						</cmui-list>
					</cmui-list-item>
				</cmui-list>
			</cmui-list-item>
		</cmui-list>
	</div>

	<p class="title paddingv20 paddingh30">下面展示了一个自定义比例,自定义边框，并且循环嵌套的列表，通常情况下你不会用到这么复杂的嵌套</p>
	<div class="padding30">
		<cmui-list :col="[3,2]" border="#17c147">
			<cmui-list-item>
				<cmui-list border="#17c147">
					<cmui-list-item>
						<div class="ratio-container" ratio="3/2">
							<div class="img-container flex-x">
								<img :src="img.cmList[0]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
				<cmui-list :col="3" border="#17c147">
					<cmui-list-item v-for="(item,index) in 3" :key="index">
						<div class="ratio-container" ratio="1/2">
							<div class="img-container flex-x">
								<img :src="img.cmList[index+5]" alt="">
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
								<img :src="img.cmList[index+1]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
				<cmui-list :col="[1,2]" border="#17c147">
					<cmui-list-item>
						<div class="ratio-container" ratio="1/3">
							<div class="img-container flex-x">
								<img :src="img.cmList[4]" alt="">
							</div>
						</div>
					</cmui-list-item>
					<cmui-list-item>
						<div class="ratio-container" ratio="2/3">
							<div class="img-container flex-x">
								<img :src="img.cmList[8]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
				<cmui-list :col="2" border="#17c147">
					<cmui-list-item v-for="(item,index) in 2" :key="index">
						<div class="ratio-container">
							<div class="img-container flex-x">
								<img :src="img.cmList[index+1]" alt="">
							</div>
						</div>
					</cmui-list-item>
				</cmui-list>
			</cmui-list-item>
		</cmui-list>
	</div>
</div>
</template>
<script type="text/javascript">
import img from '@assets/img.js'
export default {
  data: function() {
    return {
		img
    }
  }
}
</script>
