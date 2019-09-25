import Component from './main';
import _ from 'lodash';
let CURRENT = null;
let id = 'cmui-picker-' + _.uniqueId();
let defaultsOptions = _.mapValues(Component.props,item=>item.default);
let setCurrent = _.once(function(Vue) {
  let dom=document.createElement('cmui-picker');
  dom.id=id;
  document.body.appendChild(dom);
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
Component.install = function(Vue,Maple) {
  Vue.component(Component.name, Component);
  function picker(){
    setCurrent(Vue);
    let options = {};
    if (arguments) {
      options=_.defaults(_.find(arguments,_.isPlainObject),{
        title:_.find(arguments,_.isString),
        data:_.find(arguments,_.isArray),
        rightFn:_.find(arguments,_.isFunction),
        leftFn:_.filter(arguments,_.isFunction)[1]
      });
    } else {
      return CURRENT;
    }
    options = _.defaults(_.find(arguments, _.isPlainObject), options, defaultsOptions);
    _.forEach(options, (value, key) => {
      CURRENT[key] = value;
    });
    CURRENT.visible = true;
    return CURRENT;
  }
  Vue.prototype.picker=Maple.picker=picker;
};

export default Component;
