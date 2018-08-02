function picker(){
  let defaultOptions=_.defaults(_.find(arguments,_.isPlainObject),{
      // visible:false,
      title:_.find(arguments,_.isString),
      data:_.find(arguments,_.isArray),
      rightFn:_.find(arguments,_.isFunction),
      leftFn:_.filter(arguments,_.isFunction)[1]
  });
  defaultOptions.visible=false;
  let pickerDom=document.createElement('cmui-picker');
  pickerDom.setAttribute('v-bind','defaultOptions');
  document.body.appendChild(pickerDom);
  let vm=new Vue({
    el:pickerDom,
    data:{defaultOptions}
  });
  defaultOptions.visible=true;
  return vm.$children[0];
}
export default picker;