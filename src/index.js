import Alert from './components/alert/index.js';
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
if(window&&document){
	window.maple=Maple;
}
export default{
	install,
	Alert
};