import alertVue from "./index.vue";
import {
    defaults,
    each,
    filter,
    find,
    isFunction,
    isObject,
    isPlainObject,
    last,
    mapValues,
    once,
    uniqueId
} from 'lodash';
let defaultsOptions = mapValues(alertVue.props,item=>item.default);
Vue.component('cmui-alert', alertVue);
let id = 'cmui-alert-' + uniqueId();
let CURRENT = null;
let setCurrent = once(function() {
    let dom=document.createElement('cmui-alert');
    dom.id=id;
    document.body.appendChild(dom);
    CURRENT=new Vue({
        el:'#'+id
    }).$children[0];
});
function Alert() {
    let options = {};
    if (arguments) {
        if (arguments.length > 1) {
            options.okFn = filter(arguments, isFunction)[0];
            options.callback = filter(arguments, isFunction)[1];
            let stringList = filter(arguments, item => (typeof item).match(/string|number|boolean/)).map(item => item.toString());
            options.content = last(stringList);
            if (stringList.length > 1) {
                options.title = stringList[0];
            }
        } else {
            if ((typeof arguments[0]).match(/string|number|boolean/)) {
                options.content = arguments[0];
            } else if (isObject(arguments[0])) {
                options = arguments[0];
            } else {
                return CURRENT;
            }
        }
    } else {
        return CURRENT;
    }
    options = defaults(find(arguments, isPlainObject), options, defaultsOptions);
    setCurrent();
    each(options, (value, key) => {
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
export default Alert;