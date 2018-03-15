<template>
	<div class="padding30">
		<blockQuote class="marginb30">
		badge类可以根据你的需要创建一个标签，支持色彩系统并支持多种属性，你可以通过下面的配置选项来配置一个适合你的标签样式，同时可以在代码展示区查看对应的代码实现
		</blockQuote>

		<div class="flex-container marginb30 form">
			<div class="flex1 pos-r">
				<i class="baseIcon baseIcon-style_color pos-a" :class="'text-'+color" style="font-size:24px;left:10px;top:0"></i>
				<select name="" id="" v-model="color" style="padding-left:40px;">
					<option :value="item" class="radius" v-for="item in colors">{{item}}</option>
				</select>
				<i class="baseIcon baseIcon-action_selectDown pos-a" style="font-size:24px;right:10px;top:0"></i>
			</div>
			<span class="marginh20">-</span>
			<div class="flex1 pos-r">
				<i class="baseIcon baseIcon-style_size pos-a" style="font-size:24px;left:10px"></i>
				<select name="" id="" v-model="size" style="padding-left:40px;">
					<option value="big" class="radius">big</option>
					<option value="" class="radius">default</option>
					<option value="small" class="radius">small</option>
				</select>
				<i class="baseIcon baseIcon-action_selectDown pos-a" style="font-size:24px;right:10px;top:0"></i>
			</div>
			
		</div>
		<blockQuote class="flex-container marginb30">
			<div class="ratio-container" style="width:40px;">
				<div class="icon-container flex-container center" :class="{active:radius}" @click="radius=!radius">
					<i class="baseIcon baseIcon-round"></i>
				</div>
			</div>
			<div class="ratio-container" style="width:40px;">
				<div class="icon-container flex-container center" :class="{active:reverse}" @click="reverse=!reverse">
					<i class="baseIcon baseIcon-round"></i>
				</div>
			</div>
			<div class="ratio-container" style="width:40px;">
				<div class="icon-container flex-container center" :class="{active:pill}" @click="pill=!pill">
					<i class="baseIcon baseIcon-round"></i>
				</div>
			</div>
			<div class="ratio-container" style="width:40px;">
				<div class="icon-container flex-container center" :class="{active:flag}" @click="flag=!flag">
					<i class="baseIcon baseIcon-round"></i>
				</div>
			</div>
			<div class="ratio-container" style="width:40px;">
				<div class="icon-container flex-container center" :class="{active:round}" @click="round=!round">
					<i class="baseIcon baseIcon-round"></i>
				</div>
			</div>
			<div class="ratio-container" style="width:40px;">
				<div class="icon-container flex-container center" :class="{active:square}" @click="square=!square">
					<i class="baseIcon baseIcon-round"></i>
				</div>
			</div>
		</blockQuote>

		<div class="border flex-container center pos-r radius" style="height:150px;">
			<div class="pos-a border radius padding10 text-light" style="top:-1px;right:-1px;" @click="scale=!scale">
				{{scale?'1X':'2X'}}
			</div>
			<span
			id="code"
			class="badge"
			:class="[{radius,reverse,pill,flag,round,square},size,color]"
			:style="demoStyle"
			contenteditable="true"
			>demo</span>
		</div>
		<div class="fixed-bottom padding10">
			<pre v-text="code"></pre>
		</div>
	</div>
</template>
<style lang="scss">
	#code{
		transition:all .5s
	}
	.icon-container{
		&.active{
			background-color: white;
			border:1px solid #EBEBEB;
			border-radius: 4px;
		}
		i{
			font-size: 24px;
		}
	}
</style>
<script>
	function changeCode(){
		this.$nextTick(function(){
			this.code=$(this.$el).find('#code')[0]
			.outerHTML
			.replace(/(style|id|contenteditable)=".*?"/g,'')
			.replace('  ','')
		})
	}
	export default{
		data:function(){
			return {
				colors:['red','orange','yellow','green','coffee','blue','purple'],
				radius:false,
				reverse:false,
				pill:false,
				flag:false,
				round:false,
				square:false,
				size:'',
				color:'blue',
				code:'',
				scale:false
			}
		},
		computed:{
			demoStyle(){
				var rs={};
				if(this.scale){
					rs.transform='scale(2)'
				}
				return rs;
			}
		},
		mounted(){
			changeCode.call(this);
			this.$root.headTitle="badge"
		},
		watch:{
			radius:changeCode,
			reverse:changeCode,
			pill:changeCode,
			flag:changeCode,
			round:changeCode,
			square:changeCode,
			size:changeCode,
			color:changeCode,
		},
		methods:{
			showCode(e){
				const target=e.currentTarget;
				this.code1=target.outerHTML
				.replace(/(style|id|contenteditable)=".*?"/g,'')
				.replace('  ','')
			},
			changeColor(color){
				this.color=color
			}
		}
	}
</script>