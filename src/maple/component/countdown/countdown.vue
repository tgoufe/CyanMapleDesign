<template>
	<div class="cmui-countdown flex-container">
		<div class="countdown-container" :class="key" v-for="(value,key) in contentList">
			<span>{{value}}</span>
		</div>
	</div>
</template>
<style>
	.countdown-container{
		background-color:#232323;
		color:#ffffff;
		padding:1px 3px;
		border-radius:2px;
		position: relative;
	}
	.countdown-container:not(:last-child){
		margin-right: 10px;
	}
	.countdown-container:not(:last-child):after{
		content: ':';
		color:#232323;
		position: absolute;
		right:-7px;
		top:0;
	}
</style>
<script>
	var timer;
	export default{
		props:{
			nowTime:{type:Number,default:+new Date},
			endTime:{type:Number,default:0},
			showMilli:{type:Boolean,default:false}, //是否显示毫秒数，默认不显示
		},
		data(){
			return {
				contentList:{hour:'00',minute:'00',sec:'00'}
			}
		},
		mounted(){
			var vm=this,
				intervalTime = this.showMilli?100:1000;
			if(_.isNumber(this.endTime)&&_.isNumber(this.nowTime)&&this.endTime>this.nowTime){
				vm.nowTime+=intervalTime;
				timer=setInterval(function(){
					vm.nowTime+=intervalTime;
				}, intervalTime);
			}
		},
		watch:{
			nowTime(value){
				if(this.endTime&&this.nowTime){
					var countDownTime=this.endTime-value;
					this.$emit('update',this,countDownTime);
					if(countDownTime<0){
						clearTimeout(timer);
						this.contentList={hour:'00',minute:'00',sec:'00'};
						this.$emit('countdownend',this);
					}else{
						var obj={
							hour:Math.floor((countDownTime / 3600000) % 24),
							minute:Math.floor((countDownTime / 60000) % 60),
							sec:Math.floor((countDownTime / 1000) % 60)
						};
						if(this.showMilli){
							obj.millSec = Math.floor((countDownTime / 100) % 10)
						}
						this.contentList=_.mapValues(obj,item=>_.padStart(item,2,0))
					}
				}
			},
			endTime(value){
				var vm=this,
					intervalTime = this.showMilli?100:1000;
				if(this.endTime&&this.nowTime&&this.endTime>this.nowTime){
					clearTimeout(timer);
					vm.nowTime+=intervalTime;
					timer=setInterval(function(){
						vm.nowTime+=intervalTime;
					}, intervalTime);
				}
			}
		}
	}
</script>