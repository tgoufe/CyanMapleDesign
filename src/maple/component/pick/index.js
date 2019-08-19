function picker(){
    let defaultOptions=_.defaults(_.find(arguments,_.isPlainObject),{
        title:_.find(arguments,_.isString),
        data:_.find(arguments,_.isArray),
        rightFn:_.find(arguments,_.isFunction),
        leftFn:_.filter(arguments,_.isFunction)[1]
    });
    let pickerDom=document.createElement('cmui-picker');
    pickerDom.setAttribute('v-bind','defaultOptions');
    document.body.appendChild(pickerDom);
    let current=new Vue({
        el:pickerDom,
        data:{defaultOptions}
    }).$children[0];
    _.forEach(defaultOptions, (value, key) => {
        current[key] = value;
    });
    current.visible=true;
    return current;
}
export default picker;