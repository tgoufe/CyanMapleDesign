<template>
	<div class="padding10">
		<cmui-collapse :onlyone="true" :activeIndex="activeIndex">
			<cmui-collapse-item v-for="item in items">
				<div slot="title">
					{{item.title}}
				</div>
				<div>
					{{item.content}}
				</div>
			</cmui-collapse-item>
		</cmui-collapse>
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				items:_.times(5,index=>{
					return{
						title:index,
						content:`content ${index}`
					}
				}),
				activeIndex:0
			}
		},
		mounted(){
			this.$root.headTitle="collapse";
		}
	}
</script>