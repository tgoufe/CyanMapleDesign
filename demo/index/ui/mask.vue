<template>
	<div class="padding20">
		<div class="tag-container example">
			<p>使用方式</p>
			<p>简介方式：maple.mask(content,position,callback)</p>
			<p>完整方式：maple.mask(options)</p>
			<p>options结构：</p>
			<cmui-list :col="[1,2]">
				<cmui-list-item>position
				</cmui-list-item><cmui-list-item>表示位置的字符串，继承于flex-container,可选值为top,bottom,left,right,center中的一个或两个</cmui-list-item>
				<cmui-list-item>content
				</cmui-list-item><cmui-list-item> 弹出的内容，支持html片段</cmui-list-item>
				<cmui-list-item>closeFn
				</cmui-list-item><cmui-list-item> 弹窗关闭的毁掉函数</cmui-list-item>
				<cmui-list-item>callback
				</cmui-list-item><cmui-list-item> 弹窗弹出并渲染完成后的回调函数</cmui-list-item>
				<cmui-list-item>contentStyle
				</cmui-list-item><cmui-list-item> 弹窗内容容器样式</cmui-list-item>
			</cmui-list>
		</div>
		<div class="tag-container config">
			<cmui-input v-model="text">
				 <span style="width:100px" class="dis-i">弹出的内容</span>
			</cmui-input>
			<div class="flex-container margint20">
				<span style="width:100px" class="dis-i">内容位置</span>
				<cmui-select class="flex1" :data="pos1" v-model="pos1rs"></cmui-select>
				<cmui-select class="flex1" :data="pos2" v-model="pos2rs"></cmui-select>
			</div>
			<a href="javascript:void(0)" class="btn radius blue block margint20" @click="showMask">
				show mask
			</a>
		</div>
		<div class="tag-container otherExp">
			<a href="javascript:void(0)" class="btn radius blue block margint20" @click="demo1">
				动态创建一个带有轮播的弹窗
			</a>
		</div>
	</div>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
	let contentStyle={
		padding:'20px',
		backgroundColor:'white',
		borderRadius:'4px',
		width:'80%',
		textAlign:'center'
	}
	export default{
		data:function(){
			return{
				pos1:['center','top','bottom'],
				pos2:['left','right','center'],
				pos1rs:['center'],
				pos2rs:['center'],
				text:'mask content'
			}
		},
		mounted() {
            this.$root.headTitle = "mask"
        },
        methods:{
        	showMask(num){
				maple.mask({
					content:this.text,
					position:this.pos1rs+' '+this.pos2rs,
					contentStyle,
					closeFn:function(){
						console.log('closeFn方法被调用')
					},
					callback:function(){
						console.log('callback方法被调用')
					}
				});
        	},
        	demo1(){
        		let slider;
        		maple.mask({
        			content:this.text,
        			position:this.pos1rs+' '+this.pos2rs,
        			callback($dom){
        				let dom=$dom.find('.mask-content');
        				slider=maple.slider(_.times(5,index=>{
        					return `<img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=426631808,2754289518&fm=27&gp=0.jpg'/>`
        				}),dom);
        			},
        			closeFn($dom){
        				slider.destroy();
        				$dom.find('.cmui-slider').remove();
        			},
        			contentStyle
        		})
        	}
        }
	}
</script>