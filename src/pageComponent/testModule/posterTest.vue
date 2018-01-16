<template>
	<div class="posterTest form padding10 border green">
		<div class="marginb10 flex-container">
			<span class="marginr20">列数</span>
			<input type="text" class="flex1" v-model.lazy="col">
		</div>
		<div class="marginb10 flex-container">
			<span class="marginr20">边框</span>
			<div class="flex1 flex-container">
				<input type="checkbox" class="checkbox-switch" v-model="data.border">
			</div>
		</div>
		<div class="flex-container">
			<span class="marginr20">内容</span>
			<div class="flex1 border padding10 posterTestContent pos-r">
				<div v-for="(item,index) in data.items" :key="index">
					<div class="flex-container" v-if="item.imageUrl">
						<span>图片</span>
						<div class="flex1 flex-container">
							<input type="number" :value="imageList[index]?imageList[index].w:1" @change="imageListChange(index)">
							<span>比</span>
							<input type="number" :value="imageList[index]?imageList[index].h:1" @change="imageListChange(index)">
						</div>
					</div>
					<poster-test :data="item" v-if="item.items"></poster-test>
				</div>
				<div class="abs-bottom flex-container">
					<div class="flex1 btn blue small" @click="addImage">
						<i class="baseIcon baseIcon-add"></i>
					</div>
					<div class="flex1 btn green small">
						<i class="baseIcon baseIcon-add"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.posterTestContent{
		min-height:50px;
		padding-bottom:30px;
	}
</style>
<script>
	export default{
		name:'poster-test',
		props:{
			data:{type:Object,default:{}}
		},
		computed:{
			col:{
				get:function(){
					var col=this.data.col;
					if(_.isArray(col)&&_.every(col,_.isNumber)){
						return col.toString();
					}else if(_.isNumber(col)){
						return col
					}else{
						return 1
					}
				},
				set:function(value){
					value=value.replace(' ','');
					if(parseInt(value)==value){
						this.data.col=parseInt(value)
					}else if(/^(\d,?)+$/.test(value)){
						this.data.col=value.split(',').map(item=>parseInt(item))
					}
				}
			},
			imageList(){
				var baseList=this.data.items.filter(item=>item.imageUrl);
				return baseList.map(item=>{
					var arr=item.imageUrl.match(/\d+x\d+/)[0].split('x');
					var nlist=[2,3,5,7];
					for(let i=0;i<nlist.length;i++){
						if(arr.every(item=>item%nlist[i]==0)){
							arr=arr.map(item=>item/nlist[i]);
							i=-1;
						}
					}
					return{
						w:arr[0].toString(),
						h:arr[1].toString()
					}
				})
			}
		},
		methods:{
			addImage(){
				this.data.items.push({
					imageUrl:'//placehold.it/420x420/CCC.png&text=AD'
				});
			},
			getImageRatio(index,p){
				return this.imageList[index][p]
			},
			imageListChange(index){
				var baseList=this.data.items.filter(item=>item.imageUrl);
				if(_.every(this.imageList[index],item=>{
					return _.inRange(parseInt(item),0,10)
				})){
					var width=420*parseInt(this.imageList[index].h)/parseInt(this.imageList[index].w);
					baseList[index].imageUrl=baseList[index].imageUrl.replace(/x\d+/,'x'+width);
				}
			}
		}
	}
</script>