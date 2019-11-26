<template>
	<div>
		<p class="title paddingv20 paddingh30">渐变颜色请选择添加颜色按钮</p>
		<div class="padding40 flex-container center" style="min-height: 300px;">
			<div class="flex1 flex-container center">
				<cmui-progress
				:value="value"
				:text="text"
				:color="colorArr"
				:line-width="height"
				:type="type"
				:size="size"
				:style="type!=='circle'&&'width:100%'"
				/>
			</div>
			
		</div>
		
		</cmui-progress>
<!-- 		<div class="tag-container config">
			<cmui-number v-model="height" class="marginb20" :flex="true">
				线宽
			</cmui-number>
			<cmui-slidebar v-model="value" class="marginv20" :step="1"></cmui-slidebar>
			<cmui-number v-model="value" class="marginb20" :flex="true">
				数值
			</cmui-number>
			<cmui-input v-model="text" class="marginb20" :flex="true">
				文本
			</cmui-input>
			<cmui-input v-model="color" class="marginb20" :flex="true" placeholder="用空格分开">
				颜色
			</cmui-input>

			<cmui-select v-model="type" :data="types" class="marginb20" :flex="true" placeholder="用空格分开">
				类型
			</cmui-select>
			<cmui-number v-model="size" class="marginb20" :flex="true" v-if="type==='circle'">
				环形尺寸
			</cmui-number>
		</div> -->
		<div class="fixed-bottom bg-black paddingt20 paddingh50 paddingb40 fs-16 text-white" style="z-index:1">
			<div class="btn-group flex-container paddingv10">
              	<span class="left" style="min-width: 55px;">类型</span>
              	<div class="flex-container" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;min-width:50%;">
                  	<div class="flex-container flex1 center" style="padding:3px;" v-for="item in types"><div class="badge blue pill" @click="type=item" :class="type==item?'badgeCurrent':'badgeDefault'">{{item}}</div></div>
              	</div>
            </div>
            <div class="flex-container paddingv10">
            	<div>颜色</div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar flex-container top left">
                    <div class="pos-r" @click="$index>0 &&subtract($index)" v-for="(item,$index) in color">
                    	<input type="color" class="marginr15" v-model="color[$index]" style="width:32px;height:32px;border-radius:50%;border:2px solid #fff;padding:0"/>
                    	<span class="fs-12 pos-a left0 text-center" v-if="$index>0" style="line-height: 30px;width:32px;">—</span>
                    </div>
                    <div class="pos-r">
                    	<input type="color" v-model="addColor" style="width:32px;height:32px;border-radius:50%;border:2px solid #fff;padding:0"/>
                    	<span class="baseIcon baseIcon-add fs-18 pos-a left0 text-center" style="line-height: 32px;width:32px;pointer-events: none;"></span>
                    </div>
                </div>
            </div>
            <div class="flex-container paddingv10">
            	<div>文本</div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-input v-model="text" class="marginb10" :flex="false" placeholder="添加文本内容">
					</cmui-input>
                </div>
            </div>
            <div class="flex-container paddingv10">
                <div class="flex1 flex-container left">
                	<div>数值</div>
                	<div class="marginl50">{{value}}</div>
                </div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-slidebar v-model="value" :step="1" class="marginb20"></cmui-slidebar>
                </div>
            </div>
            <div class="flex-container paddingv10 form NewStyle">
                <div class="flex1">线宽</div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-number v-model="height" :flex="true"/>
                </div>
            </div>
            <div class="flex-container paddingv10 form NewStyle" v-if="type==='circle'">
                <div class="flex1">尺寸</div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-number v-model="size" :flex="true">
					</cmui-number>
                </div>
            </div>
		</div>
	</div>
</template>
<style type="text/css">
	svg {
  -webkit-transform: rotate(-0.05deg);
  transform: rotate(-0.05deg);
}
circle {
    transition: stroke-dasharray 1s;
}
.themeSlidebar .form input[type=text]{
	background: rgba(102,102,102,0.60);
	border-radius: 16px;
	font-size: 12px;
	color: #797979;
	letter-spacing: 0;
	line-height: 32px;
	border: 0;
    padding: 0 12px;
}
input[type='color']::-webkit-color-swatch-wrapper{
  padding: 0;
}
input[type='color']::-webkit-color-swatch{
  border: 0;
  border-radius: 50%;
}
</style>
<script type="text/javascript">
	export default {
		data:function(){
			return {
				height:10,
				value:80,
				text:'',
				color:['#ab2c57'],
				size:200,
				addColor:'',
				type:'line',
				types:['circle','line']
			}
		},
		watch: {
		    secondChange () {
			}
		},
		computed:{
			sd(){
				return (this.size-this.height)*Math.PI*this.value/100+' 1024'
			},
			colorArr(){
				return this.color.join(',');
			},
			secondChange(){
				this.addColor != '' && this.color.push(this.addColor);
		        return this.addColor != '' && this.addColor,this.addColor = ''
		      }
		},
		mounted(){
			this.$root.headTitle="progress"
		},
		methods:{
		    subtract(n){
		        this.color.splice(n,1);
		        console.log(this.color);
		    }
		}
	}
</script>
