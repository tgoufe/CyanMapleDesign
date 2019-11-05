<template>
	<div class="pc-head borderb flex-container">
		<div class="flex-container left" :style="layoutName" style="margin-right:15px">
			<i class="baseIcon" :class="'baseIcon-'+leftIcon" v-if="leftIcon"  @click="leftIconClick(leftIcon)"></i>
			<span v-if="leftText" v-text="leftText" class="fs-14" @click="leftTextClick(leftText)"></span>
		</div>
		<div v-if="input.display" class="searchBar flex1">
			<form action="" class="form pos-r" v-on:submit.prevent="onSubmit">
				<i class="baseIcon input-leftIcon" :class="'baseIcon-'+input.leftIcon"></i>
				<input type="search" v-on:keyup.enter="onSubmit" :placeholder="input.placeholder" v-on:focus="focusInput" v-on:blur="blurInput" v-model.trim="inputValue">
				<i class="baseIcon baseIcon-search input-reset" @click="cleanInput(inputValue)" v-show="inputValue"></i>
			</form>
		</div>
		<div class="text-center flex1 marginh10" style="line-height:21px;" v-else>
			<span class="title text-limit1 fs-17 flex1" @click="titleClick(title)">
				{{title}}
				<i class="baseIcon baseIcon-unfold titleCrow" v-if="showTitleCrow"></i>
			</span>
		</div>
		<div class="flex-container right rightIcons" :style="layoutName">
			<span class="rightText" v-text="rightText" @click="rightTextClick(rightText)"></span>
			<i class="baseIcon" v-for="item in rightIcons" :class="'baseIcon-'+item" @click="rightIconClick(item)"></i>
		</div>
	</div>
</template>
<style lang="scss">
	.pc-head{
		height:44px;
		line-height:44px;
		padding:0 15px;
		i{
			font-size:24px;
			&.titleCrow{
				font-size:12px;
			}
		}
		.rightIcons i,.rightText{
			margin-left:12px;
		}
		.searchBar{
			input{
				background: rgba(142,142,147,0.12);
				border-radius: 4px;
				line-height:20px;
				padding:4px 25px;
				text-align:left;
			}
			.input-leftIcon{
				left:6px;
				position: absolute;
		        top:0;
		        bottom:0;
		        text-align:center;
			}
			.input-leftIcon,.input-reset{
				width:auto;
				font-size:18px;
				display:block;
			}
		}
	}
</style>
<script>
	var inputTimeHandle
	,	canFocus=true
	;
	export default{
		name:'head',
		props:{
			title         : {type:String,default:'CMUI'},
			showTitleCrow : {type:Boolean,default:false},
			leftIcon      : {type:String,default:'back'},
			leftText      : {type:String,default:''},
			rightIcons     : {type:Array,default(){
				return ['more']
			}},
			rightText     : {type:String,default:''},
			// transparent   : {type:Boolean,default:false},
			input:{
				type:Object,
				default:function(){
					return{
						placeholder : 'Search',
						leftIcon    : 'search',
						rightIcon   : 'voice',
						display     : false
					}
				}
			},
			// stopDefaultEvent:{type:[Array,Boolean],default:false}
		},
		data:function(){
			return {
				inputValue:''
			}
		},
		computed:{
			layoutName:function(){
				if(this.input.display){
					return {}
				}else{
					var len=this.rightIcons.length;
					return {
						'minWidth':((len||1)*36-12)+'px'
					}
				}
			}
		},
		watch:{
			inputValue(value){
				this.$emit('input-value-change',this,value);
				if(this.$root.componentTestMode){
					maple.message('表单内容发生变化:'+value);
				}
			}
		},
		methods:{
			cleanInput(){
				this.inputValue='';
				this.$el.getElementsByTagName('input')[0].focus()
			},
			focusInput(){
				clearTimeout(inputTimeHandle);
				if(canFocus){
					this.$emit('focus-input',this,this.inputValue)
					if(this.$root.componentTestMode){
						maple.message('表单获得焦点，当前内容为:'+this.inputValue);
					}
				}
			},
			blurInput(){
				var _this=this;
				canFocus=false;
				inputTimeHandle=setTimeout(function(){
					_this.$emit('blur-input',this,this.inputValue)
					if(_this.$root.componentTestMode){
						maple.message('表单失去焦点，当前内容为:'+_this.inputValue);
					}
				}, 50);
				_.delay(function(){
					canFocus=true;
				},50)
			},
			leftIconClick(icon){
				this.$emit('left-icon-click',this,icon)
				if(this.$root.componentTestMode){
					maple.message('左侧图标被点击:'+icon);
				}
			},
			leftTextClick(text){
				this.$emit('left-text-click',this,text)
				if(this.$root.componentTestMode){
					maple.message('左侧文本被点击:'+text);
				}
				
			},
			titleClick(text){
				this.$emit('title-click',this,text)
				if(this.$root.componentTestMode){
					maple.message('标题被点击:'+text);
				}
				
			},
			rightTextClick(text){
				this.$emit('right-text-click',this,text)
				if(this.$root.componentTestMode){
					maple.message('右侧文本被点击:'+text);
				}
				
			},
			rightIconClick(icon){
				this.$emit('right-icon-click',this,icon)
				if(this.$root.componentTestMode){
					maple.message('右侧图标被点击:'+icon);
				}
			},
			onSubmit(){
				this.$emit('input-submit',this,this.inputValue)
				if(this.$root.componentTestMode){
					maple.message('表单被提交:'+this.inputValue);
				}
			}
		}
	}
</script>