import _ from 'lodash';
let current;
let setCurrent=_.once(function(){
    let pickerDom=document.createElement('cmui-picker');
    document.body.appendChild(pickerDom);
    current=new Vue({
        el:pickerDom,
    }).$children[0];
    return current;
});
function picker(){
    setCurrent();
    let defaultOptions=_.defaults(_.find(arguments,_.isPlainObject),{
        title:_.find(arguments,_.isString),
        data:_.find(arguments,_.isArray),
        rightFn:_.find(arguments,_.isFunction),
        leftFn:_.filter(arguments,_.isFunction)[1]
    });
    _.forEach(defaultOptions, (value, key) => {
        current[key] = value;
    });
    current.visible=true;
    return current;
}
export default picker;