import actionsVue from "./index.vue";
import {mapValues,
uniqueId,
once,
filter,
isPlainObject,
get,
find,
isArray,
isFunction,
defaults,
each} from 'lodash';
let defaultsOptions = mapValues(actionsVue.props,item=>item.default);
Vue.component('cmui-actions',actionsVue);
let id='cmui-actions-'+uniqueId();
let CURRENT=null;
let setCurrent=once(function(){
  window&&$('<cmui-actions id="'+id+'">').appendTo('body');
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
function actions(){
	setCurrent();
	let options={items:[]};
	if(arguments){
		if(arguments.length>1){
			let fnList=filter(arguments,isFunction);
			options.selectFn=fnList[0];
			options.cancelFn=fnList[1];
			let styleList=filter(arguments,isPlainObject);
			if(styleList.length==1){
				options.itemStyle=styleList[0];
			}
			let stringList=filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString());
			stringList.forEach((item,index)=>{
				let rs={text:item};
				let style=get(styleList,index);
				if(style){
					rs.style=style;
				}
				options.items.push(rs);
			});
			let arrArg=find(arguments,isArray);
			if(arrArg){
				options.items=arrArg;
			}
		}else{
			if( (typeof arguments[0]).match(/string|number|boolean/)){
				options.items.push({text:arguments[0]});
			}else if(isArray(arguments[0])){
				options.items=arguments[0];
			}else if(isFunction(arguments[0])){
				return actions(arguments[0]());
			}
		}
	}else{
		return CURRENT;
	}
	options = defaults(find(arguments,isPlainObject),options, defaultsOptions);
	each(options,(value,key)=>{
		CURRENT[key]=value;
	});
	CURRENT.visible=true;
	return CURRENT
}
export default actions;