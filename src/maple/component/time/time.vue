<template>
	<div class="cmui-seckill-timer">
		<div class="cmui-seckill-time" v-if="days"><span  v-text="seconds[0]"></span><span  v-text="seconds[1]"></span></div>
		<span class="cmui-seckill-time-separator" style="width:auto" v-if="days">天</span>
		<div class="cmui-seckill-time"><span v-text="hours[0]"></span><span  v-text="hours[1]"></span></div>
		<span class="cmui-seckill-time-separator">:</span>
		<div class="cmui-seckill-time"><span  v-text="minutes[0]"></span><span  v-text="minutes[1]"></span></div>
		<span class="cmui-seckill-time-separator">:</span>
		<div class="cmui-seckill-time"><span  v-text="seconds[0]"></span><span  v-text="seconds[1]"></span></div>
		<span class="cmui-seckill-time-separator" v-if="millisecond">:</span>
		<div class="cmui-seckill-time" v-if="millisecond"><span  v-text="seconds[0]"></span><span  v-text="seconds[1]"></span></div>
    </div>
</template>
<style lang="sass">
.cmui-seckill{
	&-timer{
	    vertical-align: middle;
	    display: inline-block;
	    margin: 0 0 0 6px;
	};
	&-time{
	    width: 18px;
	    line-height: 17px;
	    color: #232326;
	    font-size: 12px;
	    position: relative;
	    &:after{
		    border-radius: 2px;
		    height: 200%;
		    content: '';
		    width: 200%;
		    border: 1px solid #dfdfdf;
		    position: absolute;
		    top: -1px;
		    left: -1px;
		    transform: scale(0.5,0.5);
		    -webkit-transform: scale(0.5,0.5);
		    transform-origin: left top;
		    -webkit-transform-origin: left top;
		    z-index: 10;
	    }
	};
	&-time-separator{
		width: 6px;
	};
	&-time,&-time-separator{
	    float: left;
	    display: inline-block;
	    text-align: center;
	    line-height: 16px;
	    height: 16px;
	    font-size: 12px;
	    text-align: center;
	    color: #232326;
	}
}
</style>
<script>
	function paddingNumber(number,len=2){
		if(isNaN(number)){
			return 
		}
		var numberString=number+'';
		var numberLen=numberString.length;
		while(numberString.length<len){
			numberString=0+numberString;
		}
		return numberString;
	}
	var timeHandle;
	export default{
		props:{
			value:{
				type:Number,
				default:0
			},
			millisecond:{
				type:Boolean,
				default:false
			},
			day:{
				type:Boolean,
				default:false
			},
		},
		data(){
			var date=new Date(+this.value||0)
			return {
				hours:paddingNumber(date.getUTCHours()),
				minutes:paddingNumber(date.getUTCMinutes()),
				seconds:paddingNumber(date.getUTCSeconds()),
				copyValue:this.value
			}
		},
		watch:{
			copyValue:function(value){
				if(isNaN(value)){
					return
				}
				if(value<=0){
					this.setValue(0)
					console.log('done');
					return;
				}
				this.setValue(value)
				timeHandle=setTimeout(()=>{
					this.copyValue-=1000;
				}, 1000);
			},
			value:function(value){
				clearTimeout(timeHandle);
				this.copyValue=value;
			}
		},
		methods:{
			setValue(value){
				var date=new Date(value);
				this.hours=paddingNumber(date.getUTCHours())
				this.minutes=paddingNumber(date.getUTCMinutes())
				this.seconds=paddingNumber(date.getUTCSeconds())
			}
		},
		mounted(){
			if(isNaN(this.copyValue)){
				return
			}
			timeHandle=setTimeout(()=>{
				this.copyValue-=1000;
			}, 1000);
		}
	}
	//millisecond:boolen
	//day:Boolean
</script>
