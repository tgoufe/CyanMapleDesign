import Component from './main';
import _ from 'lodash';
let CURRENT = null;
let id = 'cmui-mask-' + _.uniqueId();
let defaultsOptions = _.mapValues(Component.props,item=>item.default);
let setCurrent = _.once(function(Vue) {
  let dom=document.createElement('cmui-mask');
  dom.id=id;
  document.body.appendChild(dom);
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
Component.install = function(Vue,Maple) {
  Vue.component(Component.name, Component);
  function mask(){
    setCurrent(Vue);
    let options = {};
    if (arguments) {
      var argString=_.filter(arguments,_.isString);
      options.position=_.find(argString,item=>{
        return _.every(item.split(' ').filter(i=>i.length),i=>{
          return /^(top|left|bottom|right|center|between)$/.test(i);
        });
      });
      options.content=_.find(argString,item=>item!==options.position);
      options.callback=_.find(arguments,_.isFunction);
    } else {
      return CURRENT;
    }
    options = _.defaults(_.find(arguments, _.isPlainObject), options, defaultsOptions);
    document.body.classList.add('overflow-h');
    _.forEach(options, (value, key) => {
      CURRENT[key] = value;
    });
    CURRENT.showCmuiDialog = true;
    if (typeof options.callback === 'function') {
      CURRENT.$nextTick(function() {
        options.callback(CURRENT.$el);
      });
    }
    return CURRENT;
  }
  Vue.prototype.mask=Maple.mask=mask;
};

export default Component;
