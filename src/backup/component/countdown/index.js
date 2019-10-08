import countdown from './countdown.vue';
import {defaults,
	find,
	isBoolean,
	isFunction,
	isNumber,
	isPlainObject,
	isString} from 'lodash';
Vue.component('cmui-countdown',countdown);
let defaultOptions={
	nowTime:+new Date,
	endTime:0,
	showMilli:false,
	callback:null,
	parent:'body'
};
function countDown(...arg){
	let $tpl=$(`<cmui-countdown
	v-bind="options"
	@countdownend="end"
	></cmui-countdown>`);
	let endTime;
	let time=find(arg,isNumber);
	let parent=find(arg,isString);
	let showMilli=find(arg,isBoolean);
	let callback=find(arg,isFunction);
	let options=find(arg,isPlainObject);
	if(time){
		endTime=defaultOptions.nowTime+time;
	}
	options=defaults(options,{
		endTime,callback,parent,showMilli
	},defaultOptions);
	if($(options.parent).length){
		$(options.parent).append($tpl);
		return new Vue({
			el:$tpl[0],
			data:function(){
				return {options};
			},
			methods:{
				end(...arg){
					if(isFunction(options.callback)){
						options.callback(...arg);
					}
				}
			}
		});
	}
}
export default countDown;