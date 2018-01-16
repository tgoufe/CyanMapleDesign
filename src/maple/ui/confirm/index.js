import confirmVue from "./index.vue";
var defaults = {
	  title: ''
	, content: ''
	, className: ''
	, okText: '确定'
	, cancelText:'取消'
	, okFn:function(){}
	, cancelFn:function(){}
	, okEnable:true
	, okDisableStyle:null
	, okStyle:null
	, cancelStyle:null
};
Vue.component('cmui-comfirm',confirmVue);
var id='cmui-comfirm-'+_.uniqueId();
var CURRENT=null;
$(function(){
	$('<cmui-comfirm id="'+id+'">').appendTo('body');
	CURRENT=new Vue({
		el:'#'+id
	}).$children[0];
})

function Alert(){
	var options={};
	if(arguments){
		if(arguments.length>1){
			var fnList=_.filter(arguments,_.isFunction);
			options.okFn=fnList[0]
			if(fnList.length>1){
				options.cancelFn=fnList[1]
			}
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
};
export default Alert;