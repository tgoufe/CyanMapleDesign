import Component from './main';
Component.install = function(Vue,Maple) {
  Vue.component(Component.name, Component);
};
export default Component;
