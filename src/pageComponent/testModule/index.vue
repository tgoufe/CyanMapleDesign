<template>
	<div class="bg-white form green">
		<p class="text-center paddingt20" v-if="showTitle">组件配置</p>
		<div v-for="(value,key) in data" class="flex-container margin10">
			<label for="###" v-text="key" style="min-width:100px"></label>
			<input type="text" class="flex1" v-if="typeof value ==='string'&& !/icon/i.test(key)" v-model="data[key]">
			<select name="" class="flex1" v-if="typeof value ==='string'&& /icon/i.test(key)" v-model="data[key]">
				<option :value="item" v-for="item in iconJson" v-text="item"></option>
			</select>
			<input type="number" class="flex1" v-if="typeof value ==='number'" v-model="data[key]">
			<input type="checkbox" class="checkbox-switch" v-model="data[key]" v-if="typeof value==='boolean'">
			<div v-if="isObject(value)" class="border flex1">
				<pc-test :data="value" :show-title="false"></pc-test>
			</div>
			<div v-if="isArray(value)" class="border padding10 flex1">
				<div class="flex-container" v-for="(item,index) in value">
					<input type="text" class="flex1 marginv10" v-if="typeof item ==='string'&& !/icon/i.test(key)" v-model="value[index]">
					<select name="" class="flex1 marginv10" v-if="typeof item ==='string'&& /icon/i.test(key)" v-model="value[index]">
						<option :value="icon" v-for="icon in iconJson" v-text="icon"></option>
					</select>
					<div class="marginl20 badge red round" @click="delArr(value,index)">删</div>
				</div>
				<div class="btn blue block" @click="addArr(value)">添加新项</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss"></style>
<script>
	import iconJson from './iconJson.js';
	export default{
		name:'pc-test',
		props:{
			data:Object,
			showTitle:{type:Boolean,default:true}
		},
		data:function(){
			return {
				iconJson
			}
		},
		methods:{
			isArray(value){
				return _.isArray(value);
			},
			isObject(value){
				return _.isPlainObject(value);
			},
			addArr(arr){
				if(_.every(arr,i=>!!i)){
					arr.push('')
				}else{
					maple.alert('咋那么贪心呢，填完了再加')
				}
			},
			delArr(arr,index){
				arr.splice(index, 1)
			}
		}
	}
</script>