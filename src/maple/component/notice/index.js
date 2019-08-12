import noticeVue from "./index.vue";
import {
uniqueId,
once,
filter,
isFunction,
last,
isNumber,
isObject,
defaults,
find,
isPlainObject,
each,
} from 'lodash';
var defaultsOptions = {
	  content: ''
	, className: ''
	, timeout: 3000
	, closeFn:function(){}
	, callback:function(){}
};
Vue.component('cmui-notice',noticeVue);
var id='cmui-notice-'+uniqueId();
var CURRENT=null;
var timeHandle;
let setCurrent=once(function(){
  $('<cmui-notice id="'+id+'">').appendTo('body');
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
function Notice(){
  setCurrent();
	var options={};
	if(arguments){
		if(arguments.length>1){
			options.callback=filter(arguments,isFunction)[0];
			var stringList=filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString());
			options.content=stringList[0];
			if(stringList.length>1){
				options.timeout=last(filter(arguments,isNumber))|0;
			}
		}else{
			if( (typeof arguments[0]).match(/string|number|boolean/)){
				options.content=arguments[0];
			}else if(isObject(arguments[0])){
				options=arguments[0];
			}else{
				return CURRENT;
			}
		}
	}else{
		return CURRENT;
	}
	options = defaults(find(arguments,isPlainObject),options, defaultsOptions);
	CURRENT.showCmuiDialog=true;
	each(options,(value,key)=>{
		CURRENT[key]=value;
	});
	if(typeof options.callback==='function'){
		CURRENT.$nextTick(function(){
			options.callback($(CURRENT.$el));
		});
	}
	timeHandle&&clearTimeout(timeHandle);
	if(options.timeout){
		timeHandle=setTimeout(()=>{
			clearTimeout(timeHandle);
			CURRENT.cancel();
		}, options.timeout);
	}
	return CURRENT;
}
export default Notice;