<style lang="scss">
	@import "theme";
</style>
<script>
	import cmuiTabbarNav from './tabbar-nav.vue';
	import cmuiTabbarPane from './tabbar-pane.vue';
	import cmuiRender from '../base/render';
	import List from '../base/list.js';
	export default{
		name:'cmui-tabbar',
		components:{
			cmuiTabbarNav,
			cmuiTabbarPane,
			cmuiRender
		},
		render(h){
			const {items
			,	activeIndex
			,	position
			,	changeToPre
			,	changeToNext
			,	headContainerClass
			,	itemStyle
			,	navItem
			,	extras
			,	extraEvent
			}=this
			const content=h('div',{
				'class':{
					'cmui-tabbar__content':true,
					'flex1':position==='left'||position==='right'
				}
			},[
				h('cmui-tabbar-pane',{
					props:{
						items:items,
						activeIndex:activeIndex
					},
					ref:'pane'
				})
			])
			const pre=h('div',{
				'class':{
					'cmui-tabbar__pre':true,
					'text-center':true
				},
				on:{
					click:changeToPre
				}
			},[h('i',{'class':`baseIcon baseIcon-${this.isVertical?'fold':'back'}`})]);
			const next=h('div',{
				'class':{
					'cmui-tabbar__next':true,
					'text-center':true
				},
				on:{
					click:changeToNext
				}
			},[h('i',{'class':`baseIcon baseIcon-${this.isVertical?'unfold':'right'}`})]);
			const nav=h('cmui-tabbar-nav',{
				'class':headContainerClass,
				props:{
					items,
					activeIndex,
					itemStyle
				},
				on:{
					'nav-item':navItem
				},
				ref:'nav'
			});
			const extraList=extras.map((item,index)=>{
				return h('div',{
					'class':'cmui-tabbar__extra-item',
					key:index,
					on:{
						click:_.partialRight(extraEvent,item,index)
					}
				},[item])
			})
			const extra=h('div',{
				'class':{
					'cmui-tabbar__extra':true,
					'flex-container':!this.isVertical
				}
			},extraList);
			const head=h('div',{
				'class':{
					'cmui-tabbar__head':true,
					'flex-container':!this.isVertical,
					'flex-container-col':this.isVertical
				}
			},[
				this.nav[0]?pre:undefined,
				nav,
				this.nav[1]?next:undefined,
				extraList.length?extra:undefined
			])
			return h('div',{
				'class':{
					'cmui-tabbar':true,
					'flex-container vfull':this.isVertical,
					'cmui-tabbar-top':this.position==='top',
					'cmui-tabbar-left':this.position==='left',
					'cmui-tabbar-bottom':this.position==='bottom',
					'cmui-tabbar-right':this.position==='right'
				},
				style:{
					'max-height':this.isVertical?'100%':'none'
				}
			},_.includes(['right','bottom'],position)?[content,head]:[head,content])
		},
		data:function(){
			return{
				items: this.getItems()
			}
		},
		props:{
			col:{type:[String,Number],default:'auto'},
			activeIndex:{type:Number,default:0},
			nav:{type:Array,default:[false,false]},
			watch:null,
			position:{type:String,default:'top'}
		},
		methods:{
			scrollAcitveIntoViewIfNeeded(isStart=true){
				const tabBar=this.$refs.nav.$el;
				const activeItem=tabBar.children[this.activeIndex];
				const tabBarP=tabBar.getBoundingClientRect();
				const activeItemP=activeItem.getBoundingClientRect();
				const pos=this.isVertical?['top','bottom']:['left','right'];
				if(!_.inRange(activeItemP[pos[0]],tabBarP[pos[0]],tabBarP[pos[1]])){
					activeItem.scrollIntoView(isStart)
				}
			},
			changeToNext(){
				if(this.activeIndex<this.items.length-1){
					this.activeIndex++
					this.$nextTick(()=>{
						this.scrollAcitveIntoViewIfNeeded(false)
					})
				}
			},
			changeToPre(){
				if(this.activeIndex>0){
					this.activeIndex--
					this.$nextTick(()=>{
						this.scrollAcitveIntoViewIfNeeded(true)
					})
				}
			},
			changeToIndex(index=0){
				if(_.inRange(index,this.items.length)){
					this.activeIndex=index
					this.$nextTick(()=>{
						this.scrollAcitveIntoViewIfNeeded(true)
					})
				}
			},
			changeByStep(num=1){
				if(_.inRange(this.activeIndex+num,this.items.length)){
					this.activeIndex+=num
				}
			},
			getItems(){
				return this.$slots.default.filter(item => item.tag=== 'cmui-tabbar-item')
			},
			updata(){
				this.items=[];
				this.$nextTick(_=>{
					this.items=this.getItems();
				})
			},
			extraEvent(event,item,index){
				this.$emit('extra-click',this,item,index)
			},
			navItem(){
				this.$emit('item-click',this,...arguments)
			}
		},
		watch:{
			watch(){
				this.updata()
			}
		},
		computed:{
			realCol(){
				if(_.isString(this.col)){
					if(this.col==='auto'||this.col==='flex'){
						return this.col;
					}else{
						return 'auto';
					}
				}else if(_.isNumber(this.col)){
					return this.col;
				}else{
					return 'auto'
				}
			},
			itemStyle(){
				let rs={}
				,	number
				;
				if(_.isNumber(this.col)){
					number=100/this.col+'%';
					if(this.isVertical){
						rs.height=number
					}else{
						rs.width=number
					}
				}
				return rs;
			},
			isVertical(){
				return _.includes(['left','right'],this.position);
			},
			headContainerClass(){
				return {
					'scroll-container':!this.isVertical,
					'flex-container':this.realCol==='flex'&&!this.isVertical,
					'flex-container-col':this.realCol==='flex'&&this.isVertical,
					'scroll-container-y':this.isVertical
				}
			},
			showPreNav(){
				return !!_.get(this.nav,'[0]')
			},
			showNextNav(){
				return !!_.get(this.nav,'[1]')
			},
			extras(){
				return this.$slots.extra||[]
			}
		},
		mounted(){
			new List('tabbar').add(this)
		},
		destroyed(){
			$(this.$el).remove();
		}
	}
</script>