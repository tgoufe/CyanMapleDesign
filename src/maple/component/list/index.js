import listVue from './list.vue';
import listItemVue from './list-item.vue';
import listGroupVue from './list-group.vue';
import listList from './listList';
// import Sortable from './Sortable.js';
import {
	defaultsDeep,
	every,
	filter,
	find,
	forEach,
	inRange,
	isArray,
	isBoolean,
	isElement,
	isFunction,
	isNumber,
	isPlainObject,
	isString,
} from 'lodash';
Vue.component('cmui-list',listVue);
Vue.component('cmui-list-item',listItemVue);
Vue.component('cmui-list-group',listGroupVue);
function getItemClassByCol(col){
	if(isNumber(col)){
		switch(col){
		    case 2:
		     return 'box-span6';
		    case 3:
		     return 'box-span4';
		    case 4:
		     return 'box-span3';
		    case 5:
		     return 'box-col3';
		    case 6:
		     return 'box-span2';
		    default:
		    return 'box-span12';
		}
	}else if(isArray(col)&&col.every(item=>item==parseInt(item))){
		var total=col.reduce((pre,next)=>pre+next);
		if(total%2==0||total%3==0){
			return col.map(item=>'box-span'+parseInt(12/total*item));
		}else if(total%5==0){
			return col.map(item=>'box-col'+parseInt(15/total*item));
		}else{
			return ['box-span12'];
		}
	}else{
		return 'box-span12';
	}
}
function List(){
	if(!arguments.length){
		return listList;
	}else{
		var defaultOptions={
			col:find(arguments,item=>isNumber(item)||isArray(item)&&every(item,isNumber))||1,
			space:filter(arguments,isNumber)[1]||20,
			items:find(arguments,item=>isArray(item)&&every(item,isString)||isFunction(item))||[],
			parent:find(arguments,item=>isElement(item)||item instanceof jQuery)||'body',
			sortable:!!find(arguments,isBoolean),
			options:{
				draggable:'.cmui-list-item'
			}
		};
		var options=defaultsDeep(defaultOptions,find(arguments,isPlainObject));
		if(isFunction(options.items)){
			var rs=options.items();
			if(isArray(rs)){
				options.items=rs;
			}
		}
		if(options.space%10!=0||!inRange(options.space, -1, 51)){
		    options.space= 20;
		}
		var realColClass=getItemClassByCol(options.col);
		var template='';
		template+='<div class="cmui-list overflow-h">';
		template+='	<div class="clearfix marginr-n'+options.space+' marginb-n'+options.space+'">';
		forEach(options.items,(item,index)=>{
			template+='<div class="cmui-list-item paddingr'+options.space+' paddingb'+options.space+' ';
			if(isString(realColClass)){
				template+=realColClass;
			}else if(isArray(realColClass)){
				template+=realColClass[index%options.col.length];
			}
			template+='">'+item.toString()+'</div>';
		});
		template+='	</div>';
		template+='</div>';
		template=$(template);
		$(options.parent).append(template);
		// if(options.sortable){
		// 	new Sortable(template.find('>.clearfix')[0],options.options);
		// }
		listList.add(template);
		return template;
	}
}
export default List;
/**
 * maple.list(2,[],20,dom)
 * maple.list({
 * 	col:number or list
 * 	space:number
 * 	item:array or function 
 * })
 */