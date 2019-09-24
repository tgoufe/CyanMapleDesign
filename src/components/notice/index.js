import Component from './main';
import _ from 'lodash';
let CURRENT = null;
let id = 'cmui-notice-' + _.uniqueId();
let defaultsOptions = _.mapValues(Component.props,item=>item.default);
let timeHandle;
let setCurrent = _.once(function(Vue) {
  let dom=document.createElement('cmui-notice');
  dom.id=id;
  document.body.appendChild(dom);
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
Component.install = function(Vue,Maple) {
  Vue.component(Component.name, Component);
  function notice(){
    setCurrent(Vue);
    var options={};
    if(arguments){
      if(arguments.length>1){
        options.callback=_.filter(arguments,_.isFunction)[0];
        var stringList=_.filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString());
        options.content=stringList[0];
        if(stringList.length>1){
          options.timeout=_.last(_.filter(arguments,_.isNumber))|0;
        }
      }else{
        if( (typeof arguments[0]).match(/string|number|boolean/)){
          options.content=arguments[0];
        }else if(_.isObject(arguments[0])){
          options=arguments[0];
        }else{
          return CURRENT;
        }
      }
    }else{
      return CURRENT;
    }
    options = _.defaults(_.find(arguments,_.isPlainObject),options, defaultsOptions);
    CURRENT.showCmuiDialog=true;
    _.each(options,(value,key)=>{
      CURRENT[key]=value;
    });
    if(typeof options.callback==='function'){
      CURRENT.$nextTick(function(){
        options.callback(CURRENT.$el);
      });
    }
    timeHandle&&clearTimeout(timeHandle);
    if(options.timeout){
      timeHandle=setTimeout(()=>{
        clearTimeout(timeHandle);
        CURRENT.cancel();
      }, options.timeout);
    }
    return CURRENT;
  }
  Vue.prototype.notice=Maple.notice=notice;
};

export default Component;
