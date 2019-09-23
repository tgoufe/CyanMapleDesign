import Alert from '@components/alert/index.js';
function Maple(){
    return new Maple.prototype.init();
}
Maple.prototype.init=function(){};
Maple.prototype.init.prototype=Maple.prototype;
const components=[
	Alert
];
const install=function(Vue){
	components.forEach(component => {
		Vue.component(component.name, component);
	});
};
if(typeof window !== 'undefined' && typeof document !== 'undefined'){
	window.maple=Maple;
}
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}
export default{
	install,
	Alert
};