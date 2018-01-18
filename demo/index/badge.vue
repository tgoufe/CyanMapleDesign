<template>
	<div class="paddingh30">
		<div class="flex-container">
			<h1>badge类</h1>
			<div class="form green flex-container">
				<label for="">双倍预览图</label>
				<input type="checkbox" class="checkbox-switch" v-model="scale">
			</div>
		</div>
		<blockQuote>
		badge类可以根据你的需要创建一个标签，支持色彩系统并支持多种属性，你可以通过下面的配置选项来配置一个适合你的标签样式，同时可以在代码展示区查看对应的代码实现
		</blockQuote>
		<div class="form green">
			<div class="flex-container marginb10">
				<label for="">尺寸</label>
				<div class="flex-container">
					<label for="">small</label>
					<input class="marginr20" type="radio" v-model="size" value="small">
					<label for="">default</label>
					<input class="marginr20" type="radio" v-model="size" value="">
					<label for="">big</label>
					<input class="marginr20" type="radio" v-model="size" value="big">
				</div>
			</div>
			<div class="row">
				<div class="flex-container marginb10 span4">
					<label for="">圆角</label>
					<input type="checkbox" v-model="radius" class="checkbox-switch small">
				</div>
				<div class="flex-container marginb10 span4">
					<label for="">翻转</label>
					<input type="checkbox" v-model="reverse" class="checkbox-switch">
				</div>
				<div class="flex-container marginb10 span4">
					<label for="">药片风格</label>
					<input type="checkbox" v-model="pill" class="checkbox-switch">
				</div>
				<div class="flex-container marginb10 span4">
					<label for="">旗帜风格</label>
					<input type="checkbox" v-model="flag" class="checkbox-switch">
				</div>
				<div class="flex-container marginb10 span4">
					<label for="">圆形</label>
					<input type="checkbox" v-model="round" class="checkbox-switch">
				</div>
				<div class="flex-container marginb10 span4">
					<label for="">方形</label>
					<input type="checkbox" v-model="square" class="checkbox-switch">
				</div>
			</div>
			<span>色彩选择：</span>
			<span
			v-for="color in colors"
			:class="[color]"
			class="badge big square marginr10"
			style="display:inline-block"
			@click="changeColor(color)"
			>{{color.slice(0,1).toUpperCase()}}</span>
		</div>
		<div class="padding30">
			<span>效果展示</span>
			<span
			id="code"
			class="badge"
			:class="[{radius,reverse,pill,flag,round,square},size,color]"
			:style="demoStyle"
			contenteditable="true"
			>点击可编辑内容</span>
		</div>
		<div class="fixed-bottom padding10">
			<div class="card">
				<div class="head">code</div>
				<div class="body padding10">
					<pre v-text="code"></pre>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	#code{
		transition:all .5s
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
					rs.transform='scale(2) translateX(25%)'
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