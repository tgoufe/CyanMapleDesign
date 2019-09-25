<template>
	<div class="mask" :class="position" @click="cancel()" v-show="showCmuiDialog">
		<div class="mask-content"
		v-html="content"
		@click.stop.prevent='function(){}'
		@touchstart.stop.prevent='function(){}'
		@touchmove.stop.prevent='function(){}'
		:style="contentStyle"
		style="max-width:100%">
		</div>
	</div>
</template>
<style>
	
</style>
<script>
	export default{
		props:{
			position:{type:String,default:'center'},
			content:{type:String,default:''},
			closeFn:Function,
			contentStyle:null
		},
		data:function(){
			return {
				showCmuiDialog:false
			}
		},
		methods:{
			cancel(){
				this.showCmuiDialog=false;
				document.body.classList.remove('overflow-h');
				(typeof this.closeFn==='function')&&this.closeFn($(this.$el))
			}
		}
	}
</script>