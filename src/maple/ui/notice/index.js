import noticeVue from "./index.vue";
var defaults = {
	  title: ''
	, content: ''
	, className: ''
	, timeout: 3000
	, okFn:function(){}
};
Vue.component('cmui-notice',noticeVue);
var id='cmui-notice-'+_.uniqueId();
var CURRENT=null;
var timeHandle;
$(function(){
	$('<cmui-notice id="'+id+'">').appendTo('body');
	CURRENT=new Vue({
		el:'#'+id
	}).$children[0];
})

function Notice(){
	var options={};
	if(arguments){
		if(arguments.length>1){
			options.okFn=_.filter(arguments,_.isFunction)[0];
			var stringList=_.filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString())
			options.content=stringList[0];
			if(stringList.length>1){
				options.timeout=_.last(_.filter(arguments,_.isNumber))|0;
			}
		}else{
			if( (typeof arguments[0]).match(/string|number|boolean/)){
				options.content=arguments[0]
			}else if(_.isObject(arguments[0])){
				options=arguments[0];
			}else{
				return CURRENT
			}
		}
	}else{
		return CURRENT
	}
	options = _.defaults(_.find(arguments,_.isPlainObject),options, defaults);
	document.body.classList.add('overflow-h');
	CURRENT.showCmuiDialog=true;
	_.each(options,(value,key)=>{
		CURRENT[key]=value
	})
	timeHandle&&clearTimeout(timeHandle)
	if(options.timeout){
		timeHandle=setTimeout(()=>{
			clearTimeout(timeHandle)
			CURRENT.cancel();
		}, options.timeout);
	}
};
export default Notice;