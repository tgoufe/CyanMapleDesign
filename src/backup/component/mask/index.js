import maskVue from './index.vue';
import _ from 'lodash';
Vue.component('cmui-mask',maskVue);
var id=_.uniqueId('cmui-mask-');
var CURRENT=null;
let setCurrent=_.once(function(){
	let dom=document.createElement('cmui-mask');
	dom.id=id;
	document.body.appendChild(dom);
	CURRENT=new Vue({
		el:'#'+id
	}).$children[0];
});
function mask(){
	setCurrent();
	var defaults={
		position:'center',
		content:'',
		closeFn:function(){},
		callback:function(){},
		contentStyle:null
	};
	if(arguments.length){
		var argString=_.filter(arguments,_.isString);
		defaults.position=_.find(argString,item=>{
			return _.every(item.split(' ').filter(i=>i.length),i=>{
				return /^(top|left|bottom|right|center|between)$/.test(i);
			});
		})||'center';
		defaults.content=_.find(argString,item=>item!==defaults.position)||'';
		defaults.callback=_.find(arguments,_.isFunction);
		var argObject=_.find(arguments,_.isPlainObject);
		defaults = _.defaults(argObject,defaults);
		document.body.classList.add('overflow-h');
		CURRENT.showCmuiDialog=true;
		_.each(defaults,(value,key)=>{
			CURRENT[key]=value;
		});
		if(typeof defaults.callback==='function'){
			CURRENT.$nextTick(function(){
				defaults.callback(CURRENT.$el);
			});
		}
	}
	return CURRENT;
}
export default mask;