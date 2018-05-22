import alertVue from "./index.vue";
var defaults = {
	  title: ''
	, content: ''
	, className: ''
	, okText: '确定'
	, okFn:function(){}
	, okStyle:null
	, callback:function(){}
};
Vue.component('cmui-alert',alertVue);
var id='cmui-alert-'+_.uniqueId();
var CURRENT=null;
$(function(){
	$('<cmui-alert id="'+id+'">').appendTo('body');
	CURRENT=new Vue({
		el:'#'+id
	}).$children[0];
})

function Alert(){
	var options={};
	if(arguments){
		if(arguments.length>1){
			options.okFn=_.filter(arguments,_.isFunction)[0];
			var stringList=_.filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString())
			options.content=_.last(stringList)
			if(stringList.length>1){
				options.title=stringList[0]
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
	if(typeof options.callback=='function'){
		CURRENT.$nextTick(function(){
			options.callback($(CURRENT.$el))
		})
	}
	return CURRENT;
};
export default Alert;