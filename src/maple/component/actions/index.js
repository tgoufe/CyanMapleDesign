import actionsVue from "./index.vue";
var defaults = {
	  buttons: []
	, className: ''
	, cancelText:'取消'
	, cancelFn:function(){}
	, cancelStyle:null
};
Vue.component('cmui-actions',actionsVue);
var id='cmui-actions-'+_.uniqueId();
var CURRENT=null;
$(function(){
	$('<cmui-actions id="'+id+'">').appendTo('body');
	CURRENT=new Vue({
		el:'#'+id
	}).$children[0];
})

function actions(){
	var options={buttons:[]};
	if(arguments){
		if(arguments.length>1){
			var fnList=_.filter(arguments,_.isFunction);
			var styleList=_.filter(arguments,item=>_.isObject(item)&&!_.isFunction(item));
			var stringList=_.filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString())
			stringList.forEach((item,index)=>{
				var rs={};
				rs.text=item;
				rs.callback=_.get(fnList,index);
				rs.style=_.get(styleList,index)||_.last(styleList);
				options.buttons.push(rs);
			})
		}else{
			if( (typeof arguments[0]).match(/string|number|boolean/)){
				options.buttons.push({text:arguments[0]})
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
	// return CURRENT
};
export default actions;