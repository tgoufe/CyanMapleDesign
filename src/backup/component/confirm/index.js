import confirmVue from "./index.vue";
import {mapValues,
uniqueId,
once,
isFunction,
filter,
last,
isObject,
defaults,
find,
isPlainObject,
each} from 'lodash';
let defaultsOptions = mapValues(confirmVue.props,item=>item.default);
Vue.component('cmui-confirm', confirmVue);
let id = 'cmui-confirm-' + uniqueId();
let CURRENT = null;
let setCurrent = once(function() {
    let dom=document.createElement('cmui-confirm');
    dom.id=id;
    document.body.appendChild(dom);
    CURRENT=new Vue({
        el:'#'+id
    }).$children[0];
});

function confirm() {
    setCurrent();
    let options = {};
    if (arguments) {
        if (arguments.length > 1) {
            let fnList = filter(arguments, isFunction);
            options.okFn = fnList[0];
            options.cancelFn = fnList[1];
            options.callback = fnList[2];
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
export default confirm;