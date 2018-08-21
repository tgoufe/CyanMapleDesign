import confirmVue from "./index.vue";
let defaults = _.mapValues(confirmVue.props,item=>item.default);
Vue.component('cmui-comfirm', confirmVue);
let id = 'cmui-comfirm-' + _.uniqueId();
let CURRENT = null;
let setCurrent = _.once(function() {
    window && $('<cmui-comfirm id="' + id + '">').appendTo('body');
    CURRENT = new Vue({
        el: '#' + id
    }).$children[0];
});

function confirm() {
    setCurrent();
    let options = {};
    if (arguments) {
        if (arguments.length > 1) {
            let fnList = _.filter(arguments, _.isFunction);
            options.okFn = fnList[0];
            options.cancelFn = fnList[1];
            options.callback = fnList[2];
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
    options = _.defaults(_.find(arguments, _.isPlainObject), options, defaults);

    CURRENT.showCmuiDialog = true;
    _.each(options, (value, key) => {
        CURRENT[key] = value;
    });
    if (typeof options.callback === 'function') {
        CURRENT.$nextTick(function() {
            options.callback($(CURRENT.$el));
        });
    }
    return CURRENT;
}
export default confirm;