import Vue from 'vue';
function picker(){
  let defaultOptions={
      visible:false,
      data:_.find(arguments,_.isArray),
      rightButtonFn:_.find(arguments._.isFunction)
  };
  let pickerDom=document.createElement('cmui-picker');
  pickerDom.setAttribute('v-bind','defaultOptions');
  document.body.appendChild(pickerDom);
  let vm=new Vue({
    el:pickerDom,
    data:{defaultOptions}
  });
  defaultOptions.visible=true;
}
export default picker;