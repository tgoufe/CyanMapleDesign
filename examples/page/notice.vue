<template>
	<div>
		<div class="tag-container example">
			<a href="javascript:void(0)" class="btn blue radius block" @click="notice">
				简单的案例
			</a>
			<a href="javascript:void(0)" class="btn blue radius block" @click="notice2">
				倒计时案例
			</a>
			<a href="javascript:void(0)" class="btn blue radius block" @click="notice3">
				使用JS控制
			</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		mounted() {
            this.$root.headTitle = "notice"
        },
        methods:{
        	notice(){
        		maple.notice('这是一个notice,默认三秒消失')
        	},
        	notice2(){
        		let count=10;
        		function run(){
        			maple.notice(count.toString(),0,function(){
        				if(count--){
        					_.delay(run,1000)
        				}else{
        					maple.notice().cancel();
        				}
        			})
        		}
        		run();
        	},
        	notice3(){
        		maple.confirm('这是一个需要控制台的案例，如果你在手机端预览，是无法关闭的，需要刷新该页面',function(){
        			maple.notice('请打开控制台，并输入<br>maple.notice().cancel()<br>来关闭窗口',0)
        		})
        	}
        }
	}
</script>