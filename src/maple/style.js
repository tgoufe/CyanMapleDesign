var cmuiStyle;
var cssRules;
var cssRulesLen;
$(function(){
	cmuiStyle = document.createElement('style');
	document.head.appendChild(cmuiStyle);
	cssRules=_.get(cmuiStyle,'sheet.cssRules');
	cssRulesLen=cssRules.length;
})
function setStyle(){

}
function style(){
	if(arguments.length){
		let argStringList=_.filter(arguments,_.isString);
		let selector=_.get(argStringList,0);
		let name=_.camelCase(_.get(argStringList,1))||undefined;
		let value=_.get(argStringList,2);
		value=_.find(arguments,_.isPlainObject)||value;
		if(selector&& name&& value){//设置样式
			if(_.isString(value)){
				let matchRule=_.findLast(cssRules,item=>_.get(item,'selectorText')==selector);
				if(matchRule){
					matchRule.style[name]=value;
				}else{
					cmuiStyle.sheet.insertRule(selector+'{}', cssRulesLen);
					cmuiStyle.sheet.cssRules[cssRulesLen++].style[name]=value
				}
			}
		}else if(selector&& name){
			if(value===undefined){//读取样式
				return _.chain(cssRules)
				.findLast(item=>_.get(item,'selectorText')==selector)
				.get('style['+name+']')
				.value()
			}else{//删除选择器下的具体样式
				_.chain(cssRules)
				.findLast(item=>_.get(item,'selectorText')==selector)
				.get('style')
				.value()
				.removeProperty(name)
			}
		}else if(selector&& _.isPlainObject(value)){
			_.forEach(value,(value,key)=>{
				style(selector,key,value)
			})
		}else if(selector){//读取样式
			if(name===''||value===''){

			}else{
				let tempStyle= _.chain(cssRules)
				.findLast(item=>_.get(item,'selectorText')==selector)
				.get('style')
				let arr=tempStyle.filter(item=>item).value();
				return tempStyle.pick(arr).value()
			}
		}
	}
	return cmuiStyle;
}
export default style;
//body background red
//selector styleObj
//selector