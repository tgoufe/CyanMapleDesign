import pageComponent from "./index.vue";
import posterTest from "./posterTest.vue";
Vue.component('pc-test',pageComponent)
Vue.component('poster-test',posterTest)
function formatComProps(data){
	var rs={};
	_.forEach(data,(value,key)=>{
		var defaultValue=value.default;
		if(!_.isFunction(defaultValue)){
			rs[key]=defaultValue;
		}else{
			if(_.isPlainObject(defaultValue())){
				rs[key]=formatComProps(defaultValue());
			}else{
				rs[key]=defaultValue()
			}
		}
	})
	return rs;
}
export {formatComProps}