import Alert from '@components/alert/index.js';
import Popup from '@components/popup/index.js';
import Actions from '@components/actions/index.js';
import Confirm from '@components/confirm/index.js';
import Notice from '@components/notice/index.js';
import Affix from '@components/affix/index.js';
import Captcha from '@components/captcha/index.js';
import Collapse from '@components/collapse/index.js';
import CollapseItem from '@components/collapse-item/index.js';
import Countdown from '@components/countdown/index.js';
import {Checkbox, Input, Number, Radio, Select, Textarea} from '@components/form/index.js';
import Picker from '@components/picker/index.js';
import methods from './methods/index.js';
function Maple(){
    return new Maple.prototype.init();
}
Maple.prototype.init=function(){};
Maple.prototype.init.prototype=Maple.prototype;
const components=[
	Alert,
	Popup,
	Actions,
	Confirm,
	Notice,
	Affix,
	Captcha,
	Collapse,
	CollapseItem,
	Countdown,
	Checkbox, Input, Number, Radio, Select, Textarea,//form
	Picker
];
const install=function(Vue){
	if (install.installed) return;
	components.forEach(function(component) {
		component.install(Vue,Maple);
	});
	_.assign(Maple,methods);
};
if(typeof window !== 'undefined' && typeof document !== 'undefined'){
	window.maple=Maple;
}
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}
export default{
	install,
	Alert,
	Popup,
	Actions,
	Confirm,
	Notice,
	Affix,
	Captcha,
	Collapse,
	CollapseItem,
	Countdown,
	Checkbox, Input, Number, Radio, Select, Textarea,//form
	Picker
};
