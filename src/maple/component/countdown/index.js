import countdown from './countdown.vue';
Vue.component('cmui-countdown',countdown);
let defaultOptions={
	nowTime:+new Date,
	endTime:0,
	showMilli:false,
	callback:null,
	parent:'body'
}
function countDown(...arg){
	let $tpl=$(`<cmui-countdown
	v-bind="options"
	@countdownend="end"
	></cmui-countdown>`);
	let endTime;
	let time=_.find(arg,_.isNumber);
	let parent=_.find(arg,_.isString);
	let showMilli=_.find(arg,_.isBoolean);
	let callback=_.find(arg,_.isFunction);
	let options=_.find(arg,_.isPlainObject);
	if(time){
		endTime=defaultOptions.nowTime+time;
	}
	options=_.defaults(options,{
		endTime,callback,parent,showMilli
	},defaultOptions);
	if($(options.parent).length){
		$(options.parent).append($tpl);
		return new Vue({
			el:$tpl[0],
			data:function(){
				return {options}
			},
			methods:{
				end(...arg){
					if(_.isFunction(options.callback)){
						options.callback(...arg)
					}
				}
			}
		})
	}
}
export default countDown