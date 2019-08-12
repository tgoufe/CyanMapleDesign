import maskVue from './index.vue';
import {ready} from '../../dom';
import {
uniqueId,
filter,
isString,
find,
every,
isFunction,
isPlainObject,
defaults,
each
} from 'lodash';
Vue.component('cmui-mask',maskVue);
var id=uniqueId('cmui-mask-');
var CURRENT=null;
ready(function(){
	let dom=document.createElement('cmui-mask');
	dom.id=id;
	document.body.appendChild(dom);
	CURRENT=new Vue({
		el:'#'+id
	}).$children[0];
});
function mask(){
	var defaultsOptions={
		position:'center',
		content:'',
		closeFn:function(){},
		callback:function(){},
		contentStyle:null
	};
	if(arguments.length){
		var argString=filter(arguments,isString);
		defaultsOptions.position=find(argString,item=>{
			return every(item.split(' ').filter(i=>i.length),i=>{
				return /^(top|left|bottom|right|center|between)$/.test(i);
			});
		})||'center';
		defaultsOptions.content=find(argString,item=>item!==defaultsOptions.position)||'';
		defaultsOptions.callback=find(arguments,isFunction);
		var argObject=find(arguments,isPlainObject);
		defaultsOptions = defaults(argObject,defaultsOptions);
		document.body.classList.add('overflow-h');
		CURRENT.showCmuiDialog=true;
		each(defaultsOptions,(value,key)=>{
			CURRENT[key]=value;
		});
		if(typeof defaultsOptions.callback==='function'){
			CURRENT.$nextTick(function(){
				defaultsOptions.callback($(CURRENT.$el));
			});
		}
	}
	return CURRENT;
}
export default mask;