<style lang="scss">
</style>
<script>
	export default{
		name:'cmui-tabbar-nav',
		render(h){
			let {
				activeIndex,
				itemStyle,
				itemEvent
			}=this;
			let items=this.items.map((item,index)=>{
				return h('div',{
					'class':[
						'cmui-tabbar__head-item flex1',
						_.get(item,'data.staticClass'),
						index===activeIndex?'active':''
					],
					style:itemStyle,
					on:{
						click:_.partialRight(itemEvent,item,index)
					},
					key:index
				},item.children.filter(inner=>_.get(inner,'data.attrs.slot')!=='content'))
			})
			return h('div',{
				'class':{
					'cmui-tabbar__nav':true,
					'flex1':true
				}
			},items)
		},
		props:{
			items:Array,
			activeIndex:Number,
			itemStyle:Object
		},
		methods:{
			itemEvent(event,item,index){
				const oldIndex=this.$parent.activeIndex;
				const model=_.get(item,'data.model.value');
				this.$emit('nav-item',item,index,oldIndex,model);
				this.$parent.changeToIndex(index);
			}
		}
	}
</script>