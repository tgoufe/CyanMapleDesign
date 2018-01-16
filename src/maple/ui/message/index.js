import messageVue from "./index.vue";
Vue.component('cmui-message',messageVue);
var id='cmui-message-'+_.uniqueId();
var CURRENT=null;
function Message(){
	var _arg=_.chain(arguments)
	var defaults = {
		content:_arg.find(item=>_.isString(item)&&!/^\.|\#[a-z]/i.test(item)).value()||'',
		duration:_arg.find(_.isNumber).value()||1000,
		beforeCreat:null,
		afterCreat:null,
		beforeClose:null,
		afterClose:_arg.find(_.isFunction).value()||null,
		contentStyle:{},
		iconName:'roundcheckfill',
		iconStyle:{},
		parent:_arg.find(item=>_.isString(item)&&/^\.|\#[a-z]/i.test(item)).value()||'body'
	};
	var functionList=_arg.find(item=>_.isArray(item)&&_.every(item,_.isFunction)).value();
	if(_.get(functionList,'length')){
		switch(functionList.length){
			case 1:
				defaults.afterClose=functionList[0];
				break;
			case 2:
				defaults.beforeCreat=functionList[0];
				defaults.afterClose=functionList[1];
				break;
			case 3:
				defaults.beforeCreat=functionList[0];
				defaults.afterCreat=functionList[1];
				defaults.afterClose=functionList[2];
				break;
			case 4:
				defaults.beforeCreat=functionList[0];
				defaults.afterCreat=functionList[1];
				defaults.beforeClose=functionList[2];
				defaults.afterClose=functionList[3];
				break;
		}
	}
	var options=_.defaults(defaults,_arg.find(_.isPlainObject).value())
	var containerDom=$(` <div class="cmui-message-list"> </div>`);
	var messageTemplate=`
		<div class="cmui-message">
			<div class="cmui-message-content">`
			+(options.iconName?'<i class="baseIcon baseIcon-'+options.iconName+'"></i>':'')+
				`<span>${options.content}</span>
			</div>
		</div>
	`;
	_.isFunction(options.beforeCreat)&&options.beforeCreat()
	var messageDom=containerDom.append(messageTemplate).appendTo(options.parent)
	_.isFunction(options.afterCreat)&&options.afterCreat(messageDom)
	_.delay(function(){
		_.isFunction(options.beforeClose)&&options.beforeClose(messageDom)
		messageDom.fadeOut('slow',function(){
			messageDom.remove()
			_.isFunction(options.afterClose)&&options.afterClose()
		})
	},options.duration)
};
export default Message;