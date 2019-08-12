import messageVue from "./index.vue";
import {
uniqueId,
find,
isString,
isNumber,
isFunction,
isArray,
every,
get,
defaultsOptions,
isPlainObject,
delay,
} from 'lodash';
Vue.component('cmui-message',messageVue);
var id='cmui-message-'+uniqueId();
var CURRENT=null;
function Message(){
	var _arg=chain(arguments);
	var defaultsOptions = {
		content:find(arguments,item=>isString(item)&&!/^\.|\#[a-z]/i.test(item))||'',
		duration:find(arguments,isNumber)||1000,
		beforeCreat:null,
		afterCreat:null,
		beforeClose:null,
		afterClose:find(arguments,isFunction)||null,
		contentStyle:{},
		iconName:'roundcheckfill',
		iconStyle:{},
		parent:find(arguments,item=>isString(item)&&/^\.|\#[a-z]/i.test(item))||'body'
	};
	var functionList=find(arguments,item=>isArray(item)&&every(item,isFunction));
	if(get(functionList,'length')){
		switch(functionList.length){
			case 1:
				defaultsOptions.afterClose=functionList[0];
				break;
			case 2:
				defaultsOptions.beforeCreat=functionList[0];
				defaultsOptions.afterClose=functionList[1];
				break;
			case 3:
				defaultsOptions.beforeCreat=functionList[0];
				defaultsOptions.afterCreat=functionList[1];
				defaultsOptions.afterClose=functionList[2];
				break;
			case 4:
				defaultsOptions.beforeCreat=functionList[0];
				defaultsOptions.afterCreat=functionList[1];
				defaultsOptions.beforeClose=functionList[2];
				defaultsOptions.afterClose=functionList[3];
				break;
		}
	}
	var options=defaults(defaultsOptions,find(arguments,isPlainObject));
	var containerDom=$(` <div class="cmui-message-list"> </div>`);
	var messageTemplate=`
		<div class="cmui-message">
			<div class="cmui-message-content">`
			+(options.iconName?'<i class="baseIcon baseIcon-'+options.iconName+'"></i>':'')+
				`<span>${options.content}</span>
			</div>
		</div>
	`;
	isFunction(options.beforeCreat)&&options.beforeCreat();
	var messageDom=containerDom.append(messageTemplate).appendTo(options.parent);
	isFunction(options.afterCreat)&&options.afterCreat(messageDom);
	delay(function(){
		isFunction(options.beforeClose)&&options.beforeClose(messageDom);
		messageDom.fadeOut('slow',function(){
			messageDom.remove();
			isFunction(options.afterClose)&&options.afterClose();
		});
	},options.duration);
}
export default Message;