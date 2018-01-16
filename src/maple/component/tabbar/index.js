import cmuiTabbar from './tabbar.vue';
import List from '../base/list.js';
Vue.component(cmuiTabbar.name,cmuiTabbar);
function TabBar(){
	// get
	if(!arguments.length){
		return new List('tabbar');
	}
	if(arguments.length==1&&arguments[0]._isVue){
		return new List('tabbar',arguments[0])
	}
	// set
	let defaultOptions=_(cmuiTabbar.props).mapValues(o=>_.get(o,'default')).defaults({
		items:[],
		parent:'body',
		className:'',
		itemClick:null,
		extra:'',
		extraClick:null
	}).value()
	_.forEach(arguments,arg=>{
		if(_.isArray(arg)){
			if(_.every(arg,_.isBoolean)){
				defaultOptions.nav=arg;
			}else{
				defaultOptions.items=arg;
			}
		}else if(_.isString(arg)){
			if(/^\.|\#/.test(arg)){
				defaultOptions.parent=arg
			}else if(_.includes(['top','right','bottom','left'],arg)){
				defaultOptions.position=arg
			}else if(_.includes(['flex','auto'],arg)){
				defaultOptions.col=arg
			}
		}else if(_.isNumber(arg)){
			defaultOptions.col=arg;
		}else if(arg instanceof jQuery){
			defaultOptions.parent=arg
		}else if(_.isFunction(arg)){
			defaultOptions.itemClick=arg
		}
	})
	const options=_.defaults(_.find(arguments,_.isPlainObject),defaultOptions)
	const tpl=$(`
		<cmui-tabbar
		class="${options.className||''}"
		:active-index="${options.activeIndex}"
		position="${options.position}"
		:nav="nav"
		:col="col"
		:watch="list"
		@item-click="itemClick"
		@extra-click="extraClick"
		>
			<div slot="extra" v-for="item in extraList" v-html="item"></div>
			<cmui-tabbar-item v-for="(item,index) in list" :key="index">
				<div v-html="item.title"></div><div slot="content" v-html="item.content"></div>
			</cmui-tabbar-item>
		</cmui-tabbar>
	`);
	const parent=$(options.parent);
	if(parent.length){
		$(options.parent).append(tpl);
		return new Vue({
			el:tpl[0],
			data:function(){
				return {
					list:options.items,
					col:options.col,
					nav:options.nav,
					extraList:[].concat(options.extra)
				}
			},
			methods:{
				itemClick:_.isFunction(options.itemClick)?options.itemClick:null,
				extraClick:_.isFunction(options.extraClick)?options.extraClick:null,
			}
		})
	}
}
export default TabBar