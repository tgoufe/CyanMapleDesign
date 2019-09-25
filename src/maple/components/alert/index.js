import Alert from './main';
import _ from 'lodash';
let CURRENT = null;
let id = 'cmui-alert-' + _.uniqueId();
let defaultsOptions = _.mapValues(Alert.props,item=>item.default);
let setCurrent = _.once(function(Vue) {
  let dom=document.createElement('cmui-alert');
  dom.id=id;
  document.body.appendChild(dom);
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
Alert.install = function(Vue,Maple) {
  Vue.component(Alert.name, Alert);
  function alert(){
    let options = {};
    if (arguments) {
      if (arguments.length > 1) {
        options.okFn = _.filter(arguments, _.isFunction)[0];
        options.callback = _.filter(arguments, _.isFunction)[1];
        let stringList = _.filter(arguments, item => (typeof item).match(/string|number|boolean/)).map(item => item.toString());
        options.content = _.last(stringList);
        if (stringList.length > 1) {
          options.title = stringList[0];
        }
      } else {
        if ((typeof arguments[0]).match(/string|number|boolean/)) {
          options.content = arguments[0];
        } else if (_.isObject(arguments[0])) {
          options = arguments[0];
        } else {
          return CURRENT;
        }
      }
    } else {
      return CURRENT;
    }
    options = _.defaults(_.find(arguments, _.isPlainObject), options, defaultsOptions);
    setCurrent(Vue,options);
    _.forEach(options, (value, key) => {
      CURRENT[key] = value;
    });
    CURRENT.visible = true;
    if (typeof options.callback === 'function') {
      CURRENT.$nextTick(function() {
        options.callback(CURRENT.$el);
      });
    }
    return CURRENT;
  }
  Vue.prototype.alert=Maple.alert=alert;
};

export default Alert;
