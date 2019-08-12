var cmuiStyle;
var cssRules;
var cssRulesLen;
import {ready} from './dom';
import {get,filter,isString,isPlainObject,chain,camelCase,find,forEach,findLast,pick} from 'lodash';
ready(function(){
	cmuiStyle = document.createElement('style');
	document.head.appendChild(cmuiStyle);
	cssRules=get(cmuiStyle,'sheet.cssRules');
	cssRulesLen=cssRules.length;
});
function style(){
	if(arguments.length){
		let argStringList=filter(arguments,isString);
		let selector=get(argStringList,0);
		let name=camelCase(get(argStringList,1))||undefined;
		let value=get(argStringList,2);
		value=find(arguments,isPlainObject)||value;
		if(selector&& name&& value){//设置样式
			if(isString(value)){
				let matchRule=findLast(cssRules,item=>get(item,'selectorText')===selector);
				if(matchRule){
					matchRule.style[name]=value;
				}else{
					cmuiStyle.sheet.insertRule(selector+'{}', cssRulesLen);
					cmuiStyle.sheet.cssRules[cssRulesLen++].style[name]=value;
				}
			}
		}else if(selector&& name){
			if(value===undefined){//读取样式
				let t=findLast(cssRules,item=>get(item,'selectorText')===selector);
				return get(t,`style[${name}]`);
			}else{//删除选择器下的具体样式
				let t=findLast(cssRules,item=>get(item,'selectorText')===selector);
				t=get(t,'style');
				delete t[name];
			}
		}else if(selector&& isPlainObject(value)){
			forEach(value,(value,key)=>{
				style(selector,key,value);
			});
		}else if(selector){//读取样式
			if(name===''||value===''){

			}else{
				let tempStyle=findLast(cssRules,item=>get(item,'selectorText')===selector);
				tempStyle=get(tempStyle,'style');
				let arr=filter(tempStyle,item=>item);
				return pick(tempStyle,arr);
			}
		}
	}
	return cmuiStyle;
}
export default style;
//body background red
//selector styleObj
//selector